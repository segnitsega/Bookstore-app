import { RiDeleteBin5Line } from "react-icons/ri";
import { Button } from "./ui/button";
import { useState } from "react";

interface CartProp {
  imageUrl: string;
  title: string;
  price: number;
  author: string;
  description: string;
}
const CartCard = (book: CartProp) => {
  // const [count, setCount] = useState(1);
  return (
    <div className="flex gap-10">
      <div className="flex flex-col ">
        <div className="flex gap-4 rounded-md border shadow p-4">
          <img src={book.imageUrl} alt="Book image" className="w-1/10  rounded-lg" />
          <div className="w-full">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-slate-800 font-bold">{book.title}</h1>
              <RiDeleteBin5Line
                size={30}
                className="text-red-500 bg-black p-1 rounded-md cursor-pointer hover:bg-gray-500"
              />
            </div>

            <span className="text-gray-500">{book.author}</span>

            <div className="flex justify-between items-center">
              <div className="flex gap-4 mt- text-gray-500">
                <p>{book.description}</p>
              </div>
              <div>
                <p className="text-amber-500 font-bold">{`$${book.price }`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
