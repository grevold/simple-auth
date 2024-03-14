import Title from "antd/es/typography/Title";
import { CartList } from "./components/CartList/CartList";

export const CartPage = () => {
  return (
    <div>
      <Title>Корзина</Title>
      <CartList />
    </div>
  );
};
