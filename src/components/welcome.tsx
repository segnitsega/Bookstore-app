import { Button } from "@/components/ui/button";
import { IoMdBook } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { IoMenuOutline } from "react-icons/io5";
import bookoption1 from "../assets/bookoption1.avif";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Welcome = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const url = import.meta.env.VITE_BACKEND_API;

  const fetchBooks = async (q: string) => {
    try {
      setError(false);
      console.log("fetching the searched book..");
      setLoading(true);
      const res = await axios.get(`${url}/search?q=${encodeURIComponent(q)}`);
      setResults(res.data.books || []);
      setLoading(false);
      console.log("result state", results);
    } catch (err) {
      setError(true);
      setLoading(false);
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    // fetchBooks(value);
  };

  return (
    <div className="flex flex-col gap-4 bg-amber-50 p-2  md:p-12 lg:flex-row">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-6">
          <IoMenuOutline className="text-amber-600 md:hidden" />
          <div className="flex items-center justify-center">
            <IoMdBook className="md:hidden -ml-2 text-amber-600" size={25} />
            <span className="text-amber-600 text-xl md:text-white md:bg-amber-600 py-1 px-2 md:text-xs font-bold rounded-md md:w-[150px]">
              Welcome to BookHub
            </span>
          </div>
        </div>

        <h1>
          <p className="text-amber-600 text-lg md:text-5xl font-bold">
            Discover Your Next
          </p>
          <p className="text-amber-500 text-lg  md:text-5xl font-bold">
            Great Read
          </p>
        </h1>
        <p className="text-gray-600 text-sm  md:text-xl md:text-balance">
          Explore thousands of books, from bestselling novels to hidden gems.
          Your perfect book is waiting to be discovered.
        </p>
        <div className="flex relative gap-2">
          <div className="flex items-center w-[180px] py-1 px-1 md:px-2 border-1 border-orange-300 shadow gap-2 rounded-md lg:w-[500px]">
            <CiSearch size={20} className="text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Search books, authors..."
              className="outline-none text-xs md:text-lg w-[100px] md:w-[400px]"
            />
          </div>
          <Button
            className="text-white bg-amber-600  cursor-pointer border hover:border-blue-500 hover:bg-amber-500"
            onClick={() => fetchBooks(query)}
          >
            Search
          </Button>
        </div>

        {/* Show results */}
        {results.length > 0 && !error && (
          <div className="absolute bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-64 top-[59%] overflow-y-auto z-50">
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
          <div className="absolute bg-white border border-gray-200 rounded-md shadow-lg mt-1 top-[59%] z-50 text-red-500 p-1">
            Error searching, try again
          </div>
        )}

        <div className="flex gap-2">
          <Link
            to="/books"
            className="text-white text-center  bg-amber-600 w-[100px]  md:w-[120px] cursor-pointer border hover:border-blue-500 hover:bg-amber-500 rounded"
          >
            Browse Books
          </Link>
          <Link
            to=""
            className="text-blue-500 bg-white border-1 border-amber-200 md:w-[150px] text-xs md:text-lg hover:bg-gray-100 hover:text-gray-800 cursor-pointer rounded"
          >
            View Bestsellers
          </Link>
        </div>
      </div>

      <div className="relative ml-2 md:ml-0 mt-8 md:mt-0">
        <div className="absolute -left-4 flex text-xs md:text-lg  items-center md:gap-2 md:p-1 bg-white w-[100px] md:w-[150px] rounded-md ">
          <IoMdBook size={25} className="text-amber-600" />
          <span>10,000+ Books</span>
        </div>
        <img
          src={bookoption1}
          alt="books_image"
          className="rounded-xl w-[270px] md:w-[500px] lg:w-[900px] shadow-lg shadow-blue-100"
        />
      </div>
    </div>
  );
};

export default Welcome;
