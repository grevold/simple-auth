import axios from "axios";
import { dbUrl } from "../appConstants";
import { Request, Response } from "express";
import z from "zod";

const ProductSchema = z.object({
  title: z.string(),
  price: z.number(),
  description: z.string(),
  img: z.string(),
});

class ProductsController {
  // res - это объект, который позволяет отвечать (при помощи метода .status и .json) фронту на его запрос
  public async createProduct(req: Request, res: Response) {
    const parse = ProductSchema.safeParse(req.body);

    if (!parse.success) {
      return res.status(400).json({
        message: "Невалидные данные",
      });
    }

    const product = parse.data;
    try {
      await axios.post(`${dbUrl}products`, product, {
        headers: {
          ["Content-Type"]: "application/json",
        },
      });
      return res.status(200).json({});
    } catch (error) {
      return res.status(500).json({
        message: "Произошла ошибка при взаимодействии с базой данных",
        error,
      });
    }
  }

  public async getProducts(req: Request, res: Response) {
    try {
      const products = (await axios.get(`${dbUrl}products`)).data;
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({
        message: "Произошла ошибка при взаимодействии с базой данных",
        error,
      });
    }
  }
}
export const productsController = new ProductsController();
