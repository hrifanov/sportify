import { isAuth } from '../../libs/isAuth';
import { throwCustomError } from '../../libs/error';
const Club = require('../../models/Club');

//TODO: refactor isAuth as middleware

export const clubs = async (_, { filter }, context) => {
  isAuth(context);

  const userId = context.payload.userId;
  const clubs = await Club.find({ players: { $elemMatch: { user: { $ne: userId } } } });

  // TODO: Enable this when FE is fixed

  // if(filter){
  //   const { param , value, exact } = filter;
  //   if(Object.keys(Club.schema.paths).includes(param)){
  //     return clubs.filter((club) => {
  //       if(exact){
  //         return club[param] == value;
  //       }
  //     })
  //   }
  //   throwCustomError("Invalid filter parameter.", { code: "invalid-filter" });
  // }
  return clubs;
};

export const clubByContactPerson = async (_, { contactPersonId }, context) => {
  isAuth(context);
  const club = await Club.findOne({ contactPerson: contactPersonId });
  return club;
};

export const clubByID = async (_, { id }, context) => {
  isAuth(context);
  const club = await Club.findById(id);
  return club;
};
