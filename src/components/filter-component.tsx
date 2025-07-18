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

const Filter = () => {
  return (
    <div className="m-10 p-6 w-[350px] shadow rounded-lg flex flex-col gap-4 border border-gray-200">
      <div className="flex items-center font-bold gap-2">
        <LuFilter size={20} />
        <span className="text-2xl">Filters</span>
      </div>

      <div className="flex flex-col gap-2">
        <h1>Sort By</h1>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full flex items-center justify-between p-2 border border-gray-200 rounded-md hover:border-blue-300 cursor-pointer">
            Title
            <HiChevronUpDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[260px]">
            <DropdownMenuItem>Title</DropdownMenuItem>
            <DropdownMenuItem>Price: Low to high</DropdownMenuItem>
            <DropdownMenuItem>Price: high to Low</DropdownMenuItem>
            <DropdownMenuItem>Rating</DropdownMenuItem>
            <DropdownMenuItem>Newest</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-2">
        <h1>Genre</h1>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full flex items-center justify-between p-2 border border-gray-200 rounded-md hover:border-blue-300 cursor-pointer">
            Title
            <HiChevronUpDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[260px]">
            <DropdownMenuItem>Title</DropdownMenuItem>
            <DropdownMenuItem>Price: Low to high</DropdownMenuItem>
            <DropdownMenuItem>Price: high to Low</DropdownMenuItem>
            <DropdownMenuItem>Rating</DropdownMenuItem>
            <DropdownMenuItem>Newest</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-2">
        <h1>Author</h1>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full flex items-center justify-between p-2 border border-gray-200 rounded-md hover:border-blue-300 cursor-pointer">
            Title
            <HiChevronUpDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[260px]">
            <DropdownMenuItem>Title</DropdownMenuItem>
            <DropdownMenuItem>Price: Low to high</DropdownMenuItem>
            <DropdownMenuItem>Price: high to Low</DropdownMenuItem>
            <DropdownMenuItem>Rating</DropdownMenuItem>
            <DropdownMenuItem>Newest</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-2">
        <h1>Price Range</h1>
        <Slider
          defaultValue={[33]}
          max={100}
          step={1}
          className="cursor-pointer"
        />
        <div className="flex justify-between text-gray-500 ">
          <span>$0</span>
          <span>$50</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <h1>Maximum Rating</h1>
        <Slider
          defaultValue={[33]}
          max={100}
          step={1}
          className="cursor-pointer"
        />
        <span className="text-gray-500">Any rating</span>
      </div>

      <div>
        <Button className="absolute bg-white text-black border border-gray-300 w-[15rem] hover:bg-gray-100 cursor-pointer hover:border-blue-500 shadow">
          Reset Filter
        </Button>
        <TbLetterX className="relative top-2.5 -right-15 " />
      </div>
    </div>
  );
};

export default Filter;
