import Title from "antd/es/typography/Title";
import { CartList } from "./components/CartList/CartList";
import { useAppSelector } from "../../store/store";

export const CartPage = () => {
  
  return (
    <div>
      <Title>Корзина</Title>
      <CartList />
    </div>
  );
};
