import mongoose from 'mongoose';

import { DB_USER, DB_PASSWORD, DB_NAME } from '../config/variables';

export const getConnection = async () => {
  const MONGODB = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.x6lebu3.mongodb.net/?retryWrites=true&w=majority`;

  return mongoose
    .connect(MONGODB, { useNewUrlParser: true, dbName: DB_NAME })
    .then((client) => {
      console.log('🚀 MongoDB connection successful');
      return client;
    });
};
