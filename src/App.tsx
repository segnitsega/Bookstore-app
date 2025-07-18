import Filter from "./components/filter-component";
import NavBar from "./components/navBar";
import BooksPage from "./pages/booksPage";
import LandingPage from "./pages/landingPage";

const App = () => {
  return (
    <div className="flex flex-col">
      {/* <LandingPage /> */}
      <NavBar />
      {/* <BooksPage /> */}

      <Filter />
      
    </div>
  );
};

export default App;
