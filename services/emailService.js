import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT || 587),
  secure: false,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

export const sendEmail = async ({ to, subject, html, text }) => {
  const info = await transporter.sendMail({
    from: `"MERN App" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html
  });
  return info;
};
