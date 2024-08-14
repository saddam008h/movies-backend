import { Schema, model, Document } from 'mongoose';
import { IUser } from './User';

export interface IMovie {
  title: string;
  description: string;
  releaseDate?: string;
  runtime?: number;
  budget?: number;
  revenue?: number;
  posterUrl: string;
  backdropUrl: string;
  videoUrl: string;
  genres: string[];
  _id?: Schema.Types.ObjectId;
  user?: IUser['_id'];
}

const MovieSchema = new Schema<IMovie>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },

  genres: {
    type: [String],
    validate: (v: string) => Array.isArray(v) && v.length > 0,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },

  posterUrl: {
    type: String,
    required: true,
  },

  backdropUrl: {
    type: String,
    required: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  releaseDate: {
    type: String,
  },
  runtime: {
    type: Number,
  },
  budget: {
    type: Number,
  },
  revenue: {
    type: Number,
  },
});

export default model<IMovie>('Movie', MovieSchema);
