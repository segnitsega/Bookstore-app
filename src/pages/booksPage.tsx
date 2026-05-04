import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { LuFilter, LuX } from "react-icons/lu";
import Filter from "@/components/filter-component";
import BookCard from "@/components/book-card";
import { Button } from "@/components/ui/button";
import type { bookType } from "@/components/best-sellers";
import spinner from "../assets/spinner.svg";

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

const PAGE_LIMIT = 12;

const BooksPage = () => {
  const [searchParams] = useSearchParams();
  const url = import.meta.env.VITE_BACKEND_API;

  const [books, setBooks] = useState<bookType[] | null>(null);
  const [totalBooks, setTotalBooks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchResults, setSearchResults] = useState<bookType[] | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const [showMobileFilter, setShowMobileFilter] = useState(false);

  useEffect(() => {
    async function getBooks() {
      setBooks(null);
      try {
        setError(null);
        setLoading(true);
        const endPoint = buildBooksListQuery(searchParams, PAGE_LIMIT);
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
      } catch (err: unknown) {
        const status =
          err && typeof err === "object" && "response" in err
            ? (err as { response?: { status?: number } }).response?.status
            : undefined;
        if (status === 400) {
          setBooks([]);
          setTotalBooks(0);
          setError("No books match these filters.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }
    getBooks();
  }, [searchParams, url]);

  // Debounce search input → searchResults
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(id);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      setSearchResults(null);
      setSearchError(null);
      setSearchLoading(false);
      return;
    }
    let cancelled = false;
    async function fetchResults() {
      try {
        setSearchLoading(true);
        setSearchError(null);
        const res = await axios.get(
          `${url}/search?q=${encodeURIComponent(debouncedQuery)}`
        );
        if (cancelled) return;
        setSearchResults(res.data.books ?? []);
      } catch {
        if (cancelled) return;
        setSearchResults([]);
        setSearchError(`No results for "${debouncedQuery}"`);
      } finally {
        if (!cancelled) setSearchLoading(false);
      }
    }
    fetchResults();
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, url]);

  const isSearching = debouncedQuery.length > 0;
  const list = isSearching ? searchResults : books;
  const isLoading = isSearching ? searchLoading : loading;
  const errMessage = isSearching ? searchError : error;

  const showingLabel = useMemo(() => {
    if (isLoading) return "Loading…";
    if (isSearching) {
      if (!searchResults) return null;
      return `${searchResults.length} result${
        searchResults.length === 1 ? "" : "s"
      } for "${debouncedQuery}"`;
    }
    if (!books) return null;
    if (books.length === 0) return "No books match these filters";
    return `Showing 1–${books.length} of ${totalBooks} book${
      totalBooks === 1 ? "" : "s"
    }`;
  }, [
    isLoading,
    isSearching,
    searchResults,
    debouncedQuery,
    books,
    totalBooks,
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-10">
      <header className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold text-amber-900 sm:text-3xl md:text-4xl">
          Browse Books
        </h1>
        <p className="text-sm text-gray-500 md:text-base">
          Discover your next favorite read.
        </p>
      </header>

      <div className="mt-5 flex flex-col gap-3 md:mt-6 lg:flex-row lg:items-center lg:justify-between">
        <span className="text-sm text-gray-500">
          {showingLabel ?? "\u00A0"}
        </span>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowMobileFilter((v) => !v)}
            className="shrink-0 lg:hidden"
            aria-expanded={showMobileFilter}
          >
            <LuFilter className="mr-1.5 h-4 w-4" />
            Filters
          </Button>

          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              setDebouncedQuery(query.trim());
            }}
            className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-md border border-gray-300 bg-white px-3 shadow-sm focus-within:border-amber-400 lg:w-[340px] lg:flex-none"
          >
            <CiSearch className="h-5 w-5 shrink-0 text-gray-500" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search books, authors, genre…"
              aria-label="Search books"
              className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <LuX className="h-4 w-4" />
              </button>
            )}
          </form>
        </div>
      </div>

      {showMobileFilter && (
        <div className="mt-4 lg:hidden">
          <Filter onApply={() => setShowMobileFilter(false)} />
        </div>
      )}

      <div className="mt-4 flex gap-6 lg:items-start">
        <aside className="hidden w-[280px] shrink-0 lg:sticky lg:top-4 lg:block xl:w-[300px]">
          <Filter />
        </aside>

        <div className="min-w-0 flex-1">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <img src={spinner} alt="Loading…" className="h-16 w-16" />
            </div>
          ) : errMessage ? (
            <div className="mx-auto max-w-md rounded-lg border border-amber-200 bg-amber-50 px-4 py-6 text-center">
              <p className="text-amber-800">{errMessage}</p>
              {isSearching && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="mt-3 text-sm font-medium text-amber-700 underline-offset-4 hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : !list || list.length === 0 ? (
            <div className="mx-auto max-w-md rounded-lg border border-dashed border-gray-200 px-4 py-10 text-center text-gray-500">
              No books to show.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {list.map((book) => (
                <BookCard
                  key={book.id}
                  bookId={book.id}
                  bookTitle={book.title}
                  bookUrl={book.imageUrl}
                  bookAuthor={book.author}
                  bookRating={book.bookRating}
                  bookPrice={book.price}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
