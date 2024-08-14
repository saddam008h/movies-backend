import mongoose, { Document, model } from 'mongoose';
import { IUser } from './User';

export interface IToken extends Document {
  token: string;
  userId: IUser['_id'];
}

const TokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<IToken>('Token', TokenSchema);
