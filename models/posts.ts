import { IUser } from "./user";
import mongoose, { Document, Schema } from "mongoose";

export interface IPostDoc extends Document, IPost {}

export interface IPost {
  id?: string | any;
  title: string;
  description: string;
  likes?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  user?: IUser;
}

const PostSchema: Schema = new Schema(
  {
    title: {
      required: true,
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    likes: {
      type: [],
      default: [],
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    user: {
      displayName: String,
      email: String,
      uid: String,
      photoURL: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPostDoc>("posts", PostSchema);
