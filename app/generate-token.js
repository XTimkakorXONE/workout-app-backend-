import jwt from "jsonwebtoken";

export const generateToken = (userId) =>
  jwt.sign(
    {
      userId,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "10d",
    }
  );
