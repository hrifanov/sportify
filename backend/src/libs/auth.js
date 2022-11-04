import jwt, { sign } from 'jsonwebtoken';
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  NODE_ENV,
  FE_HOSTNAME_DEV,
  FE_HOSTNAME_PROD,
} from '../config/variables';
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

      const hostname = NODE_ENV === 'development' ? FE_HOSTNAME_DEV : FE_HOSTNAME_PROD;

      //TODO: add env
      const url = `http://${hostname}/verify-account/${emailToken}`;

      const transporter = createGmailTransporter();

      try {
        sendMail(transporter, {
          to: auth.email,
          subject: 'Please confirm your registration',
          html: `Hi ${auth.user},<br><br>Thank you for your registration.<br><br>Please click this link to confirm your email by clicking the link below:<br><a href="${url}">${url}</a><br><br>Thanks,<br>The Sportify Team`,
        });
      } catch (e) {
        console.error(e);
      }
    }
  );
};
