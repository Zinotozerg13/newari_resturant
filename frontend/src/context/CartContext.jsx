import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
 const [cart, setCart] = useState([]);

  const navigate = useNavigate();
  const addToCart = (item) => {

    const token=localStorage.getItem("token");
     if(!token){
     navigate('/login');
     }
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.foodid === item.foodid);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.foodid === item.foodid
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (itemfoodid, newQuantity) => {
    if (newQuantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.foodid !== itemfoodid));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.foodid === itemfoodid ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  const placeOrder = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
      return;
    }
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate('/order');
  }
  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, getCartTotal, getCartItemCount ,placeOrder}}>
      {children}
    </CartContext.Provider>
  );
};
