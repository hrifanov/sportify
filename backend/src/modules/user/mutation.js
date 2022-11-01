import * as argon2 from 'argon2';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import { GMAIL_API_KEY } from '../../config/variables';
import { createAccessToken, createRefreshToken } from '../../libs/auth';
import { createGmailTransporter, sendMail } from '../../libs/mail';
import User from '../../models/User';

export const signin = async (_, { userName, password }, { res }) => {
  const user = await User.findOne({
    userName: userName.toLowerCase(),
  }).exec();

  if (!user || !user.id) {
    throw new GraphQLError(`could not find user ${userName}`, {
      extensions: { ref: 'username' },
    });
  }

  if (!user.verified) {
    throw new GraphQLError('please verify your email first to login', {
      extensions: { ref: 'email' },
    });
  }

  const valid = await argon2.verify(user.password, password);

  if (!valid) {
    throw new GraphQLError('bad password, please try again', {
      extensions: { ref: 'password' },
    });
  }

  res.cookie('jid', createRefreshToken(user), {
    httpOnly: true,
    path: '/refresh_token',
  });

  return {
    accessToken: createAccessToken(user),
    user,
  };
};

export const signup = async (_, { userInput }) => {
  const parsedUserInput = JSON.parse(JSON.stringify(userInput));

  const userByUserName = await User.findOne({
    userName: parsedUserInput.userName.toLowerCase(),
  }).exec();

  if (userByUserName) {
    throw new GraphQLError(
      `username ${parsedUserInput.userName} is already taken`,
      {
        extensions: { ref: 'username' },
      }
    );
  }

  const userByEmail = await User.findOne({
    email: parsedUserInput.email.toLowerCase(),
  }).exec();

  if (userByEmail) {
    throw new GraphQLError(
      `email ${parsedUserInput.email} is already registered`,
      {
        extensions: { ref: 'email' },
      }
    );
  }

  const passwordHash = await argon2.hash(parsedUserInput.password);

  const user = new User({
    userName: parsedUserInput.userName.toLowerCase(),
    password: passwordHash,
    email: parsedUserInput.email.toLowerCase(),
    name: parsedUserInput.name,
    tokenVersion: 0,
    verified: false,
  });

  await user.save().catch((err) => {
    console.log(err);
    return false;
  });

  jwt.sign(
    {
      user: parsedUserInput.userName,
      email: parsedUserInput.email,
    },
    GMAIL_API_KEY,
    {
      expiresIn: '1d',
    },
    (err, emailToken) => {
      if (err) {
        console.error(err);
        return false;
      }

      //TODO: add env
      const url = `http://localhost:3000/verify-account/${emailToken}`;

      const transporter = createGmailTransporter();

      try {
        sendMail(transporter, {
          to: parsedUserInput.email,
          subject: 'Please confirm your registration',
          html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`,
        });
      } catch (e) {
        console.error(e);
      }
    }
  );

  return true;
};

export const verifyUser = async (_, { token }) => {
  try {
    const { user } = jwt.verify(token, GMAIL_API_KEY);
    await User.findOneAndUpdate({ userName: user }, { verified: true });
  } catch (e) {
    const { user, email } = jwt.decode(token, GMAIL_API_KEY);

    if (!user || !email) {
      throw new GraphQLError('Cannot decode token', {
        extensions: { code: 'token' },
      });
    }

    jwt.sign(
      { user: user, email: email },
      GMAIL_API_KEY,
      { expiresIn: '1d' },
      (err, emailToken) => {
        if (err) {
          console.error(err);
          return false;
        }

        //TODO: add env
        const url = `http://localhost:3000/verify-account/${emailToken}`;
        const transporter = createGmailTransporter();

        try {
          sendMail(transporter, {
            to: email,
            subject: 'Please confirm your registration',
            html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`,
          });
        } catch (e) {
          console.error(e);
        }
      }
    );

    return false;
  }
  return true;
};

export const invalidateTokens = async (_, __, { req }) => {
  if (!req.userId) {
    return false;
  }

  // TODO: user update
  const user = await User.findOne(req.userId);
  if (!user) {
    return false;
  }
  user.count += 1;
  await user.save();

  // res.clearCookie('access-token')

  return true;
};

// export const deleteUser = async (_, { userName }) => {
//   return (await User.deleteOne({ userName: userName })).deletedCount;
// };
