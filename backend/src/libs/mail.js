import nodemailer from 'nodemailer';

import { GMAIL_APP_PASSWORD, GMAIL_USER } from '../config/variables';

let transporter;

export const createGmailTransporter = () => {
  if (transporter) {
    return transporter;
  } else {
    transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    });

    return transporter;
  }
};

export const sendMail = (transporter, args) => {
  transporter.sendMail({
    ...args,
  });
};
