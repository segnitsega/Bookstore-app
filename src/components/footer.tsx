import { IoMdBook } from "react-icons/io";
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { PiInstagramLogoThin } from "react-icons/pi";
import { CiMail } from "react-icons/ci";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-amber-100 bg-gradient-to-b from-amber-50 to-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 md:grid-cols-3 md:gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-1.5">
            <IoMdBook size={35} className="text-amber-600" />
            <h1 className="text-xl font-bold tracking-tight text-amber-900 md:text-2xl">
              BookHub
            </h1>
          </div>

          <p className="max-w-sm text-sm leading-6 text-gray-600">
            Your gateway to endless stories. Discover, explore, and enjoy the
            world's finest collection of books.
          </p>

          <div className="flex items-center gap-4 text-2xl text-gray-500">
            <a href="#" className="transition-colors hover:text-amber-600">
              <CiFacebook />
            </a>
            <a href="#" className="transition-colors hover:text-amber-600">
              <CiTwitter />
            </a>
            <a href="#" className="transition-colors hover:text-amber-600">
              <PiInstagramLogoThin />
            </a>
            <a href="#" className="transition-colors hover:text-amber-600">
              <CiMail />
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-amber-900 md:text-xl">
            Quick Links
          </h2>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <Link to="/dashboard" className="transition-colors hover:text-amber-600">
              Home
            </Link>
            <Link to="/books" className="transition-colors hover:text-amber-600">
              Browse Books
            </Link>
            <Link to="/cart" className="transition-colors hover:text-amber-600">
              Shopping Cart
            </Link>
            <Link to="/profile" className="transition-colors hover:text-amber-600">
              My Account
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-amber-900 md:text-xl">
            Customer Service
          </h2>
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <p className="transition-colors hover:text-amber-600">Contact Us</p>
            <p className="transition-colors hover:text-amber-600">Shipping Info</p>
            <p className="transition-colors hover:text-amber-600">Returns & Exchanges</p>
            <p className="transition-colors hover:text-amber-600">FAQ</p>
          </div>
        </div>
      </div>

      <div className="border-t border-amber-200/70">
        <div className="mx-auto flex w-full max-w-7xl flex-col justify-between gap-3 px-4 py-5 text-sm text-gray-500 md:flex-row md:items-center">
          <p>© 2026 BookHub. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            <p className="transition-colors hover:text-amber-600">Privacy Policy</p>
            <p className="transition-colors hover:text-amber-600">Terms of Service</p>
            <p className="transition-colors hover:text-amber-600">Cookie Policy</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
