import nodemailer from "nodemailer";
import { email, password } from "./constant.js";

// Transporter information setup
const transporterInfo = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: email,
    pass: password,
  },
};

// Function to send email
export const sendEmail = async (mailInfo) => {
  try {
    const transporter = nodemailer.createTransport(transporterInfo);
    const info = await transporter.sendMail(mailInfo);
    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error occurred while sending email:", error.message);
    throw error; // Re-throw error to handle it in the calling function
  }
};
