import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useCart } from "@/contexts/cartContext";

interface CartProp {
  bookId: string;
  imageUrl: string;
  title: string;
  price: number;
  author: string;
  description: string;
}
const url = import.meta.env.VITE_BACKEND_API;

const CartCard = (book: CartProp) => {
  const [loading, setLoading] = useState(false);

  const handleBookDelete = async (bookId: string) => {
    try {
      setLoading(true);
      const response = await axios.delete(`${url}/cart/remove/${bookId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        setLoading(false);
        toast("Book removed from cart");
        setReloadCartItems((prev) => !prev);
      }
    } catch (e) {
      setLoading(false);
      toast("Book not removed try again");
      console.log(e);
    }
  };
  const { setReloadCartItems } = useCart();

  return (
    <div className="flex gap-10">
      <div className="flex flex-col ">
        <div className="flex gap-4 rounded-md border shadow p-4">
          <img
            src={book.imageUrl}
            alt="Book image"
            className="w-1/10  rounded-lg"
          />
          <div className="w-full">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-slate-800 font-bold">{book.title}</h1>
              <RiDeleteBin5Line
                onClick={() => handleBookDelete(book.bookId)}
                size={30}
                className={`${
                  loading ? "text-red-400 bg-gray-400" : "text-red-500 bg-black"
                }  p-1 rounded-md cursor-pointer hover:bg-gray-500`}
              />
            </div>

            <span className="text-gray-500">{book.author}</span>

            <div className="flex justify-between items-center">
              <div className="flex gap-4 mt- text-gray-500">
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
