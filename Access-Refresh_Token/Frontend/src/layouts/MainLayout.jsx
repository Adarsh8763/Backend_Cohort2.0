import React from "react";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <nav>This is nav bar</nav>
      <Outlet />
    </div>
  );
};

export default MainLayout;
