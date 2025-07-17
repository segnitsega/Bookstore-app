// import Container from "./container";
import { MdOutlineLocalShipping } from "react-icons/md";
import { LuShield } from "react-icons/lu";
import { CiHeart } from "react-icons/ci";

const Card = () => {
  return (
    <div className="flex flex-col items-center gap-4 md:flex-row justify-around mb-8">
      <div className=" border border-gray-200 shadow  rounded-md px-6 py-4  md:px-8 md:py-6 flex w-[300px] flex-col items-center md:w-[400px] gap-2">
        <MdOutlineLocalShipping
          size={40}
          className="text-amber-600 bg-amber-100 p-2 rounded-xl"
        />
        <h1 className="font-bold">Free Shipping</h1>
        <p className="text-gray-500">Free delivery on orders over $50</p>
      </div>
      <div className=" border border-gray-200 shadow rounded-md px-6 py-4  md:px-8 md:py-6 flex w-[300px] flex-col items-center md:w-[400px] gap-2 text-center">
        <LuShield
          size={40}
          className="text-amber-600 bg-amber-100 p-2 rounded-xl"
        />
        <h1 className="font-bold">Secure Payment</h1>
        <p className="text-gray-500">Your payment information is protected</p>
      </div>
      <div className=" border border-gray-200 shadow rounded-md px-6 py-4  md:px-8 md:py-6 flex w-[300px] flex-col items-center md:w-[400px] gap-2 text-center">
        <CiHeart
          size={40}
          className="text-amber-600 bg-amber-100 p-2 rounded-xl"
        />
        <h1 className="font-bold">Curated Selection</h1>
        <p className="text-gray-500">Hand-picked books for every reader</p>
      </div>
    </div>
  );
};

export default Card;
