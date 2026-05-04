import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPackage } from "react-icons/fi";
import { getMyOrders, type CheckoutOrder } from "@/utils/checkout";
import spinner from "../assets/spinner.svg";

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

const STATUS_STYLES: Record<string, string> = {
  paid: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  failed: "bg-red-100 text-red-700",
  expired: "bg-gray-200 text-gray-700",
};

const STATUS_LABEL: Record<string, string> = {
  paid: "Paid",
  pending: "Pending",
  failed: "Failed",
  expired: "Expired",
};

interface Props {
  /** Bubble the order count up to the parent (e.g. for the tab badge). */
  onCountChange?: (count: number) => void;
}

const Orders = ({ onCountChange }: Props) => {
  const [orders, setOrders] = useState<CheckoutOrder[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getMyOrders();
        if (cancelled) return;
        setOrders(data);
        onCountChange?.(data.length);
      } catch (e: unknown) {
        if (cancelled) return;
        const message =
          e instanceof Error ? e.message : "Could not load your orders";
        setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [onCountChange]);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center gap-2 text-lg text-slate-900 sm:text-xl">
        <FiPackage className="h-5 w-5 shrink-0" />
        <h2 className="font-semibold">Order History</h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <img src={spinner} alt="Loading orders…" className="h-12 w-12" />
        </div>
      ) : error ? (
        <div className="rounded-md bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      ) : !orders || orders.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-10 text-center text-gray-500">
          <FiPackage className="h-10 w-10 text-gray-400" />
          <p>You have no orders yet.</p>
          <Link
            to="/books"
            className="text-amber-600 underline-offset-4 hover:underline"
          >
            Browse books
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {orders.map((order) => {
            const status = order.status?.toLowerCase?.() ?? order.status;
            const totalQty = order.orderItem.reduce(
              (sum, i) => sum + (i.quantity ?? 0),
              0
            );
            return (
              <li
                key={order.id}
                className="rounded-lg border border-gray-200 p-3 sm:p-4"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-2">
                  <div>
                    <p className="text-sm text-gray-500">
                      Order{" "}
                      <span className="font-mono text-slate-700">
                        #{order.id.slice(0, 8)}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <span
                    className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                      STATUS_STYLES[status] ?? "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {STATUS_LABEL[status] ?? status}
                  </span>
                </div>

                <ul className="mt-3 divide-y divide-gray-100">
                  {order.orderItem.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:gap-3 sm:py-2"
                    >
                      {item.book.imageUrl ? (
                        <img
                          src={item.book.imageUrl}
                          alt={item.book.title}
                          className="h-12 w-9 shrink-0 rounded object-cover"
                        />
                      ) : (
                        <div className="h-12 w-9 shrink-0 rounded bg-gray-100" />
                      )}
                      <div className="min-w-0 flex-1 sm:pr-2">
                        <Link
                          to={`/books/${item.bookId}`}
                          className="block font-medium text-slate-800 hover:text-amber-600 sm:truncate"
                        >
                          {item.book.title}
                        </Link>
                        <p className="text-xs text-gray-500 sm:truncate">
                          {item.book.author}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm text-gray-600 tabular-nums sm:ml-auto sm:text-right">
                        {item.quantity} × {money(item.price)}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="mt-3 flex flex-col gap-1 border-t border-gray-100 pt-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                  <span className="text-gray-500">
                    {totalQty} item{totalQty === 1 ? "" : "s"}
                  </span>
                  <span className="font-semibold tabular-nums text-slate-800">
                    Total: {money(order.total)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Orders;
