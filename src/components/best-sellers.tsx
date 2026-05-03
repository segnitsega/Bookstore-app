import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "./ui/button";
import BookCard from "./book-card";
import spinner from "../assets/spinner.svg";

export interface bookType {
  id: string;
  title: string;
  author: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
  featured: boolean;
  bestSellers: boolean;
  bookRating: number;
  genre: string;
  pages: number;
  publishedDate: string;
  publisher: string;
  isbn: string;
  reviews: number;
  bookId: number;
}

const Bestsellers = () => {
  const url = import.meta.env.VITE_BACKEND_API;
  const [bestsellersBook, setBestSellersBook] = useState<bookType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const limit = 4;

  useEffect(() => {
    let cancelled = false;
    async function getBestsellers() {
      try {
        const response = await axios.get(
          `${url}/books/bestsellers/?limit=${limit}`
        );
        if (cancelled) return;
        setBestSellersBook(response.data.bestsellersBooks ?? []);
      } catch (e) {
        if (cancelled) return;
        const message =
          e instanceof Error ? e.message : "Could not load bestsellers";
        setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    getBestsellers();
    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-2 md:px-8 md:py-6">
      <div className="rounded-2xl bg-amber-50 px-4 py-8 md:px-8 md:py-12">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-amber-900 md:text-3xl">
              Bestsellers
            </h2>
            <p className="text-sm text-gray-500 md:text-base">
              The most popular books right now
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="w-fit border-amber-300 bg-white text-amber-700 hover:bg-amber-100 hover:text-amber-800"
          >
            <Link to="/books/?filter=bestSellers">
              View All Bestsellers
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
            ⚠️ Error fetching bestseller books. Please refresh and try again.
          </div>
        ) : !bestsellersBook || bestsellersBook.length === 0 ? (
          <p className="text-center text-gray-500">No bestsellers yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {bestsellersBook.map((book) => (
              <BookCard
                key={book.id}
                bookTitle={book.title}
                bookUrl={book.imageUrl}
                bookPrice={book.price}
                bookAuthor={book.author}
                bookRating={book.bookRating}
                bookId={book.id}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Bestsellers;
