import { IProduct } from "../../../../types";
import s from "./Product.module.css";

interface Props {
  productData: IProduct;
}

export const Product = ({ productData }: Props) => {
  return (
    <div className={s.root}>
      <h2>{productData.title}</h2>
    </div>
  );
};
