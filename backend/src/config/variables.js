import dotenv from 'dotenv-flow';

dotenv.config();

export const FE_HOSTNAME = process.env.FE_HOSTNAME;
export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const GMAIL_USER = process.env.GMAIL_USER;
export const GMAIL_API_KEY = process.env.GMAIL_API_KEY;
export const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
