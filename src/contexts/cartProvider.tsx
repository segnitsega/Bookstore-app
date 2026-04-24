import { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { CartContext, type CartLine } from "./cartContext";
import axios from "axios";

function getUserIdFromToken(): string {
  const token = localStorage.getItem("token");
  if (!token) return "";
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return typeof payload?.id === "string" ? payload.id : "";
  } catch {
    return "";
  }
}

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartLine[]>([]);

  const addToCart = (item: CartLine) => {
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

  const url = import.meta.env.VITE_BACKEND_API as string | undefined;

  useEffect(() => {
    const userId = getUserIdFromToken();
    if (!userId || !url) {
      setCartItems([]);
      return;
    }

    async function getCartItems() {
      try {
        const response = await axios.get(`${url}/user/cart/${userId}`);
        setCartItems(response.data.cartItems ?? []);
      } catch {
        setCartItems([]);
      }
    }

    getCartItems();
  }, [reloadCartItems, url]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartCount,
        reloadCartItems,
        setReloadCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
