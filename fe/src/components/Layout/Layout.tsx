import { Header } from "../Header/Header";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <center style={{ marginTop: "16px" }}>{children}</center>
    </>
  );
};
