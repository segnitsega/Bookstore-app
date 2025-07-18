import { Button } from "@/components/ui/button";
import fansyBook from "../assets/fansyBook.jpeg";
import { FaArrowLeft } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { SlCalender } from "react-icons/sl";
import { CiShoppingCart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import BookLayout from "@/components/book-layout";


const BookDetails = () => {
  return (
    <div className="m-8">
      <Button className=" bg-amber-500 cursor-pointer w-20">Back</Button>
      <FaArrowLeft className="relative -top-7 left-1 text-white" />

      <div className="flex w-full gap-10">
        <img src={fansyBook} alt="" className="w-xl rounded-lg shadow" />
        <div className="flex flex-col gap-4">
          <h1 className="text-slate-800 font-bold text-3xl">
            Harry Potter and the Sorcerer's Stone
          </h1>
          <span className="text-amber-600 text-xl">J.K.Rowling</span>
          <div className="flex">
            <FaStar className="text-yellow-500" size={20} />
            <FaStar className="text-yellow-500" size={20} />
            <FaStar className="text-yellow-500" size={20} />
            <FaStar className="text-yellow-500" size={20} />
            <CiStar className="text-yellow-500 mr-2" size={20} />
            <p>
              4.9 <span className="text-gray-500">(5432 reviews)</span>
            </p>
          </div>
          <span className="text-amber-600 text-2xl font-bold">$16.99</span>
          <h1 className="text-slate-800 font-bold text-xl">Description</h1>
          <p className="text-gray-500">
            The magical tale of a young wizard discovering his destiny at
            Hogwarts School
          </p>

          <div className="flex flex-col gap-2 p-4 border border-gray-200 rounded-lg shadow mt-4">
            <div className="flex justify-between">
              <h1 className="text-gray-500 text-lg">Genre</h1>
              <p className="bg-gray-300 rounded-md p-1 text-slate-1000">
                Fantasy
              </p>
            </div>
            <div className="flex justify-between">
              <h1 className="text-gray-500 text-lg">Pages</h1>
              <div className="flex items-center gap-1">
                <HiOutlineBookOpen />
                <p>320</p>
              </div>
            </div>
            <div className="flex justify-between">
              <h1 className="text-gray-500 text-lg">Published</h1>
              <div className="flex items-center gap-1">
                <SlCalender />
                <p>320</p>
              </div>
            </div>
            <div className="flex justify-between">
              <h1 className="text-gray-500 text-lg">Publisher</h1>
              <p>Bloomsbury</p>
            </div>
            <div className="flex justify-between">
              <h1 className="text-gray-500 text-lg">ISBN</h1>
              <p>978-0-439-70818-8</p>
            </div>
          </div>
          <div className="flex gap-4 items-center mt-4">
            <Button className="w-md bg-amber-500 text-lg border hover:border-blue-500 cursor-pointer hover:bg-amber-600"><CiShoppingCart /> Add to Cart</Button>
            <div className="border  border-amber-500 rounded-md py-2 px-8 hover:border-blue-500 cursor-pointer">
                <FaHeart className="text-red-500 " size={20} />
            </div>
          </div>
          <span className="bg-green-50 p-2 rounded-md text-gray-500">✓ Free shipping on orders over $50</span>
          
        </div>
      </div>

      <div className="border-t border-gray-200 mt-16 mb-10"></div>

      <h1 className="text-2xl text-amber-900 font-bold mb-10">More books in Fantasy</h1>

      <BookLayout />
    </div>
  );
};

export default BookDetails;
