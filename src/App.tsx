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
import { Toaster } from "sonner";
  
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Toaster position="top-center"/>
        <Routes>
          {/* <Route path="/" element={<SignUp />} /> */}
          <Route index element={<StartPage />} />
          <Route path="/" element={<Layout />}>
            {/* <Route index element={<StartPage />} /> */}
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <LandingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/books"
              element={
                <ProtectedRoute>
                  <BooksPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/books/:id"
              element={
                <ProtectedRoute>
                  <BookDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
