import CartCard from "@/components/cart-card";
import OrderSummary from "@/components/order-summary";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
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

  const isEmpty = cartItems.length === 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-10">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 sm:h-12 sm:w-12">
            <LuShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-slate-800 sm:text-2xl md:text-3xl">
              Shopping Cart
            </h1>
            <p className="text-sm text-gray-500">{itemLabel}</p>
          </div>
        </div>

        <Button
          type="button"
          onClick={() => navigate("/books")}
          variant="outline"
          className="w-full shrink-0 border-amber-300 text-amber-700 hover:bg-amber-50 hover:text-amber-800 sm:w-fit"
        >
          <FaArrowLeft className="mr-2 h-3.5 w-3.5" aria-hidden />
          Continue shopping
        </Button>
      </header>

      {isEmpty ? (
        <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-dashed border-gray-200 px-6 py-10 text-center sm:px-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <LuShoppingCart className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-semibold text-slate-800">
            Your cart is empty
          </h2>
          <p className="text-gray-500">
            Looks like you haven't added any books yet.
          </p>
          <Button asChild className="mt-2 bg-amber-500 hover:bg-amber-600">
            <Link to="/books">Browse books</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            {cartItems.map((row) => (
              <CartCard
                key={row.id}
                cartItemId={row.id}
                bookId={row.bookId}
                imageUrl={row.book.imageUrl}
                title={row.book.title}
                price={row.book.price}
                author={row.book.author}
                description={row.book.description}
              />
            ))}
          </div>

          <aside className="w-full shrink-0 lg:sticky lg:top-20 lg:w-[min(100%,380px)] lg:self-start">
            <OrderSummary
              price={Number(subtotal.toFixed(2))}
              itemCount={cartItems.length}
            />
          </aside>
        </div>
      )}
    </div>
  );
};

export default CartPage;
