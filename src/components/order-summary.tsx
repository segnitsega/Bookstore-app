import { Button } from "./ui/button";

interface props{
  price: number
}

const OrderSummary = ({price}: props) => {
  const tax = 0.07*price
  return (
    <div className="p-4 w-[400px] border rounded-lg flex flex-col gap-2 ">
      <h1 className="text-slate-800 font-bold text-2xl">Order Summary</h1>
      <div className="flex justify-between items-center">
        <p className="text-lg">Total price</p>
        <p>{price}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-lg">Shipping</p>
        <p>Free</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-lg">Tax</p>
        <p>{tax}</p>
      </div>
      <div className="my-4 border-t border-gray-400"></div>
      <div className="flex justify-between items-center">
        <p className="text-lg">Total</p>
        <p>{(tax + price).toFixed(2)}</p>
      </div>
      <Button className="bg-amber-500 hover:bg-amber-500 border hover:border-blue-500 cursor-pointer">
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default OrderSummary;
