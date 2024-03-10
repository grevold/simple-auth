import express from "express";
import { userController } from "../../controllers/userController";

export const userRouter = express.Router();

userRouter.post("/sign-up", (req, res) => userController.signUp(req, res));
userRouter.post("/sign-in", (req, res) => userController.signIn(req, res));
