import { createContext, useContext } from "react";

type CartItem = {
  id: string;
  userId: string;
  bookId: string;
};

type CartContextProps = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
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
