import { body, param } from "express-validator";

export const registerValidator = [
  body("username").trim().notEmpty().withMessage("Username required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password").isLength({ min: 6 }).withMessage("Min 6 chars password")
];

export const loginValidator = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("Password required")
];

export const postCreateValidator = [
  body("title").trim().notEmpty().withMessage("Title required"),
  body("content").optional().isString()
];

export const commentValidator = [
  param("id").isMongoId(),
  body("text").trim().notEmpty()
];

export const messageValidator = [
  body("to").isMongoId().withMessage("Recipient required"),
  body("text").trim().notEmpty().withMessage("Message text required")
];
