import { IoMdBook } from "react-icons/io";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import axios from "axios";
import loadingSpinner from "../assets/loading-spinner-bookstore.svg";
import { BsPerson } from "react-icons/bs";
import { useCart } from "@/contexts/cartContext";

const NavBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const url = import.meta.env.VITE_BACKEND_API;
  const fetchBooks = useCallback(
    debounce(async (q: string) => {
      if (!q) {
        setResults([]);
        return;
      }
      try {
        setError(false);
        console.log("fetching the searched book..");
        setLoading(true);
        const res = await axios.get(`${url}/search?q=${encodeURIComponent(q)}`);
        console.log("here are the results", res.data);
        setResults(res.data.books || []);
        setLoading(false);
        console.log("result state", results);
      } catch (err) {
        setError(true);
        setLoading(false);
        console.error(err);
      }
    }, 500),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    console.log("Search query", value);
    fetchBooks(value); // call the debounced function
  };

  const { getCartCount } = useCart();
  // console.log("the get cart count", getCartCount())

  return (
    <div>
      <div className="hidden sticky top-0 z-50 bg-white/3  backdrop-blur-lg border-b md:flex items-center justify-between p-2">
        <div className="flex items-center gap-1">
          <IoMdBook size={35} className="text-amber-600" />
          <h1 className="text-amber-900 font-bold text-2xl">BookHub</h1>
        </div>
        <div className="flex items-center gap-10 text-lg">
          <span className="hover:text-amber-600 cursor-pointer">
            <Link to="/dashboard">Home</Link>
          </span>
          <span className="hover:text-amber-600 cursor-pointer">
            <Link to="books">Books</Link>
          </span>
        </div>
        <div className="relative flex items-center py-1 px-2 border-1 border-orange-300 shadow gap-2 rounded-md w-[500px]">
          <CiSearch size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search books, authors..."
            value={query}
            onChange={handleChange}
            className="outline-none w-[400px]"
          />
          {loading && <img src={loadingSpinner} className="w-15 h-5" />}
        </div>

        <div className="flex items-center gap-8">
          <div className="relative">
            <Link to="cart">
              <CiShoppingCart
                size={30}
                className="text-blue-600 cursor-pointer"
              />
            </Link>
            <span className="absolute -top-2 -right-3 w-5 h-5 flex items-center justify-center bg-amber-600 text-white text-sm rounded-lg">
              {getCartCount()}
            </span>
          </div>
          <Link to="profile">
            {/* <CgProfile size={30} className="text-slate-700  cursor-pointer" /> */}
            <BsPerson size={30} className="text-slate-700  cursor-pointer" />
          </Link>
        </div>
      </div>

      {/* Show results */}
      {results.length > 0 && !error && (
        <div className="absolute bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-64 left-[45%] overflow-y-auto z-50">
          {results.map((book: any) => (
            <div key={book.id} className="p-2 border-b cursor-pointer">
              <Link
                to={`/books/${book.id}`}
                onClick={() => {
                  setResults([]);
                }}
              >
                <strong>{book.title}</strong> by {book.author}
              </Link>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="absolute bg-white border border-gray-200 rounded-md shadow-lg mt-1 left-[50%] z-50 text-red-500 p-1">
          {`Error searching, try again`}
        </div>
      )}
    </div>
  );
};

export default NavBar;
