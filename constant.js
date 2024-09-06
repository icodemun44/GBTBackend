import { config } from "dotenv";

config();

export const email = process.env.EMAIL;
export const password = process.env.PASSWORD;