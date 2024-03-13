import { HashRouter, Route, Routes } from "react-router-dom";
import { RoutePath } from "./types";

import { useAppSelector } from "./store/store";
import { useAuth } from "./hooks/useAuth";
import { SignInPage } from "./pages/SignInPage/SignInPage";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";
import { Layout } from "./components/Layout/Layout";
import { PreloaderPage } from "./pages/PreloaderPage/PreloaderPage";
import useNotification from "antd/es/notification/useNotification";
import { NotificationInstance } from "antd/es/notification/interface";
import { createContext } from "react";
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";

export const NotificationContext = createContext<NotificationInstance>(
  {} as NotificationInstance
);

function App() {
  useAuth();
  const userStatus = useAppSelector((store) => store.user.status);

  const [notification, notificationContext] = useNotification();

  return (
    <>
      <NotificationContext.Provider value={notification}>
        <HashRouter>
          <Layout>
            <Routes>
              {userStatus === "guest" && (
                <>
                  <Route
                    element={<CatalogPage />}
                    path={RoutePath.CatalogPage}
                  />
                  <Route element={<SignUpPage />} path={RoutePath.SignUp} />
                  <Route element={<SignInPage />} path={"*"} />
                </>
              )}

              {userStatus === "success" && (
                <>
                  <Route
                    element={<CatalogPage />}
                    path={RoutePath.CatalogPage}
                  />
                </>
              )}

              {userStatus === "loading" && (
                <>
                  <Route element={<PreloaderPage />} path={"*"} />
                </>
              )}
            </Routes>
          </Layout>
        </HashRouter>
      </NotificationContext.Provider>

      {notificationContext}
    </>
  );
}

export default App;
