import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";
import { Trash2, ShoppingCart, HeartOff } from "lucide-react";
import { showToast } from "../redux/authSlice";

const Wishlist = () => {
  const { items: wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
    dispatch(showToast({ message: "Removed from wishlist", type: "success" }));
  };

  const handleMoveToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(showToast({ message: "Added to cart", type: "success" }));
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="text-5xl font-light tracking-tight mb-4">
            Private <span className="text-[#c9a27d]">Collection</span>
          </h1>
          <div className="w-20 h-1 bg-[#c9a27d]"></div>
        </div>

        {wishlist.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center space-y-8">
            <div className="w-20 h-20 rounded-full bg-[#c9a27d]/10 flex items-center justify-center">
              <HeartOff size={40} className="text-[#c9a27d]" />
            </div>
            <p className="text-[#c9a27d]/60 italic font-light text-xl">
              Your wishlist is a blank canvas.
            </p>
            <Link
              to="/products"
              className="bg-[#c9a27d] text-black px-10 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white transition-all"
            >
              Explore Masterpieces
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {wishlist.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group bg-[#0d0d0d] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col h-full"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={item.images?.[0]}
                      alt={item.name}
                      className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>

                    <button
                      onClick={() => handleRemove(item._id)}
                      className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white/60 hover:text-red-500 hover:bg-white transition-all shadow-xl"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="p-8 flex flex-col flex-1">
                    <div className="mb-6">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9a27d] font-black mb-2">
                        {item.category}
                      </p>
                      <h3 className="text-2xl font-light tracking-tight line-clamp-1 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-xl font-bold tracking-tighter text-[#c9a27d]">
                        Rs: {item.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="mt-auto flex gap-4">
                      <Link
                        to={`/product/${item._id}`}
                        className="flex-1 bg-white/5 border border-white/10 text-white text-[10px] h-12 rounded-full font-black uppercase tracking-widest flex items-center justify-center hover:bg-white hover:text-black transition-all"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleMoveToCart(item)}
                        className="w-12 h-12 bg-[#c9a27d] text-black rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg active:scale-95"
                        title="Add to Cart"
                      >
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;