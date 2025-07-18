import CartCard from "@/components/cart-card";
import OrderSummary from "@/components/order-summary";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";

const CartPage = () => {
  return (
    <div className="m-8">
      <div className="flex items-center">
        <Button className=" bg-amber-500 border hover:border-blue-500 cursor-pointer hover:bg-amber-600 px-6">
          Continue shopping
        </Button>
        <FaArrowLeft className="relative -top- right-42 text-white text-sm" />
        <div>
          <h1 className="text-slate-800 text-3xl font-bold">Shopping Cart</h1>
          <span className="text-gray-500">2 items</span>
        </div>
      </div>

      <div className="flex align-top">
        <div className="flex flex-col gap-4 mt-4">
          <CartCard />
          <CartCard />
          <CartCard />
        </div>
        <div>
        <OrderSummary />

        </div>
      </div>
    </div>
  );
};

export default CartPage;
