import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./book-card";

const token = localStorage.getItem("token") as string;
  let userId = ""
  if (token){
    userId = JSON.parse(atob(token.split(".")[1])).id;

  } else{
    console.log("no token")
  }
const url = import.meta.env.VITE_BACKEND_API;

const WishlistSection = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [wishlistReload, setWishlistReload] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const wishlist = await axios.get(`${url}/user/wishlist/${userId}`);
        console.log(wishlist);
        setBooks(wishlist.data.wishlistBooks);
        console.log("Here is your wishlist", wishlist);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [wishlistReload]);

  return (
    <div className="border rounded-lg shadow p-4">
      <h1 className="text-slate-1000 text-2xl">My Wishlist</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {books.map((book: any, index) => (
            <BookCard
              key={index}
              bookId={book.book.id}
              bookTitle={book.book.title}
              bookUrl={book.book.imageUrl}
              bookAuthor={book.book.author}
              bookRating={book.book.bookRating}
              bookPrice={book.book.price}
              discountedPrice={book.book.price * 2}
              wishlistReload={() => setWishlistReload(!wishlistReload)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistSection;
