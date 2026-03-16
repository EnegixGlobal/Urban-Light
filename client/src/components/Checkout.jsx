import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart, loadCartFromStorage } from "../redux/cartSlice";
import { showToast } from "../redux/authSlice";
import axios from "axios";
import { MapPin, CreditCard, ShoppingBag, ArrowLeft, Loader2 } from "lucide-react";

const Checkout = () => {
    const { items: cart, totalAmount } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [shippingAddress, setShippingAddress] = useState({
        fullName: user?.name || "",
        address: "",
        city: "",
        postalCode: "",
        country: "India",
    });

    const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

    useEffect(() => {
        dispatch(loadCartFromStorage());
        if (cart.length === 0) {
            navigate("/cart");
        }
    }, [dispatch, cart.length, navigate]);

    const handleChange = (e) => {
        setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const orderData = {
                orderItems: cart.map(item => ({
                    productId: item.productId._id,
                    name: item.productId.name,
                    price: item.productId.price,
                    quantity: item.quantity,
                    image: item.productId.images[0]
                })),
                shippingAddress,
                paymentMethod,
                itemsPrice: totalAmount,
                shippingPrice: 0,
                taxPrice: 0,
                totalPrice: totalAmount,
            };

            const response = await axios.post("http://localhost:8000/api/orders", orderData, { withCredentials: true });

            if (response.status === 201) {
                dispatch(showToast({ message: "Order placed successfully!", type: "success" }));
                dispatch(clearCart());
                navigate("/");
            }
        } catch (error) {
            dispatch(showToast({ message: error.response?.data?.message || "Failed to place order", type: "error" }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6 lg:px-20 font-light">
            <div className="max-w-7xl mx-auto">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-white/40 hover:text-[#c9a27d] transition-colors mb-12 group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Back to Cart</span>
                </button>

                <div className="mb-16">
                    <h1 className="text-5xl font-light tracking-tight mb-4">
                        Secure <span className="text-[#c9a27d]">Checkout</span>
                    </h1>
                    <div className="w-20 h-1 bg-[#c9a27d]"></div>
                </div>

                <div className="grid lg:grid-cols-2 gap-20 items-start">
                    {/* FORM SECTION */}
                    <form onSubmit={handleSubmit} className="space-y-12">
                        <section>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-10 h-10 rounded-full bg-[#c9a27d]/10 flex items-center justify-center border border-[#c9a27d]/20">
                                    <MapPin size={18} className="text-[#c9a27d]" />
                                </div>
                                <h2 className="text-xl tracking-tight">Shipping Information</h2>
                            </div>

                            <div className="grid gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold ml-4">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        name="fullName"
                                        value={shippingAddress.fullName}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        className="w-full bg-[#0d0d0d] border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#c9a27d]/50 transition-all font-light"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold ml-4">Address</label>
                                    <input
                                        required
                                        type="text"
                                        name="address"
                                        value={shippingAddress.address}
                                        onChange={handleChange}
                                        placeholder="Street address, apartment, suite, etc."
                                        className="w-full bg-[#0d0d0d] border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#c9a27d]/50 transition-all font-light"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold ml-4">City</label>
                                        <input
                                            required
                                            type="text"
                                            name="city"
                                            value={shippingAddress.city}
                                            onChange={handleChange}
                                            placeholder="City"
                                            className="w-full bg-[#0d0d0d] border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#c9a27d]/50 transition-all font-light"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold ml-4">Postal Code</label>
                                        <input
                                            required
                                            type="text"
                                            name="postalCode"
                                            value={shippingAddress.postalCode}
                                            onChange={handleChange}
                                            placeholder="Postal Code"
                                            className="w-full bg-[#0d0d0d] border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#c9a27d]/50 transition-all font-light"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-10 h-10 rounded-full bg-[#c9a27d]/10 flex items-center justify-center border border-[#c9a27d]/20">
                                    <CreditCard size={18} className="text-[#c9a27d]" />
                                </div>
                                <h2 className="text-xl tracking-tight">Payment Method</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod("Cash on Delivery")}
                                    className={`p-6 rounded-2xl border transition-all text-left flex flex-col gap-2 ${
                                        paymentMethod === "Cash on Delivery" 
                                        ? "bg-[#c9a27d]/10 border-[#c9a27d] text-[#c9a27d]" 
                                        : "bg-[#0d0d0d] border-white/5 text-white/40 hover:border-white/20"
                                    }`}
                                >
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Standard</span>
                                    <span className="text-lg">Cash on Delivery</span>
                                </button>
                                
                                <button
                                    type="button"
                                    disabled
                                    className="p-6 rounded-2xl border border-white/5 bg-[#0d0d0d] text-white/10 cursor-not-allowed flex flex-col gap-2 relative overflow-hidden"
                                >
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Digital</span>
                                    <span className="text-lg">Online Payment</span>
                                    <span className="absolute top-4 right-4 text-[8px] uppercase tracking-widest font-black text-[#c9a27d]">Soon</span>
                                </button>
                            </div>
                        </section>

                        <button 
                            disabled={loading || cart.length === 0}
                            className="w-full bg-[#c9a27d] text-black h-16 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all shadow-2xl active:scale-95 flex items-center justify-center"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : "Finalize Order"}
                        </button>
                    </form>

                    {/* SUMMARY SECTION */}
                    <div className="bg-[#0d0d0d] border border-white/5 p-10 rounded-[3rem] sticky top-32">
                        <div className="flex items-center gap-4 mb-10">
                            <ShoppingBag size={20} className="text-[#c9a27d]" />
                            <h2 className="text-[10px] uppercase tracking-[0.3em] text-[#c9a27d] font-black">Order Recapitulation</h2>
                        </div>

                        <div className="max-h-[300px] overflow-y-auto pr-4 mb-10 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
                            {cart.map((item) => (
                                <div key={item.productId._id} className="flex gap-4 items-center">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-black">
                                        <img src={item.productId.images?.[0]} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm truncate font-medium">{item.productId.name}</h4>
                                        <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold tracking-tighter text-[#c9a27d]">
                                            Rs {(item.productId.price * item.quantity).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4 pt-10 border-t border-white/5">
                            <div className="flex justify-between text-white/40">
                                <span className="text-xs uppercase tracking-widest">Subtotal</span>
                                <span className="text-white">Rs {totalAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-white/40">
                                <span className="text-xs uppercase tracking-widest">Courier Fees</span>
                                <span className="text-white text-[10px] font-bold uppercase tracking-widest text-[#c9a27d]">No Charge</span>
                            </div>
                            <div className="pt-6 mt-6 border-t border-white/10 flex justify-between items-baseline">
                                <span className="text-xl tracking-tight">Grand Total</span>
                                <div className="text-right">
                                    <span className="text-3xl font-bold tracking-tighter text-[#c9a27d]">
                                        Rs {totalAmount.toLocaleString()}
                                    </span>
                                    <p className="text-[8px] uppercase tracking-widest text-white/20 mt-1">Inc. of all taxes</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/5">
                            <p className="text-[10px] text-white/40 uppercase tracking-widest leading-relaxed text-center">
                                Exclusive artisanal quality assured.<br />
                                <span className="text-[#c9a27d]/60">Hand-curated for your collection.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
