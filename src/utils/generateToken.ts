import jwt from 'jsonwebtoken';

interface Idata {
  _id: any; // Use ObjectId here
  email: string;
}

export const generateToken = (data: Idata) => {
  return jwt.sign(data, process.env.JWTPRIVATEKEY);
};
