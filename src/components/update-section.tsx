import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { LuMail } from "react-icons/lu";

const UpdateSection = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    // Wire up to a real /subscribe endpoint when ready.
    setTimeout(() => {
      toast.success("Thanks! We'll keep you updated.");
      setEmail("");
      setSubmitting(false);
    }, 600);
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8">
      <div className="rounded-2xl bg-amber-600 px-6 py-10 text-white shadow-lg md:px-12 md:py-14">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center md:gap-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
            <LuMail className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Stay Updated
          </h2>
          <p className="text-sm text-white/90 md:text-base">
            Get notified about new arrivals, special offers, and reading
            recommendations.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex w-full flex-col gap-2 sm:flex-row"
          >
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-11 flex-1 border-amber-200 bg-white text-black placeholder:text-gray-500"
            />
            <Button
              type="submit"
              disabled={submitting}
              className="h-11 cursor-pointer bg-white px-6 font-semibold text-amber-700 hover:bg-amber-50 hover:text-amber-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Subscribing…" : "Subscribe"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateSection;
