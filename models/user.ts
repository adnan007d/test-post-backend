import mongoose, { model, Schema } from "mongoose";

export interface IUserDoc extends Document, IUser {}

export interface IUser {
  displayName: string;
  email: string;
  uid: string;
  photoURL: string;
  idToken?: string;
}

const UserSchema: Schema = new Schema(
  {
    _id: String,
    displayName: String,
    photoURL: String,
    email: String,
    uid: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUserDoc>("Users", UserSchema);
