import z from "zod";
import { Request, Response } from "express";
import axios from "axios";
import { dbUrl } from "../appConstants";
import jwt from "jsonwebtoken";

const jwtSecret = "maestro";

const UserCredentialsSchema = z.object({
  login: z.string(),
  password: z.string(),
});

type TUserCredentials = z.infer<typeof UserCredentialsSchema>;

class UserController {
  public async signUp(req: Request, res: Response) {
    const parse = UserCredentialsSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({
        message: "Невалидные данные",
      });
    }
    const { login, password } = parse.data;
    try {
      const isUserAlreadyExists = (
        await axios.get<TUserCredentials[]>(`${dbUrl}users`)
      ).data.some((user) => user.login === login);
      if (isUserAlreadyExists) {
        return res
          .status(403)
          .json({ message: "Юзер с таким логином уже зарегистрирован" });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Не удалось проверить имеется ли уже юзер с таким логином",
        error,
      });
    }

    try {
      await axios.post(
        `${dbUrl}users`,
        { login, password },
        {
          headers: {
            ["Content-Type"]: "application/json",
          },
        }
      );

      const jwtToken = this.generateJWT({ login, password });

      return res.status(200).json(jwtToken);
    } catch (error) {
      return res.status(500).json({
        message: "Произошла ошибка при взаимодействии с базой данных",
        error,
      });
    }
  }
  public async signIn(req: Request, res: Response) {
    const parse = UserCredentialsSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({
        message: "Невалидные данные",
      });
    }
    const { login, password } = parse.data;

    try {
      const areCredentialsValid = (
        await axios.get<TUserCredentials[]>(`${dbUrl}users`)
      ).data.some((user) => user.login === login && user.password === password);
      if (areCredentialsValid) {
        const jwtToken = this.generateJWT({ login, password });
        return res.status(200).json(jwtToken);
      } else {
        return res.status(403).json({
          message: "Неверный логин или пароль",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Не удалось проверить данные юзера",
        error,
      });
    }
  }
  private generateJWT(userCredentials: TUserCredentials) {
    return jwt.sign(userCredentials, jwtSecret, {
      // expiresIn: "10h"
    });
  }
  private parseJWT(jsonWebToken: string) {
    let result: TUserCredentials | undefined;
    jwt.verify(jsonWebToken, jwtSecret, (error, decoded) => {
      if (error) return;
      const parse = UserCredentialsSchema.safeParse(decoded);
      if (!parse.success) return;
      result = parse.data;
    });
    return result;
  }
}
export const userController = new UserController();
