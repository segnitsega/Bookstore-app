import CartCard from "@/components/cart-card";
import OrderSummary from "@/components/order-summary";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/cartContext";
import { useMemo } from "react";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) =>
          sum + (typeof item.book?.price === "number" ? item.book.price : 0),
        0
      ),
    [cartItems]
  );

  const itemLabel =
    cartItems.length === 0
      ? "No items"
      : cartItems.length === 1
        ? "1 item"
        : `${cartItems.length} items`;

  return (
    <div className="mx-auto max-w-6xl p-4 md:m-8 md:p-0">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Shopping Cart</h1>
          <p className="text-gray-500">{itemLabel}</p>
        </div>
        <Button
          type="button"
          onClick={() => navigate("/books")}
          className="w-fit border bg-amber-500 px-6 text-white hover:border-blue-500 hover:bg-amber-600"
        >
          <FaArrowLeft className="mr-2 inline h-3.5 w-3.5" aria-hidden />
          Continue shopping
        </Button>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          {cartItems.length > 0 ? (
            cartItems.map((row) => (
              <div className="w-full max-w-3xl" key={row.id}>
                <CartCard
                  cartItemId={row.id}
                  imageUrl={row.book.imageUrl}
                  title={row.book.title}
                  price={row.book.price}
                  author={row.book.author}
                  description={row.book.description}
                />
              </div>
            ))
          ) : (
            <p className="text-xl text-gray-500">Your cart is empty.</p>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="w-full shrink-0 lg:mt-0 lg:w-auto">
            <OrderSummary price={Number(subtotal.toFixed(2))} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
