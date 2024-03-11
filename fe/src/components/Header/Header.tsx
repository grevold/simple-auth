import { ReactElement, useMemo } from "react";
import { Badge, Menu } from "antd";
import { useNavigate } from "react-router-dom";

import { actions } from "../../store/slices/userSlice";
import {
  UserAddOutlined,
  LoginOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/store";
import z from "zod";
import { RoutePath } from "../../types";
import { Link } from "react-router-dom";

const MenuKeysSchema = z.union([
  z.literal("sign-up"),
  z.literal("sign-in"),
  z.literal("main"),
  z.literal("cart"),
  z.literal("logout"),
]);

type TMenuItemKey = z.infer<typeof MenuKeysSchema>;

interface IMenuItem {
  label: string;
  key: TMenuItemKey;
  icon?: ReactElement;
}

interface IMenuItemClickEvent {
  key: string;
}

export const Header = () => {
  const userStatus = useAppSelector((store) => store.user.status);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleMenuItemClick = ({ key }: IMenuItemClickEvent) => {
    const parse = MenuKeysSchema.safeParse(key);
    if (!parse.success) return;
    const currentKey = parse.data;

    switch (currentKey) {
      case "logout": {
        dispatch(actions.logOut());
        return;
      }
      case "sign-up": {
        navigate(RoutePath.SignUp);
        return;
      }
      case "sign-in": {
        navigate(RoutePath.SignIn);
        return;
      }
    }
  };

  const items = useMemo(() => {
    switch (userStatus) {
      case "guest": {
        const items: IMenuItem[] = [
          {
            label: "Зарегистрироваться",
            key: "sign-up",
            icon: <UserAddOutlined />,
          },
          {
            label: "Войти",
            key: "sign-in",
            icon: <LoginOutlined />,
          },
        ];

        return items;
      }

      case "success": {
        const items: IMenuItem[] = [
          {
            label: "Выйти",
            key: "logout",
            icon: <LogoutOutlined />,
          },
        ];

        return items;
      }

      default: {
        const items: IMenuItem[] = [];

        return items;
      }
    }
  }, [userStatus]);

  return (
    <Menu
      onClick={handleMenuItemClick}
      selectedKeys={["main"]}
      mode="horizontal"
      items={items}
    />
  );
};
