import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../redux/productSlice";
import { addToCartAsync } from "../redux/cartSlice";
import { showToast, openAuthModal } from "../redux/authSlice";

const ProductDetails = ({ addToWishlist }) => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct: product, loading, error } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [activeImage, setActiveImage] = useState(0);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      dispatch(showToast({ message: "Please login to add items to cart", type: "error" }));
      dispatch(openAuthModal("login"));
      return;
    }
    dispatch(addToCartAsync(product._id));
    dispatch(showToast({ message: "Product added to cart", type: "success" }));
  };

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId]);

  // Set first image as active when product loads
  useEffect(() => {
    if (product?.images?.length > 0) {
      setActiveImage(0);
    }
  }, [product]);

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#c9a27d]/20 border-t-[#c9a27d] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-white p-6">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-6xl opacity-20 group-hover:opacity-100 transition-opacity">?</div>
          <h2 className="text-2xl font-light tracking-widest uppercase">Product Not Found</h2>
          <p className="text-white/40 font-light">The item you're looking for might have been moved or is no longer available in our collection.</p>
          <button
            onClick={() => window.history.back()}
            className="inline-block bg-[#c9a27d] text-black px-10 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-white transition-all"
          >
            Return to Gallery
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen pt-32 pb-20 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Images Section */}
          <div className="space-y-6">
            <div className="aspect-square overflow-hidden rounded-[2.5rem] bg-[#0d0d0d] border border-white/5 shadow-2xl relative group">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              {product.oldPrice && (
                <div className="absolute top-8 left-8 bg-[#c9a27d] text-black text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-2xl">
                  Limited Edition
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 ${activeImage === idx ? 'border-[#c9a27d] scale-95' : 'border-white/5 opacity-40 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[#c9a27d] uppercase tracking-[0.4em] text-[10px] font-black">
                  {product.category}
                </span>
                <span className="w-12 h-px bg-[#c9a27d]/30"></span>
                <span className="text-white/40 uppercase tracking-[0.4em] text-[10px] font-bold">
                  {product.subCategory}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-light tracking-tighter leading-tight italic">
                {product.name}
              </h1>
            </div>

            <div className="flex items-baseline gap-6 border-b border-white/5 pb-8">
              <span className="text-4xl font-bold tracking-tighter text-[#c9a27d]">
                Rs: {product.price.toLocaleString()}
              </span>
              {product.oldPrice && (
                <span className="text-2xl text-white/50 line-through font-light decoration-[#c9a27d]/70">
                  {product.oldPrice.toLocaleString()}
                </span>
              )}
            </div>

            <div className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#c9a27d] font-black">Artisan Description</h3>
              <p className="text-white/60 leading-relaxed font-light text-xl italic">
                {product.description}
              </p>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 py-8 border-y border-white/5">
              {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                value && (
                  <div key={key} className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-bold">{key}</span>
                    <span className="text-sm font-medium text-white/90">{value}</span>
                  </div>
                )
              ))}
              <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-bold">Availability</span>
                <span className={`text-sm font-bold ${product.stock > 0 ? 'text-green-500/80' : 'text-[#c9a27d]'}`}>
                  {product.stock > 0 ? `In Stock (${product.stock} units)` : "Bespoke / Custom Order"}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="flex-[2] bg-[#c9a27d] text-black h-16 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all duration-500 shadow-2xl hover:shadow-[#c9a27d]/20 active:scale-95"
              >
                Acquire Now
              </button>
              <button
                onClick={() => addToWishlist(product)}
                className="flex-1 h-16 rounded-full border border-white/10 hover:bg-white/5 transition-all duration-500 uppercase tracking-[0.2em] text-[10px] font-black flex items-center justify-center gap-2"
              >
                <span>♥</span> Save to Wishlist
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;