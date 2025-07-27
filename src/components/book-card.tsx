import { Button } from "./ui/button";
// import { FaArrowRight } from "react-icons/fa";
// import books from "../assets/books.jpg";
import { CiHeart } from "react-icons/ci";
// import { CiStar } from "react-icons/ci";
// import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

interface bookCardProp {
  bookTitle: string;
  bookUrl: string;
  bookAuthor: string;
  bookRating: number;
  bookPrice: number;
  discountedPrice: number;
}

const BookCard = ({
  bookTitle,
  bookUrl,
  bookAuthor,
  bookRating,
  bookPrice,
  discountedPrice,
}: bookCardProp) => {
  return (
    <div className="relative border border-gray-200 rounded-xl flex flex-col overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-blue-100">
      <img
        src={bookUrl}
        alt="Book image"
        className="w-[350px] h-[250px] md:w-[600px] md:h-[400px] rounded-lg duration-1000 hover:scale-105 cursor-pointer"
      />
      <CiHeart
        className="absolute top-2 right-2 bg-white/40 p-2 rounded-2xl text-red-500 "
        size={40}
      />
      <div className="p-2 flex flex-col gap-2">
        <h1 className="text-blue-500 font-bold">{bookTitle}</h1>
        <p className="text-gray-500">{bookAuthor}</p>
        <div className="flex">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              size={0}
              className={
                index < bookRating ? "text-yellow-500" : "text-gray-300"
              }
            />
          ))}
        </div>
        <div className="flex justify-between">
          <p className="text-amber-600 font-bold">
            ${bookPrice}{" "}
            <span className="line-through text-gray-500">
              ${discountedPrice}
            </span>
          </p>
          <Button className="bg-white text-gray-500 border border-amber-200 hover:bg-gray-100 hover:text-gray-800 cursor-pointer">
            In Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
