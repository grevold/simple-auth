import { ReactElement, useMemo } from "react";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";


import {
  UserAddOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/store";
import z from "zod";
import { RoutePath } from "../../types";
import { actions } from "../../store/slices/UserSlice/userSlice";

const MenuKeysSchema = z.union([z.nativeEnum(RoutePath), z.literal("logout")]);

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
  const location = useLocation();

  const handleMenuItemClick = ({ key }: IMenuItemClickEvent) => {
    const parse = MenuKeysSchema.safeParse(key);
    if (!parse.success) return;
    const currentKey = parse.data;

    switch (currentKey) {
      case "logout": {
        dispatch(actions.logOut());
        return;
      }
      default: {
        navigate(currentKey);
      }
    }
  };

  const items = useMemo(() => {
    switch (userStatus) {
      case "guest": {
        const items: IMenuItem[] = [
          {
            label: "Зарегистрироваться",
            key: RoutePath.SignUp,
            icon: <UserAddOutlined />,
          },
          {
            label: "Войти",
            key: RoutePath.SignIn,
            icon: <LoginOutlined />,
          },
          {
            label: "Каталог",
            key: RoutePath.CatalogPage,
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
          {
            label: "Каталог",
            key: RoutePath.CatalogPage,
          },
          {
            label: "Корзина",
            key: RoutePath.CartPage,
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
      selectedKeys={[location.pathname]}
      mode="horizontal"
      items={items}
    />
  );
};
