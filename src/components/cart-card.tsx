import book from "../assets/books.jpg";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Button } from "./ui/button";

const CartCard = () => {
  return (
    <div className="flex gap-10">
      <div className="flex flex-col ">
        <div className="flex gap-4 rounded-md border shadow p-4">
          <img src={book} alt="" className="w-1/10  rounded-lg" />
          <div className="w-full">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-slate-800 font-bold">Dune</h1>
              <RiDeleteBin5Line
                size={30}
                className="text-red-500 bg-black p-1 rounded-md cursor-pointer hover:bg-gray-500"
              />
            </div>

            <span className="text-gray-500">Frank Herbet</span>

            <div className="flex justify-between items-center">
              <div className="flex gap-4 mt-4">
                <Button className="bg-white text-gray-500 border hover:bg-gray-100 hover:border-blue-500 cursor-pointer">
                  -
                </Button>
                <Button className="bg-white text-gray-500  border hover:bg-gray-100 hover:border-blue-500 cursor-pointer  px-8">
                  2
                </Button>
                <Button className="bg-white text-gray-500  border hover:bg-gray-100 hover:border-blue-500 cursor-pointer">
                  +
                </Button>
              </div>

              <div>
                <p className="text-amber-500 font-bold">$37.98</p>
                <p className="text-gray-500">$18.99 each</p>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>

      <div></div>
    </div>
  );
};

export default CartCard;
