import { Button } from "@/components/ui/button";
import { CiSearch } from "react-icons/ci";
import Filter from "@/components/filter-component";
import BookCard from "@/components/book-card";
import type { bookType } from "@/components/best-sellers";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import spinner from "../assets/spinner.svg";
import { useSearchParams } from "react-router-dom";

function applyClientSort(books: bookType[], sort: string | null): bookType[] {
  const copy = [...books];
  switch (sort) {
    case "priceAsc":
      return copy.sort((a, b) => a.price - b.price);
    case "priceDesc":
      return copy.sort((a, b) => b.price - a.price);
    case "ratingDesc":
      return copy.sort((a, b) => b.bookRating - a.bookRating);
    default:
      return copy;
  }
}

function buildBooksListQuery(
  searchParams: URLSearchParams,
  limit: number
): string {
  const params = new URLSearchParams();
  params.set("limit", String(limit));

  const filter = searchParams.get("filter");
  const sort = searchParams.get("sort");

  if (filter) {
    if (filter === "bestSellers") params.set("bestSellers", "true");
    else if (filter === "featured") params.set("featured", "true");
    else params.set("genre", filter);
  } else {
    const genre = searchParams.get("genre");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const minRating = searchParams.get("minRating");
    if (genre) params.set("genre", genre);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (minRating) params.set("minRating", minRating);
  }

  if (sort === "oldest") params.set("sort", "oldest");

  return `/books/?${params.toString()}`;
}

const BooksPage = () => {
  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState("");
  const [, setResults] = useState<bookType[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const url = import.meta.env.VITE_BACKEND_API;
  const [books, setBooks] = useState<bookType[] | null>(null);
  const [totalBooks, setTotalBooks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const limit = 8;
  const fetchBooks = async (q: string) => {
    try {
      setSearchError(false);
      setSearchLoading(true);
      const res = await axios.get(`${url}/search?q=${encodeURIComponent(q)}`);
      if (res.status === 200) {
        setResults(res.data.books);
        setSearchLoading(false);
      } else {
        setSearchError(true);
        setSearchLoading(false);
      }
    } catch {
      setSearchError(true);
      setSearchLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSearchError(false);
    if (value === "") {
      setResults([]);
    }
  };

  useEffect(() => {
    async function getBooks() {
      setBooks(null);
      try {
        setError(null);
        setLoading(true);
        const endPoint = buildBooksListQuery(searchParams, limit);
        const response = await axios.get(`${url}${endPoint}`);
        const raw: bookType[] = response.data.books ?? [];
        const sortParam = searchParams.get("sort");
        const sorted = applyClientSort(raw, sortParam);
        setBooks(sorted);
        setTotalBooks(
          typeof response.data.totalBooks === "number"
            ? response.data.totalBooks
            : sorted.length
        );
        setLoading(false);
      } catch (err: unknown) {
        const status =
          err && typeof err === "object" && "response" in err
            ? (err as { response?: { status?: number } }).response?.status
            : undefined;
        if (status === 400) {
          setBooks([]);
          setTotalBooks(0);
          setError("No books found for the selected filters.");
        } else {
          setError("Something went wrong. Please try again.");
        }
        setLoading(false);
      }
    }
    getBooks();
  }, [searchParams, url, limit]);

  const showingLabel = useMemo(() => {
    if (!books || loading) return null;
    const n = books.length;
    const total = totalBooks;
    if (n === 0) return "No books match these filters";
    return `Showing 1–${n} of ${total} book${total === 1 ? "" : "s"}`;
  }, [books, loading, totalBooks]);

  return (
    <div className="overflow-x-hidden p-2 md:p-8">
      <h1 className="text-amber-900 text-2xl font-bold md:text-4xl">
        Browse Books
      </h1>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center my-2 md:my-4">
        <span className="text-gray-500">
          {showingLabel ?? "Loading books…"}
        </span>
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
