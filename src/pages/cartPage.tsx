import CartCard from "@/components/cart-card";
import OrderSummary from "@/components/order-summary";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/cartContext";

const CartPage = () => {
  const navigate = useNavigate();
  let totalPrice = 0;
  const { cartItems } = useCart();

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
          <span className="text-gray-500">{cartItems.length} items</span>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-4 mt-4">
          {cartItems.length > 0 ? (
            cartItems.map((book: any) => (
              <div className="w-[700px]" key={book.id}>
                <CartCard
                  bookId={book.id}
                  imageUrl={book.book.imageUrl}
                  title={book.book.title}
                  price={book.book.price}
                  author={book.book.author}
                  description={book.book.description}
                />
                <div className="hidden">{(totalPrice += book.book.price)}</div>
              </div>
            ))
          ) : (
            <div className="flex text-gray-500 text-xl">
              Your cart is empty.
            </div>
          )}
        </div>

       {cartItems.length > 0 &&  <div className="mt-4">
          <OrderSummary price={parseFloat(totalPrice.toFixed(2))} />
        </div>}
      </div>
    </div>
  );
};
export default CartPage;
