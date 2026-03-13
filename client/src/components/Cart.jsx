import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCartAsync,
  removeFromCartAsync,
  deleteFromCartAsync,
  fetchCart
} from "../redux/cartSlice";
import { Trash2, Plus, Minus, ShoppingBag, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { items: cart, totalAmount, loading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="text-5xl font-light tracking-tight mb-4">
            Shopping <span className="text-[#c9a27d]">Cart</span>
          </h1>
          <div className="w-20 h-1 bg-[#c9a27d]"></div>
        </div>

        {loading && cart.length === 0 ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="animate-spin text-[#c9a27d]" size={40} />
          </div>
        ) : cart.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center space-y-8">
            <div className="w-20 h-20 rounded-full bg-[#c9a27d]/10 flex items-center justify-center">
              <ShoppingBag size={40} className="text-[#c9a27d]" />
            </div>
            <p className="text-[#c9a27d]/60 italic font-light text-xl">
              Your cart is currently empty.
            </p>
            <Link
              to="/products"
              className="bg-[#c9a27d] text-black px-10 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white transition-all"
            >
              Browse Gallery
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* CART ITEMS */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {cart.map((item) => {
                  const product = item.productId;
                  if (!product) return null;

                  return (
                    <motion.div
                      key={product._id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-6 bg-[#0d0d0d] border border-white/5 p-4 rounded-[2rem] group"
                    >
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden bg-black shrink-0 relative">
                        <img
                          src={product.images?.[0]}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between py-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a27d] font-bold mb-1">
                              {product.category}
                            </p>
                            <h2 className="text-xl md:text-2xl font-light tracking-tight">{product.name}</h2>
                          </div>
                          <button
                            onClick={() => dispatch(deleteFromCartAsync(product._id))}
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white/20 hover:text-red-500 hover:bg-red-500/10 transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <div className="flex flex-wrap items-end justify-between gap-4 mt-4">
                          <div className="flex items-center gap-1 bg-black rounded-full border border-white/10 p-1">
                            <button
                              onClick={() => dispatch(removeFromCartAsync(product._id))}
                              className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-[#c9a27d] hover:bg-white/5 transition-all"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center font-bold text-sm tracking-tighter">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => dispatch(addToCartAsync(product._id))}
                              className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-[#c9a27d] hover:bg-white/5 transition-all"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">Total Price</p>
                            <p className="text-xl font-bold tracking-tighter text-[#c9a27d]">
                              Rs: {(product.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* ORDER SUMMARY */}
            <div className="bg-[#0d0d0d] border border-white/5 p-8 rounded-[2.5rem] sticky top-32">
              <h2 className="text-[10px] uppercase tracking-[0.3em] text-[#c9a27d] font-black mb-8">Order Summation</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-white/40 font-light">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-white">Rs: {totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/40 font-light">
                  <span className="text-sm">Shipping</span>
                  <span className="text-white text-[10px] uppercase tracking-widest font-bold">Complimentary</span>
                </div>
                <div className="pt-4 border-t border-white/5 flex justify-between items-baseline">
                  <span className="text-lg font-light tracking-tight">Total Amount</span>
                  <span className="text-3xl font-bold tracking-tighter text-[#c9a27d]">
                    Rs: {totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <button className="w-full bg-[#c9a27d] text-black h-14 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all shadow-2xl active:scale-95">
                Proceed to Checkout
              </button>

              <p className="text-[9px] text-white/20 text-center mt-6 uppercase tracking-[0.2em] font-medium leading-relaxed">
                Security and discretion guaranteed through<br />our encrypted checkout portal
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;