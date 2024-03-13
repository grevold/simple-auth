import { EErrorCodes } from "./appConstants";

export const ErrorsDescription: Record<EErrorCodes, string> = {
  InvalidData: "Невалидные данные",
  InvalidEmailOrPassword: "Невалидные email или пароль",
  DataBaseError: "Ошибка базы данных",
  AlreadyRegisteredUser: "Юзер с таким логином уже зарегистрирован",
  ErrorVerifyUserEmail:
    "Не удалось проверить имеется ли уже юзер с таким email",
};
