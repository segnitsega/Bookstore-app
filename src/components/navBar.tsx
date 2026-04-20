import { IoMdBook } from "react-icons/io";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";
import axios from "axios";
import loadingSpinner from "../assets/loading-spinner-bookstore.svg";
import { BsPerson } from "react-icons/bs";
import { useCart } from "@/contexts/cartContext";

type SearchBook = {
  id: string;
  title: string;
  author: string;
};

const NavBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const url = import.meta.env.VITE_BACKEND_API;
  const { getCartCount } = useCart();
  const location = useLocation();

  const fetchBooks = useMemo(
    () =>
      debounce(async (q: string) => {
        if (!q.trim()) {
          setResults([]);
          setLoading(false);
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
      }, 450),
    [url]
  );

  useEffect(() => {
    return () => fetchBooks.cancel();
  }, [fetchBooks]);

  useEffect(() => {
    setResults([]);
  }, [location.pathname]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    fetchBooks(value);
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setError(false);
    fetchBooks.cancel();
  };

  return (
    <div className="sticky top-0 z-50 border-b border-amber-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto hidden w-full max-w-7xl items-center gap-6 px-4 py-3 md:flex">
        <Link
          to="/dashboard"
          className="flex items-center gap-1.5 transition-transform hover:scale-[1.01]"
        >
          <IoMdBook size={34} className="text-amber-600" />
          <h1 className="text-2xl font-bold tracking-tight text-amber-900">BookHub</h1>
        </Link>

        <div className="flex items-center gap-7 text-sm font-medium text-gray-700">
          <Link to="/dashboard" className="transition-colors hover:text-amber-600">
            Home
          </Link>
          <Link to="/books" className="transition-colors hover:text-amber-600">
            Books
          </Link>
        </div>

        <div className="relative ml-auto w-full max-w-lg">
          <div className="flex h-10 items-center gap-2 rounded-lg border border-amber-200 bg-white px-3 shadow-sm">
            <CiSearch size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search books or authors..."
              value={query}
              onChange={handleChange}
              className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />
            {loading && <img src={loadingSpinner} className="h-5 w-12" />}
          </div>

          {results.length > 0 && !error && (
            <div className="absolute left-0 right-0 mt-2 max-h-72 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-xl">
              {results.map((book) => (
                <Link
                  key={book.id}
                  to={`/books/${book.id}`}
                  onClick={clearSearch}
                  className="block border-b border-gray-100 px-4 py-3 transition-colors last:border-b-0 hover:bg-amber-50"
                >
                  <p className="text-sm font-semibold text-gray-800">{book.title}</p>
                  <p className="text-xs text-gray-500">by {book.author}</p>
                </Link>
              ))}
            </div>
          )}

          {error && (
            <div className="absolute left-0 right-0 mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 shadow-lg">
              Error searching books. Please try again.
            </div>
          )}
        </div>

        <div className="flex items-center gap-6 pl-2">
          <Link to="/cart" className="relative">
            <CiShoppingCart
              size={30}
              className="cursor-pointer text-blue-600 transition-colors hover:text-blue-700"
            />
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-xs text-white">
              {getCartCount()}
            </span>
          </Link>
          <Link to="/profile">
            <BsPerson
              size={28}
              className="cursor-pointer text-slate-700 transition-colors hover:text-amber-700"
            />
          </Link>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:hidden">
        <Link to="/dashboard" className="flex items-center gap-1">
          <IoMdBook size={30} className="text-amber-600" />
          <h1 className="text-xl font-bold text-amber-900">BookHub</h1>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            <CiShoppingCart size={28} className="text-blue-600" />
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-xs text-white">
              {getCartCount()}
            </span>
          </Link>
          <Link to="/profile">
            <BsPerson size={26} className="text-slate-700" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
