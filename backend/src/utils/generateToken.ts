import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { Response } from "express";
export const generateToken = (res: Response, user: User, message: string) => {
  if (typeof process.env.SECRET_KEY == "undefined") {
    return;
  }
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "10d",
  });
  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      message,
      user,
    });
};
