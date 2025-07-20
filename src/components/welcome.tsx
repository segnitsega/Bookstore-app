import { Button } from "@/components/ui/button";
import books from "../assets/books.jpg";
import { IoMdBook } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { IoMenuOutline } from "react-icons/io5";

const Welcome = () => {
  return (
    <div className="flex flex-col gap-4 bg-amber-50 p-2  md:p-12 lg:flex-row">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-6">
          <IoMenuOutline className="text-amber-600 md:hidden" />
          <div className="flex items-center justify-center">
            <IoMdBook className="md:hidden -ml-2 text-amber-600" size={25} />
            <span className="text-amber-600 text-xl md:text-white md:bg-amber-600 py-1 px-2 md:text-xs font-bold rounded-md md:w-[150px]">
              Welcome to BookHub
            </span>
          </div>
        </div>

        <h1>
          <p className="text-amber-600 text-lg md:text-5xl font-bold">
            Discover Your Next
          </p>
          <p className="text-amber-500 text-lg  md:text-5xl font-bold">
            Great Read
          </p>
        </h1>
        <p className="text-gray-600 text-sm  md:text-xl md:text-balance">
          Explore thousands of books, from bestselling novels to hidden gems.
          Your perfect book is waiting to be discovered.
        </p>
        <div className="flex gap-2">
          <div className="flex items-center w-[180px] py-1 px-1 md:px-2 border-1 border-orange-300 shadow gap-2 rounded-md lg:w-[500px]">
            <CiSearch size={20} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search books, authors..."
              className="outline-none text-xs md:text-lg w-[100px] md:w-[400px]"
            />
          </div>
          <Button className="text-white bg-amber-600  cursor-pointer border hover:border-blue-500 hover:bg-amber-500">Search</Button>
        </div>
        <div className="flex gap-2">
          <Button className="text-white bg-amber-600 w-[100px]  md:w-150px] cursor-pointer border hover:border-blue-500 hover:bg-amber-500">
            Browse Books
          </Button>
          <Button className="text-blue-500 bg-white border-1 border-amber-200 md:w-[150px] text-xs md:text-lg hover:bg-gray-100 hover:text-gray-800 cursor-pointer"> 
            View Bestsellers
          </Button>
        </div>
      </div>

      <div className="relative ml-2 md:ml-0 mt-8 md:mt-0">
        <div className="absolute -left-4 flex text-xs md:text-lg  items-center md:gap-2 md:p-1 bg-white w-[100px] md:w-[150px] rounded-md ">
          <IoMdBook size={25} className="text-amber-600" />
          <span>10,000+ Books</span>
        </div>
        <img
          src={books}
          alt="books_image" 
          className="rounded-xl w-[270px] md:w-[500px] lg:w-[900px] shadow-lg shadow-blue-100"
        />
      </div>
    </div>
  );
};

export default Welcome;
