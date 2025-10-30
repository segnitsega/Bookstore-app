import { Button } from "./ui/button";
import { FaArrowRight } from "react-icons/fa";
// import { FaHeart } from "react-icons/fa";
// import books from "../assets/books.jpg";
// import { CiHeart, CiStar } from "react-icons/ci";
// import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./book-card";
import spinner from "../assets/spinner.svg";
import { Link } from "react-router-dom";

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
  const [bestsellersBook, setBestSellersBook] = useState<[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | Error | unknown | null>(null);
  const limit = 4;
  useEffect(() => {
    async function getbestsellersBook() {
      try {
        const response = await axios(
          `${url}/books/bestsellers/?limit=${limit}`
        );
        setBestSellersBook(response.data.bestsellersBooks);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    }
    getbestsellersBook();
  }, []);
  return (
    <div className="mx-8 bg-amber-50 py-2 md:py-20 px-4  mb-10 rounded-md">
      <div className="flex sm:flex-col md:flex-row justify-between mb-4 sm:mb-0">
        <div className="flex flex-col gap-2 mb-4">
          <h1 className="text-2xl sm:text-4xl font-bold text-amber-900">
            Bestsellers
          </h1>
          <p className="text-gray-500 hidden sm:block">The most popular books right now</p>
        </div>
        <div className="relative text-blue-500 mb-2 md:mb-0">
          <Link to="/books/?filter=bestSellers">
            <Button className="bg-white text-blue-500 border border-amber-400 w-[165px] sm:w-[200px] hover:text-gray-800 hover:bg-gray-100 cursor-pointer ml-4">
              View All Bestsellers
            </Button>
          </Link>
          <FaArrowRight className="hidden sm:block absolute top-2.5 left-43" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        {loading && (
          <img src={spinner} alt="Loading..." className="w-20 h-20 mx-auto" />
        )}

        {error ? (
          <div className="mx-auto bg-red-100 text-red-800 px-4 py-2 rounded-md text-sm">
            ⚠️ Error fetching bestseller books. Please refresh and try again.
          </div>
        ) : (
          ""
        )}
        {bestsellersBook &&
          bestsellersBook.map((book: bookType, index: number) => (
            <BookCard
              key={index}
              bookTitle={book.title}
              bookUrl={book.imageUrl}
              bookPrice={book.price}
              bookAuthor={book.author}
              discountedPrice={book.price * 2}
              bookRating={book.bookRating}
              bookId={book.id}
            />
          ))}
      </div>
    </div>
  );
};

export default Bestsellers;
