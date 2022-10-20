import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config/variables';

export function createAccessToken(content) {
  return jwt.sign(content, ACCESS_TOKEN_SECRET, {expiresIn: '15min'});
}

export function createRefreshToken(content) { 
  return jwt.sign(content, REFRESH_TOKEN_SECRET, {expiresIn: '7d'});
}

export function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
}
