import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { CiHeart } from "react-icons/ci";
import { FaStar, FaHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { useCart } from "@/contexts/cartContext";

interface bookCardProp {
  bookTitle: string;
  bookUrl: string;
  bookAuthor: string;
  bookRating: number;
  bookPrice: number;
  /** Optional original ("compare at") price; ignored if not greater than bookPrice. */
  discountedPrice?: number;
  bookId: string;
  wishlistReload?: () => void;
}

const url = import.meta.env.VITE_BACKEND_API;

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

function getUserIdFromToken(): string {
  const token = localStorage.getItem("token");
  if (!token) return "";
  try {
    return JSON.parse(atob(token.split(".")[1])).id ?? "";
  } catch {
    return "";
  }
}

const Stars = ({ rating }: { rating: number }) => {
  const rounded = Math.round(rating);
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <FaStar
          key={i}
          size={14}
          className={i < rounded ? "text-amber-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
};

const BookCard = ({
  bookTitle,
  bookUrl,
  bookAuthor,
  bookRating,
  bookPrice,
  discountedPrice,
  bookId,
  wishlistReload,
}: bookCardProp) => {
  const { cartItems, setReloadCartItems } = useCart();
  const [reloadWishlist, setReloadWishlist] = useState(false);
  const [wishlist, setWishlist] = useState<Array<{ bookId: string }>>([]);
  const [cartBusy, setCartBusy] = useState(false);
  const [wishlistBusy, setWishlistBusy] = useState(false);

  const userId = getUserIdFromToken();
  const inCart = cartItems.some((i) => i.bookId === bookId);
  const inWishlist = wishlist.some((item) => item.bookId === bookId);
  const showCompareAt =
    typeof discountedPrice === "number" && discountedPrice > bookPrice;

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    async function getWishlist() {
      try {
        const res = await axios.get(`${url}/user/wishlist/${userId}`);
        if (!cancelled) setWishlist(res.data.wishlistBooks ?? []);
      } catch {
        // silent — wishlist is best-effort
      }
    }
    getWishlist();
    return () => {
      cancelled = true;
    };
  }, [userId, reloadWishlist]);

  async function handleAddToCart() {
    if (!localStorage.getItem("token")) {
      toast.error("Please sign in to add books to your cart");
      return;
    }
    if (inCart || cartBusy) return;
    try {
      setCartBusy(true);
      const response = await axios.post(
        `${url}/cart/add`,
        { bookId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 201) {
        toast.success("Added to cart");
        setReloadCartItems((prev) => !prev);
      }
    } catch (err: unknown) {
      const status =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { status?: number } }).response?.status
          : undefined;
      if (status === 400) {
        toast.message("Already in your cart");
      } else {
        toast.error("Could not add to cart, please try again");
      }
    } finally {
      setCartBusy(false);
    }
  }

  async function toggleWishlist() {
    if (!localStorage.getItem("token")) {
      toast.error("Please sign in to use the wishlist");
      return;
    }
    if (wishlistBusy) return;
    try {
      setWishlistBusy(true);
      if (inWishlist) {
        await axios.delete(`${url}/books/wishlist/${bookId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        toast.success("Removed from wishlist");
        wishlistReload?.();
      } else {
        await axios.post(
          `${url}/books/wishlist/${bookId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success("Added to wishlist");
      }
      setReloadWishlist((p) => !p);
    } catch {
      toast.error("Could not update wishlist, please try again");
    } finally {
      setWishlistBusy(false);
    }
  }

  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-lg">
      <Link
        to={`/books/${bookId}`}
        className="relative block aspect-[3/4] w-full overflow-hidden bg-gray-100"
      >
        <img
          src={bookUrl}
          alt={bookTitle}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <button
        type="button"
        onClick={toggleWishlist}
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={inWishlist}
        disabled={wishlistBusy}
        className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-red-500 shadow-sm backdrop-blur transition-colors hover:bg-white hover:text-red-600 disabled:opacity-60"
      >
        {inWishlist ? (
          <FaHeart className="h-4 w-4" />
        ) : (
          <CiHeart className="h-5 w-5" />
        )}
      </button>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <Link
          to={`/books/${bookId}`}
          className="line-clamp-2 text-base font-semibold capitalize text-slate-800 hover:text-amber-600"
          title={bookTitle}
        >
          {bookTitle}
        </Link>
        <p className="line-clamp-1 text-sm text-gray-500 capitalize">{bookAuthor}</p>
        <Stars rating={bookRating} />

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-amber-600 tabular-nums">
              {money(bookPrice)}
            </span>
            {showCompareAt && (
              <span className="text-xs text-gray-400 line-through tabular-nums">
                {money(discountedPrice!)}
              </span>
            )}
          </div>

          <Button
            type="button"
            size="sm"
            onClick={handleAddToCart}
            disabled={cartBusy || inCart}
            className={`h-9 cursor-pointer ${
              inCart
                ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
                : "bg-amber-500 text-white hover:bg-amber-600"
            } disabled:cursor-not-allowed disabled:opacity-90`}
          >
            <LuShoppingCart className="mr-1 h-4 w-4" />
            {inCart ? "In Cart" : cartBusy ? "Adding…" : "Add"}
          </Button>
        </div>
      </div>
    </article>
  );
};

export default BookCard;
