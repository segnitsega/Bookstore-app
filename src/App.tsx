import Card from "./components/card";
import NavBar from "./components/navBar";
import Welcome from "./components/welcome";


const App = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* <NavBar /> */}
      <Welcome />
<Card />
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
