import { SignUpForm } from "../../components/SignUpForm/SignUpForm";
import { Typography } from "antd";

import s from "./SignUpPage.module.css";

import { actions } from "../../store/slices/userSlice";

import { useAppDispatch } from "../../store/store";
import { IUserCredentials } from "../../types";
import { signUpThunk } from "../../store/slices/thunks/signUpThunk";
import { useNotification } from "../../hooks/useNotification";

const { Title } = Typography;

export const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const notification = useNotification();

  const handleSubmit = (userCredentials: IUserCredentials) => {
    dispatch(signUpThunk(userCredentials))
      .unwrap()
      .catch((error) => {
        notification.error({
          message: "Возникла ошибка при регистрации",
          description: JSON.stringify(error),
        });
      });
    dispatch(actions.setLoading());
  };

  return (
    <div className={s.root}>
      <Title>Зарегистрироваться</Title>
      <SignUpForm onSubmit={handleSubmit} />
    </div>
  );
};
