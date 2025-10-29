import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa6";
import { FaStar, FaHeart } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { CiShoppingCart } from "react-icons/ci";
import type { bookType } from "@/components/best-sellers";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BookCard from "@/components/book-card";
import { toast } from "sonner";
import { useCart } from "@/contexts/cartContext";
import { CiHeart } from "react-icons/ci";

const BookDetails = () => {
  const { id } = useParams();
  const url = import.meta.env.VITE_BACKEND_API;
  const [book, setBook] = useState<bookType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | Error | unknown | null>(null);
  const [bookByGenre, setBookByGenre] = useState<bookType | null>(null);
  const [loadingByGenre, setLoadingByGenre] = useState(true);
  const [errorByGenre, setErrorByGenre] = useState<
    string | Error | unknown | null
  >(null);
  const { cartItems, setReloadCartItems, reloadCartItems } = useCart();
  const [reloadWishlist, setReloadWishlist] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const token = localStorage.getItem("token") as string;
  const userId = JSON.parse(atob(token.split(".")[1])).id;

  useEffect(() => {
    async function getWishlist() {
      const wishlist = await axios.get(`${url}/user/wishlist/${userId}`);
      if (wishlist) setWishlist(wishlist.data.wishlistBooks);
    }
    getWishlist();
  }, [reloadWishlist]);

  useEffect(() => {
    async function getBook() {
      try {
        const response = await axios(`${url}/books/${id}`);
        setBook(response.data.book);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    }
    getBook();
  }, []);

  useEffect(() => {
    async function getBookByGenre(genre: string) {
      try {
        const response = await axios(`${url}/books/genre/${genre}/?limit=4`);
        setBookByGenre(response.data.books);
        setLoadingByGenre(false);
      } catch (e) {
        setErrorByGenre(e);
        setLoadingByGenre(false);
      }
    }
    if (book) {
      getBookByGenre(book.genre);
    }
  }, [book]);

  async function handleAddToCart(bookId: any) {
    console.log("Add to cart ran.");
    // const response = await addToCart(bookId);
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
        setReloadCartItems((prev) => !prev);
      }
    } catch (err: any) {
      if (err.response.status === 400) {
        toast("❌ The book is already in cart, add another book");
      } else {
        toast("❌ Book not added to cart, try again");
      }
    }
  }

  async function addToWishlist(bookId: any) {
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

  async function removeFromWishlist(bookId: any) {
    try {
      const removed = await axios.delete(`${url}/books/wishlist/${bookId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (removed) {
        // if (wishlistReload) wishlistReload();
        toast("Book removed from wishlist");
        setReloadWishlist(!reloadWishlist);
      }
    } catch (e) {
      toast("Book not removed, try again");
      console.log(e);
    }
  }

  return (
    <div className="m-8">
      <Button className=" bg-amber-500 cursor-pointer w-20 border hover:border-blue-500 hover:bg-amber-600">
        Back
      </Button>
      <FaArrowLeft className="relative -top-7 left-1 text-white" />

      <div className="flex w-full gap-10">
        <img src={book?.imageUrl} alt="" className="w-xl rounded-lg shadow" />
        <div className="flex flex-col gap-4">
          <h1 className="text-slate-800 font-bold text-3xl">{book?.title}</h1>
          <span className="text-amber-600 text-xl">{book?.author}</span>
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                size={0}
                className={
                  index < (book?.bookRating as number)
                    ? "text-yellow-500"
                    : "text-gray-300"
                }
              />
            ))}
            <p>
              <span className="text-gray-500">({book?.reviews} reviews)</span>
            </p>
          </div>
          <span className="text-amber-600 text-2xl font-bold">$16.99</span>
          <h1 className="text-slate-800 font-bold text-xl">Description</h1>
          <p className="text-gray-500">{book?.description}</p>

          <div className="flex flex-col gap-2 p-4 border border-gray-200 rounded-lg shadow mt-4">
            <div className="flex justify-between">
              <h1 className="text-gray-500 text-lg">Genre</h1>
              <p className="bg-gray-300 rounded-md p-1 text-slate-1000">
                {book?.genre}
              </p>
            </div>
            <div className="flex justify-between">
              <h1 className="text-gray-500 text-lg">Pages</h1>
              <div className="flex items-center gap-1">
                <p>{book?.pages}</p>
              </div>
            </div>
            <div className="flex justify-between">
              <h1 className="text-gray-500 text-lg">Published</h1>
              <div className="flex items-center gap-1">
                <SlCalender />
                <p>{book?.publishedDate}</p>
              </div>
            </div>
            <div className="flex justify-between">
              <h1 className="text-gray-500 text-lg">Publisher</h1>
              <p> {book?.publisher}</p>
            </div>
            <div className="flex justify-between">
              <h1 className="text-gray-500 text-lg">ISBN</h1>
              <p>{book?.isbn}</p>
            </div>
          </div>
          <div className="flex gap-4 items-center mt-4">
            {cartItems.find((i) => i.bookId === book?.id) ? (
              <Button className="w-md bg-amber-300 hover:bg-amber-300 text-lg border ">
                <CiShoppingCart /> In cart
              </Button>
            ) : (
              <Button
                onClick={() => handleAddToCart(book?.id)}
                className="w-md bg-amber-500 text-lg border hover:border-blue-500 cursor-pointer hover:bg-amber-600"
              >
                <CiShoppingCart /> Add to Cart
              </Button>
            )}

            <div className="border  border-amber-500 rounded-md py-2 px-8 hover:border-amber-600 cursor-pointer">
              {wishlist.find((item: any) => item.bookId === book?.id) ? (
                <FaHeart
                  onClick={() => removeFromWishlist(book?.id)}
                  className="text-red-500"
                  size={20}
                />
              ) : (
                <CiHeart
                  onClick={() => addToWishlist(book?.id)}
                  className="text-red-500 hover:text-red-600"
                  size={20}
                />
              )}

              {/* <FaHeart className="text-red-500 " size={20} /> */}
            </div>
          </div>
          <span className="bg-green-50 p-2 rounded-md text-gray-500">
            ✓ Free shipping on orders over $50
          </span>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-16 mb-10"></div>

      <h1 className="text-2xl text-amber-900 font-bold mb-10">
        More books on {book?.genre}
      </h1>

      <div className="flex gap-6">
        {bookByGenre?.map((book: bookType, i: number) => (
          <BookCard
            key={i}
            bookId={book.id}
            bookTitle={book.title}
            bookUrl={book.imageUrl}
            bookAuthor={book.author}
            bookRating={book.bookRating}
            bookPrice={book.price}
            discountedPrice={book.price * 2}
          />
        ))}
      </div>
    </div>
  );
};

export default BookDetails;
