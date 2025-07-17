import { createPrivateKey } from 'crypto';
import { importPKCS8, SignJWT } from 'jose';
import { nanoid } from 'nanoid';

interface JWTSignParams {
  algorithm: 'ES256';
  timestampMs: number;
  jwtExpiresSeconds: number;
  apiPubKey: string;
  apiPrivKey: string;
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

export async function signJWT(
  params: {
    url: string;
    method: string;
  } & JWTSignParams,
): Promise<string> {
  const {
    url,
    method,
    algorithm,
    timestampMs,
    jwtExpiresSeconds,
    apiPrivKey,
    apiPubKey,
  } = params;

  // Remove https:// but keep the rest
  const urlWithEndpoint = url.slice(8);
  const uri = `${method} ${urlWithEndpoint}`;

  // Ensure private key is in PKCS#8 format
  const pkcs8Key = ensurePKCS8Format(apiPrivKey);

  // Import the private key
  const privateKey = await importPKCS8(pkcs8Key, algorithm);

  // Create and sign the JWT
  const jwt = await new SignJWT({
    iss: 'cdp',
    nbf: Math.floor(timestampMs / 1000),
    exp: Math.floor(timestampMs / 1000) + jwtExpiresSeconds,
    sub: apiPubKey,
    uri,
  })
    .setProtectedHeader({
      alg: algorithm,
      kid: apiPubKey,
      nonce: nanoid(16),
    })
    .sign(privateKey);

  return jwt;
}

export async function signWSJWT(params: JWTSignParams): Promise<string> {
  const { algorithm, timestampMs, jwtExpiresSeconds, apiPrivKey, apiPubKey } =
    params;

  // Ensure private key is in PKCS#8 format
  const pkcs8Key = ensurePKCS8Format(apiPrivKey);

  // Import the private key
  const privateKey = await importPKCS8(pkcs8Key, algorithm);

  // Create and sign the JWT
  const jwt = await new SignJWT({
    iss: 'cdp',
    nbf: Math.floor(timestampMs / 1000),
    exp: Math.floor(timestampMs / 1000) + jwtExpiresSeconds,
    sub: apiPubKey,
  })
    .setProtectedHeader({
      alg: algorithm,
      kid: apiPubKey,
      nonce: nanoid(16),
    })
    .sign(privateKey);

  return jwt;
}
