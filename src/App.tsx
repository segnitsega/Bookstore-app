import Filter from "./components/filter-component";
import NavBar from "./components/navBar";
import BooksPage from "./pages/booksPage";
import LandingPage from "./pages/landingPage";
import BookLayout from "./components/book-layout";
import BookDetails from "./pages/bookDetails";
import CartPage from "./pages/cartPage";

const App = () => {
  return (
    <div className="">
      {/* <LandingPage /> 
       
      <BooksPage />*/}
      <NavBar />
      {/* <BookDetails /> */}
      <CartPage />
    </div>
  );
};

export default App;
