import { Button } from "./ui/button";
import { FaArrowRight, FaHeart } from "react-icons/fa";
import books from "../assets/books.jpg";
import { CiHeart, CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
 

const Bestsellers = () => {
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
        <div className="relative border border-gray-200 rounded-xl flex flex-col overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-blue-100">
          <img
            src={books}
            alt=""
            className="w-[350px] h-[250px] md:w-[600px] md:h-[400px] rounded-lg duration-1000 hover:scale-105 cursor-pointer"
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
        <div className="relative border border-gray-200 rounded-xl  flex flex-col overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-blue-100">
          <img
            src={books}
            alt=""
            className="w-[350px] h-[250px] md:w-[600px] md:h-[400px] rounded-lg duration-1000 hover:scale-105 cursor-pointer"
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
              <CiStar className="text-yellow-500" size={20} />
            </div>
            <div className="flex justify-between">
              <p className="text-amber-600 font-bold">
                $12.99{" "}
                <span className="line-through text-gray-500">$80.00</span>
              </p>
              <Button className="bg-white text-blue-500 border border-amber-200 hover:bg-gray-100 hover:text-gray-800 cursor-pointer">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
        <div className="relative border border-gray-200 rounded-xl  flex flex-col overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-blue-100">
          <img
            src={books}
            alt=""
            className="w-[350px] h-[250px] md:w-[600px] md:h-[400px] rounded-lg duration-1000 hover:scale-105 cursor-pointer"
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
              <CiStar className="text-yellow-500" size={20} />
            </div>
            <div className="flex justify-between">
              <p className="text-amber-600 font-bold">
                $12.99{" "}
                <span className="line-through text-gray-500">$80.00</span>
              </p>
              <Button className="bg-white text-blue-500 border border-amber-200 hover:bg-gray-100 hover:text-gray-800 cursor-pointer">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
        <div className="relative border border-gray-200 rounded-xl flex flex-col overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-blue-100">
          <img
            src={books}
            alt=""
            className="w-[350px] h-[250px] md:w-[600px] md:h-[400px] rounded-lg duration-1000 hover:scale-105 cursor-pointer"
          />
          <FaHeart
            className="absolute top-2 right-2 bg-white/40 p-2 rounded-2xl text-red-500 "
            size={40}
          />
          <div className="p-2 flex flex-col gap-2">
            <h1 className="text-blue-500 font-bold">Book Title</h1>
            <p className="text-gray-500">Author of the book</p>
            <div className="flex">
              <FaStar className="text-yellow-500" size={20} />
              <FaStar className="text-yellow-500" size={20} />
              <FaStar className="text-yellow-500" size={20} />
              <CiStar className="text-yellow-500" size={20} />
              <CiStar className="text-yellow-500" size={20} />
            </div>
            <div className="flex justify-between">
              <p className="text-amber-600 font-bold">
                $12.99{" "}
                <span className="line-through text-gray-500">$80.00</span>
              </p>
              <Button className="bg-white text-blue-500 border border-amber-200 hover:bg-gray-100 hover:text-gray-800 cursor-pointer">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bestsellers;
