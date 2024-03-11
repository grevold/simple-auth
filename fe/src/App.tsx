import { HashRouter, Route, Routes } from "react-router-dom";
import { RoutePath } from "./types";

import { useAppSelector } from "./store/store";
import { useAuth } from "./hooks/useAuth";
import { SignInPage } from "./pages/SignInPage/SignInPage";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";
import { Layout } from "./components/Layout/Layout";
import { PreloaderPage } from "./pages/PreloaderPage/PreloaderPage";

function App() {
  useAuth();
  const userStatus = useAppSelector((store) => store.user.status);

  switch (userStatus) {
    case "guest":
      return (
        <HashRouter>
          <Layout>
            <Routes>
              <Route element={<SignInPage />} path={RoutePath.SignIn}></Route>
              <Route element={<SignUpPage />} path={"*"}></Route>
            </Routes>
          </Layout>
        </HashRouter>
      );

    case "success":
      return (
        <Layout>
          <h1>Страница с товарами</h1>
        </Layout>
      );

    case "loading":
      return <PreloaderPage />;
  }
}

export default App;
