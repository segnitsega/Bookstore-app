import { Button } from "@/components/ui/button";
import { CiSearch } from "react-icons/ci";
import Filter from "@/components/filter-component";
import BookLayout from "@/components/book-layout";

const BooksPage = () => {
  return (
    <div className="overflow-x-hidden p-2 md:p-8">
      <h1 className="text-amber-900 text-2xl font-bold md:text-4xl">Browse Books</h1>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center my-2 md:my-4">
        <span className="text-gray-500">Showing 1-8 of 8 books</span>
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <div className="flex items-center py-1 px-1 md:px-2 border-1 border-orange-300 shadow gap-2 rounded-md w-[250px] md:w-[300px]">
            <CiSearch className="text-gray-500 w-10 md:h-5 md:w-5" />
            <input
              type="text"
              placeholder="Search books, authors..."
              className="outline-none w-[400px]"
            />
          </div>
          <Button className="hidden md:block bg-amber-500 cursor-pointer">Search</Button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="hidden md:block">
           <Filter /> 
        </div>
        
        <div className="flex flex-col gap-4 mb-8">
          <BookLayout />
          <BookLayout />
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
