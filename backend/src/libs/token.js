import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/variables';

export function createAccessToken(content) {
  return jwt.sign(content, JWT_SECRET, {expiresIn: '15min'});
}

export function createRefreshToken(content) { 
  return jwt.sign(content, JWT_SECRET, {expiresIn: '7d'});
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
