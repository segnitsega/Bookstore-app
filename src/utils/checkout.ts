import axios from "axios";

export type CheckoutSessionResponse = {
  url: string;
  sessionId: string;
  orderId: string;
};

export type CheckoutOrderItem = {
  id: string;
  bookId: string;
  quantity: number;
  price: number;
  book: {
    id: string;
    title: string;
    author: string;
    imageUrl: string | null;
  };
};

export type CheckoutOrder = {
  id: string;
  userId: string;
  total: number;
  status: "pending" | "paid" | "failed" | "expired" | string;
  stripeSessionId: string | null;
  createdAt: string;
  orderItem: CheckoutOrderItem[];
};

const API = import.meta.env.VITE_BACKEND_API as string | undefined;

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Creates a Stripe Checkout session on the backend and returns the redirect URL.
 * The caller should redirect the browser to `url` (e.g. window.location.href = url).
 */
export async function createCheckoutSession(): Promise<CheckoutSessionResponse> {
  if (!API) throw new Error("VITE_BACKEND_API is not configured");

  const res = await axios.post<CheckoutSessionResponse>(
    `${API}/payment/create-checkout-session`,
    {},
    { headers: authHeaders() }
  );
  return res.data;
}

/** Fetch order metadata for the success page using the Stripe session id from the URL. */
export async function getOrderBySessionId(
  sessionId: string
): Promise<CheckoutOrder> {
  if (!API) throw new Error("VITE_BACKEND_API is not configured");

  const res = await axios.get<{ order: CheckoutOrder }>(
    `${API}/payment/session/${encodeURIComponent(sessionId)}`,
    { headers: authHeaders() }
  );
  return res.data.order;
}

/** Fetch the authenticated user's order history (newest first). */
export async function getMyOrders(): Promise<CheckoutOrder[]> {
  if (!API) throw new Error("VITE_BACKEND_API is not configured");

  const res = await axios.get<{ orders: CheckoutOrder[] }>(
    `${API}/payment/orders`,
    { headers: authHeaders() }
  );
  return res.data.orders ?? [];
}
