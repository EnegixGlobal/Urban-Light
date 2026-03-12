import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { openAuthModal } from "../redux/authSlice";
import { Lock } from "lucide-react";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
                <div className="w-10 h-10 border-4 border-[#c9a27d]/20 border-t-[#c9a27d] rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-[#c9a27d] p-6 text-center">
                <div className="bg-[#c9a27d]/10 p-6 rounded-full border border-[#c9a27d]/20 mb-6">
                    <Lock size={48} className="text-[#c9a27d]" />
                </div>
                <h1 className="text-3xl font-light mb-2 tracking-tight">Access Restricted</h1>
                <p className="text-[#c9a27d]/60 mb-8 max-w-md uppercase text-xs tracking-[0.2em]">
                    Please log in to view your {location.pathname.replace('/', '')}
                </p>
                <button
                    onClick={() => dispatch(openAuthModal("login"))}
                    className="bg-[#c9a27d] text-black px-10 py-4 rounded-full font-bold hover:bg-[#d4b595] transition-all transform active:scale-[0.98] cursor-pointer shadow-lg shadow-[#c9a27d]/10"
                >
                    Sign In to Continue
                </button>
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;
