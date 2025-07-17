import Card from "../components/card";
import NavBar from "../components/navBar";
import Welcome from "../components/welcome";
import FeaturedBooks from "../components/featured-books";
import Bestsellers from "../components/best-sellers";
import UpdateSection from "../components/update-section";
import Footer from "../components/footer";

const LandingPage = () => {
  return (
    <div>
      <NavBar />
      <Welcome />
      <Card />
      <FeaturedBooks />
      <Bestsellers />
      <UpdateSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
