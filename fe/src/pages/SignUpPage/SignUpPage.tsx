import useNotification from "antd/es/notification/useNotification";
import { SignUpForm } from "../../components/SignUpForm/SignUpForm";

import { actions } from "../../store/slices/userSlice";

import { useAppDispatch } from "../../store/store";
import { IUserCredentials } from "../../types";
import { signUpThunk } from "../../store/slices/thunks/signUpThunk";

export const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const [notificationApi, notificationContext] = useNotification();

  const handleSubmit = (userCredentials: IUserCredentials) => {
    dispatch(signUpThunk(userCredentials))
      .unwrap()
      .catch((error) => {
        notificationApi.error({
          message: "Возникла ошибка при регистрации",
          description: JSON.stringify(error),
        });
      });
    dispatch(actions.setLoading());
  };

  return (
    <>
      {notificationContext}
      <SignUpForm onSubmit={handleSubmit} />
    </>
  );
};
