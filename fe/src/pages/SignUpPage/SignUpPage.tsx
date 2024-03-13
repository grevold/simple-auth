import { SignUpForm } from "../../components/SignUpForm/SignUpForm";
import { Typography } from "antd";

import s from "./SignUpPage.module.css";

import { actions } from "../../store/slices/userSlice";

import { useAppDispatch } from "../../store/store";
import { IUserCredentials } from "../../types";
import { signUpThunk } from "../../store/slices/thunks/signUpThunk";
import { useErrorNotification } from "../../hooks/useErrorNotification";

const { Title } = Typography;

export const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const errorNotification = useErrorNotification(
    "Возникла ошибка при регистрации"
  );

  const handleSubmit = (userCredentials: IUserCredentials) => {
    dispatch(signUpThunk(userCredentials)).unwrap().catch(errorNotification);
    dispatch(actions.setLoading());
  };

  return (
    <div className={s.root}>
      <Title>Зарегистрироваться</Title>
      <SignUpForm onSubmit={handleSubmit} />
    </div>
  );
};
