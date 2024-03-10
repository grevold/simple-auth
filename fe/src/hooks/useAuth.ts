// Данный хук следит за изменением jwt-токена в localstorage и в зависимости от его изменений
// актуализирует state юзера в redux

import { useEffect } from "react";
import { jwtLocalStorageKey } from "../appConstants";
import { useAppDispatch } from "../store/store";
import { actions } from "../store/slices/userSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkJwt = () => {
      const jwtFromLocalStorage = localStorage.getItem(jwtLocalStorageKey);
      if (jwtFromLocalStorage) {
        dispatch(actions.logIn());
      } else {
        dispatch(actions.logOut());
      }
    };
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== jwtLocalStorageKey) return;
      checkJwt();
    };

    window.addEventListener("storage", handleStorageChange);
    checkJwt();

    return () => window.removeEventListener("storage", handleStorageChange);
  }, [dispatch]);
};
