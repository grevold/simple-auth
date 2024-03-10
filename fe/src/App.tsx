import { HashRouter, Route, Routes } from "react-router-dom";
import { RoutePath } from "./types";

import { useAppSelector } from "./store/store";
import { useAuth } from "./hooks/useAuth";
import { SignInPage } from "./pages/SignInPage/SignInPage";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";

function App() {
  useAuth();
  const userStatus = useAppSelector((store) => store.user.status);

  switch (userStatus) {
    case "guest":
      return (
        <HashRouter>
          <Routes>
            <Route element={<SignInPage />} path={RoutePath.SignIn}></Route>
            <Route element={<SignUpPage />} path={"*"}></Route>
          </Routes>
        </HashRouter>
      );

    case "success":
      return <h1>Страница с товарами</h1>;

    case "loading":
      return <h1>Загрузка...</h1>;
  }
}

export default App;
