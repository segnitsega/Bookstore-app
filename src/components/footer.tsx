import { IoMdBook } from "react-icons/io";
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { PiInstagramLogoThin } from "react-icons/pi";
import { CiMail } from "react-icons/ci";

const Footer = () => {
  return (
    <div className="bg-amber-50 border-t border-gray-200">
      <div className="flex flex-col md:flex-row mx-4 justify-between  py-8 px-2">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-1">
            <IoMdBook size={35} className="text-amber-600" />
            <h1 className="text-amber-900 font-bold text-2xl">BookHub</h1>
          </div>

          <p className="text-gray-500 max-w-sm">
            Your gateway to endless stories. Discover, explore, and enjoy the
            world's finest collection of books.
          </p>

          <div className="flex gap-4 text-gray-500 text-2xl">
            <CiFacebook />
            <CiTwitter />
            <PiInstagramLogoThin />
            <CiMail />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-amber-900 font-bold text-2xl">Quick Links</h1>
          <p className="text-gray-500">Home</p>
          <p className="text-gray-500">Browse Books</p>
          <p className="text-gray-500">Shopping Cart</p>
          <p className="text-gray-500">My Account</p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-amber-900 font-bold text-2xl">
            Customer Service
          </h1>
          <p className="text-gray-500">Contact Us</p>
          <p className="text-gray-500">Shipping Info</p>
          <p className="text-gray-500">Returns & Exchanges</p>
          <p className="text-gray-500">FAQ</p>
        </div>
      </div>
      <div className="border-t border-amber-200"></div>

      <div className="flex flex-col md:flex-row text-gray-500 justify-between m-8">
        <p>© 2025 BookHub. All rights reserved.</p>
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
            <p>Privacy Policy</p>
        <p>Terms of Service</p>
        <p>Cookie Policy</p>
        </div>
        
      </div>
    </div>
  );
};

export default Footer;
