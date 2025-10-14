import express from "express";
import { authRoute } from "./authRoute";
import { projectRoute } from "./projectRoute";
export const routes = express.Router();

routes.use("/auth", authRoute);
routes.use('/project', projectRoute);
