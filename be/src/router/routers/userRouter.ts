import express from "express";
import { userController } from "../../controllers/userController";

export const userRouter = express.Router();

userRouter.post("/sign-up", (req, res) => userController.signUp(req, res));
userRouter.post("/sign-in", (req, res) => userController.signIn(req, res));
userRouter.post("/add-product-to-cart", (req, res) =>
  userController.addProductToCart(req, res)
);
userRouter.get("/get-user-data-by-jwt", (req, res) =>
  userController.getUserDataByJWT(req, res)
);
userRouter.get("/get-user-cart-by-jwt", (req, res) =>
  userController.getUserCartByJWT(req, res)
);
