import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma.js";
import { UserFields } from "../utils/user.utils.js";

export const checkAuth = asyncHandler(async (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      const userFound = await prisma.user.findUnique({
        where: {
          id: decoded.userId,
        },
        select: UserFields,
      });

      if (userFound) {
        req.user = userFound;
        next();
      } else {
        res.status(401);
        throw new Error("Не удалось получить токен");
      }
    } catch (err) {
      console.warn(err);
      res.json({
        message: "Нет доступа",
      });
    }
  }
});
