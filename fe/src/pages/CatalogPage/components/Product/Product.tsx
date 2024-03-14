import { Button } from "antd";
import { IProduct } from "../../../../types";
import s from "./Product.module.css";

interface Props {
  productData: IProduct;
}

export const Product = ({ productData }: Props) => {
  return (
    <div className={s.root}>
      <h2>{productData.title}</h2>
      <img src={productData.img} className={s.image} />
      <div className={s.description}>
        <h2>Price: {productData.price}$</h2>
      </div>
      <Button>В корзину</Button>
    </div>
  );
};
