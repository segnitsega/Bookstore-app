import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { createCheckoutSession } from "@/utils/checkout";

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

interface props {
  price: number;
  /** Disable the checkout button (e.g. cart is empty). Defaults to false. */
  disabled?: boolean;
}

const OrderSummary = ({ price, disabled = false }: props) => {
  const tax = 0.07 * price;
  const grandTotal = tax + price;

  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (loading || disabled) return;
    try {
      setLoading(true);
      const { url } = await createCheckoutSession();
      if (!url) {
        throw new Error("No checkout URL returned");
      }
      window.location.href = url;
    } catch (err: unknown) {
      const message =
        (typeof err === "object" &&
          err !== null &&
          "response" in err &&
          (err as { response?: { data?: { message?: string } } }).response?.data
            ?.message) ||
        (err instanceof Error ? err.message : "Could not start checkout");
      toast.error(message);
      setLoading(false);
    }
  };

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
      <Button
        type="button"
        onClick={handleCheckout}
        disabled={loading || disabled}
        className="cursor-pointer border bg-amber-500 text-white hover:border-blue-500 hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Redirecting to Stripe…" : "Proceed to Checkout"}
      </Button>
    </div>
  );
};

export default OrderSummary;
