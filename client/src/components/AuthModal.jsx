import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signupUser, closeAuthModal, toggleAuthModalView, showToast } from "../redux/authSlice";
import { Mail, Lock, LogIn, Sparkles, Eye, EyeOff, User, UserPlus, X } from "lucide-react";

const AuthModal = () => {
    const dispatch = useDispatch();
    const { isAuthModalOpen, authModalView, loading } = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await dispatch(loginUser({ email, password }));
        if (loginUser.fulfilled.match(result)) {
            dispatch(showToast({ message: "Welcome back! Login successful.", type: "success" }));
        } else {
            dispatch(showToast({ message: result.payload || "Login failed. Please check your credentials.", type: "error" }));
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const result = await dispatch(signupUser({ name, email, password }));
        if (signupUser.fulfilled.match(result)) {
            dispatch(showToast({ message: "Registration successful! You can now sign in.", type: "success" }));
        } else {
            dispatch(showToast({ message: result.payload || "Signup failed. Please try again.", type: "error" }));
        }
    };

    if (!isAuthModalOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => dispatch(closeAuthModal())}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-[450px] bg-[#1a1a1a] rounded-3xl border border-[#c9a27d]/20 shadow-2xl overflow-hidden"
                >
                    {/* Close Button */}
                    <button
                        onClick={() => dispatch(closeAuthModal())}
                        className="absolute top-6 right-6 text-[#c9a27d]/40 hover:text-[#c9a27d] transition-colors z-10 cursor-pointer"
                    >
                        <X size={24} />
                    </button>

                    <div className="p-8 md:p-12">
                        {/* Logo/Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="bg-[#c9a27d]/10 p-3 rounded-2xl border border-[#c9a27d]/30">
                                <Sparkles className="text-[#c9a27d]" size={28} />
                            </div>
                        </div>

                        <h2 className="text-2xl font-light text-white text-center mb-1 tracking-tight">
                            {authModalView === "login" ? "Welcome Back" : "Create Account"}
                        </h2>
                        <p className="text-[#c9a27d]/60 text-center mb-8 text-xs tracking-wide uppercase">
                            Urban Lights Luxury
                        </p>

                        {authModalView === "login" ? (
                            <form onSubmit={handleLogin} className="space-y-5">
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c9a27d]/40">
                                        <Mail size={18} />
                                    </span>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-[#c9a27d]/50 transition-all"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c9a27d]/40">
                                        <Lock size={18} />
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        className="w-full bg-white/5 border border-white/10 p-4 pl-12 pr-12 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-[#c9a27d]/50 transition-all"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#c9a27d]/40 cursor-pointer"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#c9a27d] text-black font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#d4b595] transform active:scale-[0.98] transition-all cursor-pointer mt-4"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <LogIn size={20} />
                                            <span>Sign In</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleSignup} className="space-y-4">
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c9a27d]/40">
                                        <User size={18} />
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-[#c9a27d]/50 transition-all"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c9a27d]/40">
                                        <Mail size={18} />
                                    </span>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-[#c9a27d]/50 transition-all"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c9a27d]/40">
                                        <Lock size={18} />
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        className="w-full bg-white/5 border border-white/10 p-4 pl-12 pr-12 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-[#c9a27d]/50 transition-all"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#c9a27d]/40 cursor-pointer"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#c9a27d] text-black font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#d4b595] transform active:scale-[0.98] transition-all cursor-pointer mt-4"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <UserPlus size={20} />
                                            <span>Create Account</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        )}

                        <div className="mt-8 pt-6 border-t border-white/5">
                            <p className="text-center text-white/40 text-sm">
                                {authModalView === "login" ? "New to Urban Lights?" : "Already have an account?"}{" "}
                                <button
                                    onClick={() => dispatch(toggleAuthModalView())}
                                    className="text-[#c9a27d] hover:underline font-medium cursor-pointer ml-1"
                                >
                                    {authModalView === "login" ? "Create an account" : "Log in"}
                                </button>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AuthModal;
