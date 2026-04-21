// import Container from "./container";
import { MdOutlineLocalShipping } from "react-icons/md";
import { LuShield } from "react-icons/lu";
import { CiHeart } from "react-icons/ci";

const highlightCards = [
  {
    title: "Free Shipping",
    description: "Free delivery on orders over $50",
    icon: MdOutlineLocalShipping,
  },
  {
    title: "Secure Payment",
    description: "Your payment information is protected",
    icon: LuShield,
  },
  {
    title: "Curated Selection",
    description: "Hand-picked books for every reader",
    icon: CiHeart,
  },
];

const Card = () => {
  return (
    <section className="px-4 py-12 md:px-10 md:py-14 lg:px-16">
      <div className="mx-auto grid w-full max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-3">
        {highlightCards.map(({ title, description, icon: Icon }) => (
          <article
            key={title}
            className="group rounded-xl border border-amber-100 bg-white px-6 py-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-100/60"
          >
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-100 text-amber-600 transition-colors group-hover:bg-amber-200">
              <Icon size={30} />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Card;
