import { Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";

export const signUpController = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });

  if (user) {
    throw Error("User already exists");
  }

  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
    },
  });

  res.json(user);
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });

  if (!user) {
    throw Error("User does not exists");
  }
  if (!compareSync(password, user.password)) {
    throw Error("Password is incorrect");
  }
  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET
  );

  res.json({ user, token });
};
