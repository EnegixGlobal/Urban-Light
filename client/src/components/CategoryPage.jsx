import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";

const CategoryPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items: products, loading } = useSelector((state) => state.products);

    useEffect(() => {
        // 'id' from params corresponds to the category string in our enum
        // e.g., /category/Chandeliers
        dispatch(fetchProducts({ category: id }));
    }, [dispatch, id]);

    return (
        <div className="bg-black text-white min-h-screen pt-32 pb-20 px-6 lg:px-20">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h1 className="text-5xl font-light tracking-tight mb-4 capitalize">
                        {id} <span className="text-[#c9a27d]">Collection</span>
                    </h1>
                    <div className="w-20 h-1 bg-[#c9a27d]"></div>
                </div>

                {loading ? (
                    <div className="h-64 flex items-center justify-center">
                        <div className="w-10 h-10 border-4 border-[#c9a27d]/20 border-t-[#c9a27d] rounded-full animate-spin"></div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="h-64 flex flex-col items-center justify-center text-center space-y-6">
                        <p className="text-[#c9a27d]/60 italic font-light text-xl">
                            Our {id} collection is currently being curated. 
                        </p>
                        <button 
                            onClick={() => navigate('/products')}
                            className="bg-[#c9a27d] text-black px-10 py-3 rounded-full font-bold uppercase tracking-widest text-xs"
                        >
                            View Entire Gallery
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
                        {products.map((product) => (
                            <div
                                key={product._id}
                                onClick={() => navigate(`/product/${product._id}`)}
                                className="cursor-pointer group"
                            >
                                <div className="relative overflow-hidden aspect-[3/4] bg-[#111] rounded-2xl">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                                </div>
                                <div className="mt-6 flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-light tracking-wide group-hover:text-[#c9a27d] transition-colors">
                                            {product.name}
                                        </h3>
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mt-1">{product.subCategory || id}</p>
                                    </div>
                                    <p className="text-[#c9a27d] font-semibold">₹{product.price.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;