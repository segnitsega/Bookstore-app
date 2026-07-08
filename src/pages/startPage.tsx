import { Link } from "react-router-dom";
import { IoMdBook } from "react-icons/io";
import { CiSearch, CiHeart, CiShoppingCart } from "react-icons/ci";
import { LuBookMarked, LuSparkles } from "react-icons/lu";
import heroImage from "../assets/landingPicture.jpg";
import shelfImage from "../assets/books.jpg";

const genres = [
  "Science",
  "History",
  "Programming",
  "Religion",
  "Fiction",
] as const;

const features = [
  {
    title: "Browse by taste",
    body: "Filter the catalog by genre, bestsellers, and featured picks—the same shelves you’ll use inside the app.",
    icon: CiSearch,
  },
  {
    title: "Save what moves you",
    body: "Keep a wishlist of books you’re eyeing, then open any title for ratings, pages, and related reads.",
    icon: CiHeart,
  },
  {
    title: "Checkout with ease",
    body: "Add to cart, review your bag, and complete a secure checkout when you’re ready to bring books home.",
    icon: CiShoppingCart,
  },
] as const;

const StartPage = () => {
  return (
    <div className="landing-page min-h-screen bg-[var(--landing-bg)] text-[var(--landing-ink)]">
      {/* Minimal public nav */}
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
          <Link to="/" className="flex items-center gap-2 text-white">
            <IoMdBook size={28} className="text-amber-300" />
            <span className="font-[family-name:var(--font-display)] text-2xl tracking-tight md:text-3xl">
              BookHub
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/signin"
              className="rounded-md px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="rounded-md bg-amber-500 px-3.5 py-2 text-sm font-semibold text-stone-950 transition hover:bg-amber-400"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero — one composition: brand, headline, line, CTAs, full-bleed image */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-28 md:items-center md:pb-0 md:pt-20">
        <img
          src={heroImage}
          alt="Open books spread across a warm reading table"
          className="landing-hero-image absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/55 to-stone-950/25"
          aria-hidden
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 md:px-8">
          <div className="landing-fade-up max-w-xl space-y-6 text-white">
            <p className="font-[family-name:var(--font-display)] text-4xl leading-none tracking-tight text-amber-300 sm:text-5xl md:text-6xl">
              BookHub
            </p>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Your next great read, gathered in one place.
            </h1>
            <p className="max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
              Discover curated shelves, save favorites, and checkout when the
              story finds you.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                to="/signup"
                className="rounded-md bg-amber-500 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-400"
              >
                Create free account
              </Link>
              <Link
                to="/signin"
                className="rounded-md border border-white/35 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/15"
              >
                I already have an account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What the app is */}
      <section className="landing-section mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
              Inside the app
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl leading-tight tracking-tight text-stone-900 md:text-4xl">
              Built like a bookstore you can carry with you.
            </h2>
            <p className="max-w-lg text-base leading-relaxed text-stone-600 md:text-lg">
              BookHub is a full reading storefront—browse genres, open rich book
              pages, keep a wishlist, fill a cart, and manage your profile. The
              landing is the invitation; the shelves are waiting after you sign
              in.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={shelfImage}
              alt="Stack of books on a shelf"
              className="landing-float aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features that mirror product surfaces */}
      <section className="border-y border-amber-100/80 bg-gradient-to-b from-amber-50/80 to-[var(--landing-bg)]">
        <div className="landing-section mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-stone-900 md:text-4xl">
              Everything you do after you join
            </h2>
            <p className="mt-3 text-base text-stone-600 md:text-lg">
              The same journeys you’ll take inside BookHub—search, save, and
              buy—introduced here before you open the door.
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {features.map(({ title, body, icon: Icon }, index) => (
              <article
                key={title}
                className="landing-feature space-y-4"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-semibold text-stone-900">{title}</h3>
                <p className="text-sm leading-relaxed text-stone-600 md:text-base">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Genres — mirrors in-app filters */}
      <section className="landing-section mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 text-amber-700">
              <LuBookMarked size={20} />
              <span className="text-sm font-semibold uppercase tracking-[0.18em]">
                Shelves
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-stone-900 md:text-4xl">
              Five genres. Infinite rabbit holes.
            </h2>
            <p className="text-base text-stone-600 md:text-lg">
              From science and history to programming, religion, and fiction—
              each shelf is stocked with covers ready to browse.
            </p>
          </div>
          <p className="flex items-center gap-2 text-sm text-stone-500">
            <LuSparkles className="text-amber-600" />
            Same filters you’ll find on the books page
          </p>
        </div>
        <ul className="mt-10 flex flex-wrap gap-3">
          {genres.map((genre) => (
            <li
              key={genre}
              className="rounded-md border border-amber-200/80 bg-white px-4 py-2.5 text-sm font-medium text-stone-800 shadow-sm shadow-amber-100/40"
            >
              {genre}
            </li>
          ))}
        </ul>
      </section>

      {/* Closing CTA */}
      <section className="landing-section px-5 pb-24 md:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-stone-900 px-8 py-14 text-center text-white md:px-16 md:py-16">
          <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight md:text-4xl">
            Ready to step into the stacks?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base text-white/70">
            Create an account to open featured picks, bestsellers, your cart,
            and a profile that remembers what you love.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/signup"
              className="rounded-md bg-amber-500 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-400"
            >
              Join BookHub
            </Link>
            <Link
              to="/signin"
              className="rounded-md border border-white/25 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-amber-100/80 px-5 py-8 text-center text-sm text-stone-500 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row sm:text-left">
          <div className="flex items-center gap-2 text-stone-700">
            <IoMdBook className="text-amber-600" size={22} />
            <span className="font-[family-name:var(--font-display)] text-lg">
              BookHub
            </span>
          </div>
          <p>© {new Date().getFullYear()} BookHub. Discover your next read.</p>
        </div>
      </footer>
    </div>
  );
};

export default StartPage;
