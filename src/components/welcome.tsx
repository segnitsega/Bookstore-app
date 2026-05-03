import { Button } from "@/components/ui/button";
import { IoMdBook } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import bookoption1 from "../assets/bookoption1.avif";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

type SearchBook = {
  id: string;
  title: string;
  author: string;
};

const Welcome = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const url = import.meta.env.VITE_BACKEND_API;

  const fetchBooks = async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setError(false);
      return;
    }

    try {
      setError(false);
      setLoading(true);
      const res = await axios.get(`${url}/search?q=${encodeURIComponent(q)}`);
      setResults(res.data.books || []);
    } catch {
      setError(true);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (!value.trim()) {
      setResults([]);
      setError(false);
    }
  };

  return (
    <section className="bg-gradient-to-b from-amber-50 to-white px-4 py-10 md:px-8 md:py-14 lg:px-16">
      <div className="mx-auto grid max-w-7xl items-center gap-8 md:gap-10 lg:grid-cols-2">
        <div className="space-y-5 md:space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-3 py-1.5 shadow-sm">
            <IoMdBook className="text-amber-600" size={20} />
            <span className="text-xs font-semibold uppercase tracking-wide text-amber-700">
              Welcome to BookHub
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-amber-700 sm:text-4xl md:text-5xl">
            Discover Your Next
            <span className="block text-amber-500">Great Read</span>
          </h1>

          <p className="max-w-xl text-sm leading-7 text-gray-600 sm:text-base md:text-lg md:leading-8">
            Explore thousands of books, from bestselling novels to hidden gems.
            Your perfect book is waiting to be discovered.
          </p>

          <div className="relative space-y-3">
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex h-11 w-full items-center gap-2 rounded-lg border border-amber-200 bg-white px-3 shadow-sm">
                <CiSearch size={20} className="text-gray-500" />
                <input
                  type="text"
                  value={query}
                  onChange={handleChange}
                  placeholder="Search books, authors..."
                  className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400 md:text-base"
                />
              </div>
              <Button
                disabled={loading}
                className="h-11 w-full cursor-pointer bg-amber-600 px-5 font-medium text-white hover:bg-amber-700 disabled:cursor-not-allowed sm:w-auto"
                onClick={() => fetchBooks(query)}
              >
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>

            {results.length > 0 && !error && (
              <div className="max-h-64 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                {results.map((book) => (
                  <Link
                    key={book.id}
                    to={`/books/${book.id}`}
                    onClick={() => {
                      setResults([]);
                      setQuery("");
                    }}
                    className="block border-b border-gray-100 px-4 py-3 transition-colors last:border-b-0 hover:bg-amber-50"
                  >
                    <p className="text-sm font-semibold text-gray-800">{book.title}</p>
                    <p className="text-xs text-gray-500">by {book.author}</p>
                  </Link>
                ))}
              </div>
            )}

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                Error searching books. Please try again.
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/books"
              className="rounded-md bg-amber-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-700 md:text-base"
            >
              Browse Books
            </Link>
            <Link
              to="/books/?filter=bestSellers"
              className="rounded-md border border-amber-200 bg-white px-4 py-2 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-50 md:text-base"
            >
              View Bestsellers
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute left-3 top-3 z-10 flex items-center gap-2 rounded-md border border-amber-100 bg-white px-2.5 py-1.5 text-xs shadow-md sm:left-4 sm:top-4 sm:px-3 sm:py-2 sm:text-sm">
            <IoMdBook size={18} className="text-amber-600" />
            <span className="font-medium text-gray-700">10,000+ Books</span>
          </div>
          <img
            src={bookoption1}
            alt="books_image"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-xl shadow-amber-100/60 sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-auto lg:max-h-[520px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Welcome;
