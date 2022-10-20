import jwt from 'jsonwebtoken';

export function createToken(content, secret, expiresIn) {
  return jwt.sign(content, secret, expiresIn);
}

export function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}
