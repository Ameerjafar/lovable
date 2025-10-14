import express from "express";
import { signupController, loginController } from "../controllers/authController";
export const authRoute = express.Router();

authRoute.post("/signup", signupController);
authRoute.post('/login', loginController);
