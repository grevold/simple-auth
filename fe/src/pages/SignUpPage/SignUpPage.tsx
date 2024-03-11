import useNotification from "antd/es/notification/useNotification";
import { SignUpForm } from "../../components/SignUpForm/SignUpForm";
import { Divider, Typography } from 'antd';

import s from "./SignUpPage.module.css";

import { actions } from "../../store/slices/userSlice";

import { useAppDispatch } from "../../store/store";
import { IUserCredentials } from "../../types";
import { signUpThunk } from "../../store/slices/thunks/signUpThunk";

const { Title, Paragraph, Text, Link } = Typography;

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
    <div className={s.root}>
      <Title>Зарегистрироваться</Title>
      {notificationContext}
      <SignUpForm onSubmit={handleSubmit} />
    </div>
  );
};
