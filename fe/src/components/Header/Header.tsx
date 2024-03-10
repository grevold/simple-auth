import { useMemo } from "react";
import { Badge, Menu, MenuProps } from "antd";
import {
  UserAddOutlined,
  LoginOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useAppSelector } from "../../store/store";

export const Header = () => {
  const userStatus = useAppSelector((store) => store.user.status);
  console.log(userStatus);

  const items = useMemo(() => {
    switch (userStatus) {
      case "guest":
        return [
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
      case "success":
        return [
          {
            label: "Товары",
            key: "main",
            icon: <ShoppingOutlined />,
          },
          {
            label: "Корзина",
            key: "cart",
            icon: (
              <Badge count={5} size="small">
                <ShoppingCartOutlined />
              </Badge>
            ),
          },
          {
            label: "Выйти",
            key: "logout",
            icon: <LogoutOutlined />,
          },
        ];
      default:
        return [];
    }
  }, [userStatus]);

  return (
    <Menu
      onClick={console.log}
      selectedKeys={["main"]}
      mode="horizontal"
      items={items}
    />
  );
};
