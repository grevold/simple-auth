import axios from "axios";
import { EErrorCodes, dbUrl } from "../appConstants";
import { Request, Response } from "express";
import z from "zod";

const ProductSchema = z.object({
  title: z.string(),
  price: z.number(),
  description: z.string(),
  img: z.string(),
  id: z.string(),
});

const arrayOfProductsIdsSchema = z.object({
  ids: z.array(z.string()),
});

export type TProduct = z.infer<typeof ProductSchema>;

class ProductsController {
  // res - это объект, который позволяет отвечать (при помощи метода .status и .json) фронту на его запрос
  public async createProduct(req: Request, res: Response) {
    const parse = ProductSchema.safeParse(req.body);

    if (!parse.success) {
      return res.status(400).json({
        message: "Невалидные данные",
        errorCode: EErrorCodes.InvalidData,
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
        errorCode: EErrorCodes.DataBaseError,
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
        errorCode: EErrorCodes.DataBaseError,
      });
    }
  }

  public async getProductsByIds(req: Request, res: Response) {
    const parse = arrayOfProductsIdsSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({
        message: "Невалидные данные",
        errorCode: EErrorCodes.InvalidData,
      });
    }
    const productsIds = parse.data.ids;
    try {
      const products = (await axios.get<TProduct[]>(`${dbUrl}products`)).data;
      const result = products.filter(({ id }) => productsIds.includes(id));
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        message: "Произошла ошибка при взаимодействии с базой данных",
        errorCode: EErrorCodes.DataBaseError,
      });
    }
  }
}
export const productsController = new ProductsController();
