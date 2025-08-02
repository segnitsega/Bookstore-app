import BooksPage from "./pages/booksPage";
import LandingPage from "./pages/landingPage";
import BookDetails from "./pages/bookDetails";
import CartPage from "./pages/cartPage";
import ProfilePage from "./pages/profilePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import SignIn from "./pages/signin";
import StartPage from "./pages/startPage";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./utils/protectedRoute";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="books" element={<BooksPage />} />
              <Route path="books/:id" element={<BookDetails />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
