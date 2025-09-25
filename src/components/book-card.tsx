import addToCart from "@/utils/add-to-cart";
import { Button } from "./ui/button";
// import { FaArrowRight } from "react-icons/fa";
// import books from "../assets/books.jpg";
import { CiHeart } from "react-icons/ci";
// import { CiStar } from "react-icons/ci";
// import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface bookCardProp {
  bookTitle: string;
  bookUrl: string;
  bookAuthor: string;
  bookRating: number;
  bookPrice: number;
  discountedPrice: number;
  bookId: string;
  book: any;
}

async function handleAddToCart(bookId: string){
  console.log("Add to cart ran.")
  const response = await addToCart(bookId);
  if(response){
    toast("✅ Book added to cart")
  } else{
    toast("❌ Book not added to cart, try again")
  }
}

const BookCard = ({
  book,
  bookTitle,
  bookUrl,
  bookAuthor,
  bookRating,
  bookPrice,
  discountedPrice,
  bookId,
}: bookCardProp) => {
  return (
    <div className="relative border border-gray-200 rounded-xl flex flex-col overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-blue-100">
      <Link to={`/books/${bookId}`}>
        <img
          src={bookUrl}
          alt="Book image"
          className="w-[350px] h-[250px] md:w-[600px] md:h-[400px] rounded-lg duration-1000 hover:scale-105 cursor-pointer"
        />
      </Link>
      <CiHeart
        className="absolute top-2 right-2 bg-white/40 p-2 rounded-2xl text-red-500 "
        size={40}
      />
      <div className="p-2 flex flex-col gap-2">
        <Link to={`/books/${bookId}`} className="text-blue-500 font-bold">
          {bookTitle}
        </Link>
        <Link to={`/books/${bookId}`} className="text-gray-500">
          {bookAuthor}
        </Link>
        <Link to={`/books/${bookId}`} className="flex">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              size={0}
              className={
                index < bookRating ? "text-yellow-500" : "text-gray-300"
              }
            />
          ))}
        </Link>
        <div className="flex justify-between">
          <Link to={`/books/${bookId}`} className="text-amber-600 font-bold">
            ${bookPrice}{" "}
            <span className="line-through text-gray-500">
              ${discountedPrice}
            </span>
          </Link>
          <Button
            onClick={() => handleAddToCart(bookId)}
            className="bg-white text-gray-500 border border-amber-200 hover:bg-gray-100 hover:text-gray-800 cursor-pointer"
          >
            {
              book?.inCart ? "In Cart" : "Add to Cart"
            }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
