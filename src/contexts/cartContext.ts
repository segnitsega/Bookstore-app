import { createContext, useContext } from "react";

export type CartLine = {
  id: string;
  userId?: string;
  bookId?: string;
  book: {
    imageUrl: string;
    title: string;
    price: number;
    author: string;
    description: string;
  };
};

type CartContextProps = {
  cartItems: CartLine[];
  addToCart: (item: CartLine) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getCartCount: () => number;
  reloadCartItems: boolean;
  setReloadCartItems: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CartContext = createContext<CartContextProps | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
