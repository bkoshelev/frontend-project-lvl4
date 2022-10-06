import { Outlet } from "react-router-dom";

import { Header } from "./Header";

export const Root = () => {
  return (
    <div className="vh-100 d-flex flex-column">
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
};
