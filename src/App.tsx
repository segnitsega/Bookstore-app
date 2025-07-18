import Filter from "./components/filter-component";
import NavBar from "./components/navBar";
import BooksPage from "./pages/booksPage";
import LandingPage from "./pages/landingPage";
import BookLayout from "./components/book-layout";
import BookDetails from "./pages/bookDetails";

const App = () => {
  return (
    <div className="">
      {/* <LandingPage /> 
       
      <BooksPage />*/}
      <NavBar />
      <BookDetails />
    </div>
  );
};

export default App;
