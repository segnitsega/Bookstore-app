import { IoMdBook } from "react-icons/io";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { FcPicture } from "react-icons/fc";
import {Link} from "react-router-dom";
import { useState } from "react";
import { Button } from "./ui/button";

const NavBar = () => {
  const [logedIn, setLoggedIn] = useState(false);
  return (
    <div className="hidden sticky top-0 z-50 bg-white/3  backdrop-blur-lg border-b md:flex items-center justify-between p-2">
      <div className="flex items-center gap-1">
        <IoMdBook size={35} className="text-amber-600" />
        <h1 className="text-amber-900 font-bold text-2xl">BookHub</h1>
      </div>
      <div className="flex items-center gap-10 text-lg">
        <span className="hover:text-amber-600 cursor-pointer"><Link to="/">Home</Link></span>
        <span className="hover:text-amber-600 cursor-pointer"><Link to="/books">Books</Link></span>
      </div>
      <div className="flex items-center py-1 px-2 border-1 border-orange-300 shadow gap-2 rounded-md w-[500px]">
        <CiSearch size={20} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search books, authors..."
          className="outline-none w-[400px]"
        />
      </div>
      <div className="flex items-center gap-8">
        <div className="relative">
          <Link to="cart"><CiShoppingCart size={30} className="text-blue-600 cursor-pointer" /></Link>
          <span className="absolute -top-2 -right-3 w-5 h-5 flex items-center justify-center bg-amber-600 text-white text-sm rounded-lg">
            2
          </span>
        </div>
        {
          logedIn ? <Link to="/profile"><FcPicture size={35} className="cursor-pointer"/></Link> : <Link to="/signin"><Button className="bg-white text-blue-500 border cursor-pointer hover:bg-white hover:border-blue-300">Sign in</Button></Link>
        }
        
      </div>
    </div>
  );
};

export default NavBar;
