import { Button } from "@/components/ui/button";
import { CiSearch } from "react-icons/ci";
import Filter from "@/components/filter-component";
import BookCard from "@/components/book-card";
import type { bookType } from "@/components/best-sellers";
import { useEffect, useState } from "react";
import axios from "axios";
import spinner from "../assets/spinner.svg";
import { useSearchParams } from "react-router-dom";

const BooksPage = () => {
  const [searchParams] = useSearchParams();
  // const sort = searchParams.get("sort");
  const genre = searchParams.get("genre");
  const maxPrice = searchParams.get("maxPrice");
  const minPrice = searchParams.get("minPrice");
  const minRating = searchParams.get("minRating");

  const filter = searchParams.get("filter");

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const url = import.meta.env.VITE_BACKEND_API;
  const [books, setBooks] = useState<[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  console.log(results);
  const limit = 8;
  const fetchBooks = async (q: string) => {
    try {
      setSearchError(false);
      console.log("fetching the searched book..");
      setSearchLoading(true);
      const res = await axios.get(`${url}/search?q=${encodeURIComponent(q)}`);
      if (res.status === 200) {
        setResults(res.data.books);
        setSearchLoading(false);
        console.log("Success status code", res.status);
        // console.log("result state", res.data);
      } else {
        console.log("Failed status code", res.status);
        setSearchError(true);
      }
    } catch (err) {
      setSearchError(true);
      console.log("Error searching the book");
      setSearchLoading(false);
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSearchError(false);
    if (value === "") {
      setResults([]);
    }
    // console.log(value, results)
    // fetchBooks(value);
  };

  useEffect(() => {
    console.log("Searching books by filter effect ran...");
    async function getBooks() {
      let endPoint = `/books/?limit=${limit}`;
      setBooks(null);
      try {
        setError(null);
        setLoading(true);
        if (filter) {
          if (filter === "bestSellers") {
            endPoint += "&bestSellers=true";
          } else if (filter === "featured") {
            endPoint += "&featured=true";
          } else {
            endPoint += `&genre=${encodeURIComponent(filter)}`;
          }
        } else if (genre || minPrice || maxPrice || minRating) {
          endPoint += `&maxPrice=${maxPrice}&minPrice=${minPrice}&minRating=${minRating}&genre=${genre}`;
        }
        console.log("Here is th url", endPoint);
        const response = await axios(`${url}${endPoint}`);
        setBooks(response.data.books);
        setLoading(false);
      } catch (err: any) {
        if (err.response && err.response.status === 400) {
          setBooks([]); // make sure books is an empty array
          setError("No books found for the selected filters.");
        } else {
          setError("Something went wrong. Please try again.");
        }
        setLoading(false);
      }
    }
    getBooks();
  }, [searchParams]);

  return (
    <div className="overflow-x-hidden p-2 md:p-8">
      <h1 className="text-amber-900 text-2xl font-bold md:text-4xl">
        Browse Books
      </h1>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center my-2 md:my-4">
        <span className="text-gray-500">Showing 1-8 of 8 books</span>
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <div className="flex items-center py-1 px-1 md:px-2 border-1 border-orange-300 shadow gap-2 rounded-md w-[250px] md:w-[300px]">
            <CiSearch className="text-gray-500 w-10 md:h-5 md:w-5" />
            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Search books, authors..."
              className="outline-none w-[400px]"
            />
          </div>
          <Button
            disabled={searchLoading}
            className="hidden md:block bg-amber-500 hover:bg-amber-400 cursor-pointer"
            onClick={() => fetchBooks(query)}
          >
            {searchLoading ? "Searching.." : "Search"}
          </Button>
        </div>
      </div>
      {searchError && (
        <div className="-mt-4 flex justify-end mr-60 text-red-500">
          {query
            ? `Book: ${query} not found`
            : "Enter book name or author to search for books"}
        </div>
      )}

      <div className="flex gap-4">
        <div className="hidden md:block">
          <Filter />
        </div>

        {loading && (
          <img src={spinner} alt="Loading..." className="w-20 h-20 mx-auto " />
        )}
        {error ? (
          <div className="mx-auto bg-red-100 text-red-800 px-4 py-2 rounded-md text-sm">
            ⚠️ {error}
          </div>
        ) : (
          ""
        )}
        <div className="grid grid-cols-1 sm:grid-cols-4 grid-row-2 gap-4">
          {books &&
            books.map((book: bookType, index) => (
              <BookCard
                key={index}
                bookId={book.id}
                bookTitle={book.title}
                bookUrl={book.imageUrl}
                bookAuthor={book.author}
                bookRating={book.bookRating}
                bookPrice={book.price}
                discountedPrice={book.price * 2}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
