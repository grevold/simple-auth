import s from "./SignInPage.module.css";

import { Typography } from "antd";

import { actions } from "../../store/slices/userSlice";

import { useAppDispatch } from "../../store/store";
import { IUserCredentials } from "../../types";
import { SignInForm } from "../../components/SignInForm/SignInForm";
import { signInThunk } from "../../store/slices/thunks/signInThunk";
import { useNotification } from "../../hooks/useNotification";

const { Title } = Typography;

export const SignInPage = () => {
  const dispatch = useAppDispatch();
  const notification = useNotification();

  const handleSubmit = (userCredentials: IUserCredentials) => {
    dispatch(signInThunk(userCredentials))
      .unwrap()
      .catch((error) => {
        notification.error({
          message: "Возникла ошибка при входе",
          description: JSON.stringify(error),
        });
      });
    dispatch(actions.setLoading());
  };

  return (
    <div className={s.root}>
      <Title>Войти</Title>
      <SignInForm onSubmit={handleSubmit} />
    </div>
  );
};
