import jwt from 'jsonwebtoken';
import { GMAIL_API_KEY } from '../../config/variables';
import { sendVerificationToken, verifyToken } from '../../libs/auth';
import { throwCustomError } from '../../libs/error';
import Club from '../../models/Club';
import User from '../../models/User';
import { isClubAdmin, isAuth } from '../../libs/isAuth';

export const createClub = async (_, { clubInput }, context) => {
  isAuth(context);
  const { name, owner } = clubInput;

  await Club.findOne({ name }).then((club) => {
    if (club) {
      throwCustomError(`Club with name ${name} already exists`, {
        code: 'club-exists',
      });
    }
  });

  const club = new Club({
    ...clubInput,
    players: [{ user: owner, isAdmin: true }],
  });

  return await club
    .save()
    .then((saveDoc) => saveDoc.id)
    .catch((err) => {
      console.log(err);
      throwCustomError('Error creating club', { code: 500 });
    });
};

export const editClub = async (_, { clubId, name, locality }, context) => {
  isAuth(context, clubId);
  await isClubAdmin(clubId, context.payload.userId);

  if (!name && !locality) {
    throwCustomError('No data to update', { code: 400 });
  }

  await Club.findByIdAndUpdate(clubId, { name, locality }).then((doc) => {
    if (!doc) {
      throwCustomError('Club not found', { code: 404 });
    }
  });

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

  sendVerificationToken(
    {
      clubId: clubId,
      email: email,
    },
    'accept-invite',
    {
      to: email,
      subject: 'New Sportify invitation',
      html: `Hi,<br><br>You've been invited to join the ${club.name} club.<br><br>To accept the invitation please click the link below.<br><a href="{url}">{url}</a><br><br>Thanks,<br>The Sportify Team`,
    }
  );

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

    if (!club.players.includes(user.id)) {
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

// export const setClubAdminStatus = async (
//   _,
//   { clubId, userId, isAdmin },
//   context
// ) => {
//   isAuth(context);
//   await isClubAdmin(clubId, context.payload.userId);

//   const club = await Club.findById(clubId);
//   if (!club) {
//     throwCustomError(`Club with id ${clubId} does not exits`, {
//       code: 'no-club',
//     });
//   }

//   if (club.owner.toString() === userId) {
//     throwCustomError(`You cannot adjust admin status of the club's owner.`, {
//       code: 'owner-admin',
//     });
//   }

//   await club.updateOne(
//     { 'players.user': mongoose.Types.ObjectId(userId) },
//     { $set: { 'players.$.isAdmin': isAdmin } }
//   );

//   // await club.updateOne(
//   //   { players: {$elemMatch: {user: userId}} },
//   //   { $set: { 'players.$.isAdmin': isAdmin } }
//   // );

//   return true;
// };
