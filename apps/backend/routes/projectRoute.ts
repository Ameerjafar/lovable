import { prisma } from "@repo/db";
import express, { Request, Response } from "express";

export const projectRoute = express.Router();

projectRoute.get("/", async (req: Request, res: Response) => {
  const { projectId } = req.query;
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId as string,
      },
    });
    if (!project) {
      return res
        .status(400)
        .json({ message: "I cannot find the project in db" });
    }
    return res.status(200).json({ project });
  } catch (error: unknown) {
    return res.status(400).json({ error });
  }
});

projectRoute.get("/allprojects", async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const user = await prisma.user.findUnique({
      where: {
        id: userId as string,
      },
      include: {
        projects: true,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "user not found in the db" });
    }
    return res.status(200).json({ projects: user.projects });
  } catch (error: unknown) {
    return res.status(200).json({ error });
  }
});

projectRoute.post("/converstaion", async (req: Request, res: Response) => {
  const { projectId } = req.query;
  try {
    if (!projectId) {
      return res.status(400).json({ message: "projectId is not found" });
    }
    const project = await prisma.project.findMany({
      where: {
        id: projectId as string,
      },
    });
    if (!project) {
      return res.status(400).json({ message: "project is not found in db" });
    }
    const conversationHistory = await prisma.converstationHistory.findMany({
      where: {
        projectId: projectId as string,
      },
    });
    return res.status(200).json({ conversationHistory });
  } catch (error: unknown) {
    return res.status(400).json({ error });
  }
});
