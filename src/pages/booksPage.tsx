import { Button } from "@/components/ui/button";
import { CiSearch } from "react-icons/ci";
import Filter from "@/components/filter-component";

const BooksPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-amber-600 font-bold text-4xl">Browse Books</h1>

      <div className="flex justify-between items-center my-4">
        <span className="text-gray-500">Showing 1-8 of 8 books</span>
        <div className="flex items-center gap-2">
          <div className="flex items-center py-1 px-2 border-1 border-orange-300 shadow gap-2 rounded-md w-[300px]">
            <CiSearch size={20} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search books, authors..."
              className="outline-none w-[400px]"
            />
          </div>
          <Button className="bg-amber-500">Search</Button>
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
