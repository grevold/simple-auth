import { Spin } from "antd";

import s from "./PreloaderPage.module.css";

export const PreloaderPage = () => {
  return (
    <div className={s.root}>
      <Spin />
    </div>
  );
};
