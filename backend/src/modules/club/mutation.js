import jwt from 'jsonwebtoken';
import { GMAIL_API_KEY } from '../../config/variables';
import { sendVerificationToken, verifyToken } from '../../libs/auth';
import { throwCustomError } from '../../libs/error';
import { isAuth, isClubAdmin } from '../../libs/isAuth';
import Club from '../../models/Club';
import User from '../../models/User';

export const createClub = async (_, { clubInput }, context) => {
  isAuth(context);
  const { name, owner } = clubInput;

  const existingClub = await Club.findOne({ name });
  if (existingClub) {
    throwCustomError(`Club with name ${name} already exists`, {
      code: 'club-exists',
    });
  }

  const club = new Club({
    ...clubInput,
    players: [{ user: owner, isAdmin: true }],
  });

  const { id } = await club.save().catch((err) => {
    console.log(err);
    throwCustomError('Error creating club', { code: 500 });
  });

  return id;
};

export const editClub = async (_, { clubId, name, locality }, context) => {
  isAuth(context, clubId);
  await isClubAdmin(clubId, context.payload.userId);

  if (!name && !locality) {
    throwCustomError('No data to update', { code: 400 });
  }

  const club = await Club.findByIdAndUpdate(clubId, { name, locality });

  if (!club) {
    throwCustomError('Club not found', { code: 404 });
  }

  return true;
};

export const invitePlayer = async (_, { clubId, email }, context) => {
  isAuth(context);
  await isClubAdmin(clubId, context.payload.userId);

  const club = await Club.findById(clubId).select('name');

  if (!club) {
    throwCustomError(`Club with id ${clubId} does not exits`, {
      code: 'no-club',
    });
  }

  sendVerificationToken({ clubId, email }, 'accept-invite', {
    to: email,
    subject: 'New Sportify invitation',
    html: `Hi,<br><br>You've been invited to join the ${club.name} club.<br><br>To accept the invitation please click the link below.<br><a href="{url}">{url}</a><br><br>Thanks,<br>The Sportify Team`,
  });

  return true;
};

export const acceptInvite = async (_, { token }, context) => {
  isAuth(context);

  try {
    const { clubId, email } = verifyToken(token, GMAIL_API_KEY);

    const club = await Club.findById(clubId).select('players');
    if (!club) {
      throwCustomError(`Club with id ${clubId} does not exits`, {
        code: 'no-club',
      });
    }

    const user = await User.findOne({ email }).select('id');
    if (!user) {
      throwCustomError(`User with email ${email} does not exits`, {
        code: 'no-user',
      });
    }

    if (!club.players.find((player) => player.user.toString() === user.id)) {
      await Club.findByIdAndUpdate(clubId, {
        $push: { players: { user: user.id, isAdmin: false } },
      });
    }

    return true;
  } catch (err) {
    console.error(err);

    const { clubId, email } = jwt.decode(token, GMAIL_API_KEY);

    if (clubId && email) {
      throwCustomError('token-expired');
    }

    throwCustomError('invalid-token');
  }
};

export const removePlayer = async (_, { clubId, userId }, context) => {
  isAuth(context);
  await isClubAdmin(clubId, context.payload.userId);

  const club = await Club.findById(clubId);
  if (!club) {
    throwCustomError(`Club with id ${clubId} does not exits`, {
      code: 'no-club',
    });
  }

  if (club.owner === userId) {
    throwCustomError(`You cannot remove club's owner.`, {
      code: 'owner-admin',
    });
  }

  await club.update({ $pull: { players: { user: userId } } });
  return true;
};

export const setClubAdminStatus = async (
  _,
  { clubId, userId, isAdmin },
  context
) => {
  isAuth(context);
  await isClubAdmin(clubId, context.payload.userId);

  const club = await Club.findById(clubId);
  if (!club) {
    throwCustomError(`Club with id ${clubId} does not exits`, {
      code: 'no-club',
    });
  }

  if (club.owner.toString() === userId) {
    throwCustomError(`You cannot adjust admin status of the club's owner.`, {
      code: 'owner-admin',
    });
  }

  await Club.updateOne(
    { 'players.user': userId, id: clubId },
    { $set: { 'players.$.isAdmin': isAdmin } }
  );

  return true;
};
