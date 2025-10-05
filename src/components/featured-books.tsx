import { Button } from "./ui/button";
import { FaArrowRight } from "react-icons/fa";
// import { FaHeart } from "react-icons/fa";
// import { FaStar } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "./book-card";
import type { bookType } from "./best-sellers";
import spinner from "../assets/spinner.svg";
import { Link } from "react-router-dom";

const FeaturedBooks = () => {
  const url = import.meta.env.VITE_BACKEND_API;

  const [featuredBooks, setFeaturedBooks] = useState<[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | Error | unknown | null>(null);


  useEffect(() => {
    async function getFeaturedBooks() {
      try {
        const response = await axios(`${url}/books/featured`);
        setFeaturedBooks(response.data.featuredBooks);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    }

    getFeaturedBooks();
  }, []);

  return (
    <div className="mx-8 mb-12">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 mb-4">
          <h1 className="text-4xl font-bold text-amber-900">Featured Books</h1>
          <p className="text-gray-500 ">Our editor's picks for this month</p>
        </div>
        <div className="relative text-blue-500 cursor-pointer">
          <Link to="/books"><Button className="bg-white text-blue-500 border border-amber-400 w-[100px] hover:text-gray-800 hover:bg-gray-100 cursor-pointer">
            View All
          </Button></Link>
          <FaArrowRight className="absolute top-2.5 left-20" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {loading && (
          <img src={spinner} alt="Loading..." className="w-20 h-20 mx-auto" />
        )}
        {error && !featuredBooks ? (
          <div className="mx-auto bg-red-100 text-red-800 px-4 py-2 rounded-md text-sm">
            ⚠️ Error fetching featured books. Please refresh and try again.
          </div>
        ) : (
          ""
        )}
        {featuredBooks &&
          featuredBooks.map((book: bookType, index: number) => (
            <BookCard
              book={book}
              key={index}
              bookId={book.id}
              bookTitle={book.title}
              bookUrl={book.imageUrl}
              bookPrice={book.price}
              bookAuthor={book.author}
              discountedPrice={book.price * 2}
              bookRating={book.bookRating}
            />
          ))}
      </div>
    </div>
  );
};

export default FeaturedBooks;