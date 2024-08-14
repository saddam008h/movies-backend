import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  profileImage?: string;
  verified?: boolean;
}

const UserSchema = new Schema<IUser>({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

export default model<IUser>('User', UserSchema);

