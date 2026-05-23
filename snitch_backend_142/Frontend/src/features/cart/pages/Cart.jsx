import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useCart } from "../hook/useCart";

const Cart = () => {
  const { handleGetCart } = useCart();
  const items = useSelector((state) => state.cart.items);

  useEffect(() => {
    handleGetCart();
  },[]);
  
  return <div></div>;
};

export default Cart;
