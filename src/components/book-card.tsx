import { Button } from "./ui/button";
import { CiHeart } from "react-icons/ci";
import { FaStar, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useCart } from "@/contexts/cartContext";
import axios from "axios";

interface bookCardProp {
  bookTitle: string;
  bookUrl: string;
  bookAuthor: string;
  bookRating: number;
  bookPrice: number;
  discountedPrice: number;
  bookId: string;
  book: any;
  wishlistReload?: () => void;
}

const BookCard = ({
  bookTitle,
  bookUrl,
  bookAuthor,
  bookRating,
  bookPrice,
  discountedPrice,
  bookId,
  wishlistReload,
}: bookCardProp) => {
  const [reloadWishlist, setReloadWishlist] = useState(false);

  const url = import.meta.env.VITE_BACKEND_API;

  async function handleAddToCart(bookId: string) {
    console.log("Add to cart ran.");
    try {
      const response = await axios.post(
        `${url}/cart/add`,
        { bookId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 201) {
        toast("✅ Book added to cart");
        setReloadCartItems(prev => !prev)
      }
    } catch (err: any) {
      if (err.response.status === 400) {
        toast("❌ The book is already in cart, add another book");
      } else {
        toast("❌ Book not added to cart, try again");
      }
    }
  }

  async function addToWishlist(bookId: string) {
    try {
      const added = await axios.post(
        `${url}/books/wishlist/${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (added) {
        toast("Book added to wishlist");
        setReloadWishlist(!reloadWishlist);
      }
    } catch (e) {
      toast("Book not added, try again");
      console.log(e);
    }
  }

  async function removeFromWishlist(bookId: string) {
    try {
      const removed = await axios.delete(`${url}/books/wishlist/${bookId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (removed) {
        if (wishlistReload) wishlistReload();
        toast("Book removed from wishlist");
        setReloadWishlist(!reloadWishlist);
      }
    } catch (e) {
      toast("Book not removed, try again");
      console.log(e);
    }
  }

  const token = localStorage.getItem("token") as string;
  const userId = JSON.parse(atob(token.split(".")[1])).id;

  const { cartItems, setReloadCartItems } = useCart();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    async function getWishlist() {
      const wishlist = await axios.get(`${url}/user/wishlist/${userId}`);
      if (wishlist) setWishlist(wishlist.data.wishlistBooks);
    }
    getWishlist();
  }, [reloadWishlist]);

  return (
    <div className="w-[300px] md:w-[600px] relative border border-gray-200 rounded-xl flex flex-col overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-blue-100">
      <Link to={`/books/${bookId}`}>
        <img
          src={bookUrl}
          alt="Book image"
          className=" md:h-[400px] w-[300px] sm:w-[600px] rounded-lg duration-1000 hover:scale-105 cursor-pointer"
        />
      </Link>
      {wishlist.find((item: any) => item.bookId === bookId) ? (
        <FaHeart
          onClick={() => removeFromWishlist(bookId)}
          className="absolute top-2 right-2 bg-white/40 p-2 rounded-2xl text-red-500 "
          size={40}
        />
      ) : (
        <CiHeart
          onClick={() => addToWishlist(bookId)}
          className="absolute top-2 right-2 bg-white/40 p-2 rounded-2xl text-red-500 "
          size={40}
        />
      )}

      <div className="p-2 flex flex-col gap-2">
        <Link to={`/books/${bookId}`} className="text-blue-500 font-bold">
          {bookTitle}
        </Link>
        <Link to={`/books/${bookId}`} className="text-gray-500">
          {bookAuthor}
        </Link>
        <Link to={`/books/${bookId}`} className="flex">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              size={0}
              className={
                index < bookRating ? "text-yellow-500" : "text-gray-300"
              }
            />
          ))}
        </Link>
        <div className="flex justify-between">
          <Link to={`/books/${bookId}`} className="text-amber-600 font-bold">
            ${bookPrice}{" "} 
            <span className="line-through text-gray-500">
              ${discountedPrice}
            </span>
          </Link>
          <Button
            onClick={() => handleAddToCart(bookId)}
            className="bg-white text-gray-500 border border-amber-200 hover:bg-gray-100 hover:text-gray-800 cursor-pointer"
          >
            {cartItems.find((i) => i.bookId === bookId)
              ? "In Cart"
              : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
