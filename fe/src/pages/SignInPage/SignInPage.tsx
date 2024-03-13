import s from "./SignInPage.module.css";

import { Typography } from "antd";

import { actions } from "../../store/slices/userSlice";

import { useAppDispatch } from "../../store/store";
import { IUserCredentials } from "../../types";
import { SignInForm } from "../../components/SignInForm/SignInForm";
import { signInThunk } from "../../store/slices/thunks/signInThunk";

import { useErrorNotification } from "../../hooks/useErrorNotification";

const { Title } = Typography;

export const SignInPage = () => {
  const dispatch = useAppDispatch();
  const errorNotification = useErrorNotification("Возникла ошибка при входе");

  const handleSubmit = (userCredentials: IUserCredentials) => {
    dispatch(signInThunk(userCredentials)).unwrap().catch(errorNotification);
    dispatch(actions.setLoading());
  };

  return (
    <div className={s.root}>
      <Title>Войти</Title>
      <SignInForm onSubmit={handleSubmit} />
    </div>
  );
};
