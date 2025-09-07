import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signToken = (payload, expiresIn = process.env.JWT_EXPIRES || "7d") =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });

export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
