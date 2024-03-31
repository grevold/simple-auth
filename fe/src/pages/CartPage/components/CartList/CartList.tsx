import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { CartItem } from "../CartItem/CartItem";
import { getUserCartByJWT } from "../../../../store/slices/UserSlice/thunks/getUserCartByJWT";
import { IProduct } from "../../../../types";

type TState =
  | {
      status: "Loading" | "Error";
    }
  | { status: "Success"; userData: { cart: IProduct[] } };

export const CartList = () => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<TState>({ status: "Loading" });

  useEffect(() => {
    dispatch(getUserCartByJWT())
      .unwrap()
      .then(
        (result) => {
          setState({ status: "Success", userData: { cart: result } });
        },
        (error) => {
          setState({ status: "Error" });
        }
      );
  }, [dispatch]);

  switch (state.status) {
    case "Success": {
      console.log(state.userData);
      return (
        <div>
          {state.userData.cart.length === 0 ? (
            <h2>Товаров в корзине нет</h2>
          ) : (
            state.userData.cart.map((product) => (
              <li key={product.title}>
                <CartItem product={product} />
              </li>
            ))
          )}
        </div>
      );
    }
    case "Error": {
      return <div>Произошла ошибка</div>;
    }
    default: {
      return <div>Загрузка ...</div>;
    }
  }
};
