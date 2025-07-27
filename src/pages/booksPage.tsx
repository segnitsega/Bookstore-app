import { Button } from "@/components/ui/button";
import { CiSearch } from "react-icons/ci";
import Filter from "@/components/filter-component";
import BookLayout from "@/components/book-layout";
import BookCard from "@/components/book-card";
import type { bookType } from "@/components/best-sellers";
import { useEffect, useState } from "react";
import axios from "axios";

const BooksPage = () => {
  const url = import.meta.env.VITE_BACKEND_API;
  const [books, setBooks] = useState<[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | Error | unknown | null>(null);
  const limit = 8;
  useEffect(() => {
    async function getBooks() {
      try {
        const response = await axios(`${url}/api/books/?limit=${limit}`);
        setBooks(response.data.books);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    }
    getBooks();
  }, []);
  const firstList = books?.slice(0, 4);
  const secondList = books?.slice(4);

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
              placeholder="Search books, authors..."
              className="outline-none w-[400px]"
            />
          </div>
          <Button className="hidden md:block bg-amber-500 cursor-pointer">
            Search
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="hidden md:block">
          <Filter />
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex gap-6">
            {firstList?.map((book: bookType, index) => (
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
          <div className="flex gap-6">
            {secondList?.map((book: bookType, index) => (
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
    </div>
  );
};

export default BooksPage;
