import { createPrivateKey } from 'crypto';
import { importPKCS8, SignJWT } from 'jose';
import { nanoid } from 'nanoid';

interface JWTSignParams {
  algorithm?: 'ES256' | 'EdDSA';
  timestampMs: number;
  jwtExpiresSeconds: number;
  apiPubKey: string;
  apiPrivKey: string;
}

interface KeyInfo {
  algorithm: 'ES256' | 'EdDSA';
  privateKey: string;
}

/**
 * Auto-detect key type and format based on the private key content
 */
function detectKeyTypeAndFormat(privateKeyPem: string): KeyInfo {
  // ECDSA key detection (PEM format)
  if (
    privateKeyPem.includes('-----BEGIN EC PRIVATE KEY-----') ||
    privateKeyPem.includes('-----BEGIN PRIVATE KEY-----')
  ) {
    return {
      algorithm: 'ES256',
      privateKey: ensurePKCS8Format(privateKeyPem),
    };
  }

  // Ed25519 key detection (base64 string without PEM headers)
  // Ed25519 private keys from Coinbase are provided as base64-encoded PKCS#8 keys
  if (
    !privateKeyPem.includes('-----BEGIN') &&
    !privateKeyPem.includes('-----END')
  ) {
    try {
      // Try to decode as base64 to validate it's a valid base64 string
      const decoded = Buffer.from(privateKeyPem, 'base64');
      // Ed25519 PKCS#8 keys are typically 48 bytes (44 bytes + padding)
      // Raw Ed25519 keys are 32 bytes, but Coinbase provides PKCS#8 encoded keys
      if (decoded.length >= 32) {
        // Convert base64 Ed25519 key to PEM format for jose
        return {
          algorithm: 'EdDSA',
          privateKey: convertEd25519ToPKCS8(privateKeyPem),
        };
      }
    } catch {
      // Not a valid base64 string, fall through
    }
  }

  // Default to ECDSA if we can't determine the type
  return {
    algorithm: 'ES256',
    privateKey: ensurePKCS8Format(privateKeyPem),
  };
}

/**
 * Convert EC private key to PKCS#8 format if needed
 */
function ensurePKCS8Format(privateKeyPem: string): string {
  if (privateKeyPem.includes('-----BEGIN EC PRIVATE KEY-----')) {
    // Convert EC private key to PKCS#8 format
    const keyObject = createPrivateKey(privateKeyPem);
    return keyObject.export({
      type: 'pkcs8',
      format: 'pem',
    }) as string;
  }
  return privateKeyPem;
}

/**
 * Convert base64 Ed25519 private key to PKCS#8 format
 */
function convertEd25519ToPKCS8(base64Key: string): string {
  try {
    const keyBuffer = Buffer.from(base64Key, 'base64');

    // Handle different Ed25519 key formats
    let privateKeyBytes: Buffer;

    if (keyBuffer.length === 32) {
      // Raw 32-byte Ed25519 private key
      privateKeyBytes = keyBuffer;
    } else if (keyBuffer.length === 64) {
      // libsodium format: 32 bytes private key + 32 bytes public key
      // Extract just the private key (first 32 bytes)
      privateKeyBytes = keyBuffer.subarray(0, 32);
    } else if (keyBuffer.length === 48) {
      // Already PKCS#8 encoded, convert to PEM
      const pemKey = [
        '-----BEGIN PRIVATE KEY-----',
        base64Key.match(/.{1,64}/g)?.join('\n') || base64Key,
        '-----END PRIVATE KEY-----',
      ].join('\n');

      // Validate the key
      createPrivateKey(pemKey);
      return pemKey;
    } else {
      throw new Error(
        `Unsupported Ed25519 key length: ${keyBuffer.length} bytes`,
      );
    }

    // Create PKCS#8 DER encoding for Ed25519 private key
    // PKCS#8 structure for Ed25519:
    // SEQUENCE {
    //   INTEGER 0 (version)
    //   SEQUENCE {
    //     OBJECT IDENTIFIER 1.3.101.112 (Ed25519)
    //   }
    //   OCTET STRING {
    //     OCTET STRING privateKey (32 bytes)
    //   }
    // }

    const ed25519Oid = Buffer.from([0x30, 0x05, 0x06, 0x03, 0x2b, 0x65, 0x70]); // Ed25519 OID
    const privateKeyOctetString = Buffer.concat([
      Buffer.from([0x04, 0x22, 0x04, 0x20]), // OCTET STRING header + inner OCTET STRING header
      privateKeyBytes,
    ]);

    const pkcs8Der = Buffer.concat([
      Buffer.from([0x30, 0x2e]), // SEQUENCE, total length 46 bytes
      Buffer.from([0x02, 0x01, 0x00]), // INTEGER 0 (version)
      ed25519Oid, // Algorithm identifier
      privateKeyOctetString, // Private key
    ]);

    // Convert to PEM format
    const base64Der = pkcs8Der.toString('base64');
    const pemKey = [
      '-----BEGIN PRIVATE KEY-----',
      base64Der.match(/.{1,64}/g)?.join('\n') || base64Der,
      '-----END PRIVATE KEY-----',
    ].join('\n');

    // Validate the generated key
    createPrivateKey(pemKey);

    return pemKey;
  } catch (error) {
    throw new Error(
      `Failed to convert Ed25519 key to PKCS#8 format: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

export async function signJWT(
  params: {
    url: string;
    method: string;
  } & JWTSignParams,
): Promise<string> {
  const {
    url,
    method,
    algorithm: providedAlgorithm,
    timestampMs,
    jwtExpiresSeconds,
    apiPrivKey,
    apiPubKey,
  } = params;

  // Remove https:// but keep the rest
  const urlWithEndpoint = url.slice(8);
  const uri = `${method} ${urlWithEndpoint}`;

  // Auto-detect key type and format, or use provided algorithm
  const keyInfo = providedAlgorithm
    ? {
        algorithm: providedAlgorithm,
        privateKey: ensurePKCS8Format(apiPrivKey),
      }
    : detectKeyTypeAndFormat(apiPrivKey);

  // Import the private key
  const privateKey = await importPKCS8(keyInfo.privateKey, keyInfo.algorithm);

  // Create and sign the JWT
  const jwt = await new SignJWT({
    iss: 'cdp',
    nbf: Math.floor(timestampMs / 1000),
    exp: Math.floor(timestampMs / 1000) + jwtExpiresSeconds,
    sub: apiPubKey,
    uri,
  })
    .setProtectedHeader({
      alg: keyInfo.algorithm,
      kid: apiPubKey,
      nonce: nanoid(16),
    })
    .sign(privateKey);

  return jwt;
}

export async function signWSJWT(params: JWTSignParams): Promise<string> {
  const {
    algorithm: providedAlgorithm,
    timestampMs,
    jwtExpiresSeconds,
    apiPrivKey,
    apiPubKey,
  } = params;

  // Auto-detect key type and format, or use provided algorithm
  const keyInfo = providedAlgorithm
    ? {
        algorithm: providedAlgorithm,
        privateKey: ensurePKCS8Format(apiPrivKey),
      }
    : detectKeyTypeAndFormat(apiPrivKey);

  // Import the private key
  const privateKey = await importPKCS8(keyInfo.privateKey, keyInfo.algorithm);

  // Create and sign the JWT
  const jwt = await new SignJWT({
    iss: 'cdp',
    nbf: Math.floor(timestampMs / 1000),
    exp: Math.floor(timestampMs / 1000) + jwtExpiresSeconds,
    sub: apiPubKey,
  })
    .setProtectedHeader({
      alg: keyInfo.algorithm,
      kid: apiPubKey,
      nonce: nanoid(16),
    })
    .sign(privateKey);

  return jwt;
}
