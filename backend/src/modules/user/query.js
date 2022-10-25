import { isAuth } from '../../libs/isAuth';

const User = require('../../models/User');

export const users = async () => {
  return await User.find();
};

export const user = async (_, { userName }, context) => {
  isAuth(context);

  return User.findOne({ userName: userName });
};
