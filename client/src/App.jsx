import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReady, hideToast } from "./redux/authSlice";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import CategoryPage from "./components/CategoryPage";
import SubCategoryPage from "./components/SubCategoryPage";
import ProductDetails from "./components/ProductDetails";
import Product from "./components/Product";   // ✅ ADD THIS
import About from "./components/About";
import Contact from "./components/Contact";
import Wishlist from "./components/Wishlist";
import Cart from "./components/Cart";

import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AuthModal from "./components/AuthModal";
import Toast from "./components/Toast";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [wishlist, setWishlist] = useState([]);
  const dispatch = useDispatch();
  const { toast } = useSelector((state) => state.auth);

  useEffect(() => {
    // Small delay or check to ensure Redux state is stabilized
    // In a real app, you would call a backend /api/auth/me here
    dispatch(setReady());
  }, [dispatch]);

  const addToWishlist = (product) => {
    const exist = wishlist.find((item) => item.id === product.id);
    if (!exist) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <AuthModal />
      <AnimatePresence>
        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => dispatch(hideToast())}
          />
        )}
      </AnimatePresence>

      <Routes>

        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Login Signup (Public Only) */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

        {/* Products Page */}
        <Route path="/products" element={<Product />} />

        {/* Category */}
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/category/:id/:sub" element={<SubCategoryPage />} />

        {/* Product Details */}
        <Route
          path="/product/:productId"
          element={<ProductDetails addToWishlist={addToWishlist} />}
        />

        {/* Wishlist (Protected) */}
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist
                wishlist={wishlist}
                removeFromWishlist={removeFromWishlist}
              />
            </ProtectedRoute>
          }
        />

        {/* Cart (Protected) */}
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />

      </Routes>

      <Footer />
    </Router>
  );
}

export default App;