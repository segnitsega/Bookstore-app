import { BsPerson } from "react-icons/bs";
import { FiPackage } from "react-icons/fi";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import ProfileSection from "@/components/profile-section";
import WishlistSection from "@/components/wishlist-section";
import Orders from "@/components/orders-section";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import spinner from "../assets/spinner.svg";
import { useCart } from "@/contexts/cartContext";

interface userType {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

const ProfilePage = () => {
    const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
  console.log("Items in cart", cartItems)
    
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACKEND_API;
  const [personClicked, setPersonClicked] = useState(true);
  const [wishClicked, setWishClicked] = useState(false);
  const [ordersClicked, setOrdersClicked] = useState(false);
  const [isActive, setIsActive] = useState("profile");
  const [user, setUser] = useState<userType | null>(null);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }
    const userID = JSON.parse(atob(token.split(".")[1])).id;

    async function getUserData() {
      try {
        const response = await axios.get(`${url}/user/${userID}`);
        console.log(`${url}/user/${userID}`);
        setUser(response.data.user);
        setLoading(false);
        console.log("User data:", response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    }
    getUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <img src={spinner} alt="Loading..." />
      </div>
    );
  }
  return (
    <div className="m-8">
      <div className="flex gap-4">
        <CgProfile size={50} className="text-slate-700" />
        <div>
          <h1 className="text-2xl font-bold">{`${user?.firstName} ${user?.lastName}`}</h1>
          <span className="text-gray-500">{user?.email}</span>
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
