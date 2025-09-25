import Card from "../components/card";
import Welcome from "../components/welcome";
import FeaturedBooks from "../components/featured-books";
import Bestsellers from "../components/best-sellers";
import UpdateSection from "../components/update-section";

const LandingPage = () => {
  return (
    <div>
      <div>
        <Welcome />
        <Card />
        <FeaturedBooks />
        <Bestsellers />
        <UpdateSection /> {/*implement subscription logic */}
      </div>
    </div>
  );
};

export default LandingPage;
