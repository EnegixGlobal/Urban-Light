import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { showToast } from "../redux/authSlice";
import { Package, Upload, Plus, X, List, Image as ImageIcon, Info, DollarSign, Database, Star, Save } from "lucide-react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductUpload = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);

    const categories = [
        "Chandeliers", "Wall Lights", "Pendants", "Duplex", "Outdoor",
        "Fans", "Lamps", "Architecter Lights", "Artifacts"
    ];

    const initialFormState = {
        name: "",
        description: "",
        price: "",
        oldPrice: "",
        category: "Chandeliers",
        subCategory: "",
        stock: "",
        isFeatured: false,
        images: [""],
        specifications: {
            material: "",
            dimensions: "",
            wattage: "",
            color: "",
            finish: ""
        }
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (id) {
            fetchProductDetails();
        }
    }, [id]);

    const fetchProductDetails = async () => {
        setFetching(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
            const product = response.data?.data || {};
            setFormData({
                name: product.name || "",
                description: product.description || "",
                price: product.price || "",
                oldPrice: product.oldPrice || "",
                category: product.category || "Chandeliers",
                subCategory: product.subCategory || "",
                stock: product.stock || "",
                isFeatured: product.isFeatured || false,
                images: (product.images && Array.isArray(product.images) && product.images.length > 0) ? product.images : [""],
                specifications: {
                    material: product.specifications?.material || "",
                    dimensions: product.specifications?.dimensions || "",
                    wattage: product.specifications?.wattage || "",
                    color: product.specifications?.color || "",
                    finish: product.specifications?.finish || ""
                }
            });
        } catch (error) {
            dispatch(showToast({ message: "Failed to fetch product details.", type: "error" }));
            navigate("/admin/products");
        } finally {
            setFetching(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.includes("specifications.")) {
            const specName = name.split(".")[1];
            setFormData(prev => ({
                ...prev,
                specifications: { ...prev.specifications, [specName]: value }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value
            }));
        }
    };

    const handleImageChange = (index, value) => {
        const newImages = [...formData.images];
        newImages[index] = value;
        setFormData(prev => ({ ...prev, images: newImages }));
    };

    const handleFileUpload = async (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadFormData = new FormData();
        uploadFormData.append("image", file);

        try {
            dispatch(showToast({ message: "Uploading image...", type: "info" }));
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/upload`, uploadFormData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            });

            const newImages = [...formData.images];
            newImages[index] = response.data.url;
            setFormData(prev => ({ ...prev, images: newImages }));
            dispatch(showToast({ message: "Image uploaded successfully!", type: "success" }));
        } catch (error) {
            dispatch(showToast({ message: "Upload failed.", type: "error" }));
        }
    };

    const addImageField = () => {
        setFormData(prev => ({ ...prev, images: [...prev.images, ""] }));
    };

    const removeImageField = (index) => {
        if (formData.images.length > 1) {
            const newImages = formData.images.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, images: newImages }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...formData,
                images: formData.images.filter(img => img.trim() !== ""),
                price: Number(formData.price),
                oldPrice: formData.oldPrice ? Number(formData.oldPrice) : undefined,
                stock: Number(formData.stock)
            };

            const url = id
                ? `${import.meta.env.VITE_API_URL}/products/${id}`
                : `${import.meta.env.VITE_API_URL}/products`;

            const method = id ? "put" : "post";

            const response = await axios[method](url, payload, {
                withCredentials: true
            });

            if (response.data) {
                dispatch(showToast({
                    message: id ? "Product updated successfully! ✨" : "Product uploaded successfully! ✨",
                    type: "success"
                }));
                if (!id) {
                    setFormData(initialFormState);
                } else {
                    navigate("/admin/products");
                }
            }
        } catch (error) {
            dispatch(showToast({
                message: error.response?.data?.message || "Operation failed.",
                type: "error"
            }));
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#c9a27d]/20 border-t-[#c9a27d] rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto pb-20">
            <div className="mb-10">
                <h1 className="text-3xl font-light tracking-tight mb-2 flex items-center gap-3">
                    {id ? <Save className="text-[#c9a27d]" /> : <Plus className="text-[#c9a27d]" />}
                    {id ? "Refine Masterpiece" : "Elevate Collection"}
                </h1>
                <p className="text-[#c9a27d]/60 text-sm tracking-widest uppercase">
                    {id ? "Update the details of your luxury fixture" : "Add a new luxury fixture to your store"}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* BASIC INFO SECTION */}
                <section className="bg-[#111] p-8 md:p-10 rounded-3xl border border-[#c9a27d]/10 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Info size={120} />
                    </div>

                    <h3 className="text-xl font-light mb-8 flex items-center gap-3">
                        <Info size={20} className="text-[#c9a27d]" /> Core Identity
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6 md:col-span-2">
                            <label className="block text-xs uppercase tracking-widest text-[#c9a27d]/60 font-medium">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="e.g., Grand Cascade Crystal Chandelier"
                                className="w-full bg-white/5 border-b border-white/10 p-3 focus:outline-none focus:border-[#c9a27d] transition-all text-lg font-light tracking-wide text-white placeholder:text-white/10"
                            />
                        </div>

                        <div className="space-y-6 md:col-span-2">
                            <label className="block text-xs uppercase tracking-widest text-[#c9a27d]/60 font-medium">Detailed Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="4"
                                placeholder="Luxury details, heritage, and manufacturing story..."
                                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-[#c9a27d] transition-all text-white/80 placeholder:text-white/10 resize-none leading-relaxed"
                            />
                        </div>
                    </div>
                </section>

                {/* PRICING & INVENTORY */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <section className="bg-[#111] p-8 md:p-10 rounded-3xl border border-[#c9a27d]/10 flex flex-col justify-between">
                        <h3 className="text-xl font-light mb-8 flex items-center gap-3">
                            <DollarSign size={20} className="text-[#c9a27d]" /> Pricing
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <label className="block text-xs uppercase tracking-widest text-[#c9a27d]/60 font-medium">Base Price (₹)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/5 border border-white/10 p-3 rounded-lg focus:outline-none focus:border-[#c9a27d] transition-all text-white"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="block text-xs uppercase tracking-widest text-[#c9a27d]/60 font-medium">Retail Price (₹)</label>
                                <input
                                    type="number"
                                    name="oldPrice"
                                    value={formData.oldPrice}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 p-3 rounded-lg focus:outline-none focus:border-[#c9a27d] transition-all text-white/40"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="bg-[#111] p-8 md:p-10 rounded-3xl border border-[#c9a27d]/10">
                        <h3 className="text-xl font-light mb-8 flex items-center gap-3">
                            <Database size={20} className="text-[#c9a27d]" /> Inventory
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <label className="block text-xs uppercase tracking-widest text-[#c9a27d]/60 font-medium">Stock Level</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 p-3 rounded-lg focus:outline-none focus:border-[#c9a27d] transition-all text-white"
                                />
                            </div>
                            <div className="flex items-center justify-center pt-8">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            name="isFeatured"
                                            checked={formData.isFeatured}
                                            onChange={handleChange}
                                            className="peer sr-only"
                                        />
                                        <div className="w-10 h-5 bg-white/10 rounded-full peer-checked:bg-[#c9a27d] transition-colors"></div>
                                        <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-[#0a0a0a] rounded-full transition-transform peer-checked:translate-x-5"></div>
                                    </div>
                                    <span className="text-xs uppercase tracking-widest text-[#c9a27d]/60 group-hover:text-[#c9a27d] transition-colors">Featured</span>
                                </label>
                            </div>
                        </div>
                    </section>
                </div>

                {/* CATEGORIZATION */}
                <section className="bg-[#111] p-8 md:p-10 rounded-3xl border border-[#c9a27d]/10 shadow-2xl">
                    <h3 className="text-xl font-light mb-8 flex items-center gap-3">
                        <List size={20} className="text-[#c9a27d]" /> Taxonomy
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="block text-xs uppercase tracking-widest text-[#c9a27d]/60 font-medium">Primary Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full bg-[#1a1a1a] border border-white/10 p-3 rounded-lg focus:outline-none focus:border-[#c9a27d] appearance-none text-white cursor-pointer"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-4">
                            <label className="block text-xs uppercase tracking-widest text-[#c9a27d]/60 font-medium">Sub-Collection</label>
                            <input
                                type="text"
                                name="subCategory"
                                value={formData.subCategory}
                                onChange={handleChange}
                                placeholder="e.g., European Classics"
                                className="w-full bg-white/5 border border-white/10 p-3 rounded-lg focus:outline-none focus:border-[#c9a27d] transition-all text-white"
                            />
                        </div>
                    </div>
                </section>

                {/* IMAGES */}
                <section className="bg-[#111] p-8 md:p-10 rounded-3xl border border-[#c9a27d]/10 shadow-2xl">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-light flex items-center gap-3">
                            <ImageIcon size={20} className="text-[#c9a27d]" /> Product Gallery
                        </h3>
                        <button
                            type="button"
                            onClick={addImageField}
                            className="text-xs uppercase tracking-[0.2em] text-[#c9a27d] hover:text-white transition-colors bg-[#c9a27d]/10 px-4 py-2 rounded-full cursor-pointer"
                        >
                            Add Another Masterpiece
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {formData.images.map((img, idx) => (
                            <div key={idx} className="space-y-4 p-4 bg-white/5 rounded-2xl border border-white/5 group relative animate-in fade-in slide-in-from-bottom-2">
                                <div className="aspect-video rounded-xl bg-black overflow-hidden relative group/preview">
                                    {img ? (
                                        <img src={img} alt="Preview" className="w-full h-full object-cover transition-transform group-hover/preview:scale-105" />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-white/10 italic text-sm">
                                            <ImageIcon size={32} className="mb-2" />
                                            No visual yet
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center">
                                        <label className="bg-[#c9a27d] text-black px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-white transition-colors">
                                            {img ? "Change Visual" : "Choose Visual"}
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => handleFileUpload(e, idx)}
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Or paste external URL here..."
                                        value={img}
                                        onChange={(e) => handleImageChange(idx, e.target.value)}
                                        className="flex-1 bg-black/40 border border-white/10 p-2.5 rounded-lg focus:outline-none focus:border-[#c9a27d]/50 transition-all text-white text-xs"
                                    />
                                    {idx > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => removeImageField(idx)}
                                            className="p-2.5 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SPECIFICATIONS */}
                <section className="bg-[#111] p-8 md:p-10 rounded-3xl border border-[#c9a27d]/10 shadow-2xl">
                    <h3 className="text-xl font-light mb-8 flex items-center gap-3">
                        <Database size={20} className="text-[#c9a27d]" /> Technical Specifications
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {["material", "dimensions", "wattage", "color", "finish"].map((spec) => (
                            <div key={spec} className="space-y-3">
                                <label className="block text-[10px] uppercase tracking-widest text-[#c9a27d]/40 font-medium italic">{spec}</label>
                                <input
                                    type="text"
                                    name={`specifications.${spec}`}
                                    value={formData.specifications[spec]}
                                    onChange={handleChange}
                                    placeholder={`Enter ${spec}...`}
                                    className="w-full bg-white/5 border-b border-white/5 p-2 focus:outline-none focus:border-[#c9a27d]/50 transition-all text-sm text-white/70 italic"
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* SUBMIT BUTTON */}
                <div className="flex justify-end pt-10">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`
              bg-[#c9a27d] text-black px-12 py-5 rounded-2xl font-bold tracking-widest uppercase text-sm
              hover:bg-[#d4b595] transform active:scale-[0.98] transition-all cursor-pointer
              shadow-[0_20px_40px_-10px_rgba(201,162,125,0.2)]
              flex items-center gap-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}
            `}
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                        ) : (
                            <>
                                {id ? <Save size={18} /> : <Upload size={18} />}
                                {id ? "Save Changes" : "Publish to Gallery"}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductUpload;
