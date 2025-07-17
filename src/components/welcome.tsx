// import Container from "./container";
import { Button } from "@/components/ui/button";
import books from "../assets/books.jpg";
import { IoMdBook } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

const Welcome = () => {
  return (
    <div className="flex flex-col gap-4 bg-amber-50 p-4 md:p-12 lg:flex-row">
      <div className="flex flex-col gap-4">
        <span className="text-white bg-amber-600 py-1 px-2 text-xs font-bold rounded-md w-[150px]">
          Welcome to BookHub
        </span>
        <h1>
          <p className="text-amber-600 text-lg md:text-5xl font-bold">
            Discover Your Next
          </p>
          <p className="text-amber-500 text-lg  md:text-5xl font-bold">Great Read</p>
        </h1>
        <p className="text-gray-600  md:text-xl md:text-balance">
          Explore thousands of books, from bestselling novels to hidden gems.
          Your perfect book is waiting to be discovered.
        </p>

        <div className="flex gap-2">
          <div className="flex items-center w-[200px] py-1 px-2 border-1 border-orange-300 shadow gap-2 rounded-md lg:w-[500px]">
            <CiSearch size={20} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search books, authors..."
              className="outline-none w-[100px] md:w-[400px]"
            />
          </div>
          <Button className="text-white bg-amber-600">Search</Button>
        </div>

        <div className="flex gap-2">
          <Button className="text-white bg-amber-600 w-[150px]">
            Browse Books
          </Button>
          <Button className="text-gray-500 bg-white border-1 border-amber-200 w-[150px]">
            View Bestsellers
          </Button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -left-4 flex items-center gap-2 p-1 bg-white w-[150px] rounded-md ">
          <IoMdBook size={25} className="text-amber-600" />
          <span>10,000+ Books</span>
        </div>
        <img src={books} alt="books_image" className="rounded-xl w-[300px] md:w-[500px] lg:w-[900px]" />
      </div>
    </div>
  );
};

export default Welcome;
