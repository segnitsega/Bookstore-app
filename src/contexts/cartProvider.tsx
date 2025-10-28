import { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { CartContext } from "./cartContext";
import axios from "axios";

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<any>([]);

  const addToCart = (item: any) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  
  const clearCart = () => setCartItems([]);
  const getCartCount = () => cartItems.length;

  const [reloadCartItems, setReloadCartItems] = useState(false);


  const url = import.meta.env.VITE_BACKEND_API;
  const token = localStorage.getItem("token") as string;
  const userId = JSON.parse(atob(token.split(".")[1])).id;

  useEffect(() => {
    async function getCartItems() {
      console.log("provider ran")
      const endPoint = `/user/cart/${userId}`;
      try {
        const response = await axios(`${url}${endPoint}`);
        setCartItems(response.data.cartItems)
        console.log(response.data.cartItems)
      } catch (err: any) {
        console.log("No books in cart", err);
      }
    }
    getCartItems();
  }, [reloadCartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, getCartCount, reloadCartItems, setReloadCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};
