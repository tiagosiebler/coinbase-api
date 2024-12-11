import { neverGuard } from './misc-util.js';

function bufferToB64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return globalThis.btoa(binary);
}

function b64StringToBuffer(input: string): Uint8Array {
  const binaryString = atob(input); // Decode base64 string
  const buffer = new Uint8Array(binaryString.length);

  // Convert binary string to a Uint8Array
  for (let i = 0; i < binaryString.length; i++) {
    buffer[i] = binaryString.charCodeAt(i);
  }
  return buffer;
}

export type SignEncodeMethod = 'hex' | 'base64';
export type SignAlgorithm = 'SHA-256' | 'SHA-512';

/**
 * Similar to node crypto's `createHash()` function
 */
export async function hashMessage(
  message: string,
  method: SignEncodeMethod,
  algorithm: SignAlgorithm,
): Promise<string> {
  const encoder = new TextEncoder();

  const buffer = await globalThis.crypto.subtle.digest(
    algorithm,
    encoder.encode(message),
  );

  switch (method) {
    case 'hex': {
      return Array.from(new Uint8Array(buffer))
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
    }
    case 'base64': {
      return bufferToB64(buffer);
    }
    default: {
      throw neverGuard(method, `Unhandled sign method: "${method}"`);
    }
  }
}

/**
 * Sign a message, with a secret, using the Web Crypto API
 */
export async function signMessage(
  message: string,
  secret: string,
  method: SignEncodeMethod,
  algorithm: SignAlgorithm,
  secretEncodeMethod: 'base64:web' | 'utf',
): Promise<string> {
  const encoder = new TextEncoder();

  let encodedSecret;

  switch (secretEncodeMethod) {
    // case 'base64:node': {
    //   encodedSecret = Buffer.from(secret, 'base64');
    //   break;
    // }
    case 'base64:web': {
      encodedSecret = b64StringToBuffer(secret);
      break;
    }
    case 'utf': {
      encodedSecret = encoder.encode(secret);
      break;
    }
    default: {
      throw new Error(`Unhandled encoding: "${secretEncodeMethod}"`);
    }
  }

  const key = await globalThis.crypto.subtle.importKey(
    'raw',
    encodedSecret,
    { name: 'HMAC', hash: algorithm },
    false,
    ['sign'],
  );

  const buffer = await globalThis.crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(message),
  );

  switch (method) {
    case 'hex': {
      return Array.from(new Uint8Array(buffer))
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
    }
    case 'base64': {
      return bufferToB64(buffer);
    }
    default: {
      throw neverGuard(method, `Unhandled sign method: "${method}"`);
    }
  }
}
