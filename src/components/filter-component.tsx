import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { HiChevronUpDown } from "react-icons/hi2";
import { LuFilter } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { TbLetterX } from "react-icons/tb";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [genre, setGenre] = useState("Science");
  const [sort, setSort] = useState("Newest");
  const [minPrice, setMinPrice] = useState(0);
  const [price, setPrice] = useState(150);
  const [rating, setRating] = useState(3);
  console.log(searchParams)
  const applyFilter = () => {
    setSearchParams({
      minPrice: String(minPrice),
      genre: genre,
      maxPrice: String(price),
      minRating: String(rating),
    });
  };

  const resetFilter = () => {
    setGenre("Science");
    setSort("Newest");
    setPrice(150);
    setRating(3);
    setMinPrice(0);
    setSearchParams({});
  };

  return (
    <div className="p-6 h-screen max-w-4xl min-w-[300px] shadow rounded-lg flex flex-col gap-4 border border-gray-200">
      <div className="flex items-center font-bold gap-2">
        <LuFilter size={20} />
        <span className="text-2xl">Filters</span>
      </div>

      <div className="flex flex-col gap-2">
        <h1>Sort By</h1>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full flex items-center justify-between p-2 border border-gray-200 rounded-md hover:border-blue-300 cursor-pointer">
            {sort}
            <HiChevronUpDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[260px]">
            <DropdownMenuItem
              onClick={() => {
                setSort("Price: Low to high");
                setMinPrice(50);
                setPrice(500);
              }}
            >
              Price: Low to high
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSort("Price: high to Low");
                setMinPrice(50);
                setPrice(500);
              }}
            >
              Price: high to Low
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSort("Rating");
                setRating(5);
              }}
            >
              Rating
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSort("Newest");
              }}
            >
              Newest
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-2">
        <h1>Genre</h1>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full flex items-center justify-between p-2 border border-gray-200 rounded-md hover:border-blue-300 cursor-pointer">
            {genre}
            <HiChevronUpDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[260px]">
            <DropdownMenuItem
              onClick={() => {
                setGenre("Science");
              }}
            >
              Science
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setGenre("Historic");
              }}
            >
              History
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setGenre("Programming");
              }}
            >
              Programming
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setGenre("Religion");
              }}
            >
              Religion
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setGenre("Fiction");
              }}
            >
              Fiction
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-2">
        <h1>Price Range</h1>
        <Slider
          value={[price]}
          onValueChange={(value) => setPrice(value[0])}
          max={500}
          step={10}
          className="cursor-pointer"
        />
        <div className="flex justify-between text-gray-500 ">
          <span>$0</span>
          <span>$500</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <h1>Minimum Rating</h1>
        <Slider
          value={[rating]}
          onValueChange={(value) => setRating(value[0])}
          max={5}
          step={1}
          className="cursor-pointer"
        />
        <span className="text-gray-500">Any rating</span>
      </div>

      <div>
        <Button
          className="absolute bg-white text-black border border-gray-300 w-[15rem] hover:bg-gray-100 cursor-pointer hover:border-blue-500 shadow"
          onClick={resetFilter}
        >
          Reset Filter
        </Button>
        <TbLetterX className="relative top-2.5 -right-15 " />

        <Button className="mt-8 w-[15rem]" onClick={applyFilter}>
          Apply Filter
        </Button>
      </div>
    </div>
  );
};

export default Filter;
