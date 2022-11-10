import jwt from 'jsonwebtoken';
import { GMAIL_API_KEY } from '../../config/variables';
import { sendVerificationToken, verifyToken } from '../../libs/auth';
import { throwCustomError } from '../../libs/error';
import Club from '../../models/Club';
import User from '../../models/User';
import { isAuth } from '../../libs/isAuth';

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
  isAuth(context);

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

/// Will be added in the next PR

// export const removePlayer = async (_, { clubId, playerId }, context) => {
//   //isAuth(context);

//   const token = context.req.headers.authorization.split(' ')[1];
//   const { userId } = jwt.verify(token, ACCESS_TOKEN_SECRET);

//   const club = await Club.findById(clubId);
//   if (!club) {
//     throwCustomError(`Club with id ${clubId} does not exits`, {
//       code: 'no-club',
//     });
//   }

//   // if (!isUserAdmin(club, userId)) {
//   //   throwCustomError("You don't have permission to perform this action", {
//   //     code: 'not-admin',
//   //   });
//   // }

//   if (club.owner !== playerId) {
//     throwCustomError(`You cannot remove club's owner.`, {
//       code: 'no-owner',
//     });
//   }

//   await club
//     .update({
//       $pull: { players: { user: userId } },
//     })
//     .then((doc) => {
//       if (!doc) {
//         throwCustomError(`Club with id ${clubId} does not exits`, {
//           code: 'no-club',
//         });
//       }
//     });

//   return true;
// };

// export const setClubAdminStatus = async (
//   _,
//   { clubId, playerId, isAdmin },
//   context
// ) => {
//   //isAuth(context);
//   const token = context.req.headers.authorization.split(' ')[1];
//   const { userId } = jwt.verify(token, ACCESS_TOKEN_SECRET);

//   const club = await Club.findById(clubId);
//   if (!club) {
//     throwCustomError(`Club with id ${clubId} does not exits`, {
//       code: 'no-club',
//     });
//   }

//   const user = club.players.filter(
//     (player) => player.user.toHexString() === userId
//   )[0];

//   if (!user.isAdmin) {
//     throwCustomError("You don't have permission to perform this action", {
//       code: 'not-admin',
//     });
//   }

//   const playerr = await TeamPlayer.find()

//   console.log(playerr)
//   console.log('THIS')

//   return true;
// };
