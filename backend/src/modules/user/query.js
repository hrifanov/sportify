const User = require("../../models/User");

export const users = async () => {
  return await User.find();
};

export const user = async (_, { userName }) => {
  return await User.findOne({userName: userName});
};
