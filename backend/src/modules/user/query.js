const User = require('../../models/User');

export const users = async () => {
  return await User.find();
};

export const user = async (_, { userName }, { req }) => {
  if (!req.userId) {
    return null;
  }

  return await User.findOne({ userName: userName });
};
