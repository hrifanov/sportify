import * as argon2 from 'argon2';
import { GraphQLError } from 'graphql';
import { createTokens } from '../../libs/auth';
import User from '../../models/User';

export const signin = async (_, { userName, password }, { res }) => {
  const user = await User.findOne({ userName: userName.toLowerCase() }).exec();

  if (!user || !user.id) {
    throw new GraphQLError('User does not exist', {
      extensions: {
        code: 'FORBIDDEN',
      },
    });
  }

  if (await argon2.verify(user.password, password)) {
    const { refreshToken, accessToken } = createTokens(user);

    res.cookie('refresh-token', refreshToken, { expiresIn: 60 * 60 * 24 * 7 });
    res.cookie('access-token', accessToken, { expiresIn: 60 * 15 });

    return {
      user: { ...user },
      accessToken,
      refreshToken,
    };
  } else {
    throw new GraphQLError('Password is incorrect', {
      extensions: {
        code: 'FORBIDDEN',
      },
    });
  }
};

export const signup = async (_, { userInput }) => {
  const parsedUserInput = JSON.parse(JSON.stringify(userInput));

  const userByUserName = await User.findOne({
    userName: parsedUserInput.userName.toLowerCase(),
  }).exec();

  if (userByUserName) {
    throw new GraphQLError('Username already taken', {
      extensions: {
        code: 'CONFLICT',
      },
    });
  }

  const userByEmail = await User.findOne({
    email: parsedUserInput.email.toLowerCase(),
  }).exec();

  if (userByEmail) {
    throw new GraphQLError('Email already registered', {
      extensions: {
        code: 'CONFLICT',
      },
    });
  }

  const passwordHash = await argon2.hash(parsedUserInput.password);

  const user = new User({
    userName: parsedUserInput.userName.toLowerCase(),
    password: passwordHash,
    email: parsedUserInput.email.toLowerCase(),
    name: parsedUserInput.name,
    tokenCheckSum: 0,
  });

  const res = await user
    .save()
    .then((user) => {
      const token = createToken({ id: user._id });

      const userObject = {
        id: user._id,
        email: user.email,
        name: user.name,
        userName: user.userName,
      };

      return {
        user: { ...userObject },
        token,
      };
    })
    .catch((err) => {
      console.log(err);
      throw new GraphQLError('Unable to add user to the database', {
        extensions: {
          code: err,
        },
      });
    });

  return res;
};

// export const deleteUser = async (_, { userName }) => {
//   return (await User.deleteOne({ userName: userName })).deletedCount;
// };
