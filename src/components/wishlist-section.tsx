import { Button } from "./ui/button";
import books from "../assets/books.jpg";
import { CiHeart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const WishlistSection = () => {
  return (
    <div className="border rounded-lg shadow p-4">
      <h1 className="text-slate-1000 text-2xl">My Wishlist</h1>
      <div className="flex gap-4">
        <div className="relative border border-gray-200 rounded-xl flex flex-col overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-blue-100">
          <img
            src={books}
            alt=""
            className="w-[250px] md:w-[350px] h-[250px]  rounded-lg duration-1000 hover:scale-105 cursor-pointer"
          />
          <CiHeart
            className="absolute top-2 right-2 bg-white/40 p-2 rounded-2xl text-gray-500 "
            size={40}
          />
          <div className="p-2 flex flex-col gap-2">
            <h1 className="text-blue-500 font-bold">Book Title</h1>
            <p className="text-gray-500">Author of the book</p>
            <div className="flex">
              <FaStar className="text-yellow-500" size={20} />
              <FaStar className="text-yellow-500" size={20} />
              <FaStar className="text-yellow-500" size={20} />
              <FaStar className="text-yellow-500" size={20} />
              <FaStar className="text-yellow-500" size={20} />
            </div>
            <div className="flex justify-between">
              <p className="text-amber-600 font-bold">
                $12.99{" "}
                <span className="line-through text-gray-500">$80.00</span>
              </p>
              <Button className="bg-white text-gray-500 border border-amber-200 hover:bg-gray-100 hover:text-gray-800 cursor-pointer">
                In Cart
              </Button>
            </div>
          </div>
        </div>

        <div className="relative border border-gray-200 rounded-xl flex flex-col overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-blue-100">
          <img
            src={books}
            alt=""
            className="w-[250px] md:w-[350px] h-[250px]  rounded-lg duration-1000 hover:scale-105 cursor-pointer"
          />
          <CiHeart
            className="absolute top-2 right-2 bg-white/40 p-2 rounded-2xl text-gray-500 "
            size={40}
          />
          <div className="p-2 flex flex-col gap-2">
            <h1 className="text-blue-500 font-bold">Book Title</h1>
            <p className="text-gray-500">Author of the book</p>
            <div className="flex">
              <FaStar className="text-yellow-500" size={20} />
              <FaStar className="text-yellow-500" size={20} />
              <FaStar className="text-yellow-500" size={20} />
              <FaStar className="text-yellow-500" size={20} />
              <FaStar className="text-yellow-500" size={20} />
            </div>
            <div className="flex justify-between">
              <p className="text-amber-600 font-bold">
                $12.99{" "}
                <span className="line-through text-gray-500">$80.00</span>
              </p>
              <Button className="bg-white text-gray-500 border border-amber-200 hover:bg-gray-100 hover:text-gray-800 cursor-pointer">
                In Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistSection;
