import { Button } from "./ui/button";

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

interface props {
  price: number;
}

const OrderSummary = ({ price }: props) => {
  const tax = 0.07 * price;
  const grandTotal = tax + price;
  return (
    <div className="flex w-full max-w-md flex-col gap-2 rounded-lg border p-4 lg:w-[400px]">
      <h2 className="text-2xl font-bold text-slate-800">Order Summary</h2>
      <div className="flex items-center justify-between">
        <p className="text-lg">Subtotal</p>
        <p className="tabular-nums">{money(price)}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-lg">Shipping</p>
        <p>Free</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-lg">Tax (7%)</p>
        <p className="tabular-nums">{money(tax)}</p>
      </div>
      <div className="my-4 border-t border-gray-400" />
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Total</p>
        <p className="tabular-nums font-semibold">{money(grandTotal)}</p>
      </div>
      <Button className="cursor-pointer border bg-amber-500 hover:border-blue-500 hover:bg-amber-500">
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default OrderSummary;
