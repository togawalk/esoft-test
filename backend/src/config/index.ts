import dotenv from "dotenv";
dotenv.config({ path: [".env.local", ".env"] });

export const config = {
  jwt: {
    secret: process.env.JWT_SECRET || "JWT_SECRET",
  },
};
