import { isAuth } from '../../libs/isAuth';
const Club = require('../../models/Club');

//TODO: refactor isAuth as middleware

export const clubs = async (_, _params, context) => {
  isAuth(context);
  return await Club.find();
};

export const clubByContactPerson = async (_, { contactPersonId }, context) => {
  isAuth(context);
  const club = await Club.findOne({ contactPerson: contactPersonId });
  return club;
};

export const clubByID = async (_, { id }, context) => {
  isAuth(context);
  const club = await Club.findOne({ _id: id })
  return club;
};
