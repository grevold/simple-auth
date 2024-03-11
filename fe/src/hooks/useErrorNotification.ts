import { ErrorsDescription } from "../texts";
import { ErrorSchema } from "../types";
import { useNotification } from "./useNotification";

export const useErrorNotification = (title: string) => {
  const notification = useNotification();

  const showNotification = (error: any) => {
    const parse = ErrorSchema.safeParse(error);
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
