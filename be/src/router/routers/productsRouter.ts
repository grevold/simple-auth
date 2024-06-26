import express from "express";
import { productsController } from "../../controllers/productsController";

export const productsRouter = express.Router();

productsRouter.post("/create", (req, res) =>
  productsController.createProduct(req, res)
);
productsRouter.get("/", (req, res) => productsController.getProducts(req, res));
productsRouter.get("/get-products-by-ids", (req, res) => productsController.getProductsByIds(req, res));
