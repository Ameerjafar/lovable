import { Request, Response } from "express";

import { prisma } from "@repo/db";
import z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signupValidateObject = z.object({
  email: z.email(),
  password: z.string().min(6),
});
export const signupController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const parseObject = signupValidateObject.safeParse({
      email: email as string,
      password: password as string,
    });
    if (!parseObject) {
      return res
        .status(400)
        .json({ message: "you are not met the signup constraits" });
    }
    const updatedAt = new Date();
    const hashedPassword: string = await bcrypt.hash(password, 10);
    const creatUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        updatedAt,
      },
    });
    return res.status(200).json({ message: creatUser });
  } catch (error: unknown) {
    console.log(error);
    return res.status(411).json({ error });
  }
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const parseObject = signupValidateObject.safeParse({
      email: email as string,
      password: password as string,
    });
    if (!parseObject) {
      return res
        .status(400)
        .json({ message: "you are not met the signup constraits" });
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    
    if (!user) {
      return res.status(401).json({ message: "we cannot find the user in db" });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(401).json({ message: "password is not match" });
    }
    const userPayload = {
      userId: user.id,
      userEmail: user.email,
    };
    const token = jwt.sign(userPayload, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    return res.status(200).json({ token });
  } catch (error: unknown) {
    console.log(error);
    return res.status(411).json({ error });
  }
};
