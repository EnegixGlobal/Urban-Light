import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

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

function App() {
  const [wishlist, setWishlist] = useState([]);

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
      <Navbar />

      <Routes>

        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Login Signup */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

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

        {/* Wishlist */}
        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              removeFromWishlist={removeFromWishlist}
            />
          }
        />

        {/* Cart */}
        <Route path="/cart" element={<Cart />} />

      </Routes>

      <Footer />
    </Router>
  );
}

export default App;