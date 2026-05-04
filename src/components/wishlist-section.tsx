import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./book-card";
import type { bookType } from "./best-sellers";
import spinner from "../assets/spinner.svg";

const url = import.meta.env.VITE_BACKEND_API;

function getUserIdFromToken(): string {
  const token = localStorage.getItem("token");
  if (!token) return "";
  try {
    return JSON.parse(atob(token.split(".")[1])).id ?? "";
  } catch {
    return "";
  }
}

const WishlistSection = () => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<
    Array<{ bookId: string; book: bookType }>
  >([]);
  const [wishlistReload, setWishlistReload] = useState(false);

  useEffect(() => {
    const userId = getUserIdFromToken();
    if (!userId) {
      setLoading(false);
      setBooks([]);
      return;
    }
    let cancelled = false;
    const fetchData = async () => {
      setLoading(true);
      try {
        const wishlist = await axios.get(`${url}/user/wishlist/${userId}`);
        if (cancelled) return;
        setBooks(wishlist.data.wishlistBooks ?? []);
      } catch {
        if (!cancelled) setBooks([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchData();
    return () => {
      cancelled = true;
    };
  }, [wishlistReload]);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
        My Wishlist
      </h2>
      {loading ? (
        <div className="flex justify-center py-12">
          <img src={spinner} alt="Loading…" className="h-12 w-12" />
        </div>
      ) : books.length === 0 ? (
        <p className="mt-4 text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((entry) => (
            <BookCard
              key={entry.bookId ?? entry.book?.id}
              bookId={entry.book.id}
              bookTitle={entry.book.title}
              bookUrl={entry.book.imageUrl}
              bookAuthor={entry.book.author}
              bookRating={entry.book.bookRating}
              bookPrice={entry.book.price}
              wishlistReload={() => setWishlistReload((v) => !v)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistSection;
