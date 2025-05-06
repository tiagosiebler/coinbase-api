import crypto from 'node:crypto';

import * as jose from 'jose';
import { nanoid } from 'nanoid';

interface JWTSignParams {
  algorithm: 'ES256';
  timestampMs: number;
  jwtExpiresSeconds: number;
  apiPubKey: string;
  apiPrivKey: string;
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

  const payload = {
    iss: 'cdp',
    nbf: Math.floor(timestampMs / 1000),
    exp: Math.floor(timestampMs / 1000) + jwtExpiresSeconds,
    sub: apiPubKey,
    uri,
  };

  const jwt = new jose.SignJWT(payload).setProtectedHeader({
    alg: algorithm,
    kid: apiPubKey,
    nonce: nanoid(16),
  });

  const pkcs8Key = crypto
    .createPrivateKey({
      key: apiPrivKey,
      format: 'pem',
    })
    .export({
      type: 'pkcs8',
      format: 'pem',
    });

  return jwt.sign(await jose.importPKCS8(pkcs8Key as string, algorithm));
}

export async function signWSJWT(params: JWTSignParams): Promise<string> {
  const { algorithm, timestampMs, jwtExpiresSeconds, apiPrivKey, apiPubKey } =
    params;

  const payload = {
    iss: 'cdp',
    nbf: Math.floor(timestampMs / 1000),
    exp: Math.floor(timestampMs / 1000) + jwtExpiresSeconds,
    sub: apiPubKey,
  };

  const jwt = new jose.SignJWT(payload).setProtectedHeader({
    alg: algorithm,
    kid: apiPubKey,
    nonce: nanoid(16),
  });

  const pkcs8Key = crypto
    .createPrivateKey({
      key: apiPrivKey,
      format: 'pem',
    })
    .export({
      type: 'pkcs8',
      format: 'pem',
    });

  return jwt.sign(await jose.importPKCS8(pkcs8Key as string, algorithm));
}
