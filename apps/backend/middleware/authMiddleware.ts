import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  try {
    if (!token) {
      return res.status(400).json({ message: "cannot find your token" });
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET!);
    if (!verifyToken) {
      return res.status(401).json({ message: "your token is invalid" });
    }
    next();
  } catch (error: unknown) {
    return res.status(400).json({ error });
  }
};
