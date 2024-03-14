import { z } from "zod";
import { EErrorCodes } from "./appConstants";

export enum RoutePath {
  SignIn = "/signIn",
  SignUp = "/signUp",
  CatalogPage = "/catalogPage",
}

export interface IUserCredentials {
  email: string;
  password: string;
}

export const ErrorSchema = z.object({
  errorCode: z.nativeEnum(EErrorCodes),
  message: z.string().optional(),
});

export interface IProduct {
  title: string;
  price: number;
  description: string;
  img: string;
}
