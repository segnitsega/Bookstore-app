import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "./ui/button";
import BookCard from "./book-card";
import type { bookType } from "./best-sellers";
import spinner from "../assets/spinner.svg";

const FeaturedBooks = () => {
  const url = import.meta.env.VITE_BACKEND_API;

  const [featuredBooks, setFeaturedBooks] = useState<bookType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function getFeaturedBooks() {
      try {
        const response = await axios.get(`${url}/books/featured`);
        if (cancelled) return;
        setFeaturedBooks(response.data.featuredBooks ?? []);
      } catch (e) {
        if (cancelled) return;
        const message = e instanceof Error ? e.message : "Could not load books";
        setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    getFeaturedBooks();
    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-amber-900 md:text-3xl">
            Featured Books
          </h2>
          <p className="text-sm text-gray-500 md:text-base">
            Our editor's picks for this month
          </p>
        </div>
        <Button
          asChild
          variant="outline"
          className="w-fit border-amber-300 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
        >
          <Link to="/books">
            View All
            <FaArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden />
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <img src={spinner} alt="Loading…" className="h-16 w-16" />
        </div>
      ) : error ? (
        <div className="mx-auto max-w-md rounded-md bg-red-50 px-4 py-3 text-center text-sm text-red-700">
          ⚠️ Error fetching featured books. Please refresh and try again.
        </div>
      ) : !featuredBooks || featuredBooks.length === 0 ? (
        <p className="text-center text-gray-500">No featured books yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredBooks.map((book) => (
            <BookCard
              key={book.id}
              bookId={book.id}
              bookTitle={book.title}
              bookUrl={book.imageUrl}
              bookPrice={book.price}
              bookAuthor={book.author}
              bookRating={book.bookRating}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedBooks;
