import Crypto from 'crypto';
import Application from '../../models/Application';
import Club from '../../models/Club';
import { isAuth, isClubAdmin } from '../../libs/isAuth';
import { throwCustomError } from '../../libs/error';
import { createGmailTransporter, sendMail } from "../../libs/mail";
import { createHTMLContent } from './emailContentFactory';
import User from '../../models/User';


export const createClubApplication = async(_, { applicationInput }, context) => {
  isAuth(context);
  const { userId, clubId } = applicationInput;
  // Check if application exists.
  const existingApplication = await Application.findOne({ user: userId, club: clubId });
  if(existingApplication){
    if(existingApplication.state != "declined"){
      throwCustomError(
        "User has already applied for membership in this club.", 
        { code: "already-applied"}
      );
    } else {
      // Allow reapplying by removing declined applies.
      await existingApplication.remove();
    }
  }
  // Create new application.
  const token = Crypto.randomBytes(32).toString('hex');
  const newApplication = await Application.create({
    user: userId,
    club: clubId,
    state: "pending",
    dateApplied: new Date(),
    token: token
  });
  // Send email.
  const club = await Club.findById(clubId);
  const contactPerson = await User.findById(club.contactPerson);
  const appliedUser = await User.findById(userId);
  sendMembershipApplicationEmail(contactPerson.email, contactPerson.name, appliedUser.name, club.name, token);
  return newApplication;
}


export const editApplication = async(_, { editApplicationInput }, context) => {
  isAuth(context);
  const { applicationId, newState } = editApplicationInput;
  const application = await Application.findById(applicationId);
  if(!application){
    throwCustomError("Application for membership doesn't exist.", { code: "no-application" });
  }
  isClubAdmin(application.club, context.payload.userId);
  const session = await context.client.startSession();
  try{
    if(newState == "accepted"){
      await addPlayerToClub(application.club, application.user, session);
    }
    application.state = newState;
    await application.save({ session });
  }catch(err){
    console.error(err);
    await session.abortTransaction();
    const code = err.extensions ? err.extensions.code : undefined;
    throwCustomError(err.message, { code });
  } finally{
    session.endSession();
  }
  
  return application;
}


export const approveApplication = async(_, { applicationToken }, context) => {
  isAuth(context);
  const application = await Application.findOne({ token: applicationToken});
  if(!application){
    throwCustomError("Application for membership doesn't exist.", { code: "no-application" });
  }
  const session = await context.client.startSession();
  try{
    application.state = "accepted";
    application.save({ session });
    await addPlayerToClub(application.club, application.user, session);
  }catch(err){
    console.error(err);
    await session.abortTransaction();
    throwCustomError(err.message);
  } finally{
    session.endSession();
  }
  return application;
}


const sendMembershipApplicationEmail = (recieverEmail, recieverUsername, appliedUsername, clubName, token) => {
  const transporter = createGmailTransporter();
  const html = createHTMLContent(recieverUsername, appliedUsername, clubName, token);
  sendMail(transporter, {
    to: recieverEmail,
    subject: "New membership application",
    html
  });
}


const addPlayerToClub = async (clubId, userId, session) => {
  const club = await Club.findById(clubId, null, { session: session });
  for(const player of club.players){
    if(player.user == userId){
      throwCustomError("User is already in the club", { code: "user-alredy-in-club" });
    }
  }
  club.players.push({ isAdmin: false, user: userId });
  await club.save({ session: session });
}