import React, { FC } from "react";
import { Button, Form, Input } from "antd";

interface UserSignUpCredentials {
  email: string;
  password: string;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

interface IProps {
  onSubmit: (userSignUpCredentials: UserSignUpCredentials) => void;
}

export const SignInForm: FC<IProps> = ({ onSubmit }) => {
  const [form] = Form.useForm<UserSignUpCredentials>();

  return (
    <Form
      {...formItemLayout}
      form={form}
      onFinish={onSubmit}
      style={{ maxWidth: "600px" }}
    >
      <Form.Item
        name="email"
        label="Почта"
        rules={[
          {
            type: "email",
            message: "Невалидная почта!",
          },
          {
            required: true,
            message: "Пожалуйста, введите почту!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Пароль"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите пароль!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};
