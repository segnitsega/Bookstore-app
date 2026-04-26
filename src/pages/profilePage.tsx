import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import { FiPackage, FiSettings } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import ProfileSection from "@/components/profile-section";
import WishlistSection from "@/components/wishlist-section";
import Orders from "@/components/orders-section";
import spinner from "../assets/spinner.svg";

interface UserType {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
  city?: string | null;
  state?: string | null;
}

type Tab = "profile" | "wishlist" | "orders";

const TABS: { id: Tab; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "profile", label: "Profile", Icon: FiSettings },
  { id: "wishlist", label: "Wishlist", Icon: FaRegHeart },
  { id: "orders", label: "Orders", Icon: FiPackage },
];

function getInitials(first?: string | null, last?: string | null, email?: string) {
  const f = first?.trim()?.[0];
  const l = last?.trim()?.[0];
  if (f && l) return `${f}${l}`.toUpperCase();
  if (f) return f.toUpperCase();
  if (email) return email[0].toUpperCase();
  return "U";
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACKEND_API;

  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<Tab>("profile");
  const [orderCount, setOrderCount] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    let userID: string;
    try {
      userID = JSON.parse(atob(token.split(".")[1])).id;
    } catch {
      navigate("/signin");
      return;
    }

    let cancelled = false;
    async function getUserData() {
      try {
        const response = await axios.get(`${url}/user/${userID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (cancelled) return;
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    getUserData();
    return () => {
      cancelled = true;
    };
  }, [navigate, url]);

  const handleOrdersCount = useCallback((n: number) => setOrderCount(n), []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <img src={spinner} alt="Loading…" className="h-12 w-12" />
      </div>
    );
  }

  const fullName =
    `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() ||
    user?.email ||
    "Account";

  return (
    <div className="mx-auto max-w-5xl p-4 md:p-8">
      <header className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xl font-bold text-white">
          {getInitials(user?.firstName, user?.lastName, user?.email)}
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold text-slate-800 md:text-2xl">
            {fullName}
          </h1>
          {user?.email && (
            <p className="truncate text-sm text-gray-500">{user.email}</p>
          )}
        </div>
      </header>

      <nav
        aria-label="Profile sections"
        className="mt-6 flex flex-wrap gap-2 border-b border-gray-200 pb-2"
      >
        {TABS.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-amber-500 text-white shadow"
                  : "bg-white text-slate-700 hover:bg-amber-50 hover:text-amber-700 border border-gray-200"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
              {id === "orders" && orderCount !== null && (
                <span
                  className={`ml-1 rounded-full px-2 py-0.5 text-xs ${
                    isActive
                      ? "bg-white/25 text-white"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {orderCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <section className="mt-6">
        {active === "profile" && <ProfileSection user={user} />}
        {active === "wishlist" && <WishlistSection />}
        {active === "orders" && <Orders onCountChange={handleOrdersCount} />}
      </section>

      <BsPerson className="hidden" aria-hidden />
    </div>
  );
};

export default ProfilePage;
