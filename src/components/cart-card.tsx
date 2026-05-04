import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useCart } from "@/contexts/cartContext";

interface CartProp {
  /** Cart row id (used by DELETE /cart/remove/:id), not the book's id */
  cartItemId: string;
  /** The underlying book id, used to link to book detail */
  bookId?: string;
  imageUrl: string;
  title: string;
  price: number;
  author: string;
  description: string;
}

const url = import.meta.env.VITE_BACKEND_API;

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

const CartCard = (book: CartProp) => {
  const [loading, setLoading] = useState(false);
  const { setReloadCartItems, removeFromCart } = useCart();

  const handleBookDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${url}/cart/remove/${book.cartItemId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        removeFromCart(book.cartItemId);
        toast.success("Removed from cart");
        setReloadCartItems((prev) => !prev);
      }
    } catch (e) {
      toast.error("Could not remove item, please try again");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const TitleEl = book.bookId ? (
    <Link
      to={`/books/${book.bookId}`}
      className="line-clamp-2 text-base font-semibold text-slate-800 hover:text-amber-600 sm:text-lg"
    >
      {book.title}
    </Link>
  ) : (
    <h3 className="line-clamp-2 text-base font-semibold text-slate-800 sm:text-lg">
      {book.title}
    </h3>
  );

  const ImageEl = (
    <img
      src={book.imageUrl}
      alt={book.title}
      loading="lazy"
      className="h-40 w-28 max-w-full rounded-lg border border-gray-100 bg-gray-50 object-cover sm:h-36 sm:w-28"
    />
  );

  return (
    <article
      aria-busy={loading}
      className={`group relative flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:gap-4 ${
        loading ? "opacity-60" : ""
      }`}
    >
      <div className="flex shrink-0 justify-center sm:justify-start">
        {book.bookId ? (
          <Link to={`/books/${book.bookId}`} className="block">
            {ImageEl}
          </Link>
        ) : (
          ImageEl
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            {TitleEl}
            <p className="text-sm text-gray-500">{book.author}</p>
          </div>

          <button
            type="button"
            onClick={handleBookDelete}
            disabled={loading}
            aria-label={`Remove "${book.title}" from cart`}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:text-red-300"
          >
            <RiDeleteBin5Line className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-1 line-clamp-2 text-sm text-gray-500">
          {book.description}
        </p>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-2 pt-3">
          <span className="text-xs uppercase tracking-wide text-gray-400">
            Qty 1
          </span>
          <p className="text-lg font-bold text-amber-600 tabular-nums">
            {money(book.price)}
          </p>
        </div>
      </div>
    </article>
  );
};

export default CartCard;
