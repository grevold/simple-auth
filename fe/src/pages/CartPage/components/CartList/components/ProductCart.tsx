import { IProduct } from "../../../../../types";

import s from "./ProductCart.module.css";

interface Props {
  product: IProduct;
}

export const ProductCart = ({ product }: Props) => {
  return (
    <li className={s.root} key={product.title}>
      <h2>{product.title}</h2>
    </li>
  );
};
