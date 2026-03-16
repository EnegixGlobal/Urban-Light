import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, Users, ShoppingBag, Settings, LogOut, Lightbulb } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";

const AdminSidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/admin/dashboard" },
        { icon: <Package size={20} />, label: "Products", path: "/admin/products" },
        { icon: <ShoppingBag size={20} />, label: "Orders", path: "/admin/orders" },
        { icon: <Users size={20} />, label: "Customers", path: "/admin/customers" },
        { icon: <Settings size={20} />, label: "Settings", path: "/admin/settings" },
    ];

    return (
        <aside className="w-64 h-screen bg-[#111] border-r border-[#c9a27d]/10 flex flex-col sticky top-0">
            <div className="p-8 flex items-center gap-3 text-[#c9a27d]">
                <Lightbulb size={28} />
                <span className="font-bold tracking-widest uppercase text-sm">Urban Admin</span>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
              ${isActive
                                ? "bg-[#c9a27d] text-black font-semibold shadow-lg shadow-[#c9a27d]/20"
                                : "text-[#c9a27d]/60 hover:bg-[#c9a27d]/10 hover:text-[#c9a27d]"
                            }
            `}
                    >
                        {item.icon}
                        <span className="text-sm tracking-wide">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-6 border-t border-[#c9a27d]/10">
                <button
                    onClick={async () => {
                        await dispatch(logoutUser());
                        navigate("/login");
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-500/70 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300 cursor-pointer"
                >
                    <LogOut size={20} />
                    <span className="text-sm tracking-wide">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
