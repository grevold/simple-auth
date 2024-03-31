import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { IProduct } from "../../../../types";
import s from "./CartItem.module.css";
interface Props {
  product: IProduct;
}

export const CartItem = ({ product }: Props) => {
  return (
    <div className={s.root}>
      <h2>{product.title}</h2>
      <img src={product.img} className={s.image}></img>
      <span>{product.price}$</span>
      <button>Удалить</button>
    </div>
  );
};
