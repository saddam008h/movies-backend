import { Schema, model, Document } from 'mongoose';
import { IUser } from './User';
// import { IMovie } from 'types/allTypes';
import { IMovie } from './Movie';

export interface IReview extends Document {
  text: string;
  rating: number;
  user: IUser['_id'];
  movie: IMovie['_id'];
}

const ReviewSchema = new Schema<IReview>({
  text: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
});

export default model<IReview>('Review', ReviewSchema);
