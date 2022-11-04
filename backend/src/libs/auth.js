import jwt, { sign } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config/variables';
import { createGmailTransporter, sendMail } from './mail';

export const createAccessToken = (user) => {
  return sign({ userId: user.id }, ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

export const createRefreshToken = (user) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: '7d',
    }
  );
};

export const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

export const sendVerificationToken = (auth, secretKey, expiresIn) => {
  jwt.sign(
    auth,
    secretKey,
    {
      expiresIn: expiresIn,
    },
    (err, emailToken) => {
      if (err) {
        console.error(err);
        return false;
      }

      //TODO: add env
      const url = `http://localhost:3000/verify-account/${emailToken}`;

      const transporter = createGmailTransporter();

      try {
        sendMail(transporter, {
          to: auth.email,
          subject: 'Please confirm your registration',
          html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`,
        });
      } catch (e) {
        console.error(e);
      }
    }
  );
};

