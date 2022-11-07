import jwt from 'jsonwebtoken';
import { GMAIL_API_KEY } from '../../config/variables';
import { sendVerificationToken, verifyToken } from '../../libs/auth';
import { throwCustomError } from '../../libs/error';
import { isAuth } from '../../libs/isAuth';
import Club from '../../models/Club';
import User from '../../models/User';

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

    const user = await User.findOne({ email: email }).select('id');
    if (!user) {
      throwCustomError(`User with email ${email} does not exits`, {
        code: 'no-user',
      });
    }

    if (!club.players.includes(user.id)) {
      await Club.findOneAndUpdate(
        { _id: clubId },
        { $push: { players: user.id } }
      );
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
