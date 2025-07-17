import { Button } from "./ui/button";
import { FaArrowRight } from "react-icons/fa";
import books from "../assets/books.jpg";

const Bestsellers = () => {
  return (
    <div className="mx-8 bg-amber-50 py-20 px-4 ">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col gap-2 mb-4">
          <h1 className="text-4xl font-bold text-amber-900">Bestsellers</h1>
          <p className="text-gray-500 ">The most popular books right now</p>
        </div>
        <div className="relative text-blue-500 mb-2 md:mb-0">
          <Button className="bg-white text-blue-500 border border-amber-400 w-[200px]">
            View All Bestsellers
          </Button>
          <FaArrowRight className=" absolute top-2.5 left-43 md:left-43" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 bg-white">
        <div className="border border-gray-200 rounded-xl shadow flex flex-col">
          <img src={books} alt="" className="w-[600px] h-[400px] rounded-lg" />
          <div className="p-2 flex flex-col gap-2">
            <h1>Book Title</h1>
            <p>Author of the book</p>
            <p>Rating stars</p>
            <div className="flex justify-between">
                <p>Book price</p>
            <Button className="bg-white text-gray-500 border border-amber-200">
              In Cart
            </Button>
            </div>
            
          </div>
        </div>
        <div className="border border-gray-200 rounded-xl shadow flex flex-col">
          <img src={books} alt="" className="w-[600px] h-[400px] rounded-lg" />
          <div className="p-2 flex flex-col gap-2">
            <h1>Book Title</h1>
            <p>Author of the book</p>
            <p>Rating stars</p>
            <div className="flex justify-between">
                <p>Book price</p>
            <Button className="bg-white text-gray-500 border border-amber-200">
              In Cart
            </Button>
            </div>
            
          </div>
        </div>
        <div className="border border-gray-200 rounded-xl shadow flex flex-col">
          <img src={books} alt="" className="w-[600px] h-[400px] rounded-lg" />
          <div className="p-2 flex flex-col gap-2">
            <h1>Book Title</h1>
            <p>Author of the book</p>
            <p>Rating stars</p>
            <div className="flex justify-between">
                <p>Book price</p>
            <Button className="bg-white text-gray-500 border border-amber-200">
              In Cart
            </Button>
            </div>
            
          </div>
        </div>
        <div className="border border-gray-200 rounded-xl shadow flex flex-col">
          <img src={books} alt="" className="w-[600px] h-[400px] rounded-lg" />
          <div className="p-2 flex flex-col gap-2">
            <h1>Book Title</h1>
            <p>Author of the book</p>
            <p>Rating stars</p>
            <div className="flex justify-between">
                <p>Book price</p>
            <Button className="bg-white text-gray-500 border border-amber-200">
              In Cart
            </Button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bestsellers;
