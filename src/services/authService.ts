import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { generateToken } from '../utils/generateToken';
import { confirmRegisterEmailTemplate } from '../utils/confirmRegisterEmailTemplate';
import { sendEmail } from '../utils/sendEmail';
import Token from '../models/Token';
import clientPath from '../utils/clientPath';
import axios from 'axios';

// 1) Register a new user
export const register = async (fullName: string, email: string, password: string) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    if (!existingUser.verified) {
      await User.findByIdAndDelete(existingUser._id);
    } else {
      throw new Error('Email already exists');
    }
  }

  const salt = await bcrypt.genSalt(10);
  const bcryptPassword = await bcrypt.hash(password, salt);

  const user: IUser = new User({
    fullName,
    email,
    password: bcryptPassword,
  });
  await user.save();

  const token = generateToken({ _id: user._id, email: user.email });
  await new Token({ userId: user._id, token }).save();

  // sending confirmation email
  const send_to = email;
  const sent_from = process.env.EMAIL_USER;
  const subject = 'WatchMyMovies - Please confirm your registration';
  let link = '';
  if (process.env.NODE_ENV === 'production') {
    link = `${process.env.SERVER_PATH_PROD}/api/auth/email-confirmation?token=${token}`;
  } else {
    link = `${process.env.SERVER_PATH_DEV}/api/auth/email-confirmation?token=${token}`;
  }
  const message = confirmRegisterEmailTemplate(link, fullName);
  const result = await sendEmail(subject, message, send_to, sent_from);
  console.log(result, 'sadk');
  if (!result) {
    await User.findByIdAndDelete(user._id);
    throw new Error('Unable to send confirmation email');
  }

  return {
    _id: user._id,
    name: user.fullName,
    email: user.email,
    verified: user.verified,
    image: user.profileImage,
  };
};

// 2) Confirm user email
export const emailConfirmation = async (token: string) => {
  const verifiedToken = await Token.findOne({ token });
  if (!verifiedToken) {
    throw new Error('Invalid token');
  }

  const userId = verifiedToken.userId;
  const verifiedUser = await User.findByIdAndUpdate(userId, { verified: true }, { new: true });
  if (!verifiedUser) {
    throw new Error('Invalid user');
  }
  // delete the token from db after verification
  await Token.findOneAndDelete({ token });

  const userResponse = {
    _id: verifiedUser._id,
    fullName: verifiedUser.fullName,
    email: verifiedUser.email,
    verified: verifiedUser.verified,
    profileImage: verifiedUser.profileImage,
  };

  return `${clientPath}/?verified=true&user=${JSON.stringify(userResponse)}`;
};

// 3) Login user
export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid Email or Password.');
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error('Invalid Email or Password.');
  }

  const token = generateToken({ _id: user._id, email: user.email });

  const userResponse = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    verified: user.verified,
    profileImage: user.profileImage,
  };

  return { userResponse, token };
};

// 4) Google Login
export const googleLogin = async (code: string) => {
  try {
    const tokenParam = {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code: decodeURIComponent(code),
      grant_type: 'authorization_code',
      redirect_uri: process.env.GOOGLE_CALLBACK_URL,
    };
    const queryString = Object.entries(tokenParam)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
      .join('&');

    const {
      data: { id_token },
    } = await axios.post(`https://oauth2.googleapis.com/token?${queryString}`);

    if (!id_token) {
      throw new Error('Authentication error');
    }

    const { email, name, picture, email_verified } = jwt.decode(id_token) as {
      email: string;
      name: string;
      picture: string;
      email_verified: boolean;
    };

    if (!email_verified) {
      throw new Error('Email not verified');
    }

    const userByEmail = await User.findOne({ email });

    // create random strong password for google login
    const randomPassword = Math.random().toString(36).slice(-8);



    // register user if not exists
    let newUser;
    if(!userByEmail){
      newUser = new User({
        fullName: name,
        email: email,
        password: randomPassword,
        verified: true,
        profileImage: picture,
      });
      await newUser.save();
    }

    const token = generateToken({ _id: userByEmail ? userByEmail._id : newUser._id, email });

    if (!userByEmail) {
      // Create a new object excluding the password field
      const { password, ...userData } = newUser.toObject();
      return { userData, token };
    } else {
      const { password, ...userData } = userByEmail.toObject();
      return { userData, token };
    }
  } catch (error) {
    throw new Error(error.message || 'Something went wrong');
  }
};
