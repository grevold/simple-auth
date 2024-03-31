import z from "zod";
import { Request, Response } from "express";
import axios from "axios";
import { EErrorCodes, dbUrl } from "../appConstants";
import jwt from "jsonwebtoken";
import { TProduct } from "./productsController";

const jwtSecret = "maestro";

// Айдишник товара
const ProductIdSchema = z.string();

// В таком виде юзер присылает данные, чтобы зарегистрироваться, либо авторизоваться.
const UserCredentialsSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type TUserCredentials = z.infer<typeof UserCredentialsSchema>;

// В таком виде данные юзера хранятся в базе данных.
const UserDataSchema = z.object({
  id: z.string(),
  email: z.string(),
  password: z.string(),
  cart: z.array(ProductIdSchema),
});

type TUserData = z.infer<typeof UserDataSchema>;

// В таком виде данные юзера хранятся в jwt.
const UserDataJwtSchema = z.object({
  id: z.string(),
});

const cartIdsRequestSchema = z.object({
  ids: z.array(z.string()),
});

type TUserDataJwt = z.infer<typeof UserDataJwtSchema>;

// Такой вид имеет тело запроса на добавление товара в корзину юзера
const AddProductToCartRequestSchema = z.object({
  id: ProductIdSchema,
});

const JWTSchema = z.string();

class UserController {
  public async signUp(req: Request, res: Response) {
    const parse = UserCredentialsSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({
        message: "Невалидные данные",
        errorCode: EErrorCodes.InvalidData,
      });
    }
    const { email, password } = parse.data;
    try {
      const isUserAlreadyExists = await this.getUserDataByEmail(email);
      if (isUserAlreadyExists) {
        return res.status(403).json({
          message: "Юзер с таким логином уже зарегистрирован",
          errorCode: EErrorCodes.AlreadyRegisteredUser,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Не удалось проверить имеется ли уже юзер с таким email",
        errorCode: EErrorCodes.ErrorVerifyUserEmail,
      });
    }

    try {
      const userData: Omit<TUserData, "id"> = {
        email,
        password,
        cart: [],
      };

      const id = (
        await axios.post<TUserData>(`${dbUrl}users`, userData, {
          headers: {
            ["Content-Type"]: "application/json",
          },
        })
      ).data.id;

      const jwtToken = this.generateJWT({ id });

      return res.status(200).json(jwtToken);
    } catch (error) {
      return res.status(500).json({
        message: "Произошла ошибка при взаимодействии с базой данных",
        errorCode: EErrorCodes.DataBaseError,
      });
    }
  }

  public async signIn(req: Request, res: Response) {
    const parse = UserCredentialsSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({
        message: "Невалидные данные",
        errorCode: EErrorCodes.InvalidData,
      });
    }

    try {
      const userData = await this.getUserDataByEmail(parse.data.email);
      if (userData) {
        const jwtToken = this.generateJWT(userData);
        return res.status(200).json(jwtToken);
      } else {
        return res.status(403).json({
          message: "Неверный email или пароль",
          errorCode: EErrorCodes.InvalidEmailOrPassword,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Не удалось проверить данные юзера",
        errorCode: EErrorCodes.ErrorVerifyUserEmail,
      });
    }
  }

  public async addProductToCart(req: Request, res: Response) {
    const parse = AddProductToCartRequestSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({
        message: "Невалидные данные",
        errorCode: EErrorCodes.InvalidData,
      });
    }
    const newProductId = parse.data.id;
    const userId = this.getUserIdFromReq(req);

    if (typeof userId !== "string") {
      return res.status(401).json({
        message: `Юзер неавторизован`,
        errorCode: EErrorCodes.InvalidData,
      });
    }

    const userData = await this.getUserDataById(userId);

    if (!userData) {
      return res.status(500).json({
        message: `Не удалось найти юзера по айди`,
        errorCode: EErrorCodes.InvalidData,
      });
    }

    const newUserData: Omit<TUserData, "id"> = {
      ...userData,
      cart: userData.cart.includes(newProductId)
        ? [...userData.cart]
        : [...userData.cart, newProductId],
    };

    try {
      await axios.put(`${dbUrl}users/${userData.id}`, newUserData);

      return res.status(200).json({
        message: "Товар успешно добавлен в корзину",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Не удалось добавить товар в корзину.",
      });
    }
  }

  private generateJWT(userData: TUserDataJwt) {
    return jwt.sign(userData, jwtSecret, {
      expiresIn: "10h",
    });
  }

  private parseJWT(jsonWebToken: string) {
    let result: TUserDataJwt | undefined;
    jwt.verify(jsonWebToken, jwtSecret, (error, decoded) => {
      if (error) return;
      const parse = UserDataJwtSchema.safeParse(decoded);
      if (!parse.success) return;
      result = parse.data;
    });
    return result;
  }

  private async getUserDataByEmail(
    email: string
  ): Promise<TUserData | undefined> {
    const users = (await axios.get<TUserData[]>(`${dbUrl}users`)).data;
    const user = users.find((user) => user.email === email);
    return user;
  }

  private getUserIdFromReq(req: Request) {
    const jwt = req.headers.jwt;
    const userId = typeof jwt === "string" ? this.parseJWT(jwt)?.id : undefined;
    return userId;
  }

  // Приватный метод, который принимает jwt и возвращает массив ids корзины пользователя
  private async getArrayOfIdsUserCartByJWT(jwt: string) {
    const userId = typeof jwt === "string" ? this.parseJWT(jwt)?.id : undefined;
    const users = (await axios.get<TUserData[]>(`${dbUrl}users`)).data;
    return users.find((user) => user.id === userId)?.cart;
  }

  // Приватный метод, который возвращает данные юзера по jwt
  public async getUserDataByJWT(req: Request, res: Response) {
    const userId = this.getUserIdFromReq(req);
    if (!userId) {
      return res.status(401).json({
        message: "Юзер не авторизован",
      });
    }

    try {
      const userData = await this.getUserDataById(userId);
      if (!userData) {
        throw new Error();
      }
      return res.status(200).json(userData);
    } catch (error) {
      return res.status(500).json({
        message: "Не удалось загрузить корзину товаров юзера",
      });
    }
  }

  //  Метод, принимающий jwt и возвращающий массив объектов, которые лежат у юзера в корзине
  public async getUserCartByJWT(req: Request, res: Response) {
    const jwt = req.headers.jwt;
    if (typeof jwt !== "string") {
      return res.status(401).json({
        message: "Юзер не авторизован",
      });
    }
    const products = (await axios.get<TProduct[]>(`${dbUrl}products`)).data;
    const userCart = await this.getArrayOfIdsUserCartByJWT(jwt);
    if (!userCart) {
      return res.status(401).json({
        message: "Юзер не авторизован",
      });
    }
    try {
      const result = products.filter((product) =>
        userCart.includes(product.id)
      );
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        message: "Не удалось загрузить корзину товаров юзера",
      });
    }
  }

  private async getUserDataById(id: string): Promise<TUserData | undefined> {
    const userData = (await axios.get<TUserData>(`${dbUrl}users/${id}`)).data;
    return userData;
  }
}
export const userController = new UserController();
