import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cartContext";
import {
  getOrderBySessionId,
  type CheckoutOrder,
} from "@/utils/checkout";
import spinner from "@/assets/spinner.svg";

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

const STATUS_LABEL: Record<string, string> = {
  paid: "Payment confirmed",
  pending: "Waiting for payment confirmation",
  failed: "Payment failed",
  expired: "Checkout session expired",
};

const CheckoutSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { setReloadCartItems } = useCart();

  const [order, setOrder] = useState<CheckoutOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError("Missing checkout session id");
      setLoading(false);
      return;
    }

    let cancelled = false;
    let attempts = 0;

    const poll = async () => {
      while (!cancelled && attempts < 5) {
        attempts += 1;
        try {
          const data = await getOrderBySessionId(sessionId);
          if (cancelled) return;
          setOrder(data);
          if (data.status === "paid") {
            setLoading(false);
            setReloadCartItems((prev) => !prev);
            return;
          }
          if (data.status === "failed" || data.status === "expired") {
            setLoading(false);
            return;
          }
        } catch (e: unknown) {
          if (attempts >= 5) {
            const message =
              e instanceof Error ? e.message : "Could not load order";
            setError(message);
            setLoading(false);
            return;
          }
        }
        await new Promise((r) => setTimeout(r, 1500));
      }
      if (!cancelled) setLoading(false);
    };

    poll();
    return () => {
      cancelled = true;
    };
  }, [sessionId, setReloadCartItems]);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 p-6 md:p-10">
      <div className="flex flex-col items-center gap-3 text-center">
        {loading ? (
          <>
            <img src={spinner} alt="" className="h-16 w-16" />
            <h1 className="text-2xl font-bold text-slate-800">
              Confirming your payment…
            </h1>
            <p className="text-gray-500">This usually takes a few seconds.</p>
          </>
        ) : error ? (
          <>
            <h1 className="text-2xl font-bold text-red-700">
              We couldn't load your order
            </h1>
            <p className="text-gray-600">{error}</p>
          </>
        ) : order?.status === "paid" ? (
          <>
            <FaCheckCircle className="h-14 w-14 text-emerald-500" />
            <h1 className="text-3xl font-bold text-slate-800">
              Thank you for your order!
            </h1>
            <p className="text-gray-500">
              Order <span className="font-mono">{order.id.slice(0, 8)}</span> ·{" "}
              {STATUS_LABEL[order.status] ?? order.status}
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-amber-700">
              {STATUS_LABEL[order?.status ?? ""] ??
                "We could not confirm your payment"}
            </h1>
            <p className="text-gray-600">
              If you believe this is a mistake, please contact support.
            </p>
          </>
        )}
      </div>

      {order && order.orderItem.length > 0 && (
        <div className="rounded-lg border bg-white">
          <div className="border-b p-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Order summary
            </h2>
          </div>
          <ul className="divide-y">
            {order.orderItem.map((item) => (
              <li key={item.id} className="flex items-center gap-4 p-4">
                {item.book.imageUrl ? (
                  <img
                    src={item.book.imageUrl}
                    alt={item.book.title}
                    className="h-16 w-12 shrink-0 rounded object-cover"
                  />
                ) : (
                  <div className="h-16 w-12 shrink-0 rounded bg-gray-100" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-slate-800">
                    {item.book.title}
                  </p>
                  <p className="text-sm text-gray-500">{item.book.author}</p>
                </div>
                <div className="text-right">
                  <p className="tabular-nums">{money(item.price)}</p>
                  <p className="text-xs text-gray-500">
                    Qty {item.quantity}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between border-t p-4">
            <p className="text-lg font-semibold">Total</p>
            <p className="tabular-nums text-lg font-semibold">
              {money(order.total)}
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild className="bg-amber-500 hover:bg-amber-600">
          <Link to="/books">Continue shopping</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/profile">View profile</Link>
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
