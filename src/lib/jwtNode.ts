import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';

export function signJWT(
  url: string,
  method: string,
  algorithm: 'ES256',
  apiPubKey: string,
  apiPrivKey: string,
): string {
  //

  // Remove https:// but keep the rest
  const urlWithEndpoint = url.slice(8);
  const uri = `${method} ${urlWithEndpoint}`;

  const payload = {
    iss: 'cdp',
    nbf: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 120,
    sub: apiPubKey,
    uri,
  };

  const header = {
    alg: algorithm,
    kid: apiPubKey,
    nonce: nanoid(16),
  };

  const options: jwt.SignOptions = {
    algorithm: algorithm as jwt.Algorithm,
    header: header,
  };

  return jwt.sign(payload, apiPrivKey, options);
}
