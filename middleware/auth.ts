import { Request, NextFunction, Response } from "express";
import UserSchema, { IUser } from "../models/user";
import decode from "jwt-decode";

export interface CustomRequest extends Request {
  user: IUser;
}

interface Token {
  user_id: string;
}

const auth: any = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      const decodedData = decode<Token>(token);

      const uid = decodedData?.user_id;
      const user = await UserSchema.findById(uid);
      if (!user) return res.status(401).json({ message: "UnAuthorized" });
      req.user = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid,
      };
      next();
    } else {
      return res.status(401).json({ message: "UnAuthorized" });
    }
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "UnAuthorized" });
  }
};

export default auth;
