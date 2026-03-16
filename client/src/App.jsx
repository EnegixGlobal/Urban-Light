import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReady, hideToast, checkAuth } from "./redux/authSlice";
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
import Checkout from "./components/Checkout";

import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AuthModal from "./components/AuthModal";
import Toast from "./components/Toast";
import ScrollToTop from "./components/ScrollToTop";
import AdminRoute from "./components/AdminRoute";

// Admin Pages
import AdminDashboard from "./admin/AdminDashboard";
import AdminOverview from "./admin/AdminOverview";
import ProductUpload from "./admin/ProductUpload";
import AdminProductList from "./admin/AdminProductList";
import AdminCustomerList from "./admin/AdminCustomerList";
import { fetchProducts } from "./redux/productSlice";
import { loadCartFromStorage } from "./redux/cartSlice";
import { loadWishlistFromStorage } from "./redux/wishlistSlice";

function App() {
  const dispatch = useDispatch();
  const { toast, user, isAuthenticated } = useSelector((state) => state.auth);
  const isAdmin = isAuthenticated && user?.role === 'admin';
  const { items: products } = useSelector((state) => state.products);


  useEffect(() => {
    // Only check auth if we already have a stored user
    // This prevents an unnecessary /auth/user call for completely new visitors
    if (user) {
      dispatch(checkAuth());
    }
    dispatch(fetchProducts());
    dispatch(loadCartFromStorage());
    dispatch(loadWishlistFromStorage());
  }, [dispatch, user]);

  return (
    <Router>
      <ScrollToTop />
      {!isAdmin && <Navbar />}
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
        <Route
          path="/"
          element={isAdmin ? <Navigate to="/admin/dashboard" replace /> : <Hero />}
        />
        <Route path="/about" element={isAdmin ? <Navigate to="/admin/dashboard" replace /> : <About />} />
        <Route path="/contact" element={isAdmin ? <Navigate to="/admin/dashboard" replace /> : <Contact />} />

        {/* Login Signup (Public Only) */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

        {/* Products Page */}
        <Route path="/products" element={isAdmin ? <Navigate to="/admin/dashboard" replace /> : <Product />} />

        {/* Category */}
        <Route path="/category/:id" element={isAdmin ? <Navigate to="/admin/dashboard" replace /> : <CategoryPage />} />
        <Route path="/category/:id/:sub" element={isAdmin ? <Navigate to="/admin/dashboard" replace /> : <SubCategoryPage />} />

        {/* Product Details */}
        <Route
          path="/product/:productId"
          element={isAdmin ? <Navigate to="/admin/dashboard" replace /> : <ProductDetails />}
        />

        {/* Wishlist (Protected) */}
        <Route
          path="/wishlist"
          element={
            isAdmin ? <Navigate to="/admin/dashboard" replace /> : (
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            )
          }
        />

        {/* Cart (Protected) */}
        <Route path="/cart" element={isAdmin ? <Navigate to="/admin/dashboard" replace /> : <ProtectedRoute><Cart /></ProtectedRoute>} />

        {/* Checkout (Protected) */}
        <Route path="/checkout" element={isAdmin ? <Navigate to="/admin/dashboard" replace /> : <ProtectedRoute><Checkout /></ProtectedRoute>} />

        {/* Admin Dashboard (Protected & Role Based) */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminOverview />} />
          <Route path="products" element={<AdminProductList />} />
          <Route path="products/add" element={<ProductUpload />} />
          <Route path="products/edit/:id" element={<ProductUpload />} />
          <Route path="orders" element={<div className="text-white">Order Management (Coming Soon)</div>} />
          <Route path="customers" element={<AdminCustomerList />} />
          <Route path="settings" element={<div className="text-white">Admin Settings (Coming Soon)</div>} />
        </Route>

      </Routes>

      {!isAdmin && <Footer />}
    </Router>
  );
}

export default App;