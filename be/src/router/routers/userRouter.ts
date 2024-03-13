import express from "express";
import { userController } from "../../controllers/userController";
import { productsController } from "controllers/productsController";

export const userRouter = express.Router();
export const productsRouter = express.Router();

userRouter.post("/sign-up", (req, res) => userController.signUp(req, res));
userRouter.post("/sign-in", (req, res) => userController.signIn(req, res));
