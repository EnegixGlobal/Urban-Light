import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Trash2, Plus, Search, Filter, ExternalLink, Package } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { showToast } from "../redux/authSlice";

const AdminProductList = () => {
    const dispatch = useDispatch();
    const { items: products, loading } = useSelector((state) => state.products);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = [
        "All", "Chandeliers", "Wall Lights", "Pendants", "Duplex", "Outdoor",
        "Fans", "Lamps", "Architecter Lights", "Artifacts"
    ];

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleDelete = async (productId) => {
        if (window.confirm("Are you sure you want to delete this luxury fixture? This action cannot be undone.")) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/products/${productId}`, {
                    withCredentials: true
                });
                dispatch(showToast({ message: "Fixture removed from gallery.", type: "success" }));
                dispatch(fetchProducts()); // Refresh list
            } catch (error) {
                dispatch(showToast({ message: "Failed to delete fixture.", type: "error" }));
            }
        }
    };

    const filteredProducts = (products || []).filter(p => {
    const matchesSearch =
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.productId?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;

    return matchesSearch && matchesCategory;
});

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-light tracking-tight mb-2">Live Gallery</h1>
                    <p className="text-[#c9a27d]/60 text-sm tracking-widest uppercase">Manage your luxury inventory</p>
                </div>
                <Link 
                    to="/admin/products/add" 
                    className="bg-[#c9a27d] text-black px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#d4b595] transition-all self-start md:self-auto"
                >
                    <Plus size={18} /> New Product
                </Link>
            </div>

            {/* FILTERS BAR */}
            <div className="flex flex-col md:flex-row gap-4 bg-[#111] p-4 rounded-2xl border border-[#c9a27d]/10">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input 
                        type="text"
                        placeholder="Search fixtures by name or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/5 pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-[#c9a27d]/30 text-sm transition-all text-white placeholder:text-white/20"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`
                                px-4 py-2 rounded-xl text-xs uppercase tracking-widest font-medium whitespace-nowrap transition-all border
                                ${selectedCategory === cat 
                                    ? 'bg-[#c9a27d] text-black border-[#c9a27d]' 
                                    : 'bg-white/5 text-white/40 border-transparent hover:border-white/10'}
                            `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* PRODUCTS TABLE */}
            <div className="bg-[#111] rounded-3xl border border-[#c9a27d]/10 overflow-hidden shadow-2xl">
                {loading ? (
                    <div className="h-64 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-[#c9a27d]/20 border-t-[#c9a27d] rounded-full animate-spin"></div>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="h-64 flex flex-col items-center justify-center text-center p-10">
                        <Package size={40} className="text-[#c9a27d]/20 mb-4" />
                        <p className="text-white/40 font-light italic">No matching fixtures found in your collection.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-[#c9a27d]/60 font-bold">Product Details</th>
                                    <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-[#c9a27d]/60 font-bold">Product ID</th>
                                    <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-[#c9a27d]/60 font-bold">Category</th>
                                    <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-[#c9a27d]/60 font-bold">Price</th>
                                    <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-[#c9a27d]/60 font-bold">Stock</th>
                                    <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-[#c9a27d]/60 font-bold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence mode="popLayout">
                                    {filteredProducts.map((product) => (
                                        <motion.tr 
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            key={product._id} 
                                            className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-black border border-white/5 shrink-0">
                                                        <img src={product.images?.[0] ?? ''} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-medium group-hover:text-[#c9a27d] transition-colors">{product.name}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-xs text-[#c9a27d] font-bold tracking-widest">{product.productId || '----'}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-xs text-white/60 bg-white/5 px-3 py-1 rounded-full">{product.category}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="text-white font-medium">₹{(product.price || 0).toLocaleString()}</span>
                                                    {product.oldPrice && (
                                                        <span className="text-[10px] text-white/30 line-through">₹{(product.oldPrice || 0).toLocaleString()}</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2">
                                                    {(() => {
                                                        const stock = Number(product.stock || 0);
                                                        const color = stock > 10 ? 'bg-green-500' : stock > 0 ? 'bg-yellow-500' : 'bg-red-500';
                                                        return (
                                                            <>
                                                                <div className={`w-1.5 h-1.5 rounded-full ${color}`} />
                                                                <span className="text-xs text-white/60">{stock} units</span>
                                                            </>
                                                        );
                                                    })()}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center justify-end gap-2">
                                                    <a 
                                                        href={`/product/${product._id}`} 
                                                        target="_blank" 
                                                        rel="noreferrer"
                                                        className="p-2 text-white/20 hover:text-[#c9a27d] hover:bg-[#c9a27d]/10 rounded-lg transition-all"
                                                    >
                                                        <ExternalLink size={16} />
                                                    </a>
                                                    <Link 
                                                        to={`/admin/products/edit/${product._id}`}
                                                        className="p-2 text-white/20 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all"
                                                    >
                                                        <Edit2 size={16} />
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleDelete(product._id)}
                                                        className="p-2 text-white/20 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminProductList;
