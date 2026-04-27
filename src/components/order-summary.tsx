import { useState } from "react";
import { toast } from "sonner";
import { LuLock, LuShieldCheck } from "react-icons/lu";
import { Button } from "./ui/button";
import { createCheckoutSession } from "@/utils/checkout";

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

interface props {
  price: number;
  /** Disable the checkout button (e.g. cart is empty). Defaults to false. */
  disabled?: boolean;
  /** Optional item count, shown in the header for context. */
  itemCount?: number;
}

const TAX_RATE = 0.07;

const OrderSummary = ({ price, disabled = false, itemCount }: props) => {
  const tax = TAX_RATE * price;
  const grandTotal = tax + price;

  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (loading || disabled) return;
    try {
      setLoading(true);
      const { url } = await createCheckoutSession();
      if (!url) throw new Error("No checkout URL returned");
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
    <div className="flex w-full flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xl font-bold text-slate-800">Order Summary</h2>
        {typeof itemCount === "number" && (
          <span className="text-sm text-gray-500">
            {itemCount} item{itemCount === 1 ? "" : "s"}
          </span>
        )}
      </div>

      <dl className="flex flex-col gap-2 text-slate-700">
        <div className="flex items-center justify-between">
          <dt>Subtotal</dt>
          <dd className="tabular-nums">{money(price)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt>Shipping</dt>
          <dd className="text-emerald-600">Free</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt>Tax (7%)</dt>
          <dd className="tabular-nums">{money(tax)}</dd>
        </div>
      </dl>

      <div className="my-1 border-t border-dashed border-gray-300" />

      <div className="flex items-baseline justify-between">
        <span className="text-base font-semibold text-slate-800">Total</span>
        <span className="text-2xl font-bold tabular-nums text-slate-900">
          {money(grandTotal)}
        </span>
      </div>

      <Button
        type="button"
        onClick={handleCheckout}
        disabled={loading || disabled}
        className="mt-2 h-11 w-full cursor-pointer bg-amber-500 text-base font-semibold text-white shadow-sm hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <LuLock className="mr-2 h-4 w-4" aria-hidden />
        {loading ? "Redirecting to Stripe…" : "Proceed to Checkout"}
      </Button>

      <p className="mt-1 flex items-center justify-center gap-1.5 text-xs text-gray-500">
        <LuShieldCheck className="h-3.5 w-3.5 text-emerald-500" aria-hidden />
        Secure payment via Stripe
      </p>
    </div>
  );
};

export default OrderSummary;
