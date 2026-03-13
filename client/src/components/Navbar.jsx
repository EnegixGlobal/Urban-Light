import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { User, Heart, ShoppingCart, Lightbulb, LogOut, LayoutDashboard } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, openAuthModal } from "../redux/authSlice";

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { totalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      {/* NAVBAR */}

      <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-10 py-4 md:py-6 flex justify-between items-center bg-black">

        {/* LOGO */}

        <Link to="/" className="flex items-center gap-2 text-[#c9a27d] text-xl md:text-2xl font-bold tracking-widest uppercase">
          <Lightbulb size={24} />
          Urban Lights Luxury
        </Link>

        {/* RIGHT ICONS */}

        <div className="flex items-center gap-4 md:gap-6">

          <Link to="/wishlist" className="text-[#c9a27d] hover:text-white">
            <Heart size={20} />
          </Link>

          <Link to="/cart" className="text-[#c9a27d] hover:text-white relative">
            <ShoppingCart size={20} />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {totalQuantity}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-[#c9a27d] font-medium hidden md:block border-r border-[#c9a27d]/30 pr-3">
                {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-[#c9a27d] hover:text-white flex items-center gap-1.5 transition-colors group"
                title="Logout"
              >
                <span className="text-sm hidden sm:block">Logout</span>
                <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </button>

              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="text-[#c9a27d] hover:text-white flex items-center gap-1 transition-colors"
                  title="Admin Dashboard"
                >
                  <LayoutDashboard size={18} />
                </Link>
              )}
            </div>
          ) : (
            <button
              onClick={() => dispatch(openAuthModal("login"))}
              className="flex items-center gap-2 text-[#c9a27d] hover:text-white transition-colors cursor-pointer"
            >
              <User size={20} />
            </button>
          )}

          {/* MENU BUTTON */}

          <button
            onClick={() => setMenuOpen(true)}
            className="bg-[#c9a27d] text-black px-4 md:px-6 py-2 rounded-full text-sm md:text-base"
          >
            Menu
          </button>
        </div>
      </header>


      {/* FULL SCREEN MENU */}

      <AnimatePresence>

        {menuOpen && (

          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 w-full h-screen bg-[#2b221a] text-[#c9a27d] z-[999]"
          >

            {/* CLOSE BUTTON */}

            <div className="absolute top-6 right-6 md:top-8 md:right-10">

              <button
                onClick={() => setMenuOpen(false)}
                className="bg-[#c9a27d] text-black w-10 h-10 md:w-12 md:h-12 rounded-full text-lg"
              >
                ✕
              </button>

            </div>


            {/* MENU CONTENT */}

            <div className="h-full grid grid-cols-1 md:grid-cols-3 px-6 md:px-16 py-20 md:py-24">


              {/* LEFT SECTION */}

              <div className="hidden md:block pr-10 border-r border-[#5a4a3a]">

                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-2xl font-bold tracking-widest uppercase"
                >
                  <Lightbulb size={24} />
                  Urban Lights Luxury
                </Link>

              </div>


              {/* CENTER MENU */}

              <div className="flex flex-col items-center justify-center space-y-6 md:space-y-8 text-2xl md:text-4xl font-light">

                <Link to="/" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>

                <Link to="/about" onClick={() => setMenuOpen(false)}>
                  About
                </Link>

                <Link to="/products" onClick={() => setMenuOpen(false)}>
                  Products
                </Link>

                <Link to="/contact" onClick={() => setMenuOpen(false)}>
                  Contact
                </Link>

                <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
                  Wishlist
                </Link>

                <Link to="/cart" onClick={() => setMenuOpen(false)}>
                  Cart
                </Link>

                {user?.role === 'admin' && (
                  <Link to="/admin" onClick={() => setMenuOpen(false)} className="text-[#c9a27d] flex items-center gap-2">
                    <LayoutDashboard size={24} /> Admin Dashboard
                  </Link>
                )}

                {isAuthenticated ? (
                  <button
                    onClick={() => { handleLogout(); setMenuOpen(false); }}
                    className="text-[#c9a27d] hover:text-white"
                  >
                    Logout ({user?.name.split(" ")[0]})
                  </button>
                ) : (
                  <button
                    onClick={() => { dispatch(openAuthModal("login")); setMenuOpen(false); }}
                    className="text-[#c9a27d] hover:text-white text-left cursor-pointer"
                  >
                    Login
                  </button>
                )}

              </div>


              {/* RIGHT CONTACT */}

              <div className="hidden md:flex pl-10 border-l border-[#5a4a3a] flex-col justify-end">

                <div>

                  <h3 className="text-sm mb-4">
                    CONTACT US
                  </h3>

                  <p className="text-sm leading-6">
                    76-86 Manners Street <br />
                    Wellington 6140, New Zealand
                  </p>

                </div>

              </div>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </>
  );
};

export default Navbar;