import { FcPicture } from "react-icons/fc";
import { BsPerson } from "react-icons/bs";
import { FiPackage } from "react-icons/fi";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import ProfileSection from "@/components/profile-section";
import WishlistSection from "@/components/wishlist-section";
import Orders from "@/components/orders-section";

const ProfilePage = () => {
  const [personClicked, setPersonClicked] = useState(false);
  const [wishClicked, setWishClicked] = useState(false);
  const [ordersClicked, setOrdersClicked] = useState(false);

  return (
    <div className="m-8">
      <div className="flex gap-4">
        <FcPicture size={50} className="rounded-lg" />
        <div>
          <h1 className="text-2xl font-bold">John Doe</h1>
          <span className="text-gray-500">john.doe@example.com</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* buttons */}
        <div className="mt-8 flex">
          <div className="flex items-center">
            <BsPerson className="relative -right-24 text-lg text-slate-800" />
            <button
              onClick={() => {
                setPersonClicked(true);
                setWishClicked(false);
                setOrdersClicked(false);
              }}
              className={`-ml-4 bg-amber-500 px-30 py-1 rounded-lg text-slate-800 text-lg border shadow cursor-pointer ${
                personClicked && "bg-white"
              }`}
            >
              Profile
            </button>
          </div>

          <div className="flex items-center">
            <FaRegHeart className="relative -right-28 text-lg text-slate-800" />
            <button
              onClick={() => {
                setWishClicked(true);
                setOrdersClicked(false);
                setPersonClicked(false);
              }}
              className={`bg-amber-500 px-30 py-1 rounded-lg text-slate-800 text-lg border shadow cursor-pointer ${
                wishClicked && "bg-white"
              }`}
            >
              Wishlist (2)
            </button>
          </div>

          <div className="flex items-center">
            <FiPackage className="relative -right-28 text-lg text-slate-800" />
            <button
              onClick={() => {
                setOrdersClicked(true);
                setPersonClicked(false);
                setWishClicked(false);
              }}
              className={`bg-amber-500 px-30 py-1 rounded-lg text-slate-800 text-lg border shadow cursor-pointer ${
                ordersClicked && "bg-white"
              }`}
            >
              Orders (1)
            </button>
          </div>
        </div>
        <div className="w-[990px]">
          {/* <ProfileSection /> */}
          {/* <WishlistSection /> */}

          <Orders />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
