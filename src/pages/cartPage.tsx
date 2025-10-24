import CartCard from "@/components/cart-card";
import OrderSummary from "@/components/order-summary";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import spinner from "../assets/spinner.svg";
import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_BACKEND_API;
const CartPage = () => {
  const[reload, setReload] = useState(false);
  const navigate = useNavigate();
  let totalPrice = 0;
  const [loading, setLoading] = useState(true);
  const [cartBooks, setCartBooks] = useState<[] | null>(null);
  const getCartItems = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${url}/cart`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setLoading(false);
    setCartBooks(response.data.cartItems);
    console.log("Cart items", response.data.cartItems);
    return response.data.cartItems;
  };

  useEffect(() => {
    getCartItems();
  }, [reload]);

  return (
    <div className="m-8">
      <div className="flex items-center">
        <Button
          onClick={() => navigate("/books")}
          className=" bg-amber-500 border text-white hover:border-blue-500 cursor-pointer hover:bg-amber-600 px-6"
        >
          Continue shopping
        </Button>
        <FaArrowLeft className="relative -top- right-42 text-white text-sm" />
        <div>
          <h1 className="text-slate-800 text-3xl font-bold">Shopping Cart</h1>
          <span className="text-gray-500">{cartBooks?.length} items</span>
        </div>
      </div>
      {loading && (
        <img src={spinner} alt="Loading..." className="w-20 h-20 mx-auto" />
      )}
      {cartBooks && (
        <div className="flex gap-4">
          <div className="flex flex-col gap-4 mt-4">
            {cartBooks.map((book: any) => (
              <div key={book.id} className="w-[700px]">
                <CartCard
                  bookId={book.id}
                  imageUrl={book.book.imageUrl}
                  title={book.book.title}
                  price={book.book.price}
                  author={book.book.author}
                  description={book.book.description}
                  onDelete={() => setReload(!reload)}
                />
              </div>
            ))}
          </div>

          <div className="hidden">
            {cartBooks.map((book: any) => (totalPrice += book.book.price))}
          </div>

          <div className="mt-4">
            <OrderSummary price={parseFloat(totalPrice.toFixed(2))} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
