import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";

const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: products = [], loading } = useSelector((state) => state.products || { items: [] });
  const [sort, setSort] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const productsArray = Array.isArray(products) ? products : (products?.items || []);
  const sortedProducts = [...productsArray].sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="bg-black text-white min-h-screen pt-32 pb-20 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h1 className="text-5xl font-light tracking-tight mb-4">
              All <span className="text-[#c9a27d]">Collections</span>
            </h1>
            <div className="w-20 h-1 bg-[#c9a27d]"></div>
          </div>

          <div className="flex flex-col gap-3 min-w-[240px]">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#c9a27d] font-bold">Sort By</span>
            <select
              onChange={(e) => setSort(e.target.value)}
              className="bg-[#0d0d0d] border border-white/10 p-3 rounded-xl text-xs uppercase tracking-widest focus:border-[#c9a27d]/50 transition-colors outline-none"
            >
              <option value="">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-[#c9a27d]/20 border-t-[#c9a27d] rounded-full animate-spin"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center">
            <p className="text-[#c9a27d]/60 italic font-light text-xl">
              No products found in our gallery.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {sortedProducts.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                className="cursor-pointer group flex flex-col bg-[#0d0d0d]/40 backdrop-blur-sm border border-white/5 hover:border-[#c9a27d]/30 transition-all duration-500 p-3 rounded-[1.5rem]"
              >
                <div className="relative overflow-hidden aspect-square rounded-[1rem] mb-3 shadow-2xl bg-black">
                  <img
                    src={product.images?.[0] ?? ''}
                    alt={product.name || ''}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out grayscale-[0.2] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <span className="text-[9px] uppercase font-bold tracking-[0.2em] bg-white text-black px-4 py-1.5 rounded-full whitespace-nowrap shadow-xl">
                      Quick View
                    </span>
                  </div>
                  {product.oldPrice && (
                    <div className="absolute top-3 right-3 bg-[#c9a27d] text-black text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg">
                      Sale
                    </div>
                  )}
                </div>

                <div className="px-1 text-center space-y-2.5">
                  <div className="space-y-0.5">
                    <h3 className="text-sm md:text-base font-light tracking-wide text-white group-hover:text-[#c9a27d] transition-colors duration-300 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-[#c9a27d] font-medium">
                      {product.category} | {product.productId}
                    </p>
                  </div>

                  <div className="bg-white/[0.02] rounded-2xl p-3 border border-white/[0.03] group-hover:bg-white/[0.04] group-hover:border-[#c9a27d]/10 transition-all duration-500">
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-lg md:text-xl font-bold text-white tracking-tight">
                          Rs: {(product.price || 0).toLocaleString()}
                        </span>
                        {product.oldPrice && (
                          <span className="line-through text-white/50 text-[10px] md:text-xs font-light decoration-[#c9a27d]/40">
                            {product.oldPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;