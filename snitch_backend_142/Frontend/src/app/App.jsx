import React, { useEffect } from "react";
import { RouterProvider } from "react-router";
import AppRoutes from "./AppRoutes";
import "./App.css";
import {useAuth} from "../features/auth/hooks/useAuth.jsx";

const App = () => {
  const { handleGetMe } = useAuth();

  useEffect(() => {
    // console.log("heleleo")
    handleGetMe();
  },[]);

  return (
    <>
      <RouterProvider router={AppRoutes} />
    </>
  );
};

export default App;
