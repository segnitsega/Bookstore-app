import { FcPicture } from "react-icons/fc";
import { BsPerson } from "react-icons/bs";
import { FiPackage } from "react-icons/fi";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import ProfileSection from "@/components/profile-section";
import WishlistSection from "@/components/wishlist-section";
import Orders from "@/components/orders-section";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface userType {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

const ProfilePage = () => {
  const url = import.meta.env.VITE_API_URL;
  const [personClicked, setPersonClicked] = useState(true);
  const [wishClicked, setWishClicked] = useState(false);
  const [ordersClicked, setOrdersClicked] = useState(false);
  const [isActive, setIsActive] = useState("profile");

  const token = localStorage.getItem("token");
  const userID = token ? JSON.parse(atob(token.split(".")[1])).userId : null;

  console.log("User ID:", userID);
  
  const [user, setUser] = useState<userType | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
    async function getUserData() {
      try {
        const response = await axios.get(`${url}/api/user/${userID}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // navigate("/signin");
      }
    }
    getUserData();
  }, []);

  console.log("User data:", user);
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
                setIsActive("profile");
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
                setIsActive("wishlist");
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
                setIsActive("orders");
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
          {isActive === "profile" && <ProfileSection />}
          {isActive === "wishlist" && <WishlistSection />}
          {isActive === "orders" && <Orders />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
