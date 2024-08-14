import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { register, login, emailConfirmation, googleLogin } from '../services/authService';

const maxAge = parseFloat(process.env.MAX_AGE_JWT_DAYS) * 24 * 60 * 60 * 1000; //days

// 1) registerHandler: Registers a new user and sends a verification email.
export const registerHandler = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ status: false, msg: errors.array()[0].msg });
  }

  const { fullName, email, password } = req.body;

  try {
    const user = await register(fullName, email, password);
    return res.status(200).json({ status:true, msg: 'Please check your email to verify.', data: user });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ status:false, msg: err.message || 'Server error' });
  }
};

// 2) emailConfirmationHandler: Confirms user email and sets a token in a cookie.
export const emailConfirmationHandler = async (req: Request, res: Response) => {
  const token = req.query.token as string;
  if (!token) {
    return res.status(400).json({ status: false, msg: 'Token is required' });
  }
  try {
    const redirectUrl = await emailConfirmation(token);

    // Set the token in a cookie
    res.cookie('token', token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent only over HTTPS in production
      sameSite: 'strict', // Prevents the cookie from being sent along with cross-site requests
      maxAge, // Sets the age in milliseconds
    });
    
    return res.redirect(redirectUrl);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ status: false, msg: error.message || 'Something went wrong' });
  }
};

// 3) loginHandler: Logs in a user and sets a token in a cookie.
export const loginHandler = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ status: false, msg: errors.array()[0].msg });
  }

  const { email, password } = req.body;

  try {
    const { userResponse, token } = await login(email, password);

    // Set the token in a cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict', 
      maxAge, 
    });

    return res.status(200).json({ status: true, msg: 'User logged in successfully', data: userResponse });
  } catch (err) {
    return res.status(400).json({ status: false, msg: err.message || 'Server error' });
  }
};

// 4) googleLoginHandler: Logs in a user via Google and sets a token in a cookie.
export const googleLoginHandler = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { code } = req.body as { code: string };
    if (!code) {
      return res.status(400).json({ status: false, msg: 'Code is required' });
    }
    const {userData, token} = await googleLogin(code);
     res.cookie('token', token, {
       httpOnly: true, 
       secure: process.env.NODE_ENV === 'production',
       sameSite: 'strict', 
       maxAge,
     });
    res.status(200).json({ status: true, msg: 'User logged in successfully', data:userData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, msg: error.message || 'Something went wrong' });
  }
};

// 5) logoutHandler: Logs out a user by clearing the token cookie.
export const logoutHandler = (req: Request, res: Response): Response => {
  try {
    // Clear the token cookie
    res.clearCookie('token', {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.status(200).json({ status: true, msg: 'User logged out successfully' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ status: false, msg: err.message || 'Server error' });
  }
};
