import { Button } from "antd";
import { IProduct } from "../../../../types";
import s from "./Product.module.css";
import { useAppDispatch } from "../../../../store/store";
import { actions } from "../../../../store/slices/UserSlice/userSlice";
import { addProductToCart } from "../../../../store/slices/UserSlice/thunks/addProductToCart";

interface Props {
  productData: IProduct;
}

export const Product = ({ productData }: Props) => {
  const dispatch = useAppDispatch();

  const handleSubmit = (title: string) => {
    dispatch(addProductToCart(title)).unwrap().catch();
  };

  return (
    <div className={s.root}>
      <h2>{productData.title}</h2>
      <img src={productData.img} className={s.image} />
      <div className={s.description}>
        <h2>Price: {productData.price}$</h2>
      </div>
      <Button onClick={() => handleSubmit(productData.title)}>В корзину</Button>
    </div>
  );
};
