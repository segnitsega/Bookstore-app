import { Button } from "./ui/button";
import { FaArrowRight } from "react-icons/fa";
// import { FaHeart } from "react-icons/fa";
// import books from "../assets/books.jpg";
// import { CiHeart, CiStar } from "react-icons/ci";
// import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./book-card";

interface bookType {
  id: number;
  title: string;
  author: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
  featured: boolean;
  bestSellers: boolean;
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
          `${url}/api/books/bestsellers/?limit=${limit}`
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
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error occured</div>;
  return (
    <div className="mx-8 bg-amber-50 py-2 md:py-20 px-4  mb-10 rounded-md">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col gap-2 mb-4">
          <h1 className="text-4xl font-bold text-amber-900">Bestsellers</h1>
          <p className="text-gray-500 ">The most popular books right now</p>
        </div>
        <div className="relative text-blue-500 mb-2 md:mb-0">
          <Button className="bg-white text-blue-500 border border-amber-400 w-[200px] hover:text-gray-800 hover:bg-gray-100 cursor-pointer">
            View All Bestsellers
          </Button>
          <FaArrowRight className=" absolute top-2.5 left-43 md:left-43" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        {loading && <div>Loading...</div>}
        {error ? <div>Error occured</div> : ""}
        {bestsellersBook &&
          bestsellersBook.map((book: bookType, index: number) => (
            <BookCard
              key={index}
              bookTitle={book.title}
              bookUrl={book.imageUrl}
              bookPrice={book.price}
              bookAuthor={book.author}
              discountedPrice={book.price * 2}
              bookRating={4}
            />
          ))}
      </div>
    </div>
  );
};

export default Bestsellers;
