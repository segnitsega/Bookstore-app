import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { FaArrowLeft, FaStar, FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { LuShoppingCart, LuCalendar } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/book-card";
import type { bookType } from "@/components/best-sellers";
import { useCart } from "@/contexts/cartContext";
import spinner from "../assets/spinner.svg";

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

const formatDate = (raw?: string | null) => {
  if (!raw) return "—";
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

const Stars = ({ rating }: { rating: number }) => {
  const rounded = Math.round(rating);
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`Rated ${rating} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <FaStar
          key={i}
          size={16}
          className={i < rounded ? "text-amber-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
};

const StatRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-0.5 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-sm font-medium text-slate-800 sm:text-right">
      {children}
    </span>
  </div>
);

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState<bookType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [related, setRelated] = useState<bookType[] | null>(null);
  const [relatedLoading, setRelatedLoading] = useState(true);

  const [wishlist, setWishlist] = useState<Array<{ bookId: string }>>([]);
  const [reloadWishlist, setReloadWishlist] = useState(false);
  const [wishlistBusy, setWishlistBusy] = useState(false);
  const [cartBusy, setCartBusy] = useState(false);

  const { cartItems, setReloadCartItems } = useCart();
  const userId = useMemo(() => getUserIdFromToken(), []);

  const inCart = useMemo(
    () => cartItems.some((i) => i.bookId === book?.id),
    [cartItems, book?.id]
  );
  const inWishlist = useMemo(
    () => wishlist.some((w) => w.bookId === book?.id),
    [wishlist, book?.id]
  );

  // Fetch the book
  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    async function getBook() {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${url}/books/${id}`);
        if (cancelled) return;
        setBook(response.data.book ?? null);
      } catch (e: unknown) {
        if (cancelled) return;
        const message =
          e instanceof Error ? e.message : "Could not load this book";
        setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    getBook();
    return () => {
      cancelled = true;
    };
  }, [id]);

  // Related books (by genre)
  useEffect(() => {
    if (!book?.genre) return;
    let cancelled = false;
    async function getRelated() {
      try {
        setRelatedLoading(true);
        const response = await axios.get(
          `${url}/books/genre/${encodeURIComponent(book!.genre)}/?limit=8`
        );
        if (cancelled) return;
        const list: bookType[] = response.data.books ?? [];
        setRelated(list.filter((b) => b.id !== book!.id).slice(0, 4));
      } catch {
        if (!cancelled) setRelated([]);
      } finally {
        if (!cancelled) setRelatedLoading(false);
      }
    }
    getRelated();
    return () => {
      cancelled = true;
    };
  }, [book]);

  // Wishlist
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    async function getWishlist() {
      try {
        const res = await axios.get(`${url}/user/wishlist/${userId}`);
        if (!cancelled) setWishlist(res.data.wishlistBooks ?? []);
      } catch {
        // best-effort
      }
    }
    getWishlist();
    return () => {
      cancelled = true;
    };
  }, [userId, reloadWishlist]);

  async function handleAddToCart() {
    if (!book) return;
    if (!localStorage.getItem("token")) {
      toast.error("Please sign in to add books to your cart");
      return;
    }
    if (inCart || cartBusy) return;
    try {
      setCartBusy(true);
      const response = await axios.post(
        `${url}/cart/add`,
        { bookId: book.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success("Added to cart");
        setReloadCartItems((p) => !p);
      }
    } catch (err: unknown) {
      const status =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { status?: number } }).response?.status
          : undefined;
      if (status === 400) toast.message("Already in your cart");
      else toast.error("Could not add to cart, please try again");
    } finally {
      setCartBusy(false);
    }
  }

  async function toggleWishlist() {
    if (!book) return;
    if (!localStorage.getItem("token")) {
      toast.error("Please sign in to use the wishlist");
      return;
    }
    if (wishlistBusy) return;
    try {
      setWishlistBusy(true);
      if (inWishlist) {
        await axios.delete(`${url}/books/wishlist/${book.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        toast.success("Removed from wishlist");
      } else {
        await axios.post(
          `${url}/books/wishlist/${book.id}`,
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

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <img src={spinner} alt="Loading…" className="h-16 w-16" />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="mx-auto max-w-md px-4 py-10 text-center sm:px-6">
        <h1 className="text-lg font-semibold text-slate-800 sm:text-xl">
          {error ?? "Book not found"}
        </h1>
        <Button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-4 w-full bg-amber-500 hover:bg-amber-600 sm:w-auto"
        >
          <FaArrowLeft className="mr-2 h-3.5 w-3.5" />
          Go back
        </Button>
      </div>
    );
  }

  const stockBadge =
    book.stock <= 0
      ? { text: "Out of stock", cls: "bg-red-50 text-red-700" }
      : book.stock < 5
        ? {
            text: `Only ${book.stock} left`,
            cls: "bg-amber-50 text-amber-700",
          }
        : { text: "In stock", cls: "bg-emerald-50 text-emerald-700" };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-10">
      <Button
        type="button"
        variant="outline"
        onClick={() => navigate(-1)}
        className="mb-6 w-full border-amber-300 text-amber-700 hover:bg-amber-50 hover:text-amber-800 sm:w-fit"
      >
        <FaArrowLeft className="mr-2 h-3.5 w-3.5" aria-hidden />
        Back
      </Button>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,420px)_1fr] lg:items-start">
        <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm lg:mx-0 lg:max-w-none">
          <img
            src={book.imageUrl}
            alt={book.title}
            className="aspect-[3/4] w-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {book.genre && (
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-amber-700">
                {book.genre}
              </span>
            )}
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${stockBadge.cls}`}
            >
              {stockBadge.text}
            </span>
          </div>

          <h1 className="text-2xl font-bold capitalize text-slate-900 sm:text-3xl">
            {book.title}
          </h1>
          <p className="text-base capitalize text-amber-700 sm:text-lg">
            by {book.author}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Stars rating={book.bookRating} />
            <span className="text-sm text-gray-500">
              {book.bookRating?.toFixed(1)} · {book.reviews ?? 0} review
              {book.reviews === 1 ? "" : "s"}
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold tabular-nums text-amber-600 sm:text-3xl">
              {money(book.price)}
            </span>
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-800">
              Description
            </h2>
            <p className="mt-1 break-words text-sm leading-relaxed text-gray-600 sm:text-base">
              {book.description || "No description available."}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="divide-y divide-gray-100">
              {book.genre && (
                <StatRow label="Genre">
                  <span className="rounded-md bg-gray-100 px-2 py-0.5 capitalize">
                    {book.genre}
                  </span>
                </StatRow>
              )}
              {book.pages != null && (
                <StatRow label="Pages">{book.pages}</StatRow>
              )}
              {book.publishedDate && (
                <StatRow label="Published">
                  <span className="inline-flex items-center gap-1.5">
                    <LuCalendar className="h-4 w-4 text-gray-400" />
                    {formatDate(book.publishedDate)}
                  </span>
                </StatRow>
              )}
              {book.publisher && (
                <StatRow label="Publisher">{book.publisher}</StatRow>
              )}
              {book.isbn && (
                <StatRow label="ISBN">
                  <span className="font-mono text-xs">{book.isbn}</span>
                </StatRow>
              )}
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <Button
              type="button"
              onClick={handleAddToCart}
              disabled={cartBusy || inCart || book.stock <= 0}
              className={`h-11 w-full flex-1 cursor-pointer text-base font-semibold sm:min-w-0 ${
                inCart
                  ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
                  : "bg-amber-500 text-white hover:bg-amber-600"
              } disabled:cursor-not-allowed disabled:opacity-90`}
            >
              <LuShoppingCart className="mr-2 h-4 w-4" />
              {book.stock <= 0
                ? "Out of stock"
                : inCart
                  ? "In Cart"
                  : cartBusy
                    ? "Adding…"
                    : "Add to Cart"}
            </Button>

            <button
              type="button"
              onClick={toggleWishlist}
              disabled={wishlistBusy}
              aria-label={
                inWishlist ? "Remove from wishlist" : "Add to wishlist"
              }
              aria-pressed={inWishlist}
              className="inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-md border border-amber-300 bg-white px-4 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-50 hover:text-amber-800 disabled:opacity-60 sm:w-auto sm:min-w-[140px]"
            >
              {inWishlist ? (
                <FaHeart className="h-5 w-5 text-red-500" />
              ) : (
                <CiHeart className="h-6 w-6 text-red-500" />
              )}
              {inWishlist ? "Wishlisted" : "Wishlist"}
            </button>
          </div>

          {book.price < 50 && (
            <p className="mt-1 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              ✓ Free shipping on orders over $50
            </p>
          )}
        </div>
      </section>

      <div className="my-12 border-t border-gray-200" />

      <section className="min-w-0">
        <h2 className="mb-4 text-xl font-bold capitalize text-amber-900 sm:mb-6 sm:text-2xl">
          More books in {book.genre ?? "this genre"}
        </h2>

        {relatedLoading ? (
          <div className="flex justify-center py-10">
            <img src={spinner} alt="Loading…" className="h-12 w-12" />
          </div>
        ) : !related || related.length === 0 ? (
          <p className="text-gray-500">No related books found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {related.map((b) => (
              <BookCard
                key={b.id}
                bookId={b.id}
                bookTitle={b.title}
                bookUrl={b.imageUrl}
                bookAuthor={b.author}
                bookRating={b.bookRating}
                bookPrice={b.price}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default BookDetails;
