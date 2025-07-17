import Card from "./components/card";
import NavBar from "./components/navBar";
import Welcome from "./components/welcome";
import FeaturedBooks from "./components/featured-books";
import Bestsellers from "./components/best-sellers";
import UpdateSection from "./components/update-section";

const App = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* <NavBar /> */}
      <Welcome />
      <Card />
      <FeaturedBooks />
      <Bestsellers />
      <UpdateSection />
      {/* <div className="flex justify-around">
        <Card
          icon={MdOutlineLocalShipping}
          title="Check title"
          text="This is a test text"
        />
        <Card
          icon={MdOutlineLocalShipping}
          title="Check title"
          text="This is a test text"
        />
        <Card
          icon={MdOutlineLocalShipping}
          title="Check title"
          text="This is a test text"
        />
      </div> */}
    </div>
  );
};

export default App;
