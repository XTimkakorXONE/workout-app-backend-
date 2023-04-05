import { prisma } from "../prisma.js";
import asyncHandler from "express-async-handler";
import { faker } from "@faker-js/faker";
import { hash, verify } from "argon2";
import { generateToken } from "../generate-token.js";
import { UserFields } from "../utils/user.utils.js";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const isValidPassword = await verify(user.password, password);

  if (user && isValidPassword) {
    const token = generateToken(user.id);
    res.json({ ...user, token });
  } else {
    res.status(401);
    throw new Error("Неверная почта или пароль");
  }
});

export const register = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const isHaveUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isHaveUser) {
    res.status(401);
    throw new Error("Пользователь с такой почтой уже существует");
  }

  const user = await prisma.user.create({
    data: {
      email,
      password: await hash(req.body.password),
      name: faker.name.fullName(),
    },
    select: UserFields,
  });

  const token = generateToken(user.id);

  res.json({ ...user, token });
});
