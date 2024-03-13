import { AxiosError } from "axios";
import { ErrorsDescription } from "../texts";
import { ErrorSchema } from "../types";
import { useNotification } from "./useNotification";

export const useErrorNotification = (title: string) => {
  const notification = useNotification();

  const showNotification = (error: AxiosError) => {
    const parse = ErrorSchema.safeParse(error.response?.data);
    const description = parse.success
      ? ErrorsDescription[parse.data.errorCode]
      : JSON.stringify(error);

    notification.error({
      message: title,
      description,
    });
  };

  return showNotification;
};
