import { useEffect } from "react";

import { productsThunk } from "../../store/slices/ProductsSlice/thunks/productsThunk";
import { PreloaderPage } from "../PreloaderPage/PreloaderPage";

import s from "./CatalogPage.module.css";
import { Product } from "./components/Product/Product";
import Title from "antd/es/typography/Title";
import { useAppDispatch, useAppSelector } from "../../store/store";

export const CatalogPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, data } = useAppSelector((store) => store.products);
  useEffect(() => {
    dispatch(productsThunk());
  }, [dispatch]);
  if (isLoading) {
    return <PreloaderPage />;
  }
  return (
    <div className={s.root}>
      <Title>Каталог</Title>
      <div className={s.containerProduct}>
        {data.map((product) => (
          <Product productData={product} key={product.title} />
        ))}
      </div>
    </div>
  );
};
