import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useCart } from "@/contexts/cartContext";

interface CartProp {
  /** Cart row id (used by DELETE /cart/remove/:id), not the book's id */
  cartItemId: string;
  imageUrl: string;
  title: string;
  price: number;
  author: string;
  description: string;
}
const url = import.meta.env.VITE_BACKEND_API;

const CartCard = (book: CartProp) => {
  const [loading, setLoading] = useState(false);
  const { setReloadCartItems, removeFromCart } = useCart();

  const handleBookDelete = async (cartItemId: string) => {
    try {
      setLoading(true);
      const response = await axios.delete(`${url}/cart/remove/${cartItemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        setLoading(false);
        removeFromCart(cartItemId);
        toast("Book removed from cart");
        setReloadCartItems((prev) => !prev);
      }
    } catch (e) {
      setLoading(false);
      toast("Book not removed try again");
      console.log(e);
    }
  };

  return (
    <div className="flex gap-10">
      <div className="flex flex-col ">
        <div className="flex gap-4 rounded-md border shadow p-4">
          <img
            src={book.imageUrl}
            alt={book.title}
            className="h-32 w-24 shrink-0 rounded-lg object-cover"
          />
          <div className="w-full">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-slate-800 font-bold">{book.title}</h1>
              <RiDeleteBin5Line
                onClick={() => handleBookDelete(book.cartItemId)}
                size={30}
                className={`${
                  loading
                    ? "pointer-events-none text-red-300"
                    : "text-red-600 hover:text-red-700"
                } shrink-0 cursor-pointer rounded-md p-1 hover:bg-red-50`}
              />
            </div>

            <span className="text-gray-500">{book.author}</span>

            <div className="flex justify-between items-center">
              <div className="mt-2 line-clamp-2 max-w-xl text-sm text-gray-500">
                <p>{book.description}</p>
              </div>
              <div>
                <p className="text-amber-500 font-bold">{`$${book.price}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
