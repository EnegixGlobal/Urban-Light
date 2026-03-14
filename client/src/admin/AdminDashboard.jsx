import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useSelector } from "react-redux";
import { Bell, Search, User } from "lucide-react";

const AdminDashboard = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="flex bg-[#0a0a0a] min-h-screen text-white">
            <AdminSidebar />

            <main className="flex-1 overflow-y-auto">
                {/* TOP BAR */}
                <header className="h-20 border-b border-[#c9a27d]/10 flex items-center justify-between px-10 sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-md z-10">
                    <div className="relative group w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c9a27d]/40 group-focus-within:text-[#c9a27d] transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search administration..."
                            className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-6 text-sm focus:outline-none focus:border-[#c9a27d]/50 transition-all font-light"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative text-[#c9a27d]/60 hover:text-[#c9a27d] transition-colors cursor-pointer">
                            <Bell size={20} />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full ring-4 ring-[#0a0a0a]"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-6 border-l border-[#c9a27d]/10">
                            <div className="text-right">
                                <p className="text-sm font-medium text-white">{user?.name}</p>
                                <p className="text-[10px] text-[#c9a27d] uppercase tracking-widest">{user?.role || 'Administrator'}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#c9a27d]/20 border border-[#c9a27d]/40 flex items-center justify-center text-[#c9a27d]">
                                <User size={20} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* CONTENT AREA */}
                <div className="p-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
