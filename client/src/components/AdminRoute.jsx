import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
                <div className="w-10 h-10 border-4 border-[#c9a27d]/20 border-t-[#c9a27d] rounded-full animate-spin"></div>
            </div>
        );
    }

    // Check if user is authenticated AND has admin role
    // Assuming the role field is 'role' and its value for admin is 'admin'
    if (!isAuthenticated || user?.role !== 'admin') {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};

export default AdminRoute;
