import { FiPackage } from "react-icons/fi";
import books from "../assets/books.jpg";

const Orders = () => {
  return (
    <div className="border rounded-lg shadow p-4">
      <div className="flex items-center gap-2 text-slate-900 text-xl">
        <FiPackage />
        <h1>Order History</h1>
      </div>

      <div className="mt-4 broder border-gray-900 shadow p-2 rounded-lg flex items-center justify-between">
        <div className="flex gap-1 items-center">
          <img src={books} alt="book-image" className="w-10 h-12 rounded-lg"/>
          <div>
            <h1 className="text-slate-1000">The Great Gatsby</h1>
            <span className="text-gray-500">Qty: 1 * 12.99</span>
          </div>
        </div>
        <p>$12.5</p>
      </div>

       <div className="mt-4 broder border-gray-900 shadow p-2 rounded-lg flex items-center justify-between">
        <div className="flex gap-1 items-center">
          <img src={books} alt="book-image" className="w-10 h-12 rounded-lg"/>
          <div>
            <h1 className="text-slate-1000">The Great Gatsby</h1>
            <span className="text-gray-500">Qty: 1 * 12.99</span>
          </div>
        </div>
        <p>$12.5</p>
      </div>
    </div>
  );
};

export default Orders;
