import express from "express";
import { productsRouter } from "./routers/productsRouter";
import { userRouter } from "./routers/userRouter";

export const router = express.Router();

router.use("/products", productsRouter);
router.use("/user", userRouter);
