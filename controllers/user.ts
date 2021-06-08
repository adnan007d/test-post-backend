import { Handler, Request, Response } from "express";
import User from "../models/user";

const createUser: Handler = async (req: Request, res: Response) => {
  const user = req.body;

  const alreadyAUser = await User.findById(user.uid);
  if (alreadyAUser) return res.status(200).json({ message: "Already created" });
  const newUser = new User({ ...user, _id: user.uid });

  try {
    await newUser.save();
    return res.status(200).json({ message: "Created new user" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong!!" });
  }
};

export { createUser };
