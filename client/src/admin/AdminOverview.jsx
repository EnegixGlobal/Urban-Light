import { motion } from "framer-motion";
import { TrendingUp, Users, ShoppingBag, DollarSign, Package, Star, Plus, Database } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminOverview = () => {
    const [statsData, setStatsData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/summary`, {
                    withCredentials: true
                });
                setStatsData(response.data.stats);
            } catch (error) {
                console.error("Failed to fetch admin stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const stats = [
        {
            label: "Total Revenue",
            value: `₹${statsData?.totalRevenue?.toLocaleString() || '0'}`,
            change: statsData?.revenueChange || "+0%",
            icon: <DollarSign className="text-green-500" />
        },
        {
            label: "Total Orders",
            value: statsData?.totalOrders?.toString() || '0',
            change: statsData?.ordersChange || "+0%",
            icon: <ShoppingBag className="text-blue-500" />
        },
        {
            label: "Total Products",
            value: statsData?.totalProducts?.toString() || '0',
            change: "Live",
            icon: <Database className="text-purple-500" />
        },
        {
            label: "Active Customers",
            value: statsData?.totalUsers?.toString() || '0',
            change: statsData?.usersChange || "+0%",
            icon: <Users className="text-[#c9a27d]" />
        },
    ];

    if (loading) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#c9a27d]/20 border-t-[#c9a27d] rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-10">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-light tracking-tight mb-2">Dashboard Overview</h1>
                    <p className="text-[#c9a27d]/60 text-sm tracking-widest uppercase">Performance metrics from backend</p>
                </div>
                <Link
                    to="/admin/products/add"
                    className="bg-[#c9a27d] text-black px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#d4b595] transition-all"
                >
                    <Plus size={18} /> Add Product
                </Link>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-[#111] p-6 rounded-3xl border border-[#c9a27d]/10 hover:border-[#c9a27d]/30 transition-all duration-500 group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-[#c9a27d]/10 transition-colors">
                                {stat.icon}
                            </div>
                            <span className="text-green-500 text-xs font-bold bg-green-500/10 px-2 py-1 rounded-lg">
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-[#c9a27d]/60 text-xs uppercase tracking-widest mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* RECENT ORDERS TABLE - PLACEHOLDER */}
                <div className="lg:col-span-2 bg-[#111] rounded-3xl border border-[#c9a27d]/10 p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-light">Recent Orders</h3>
                        <button className="text-[#c9a27d] text-sm hover:underline cursor-pointer">View All</button>
                    </div>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#c9a27d]">
                                        <Package size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Crystal Chandelier XL</p>
                                        <p className="text-[10px] text-[#c9a27d]/60 uppercase tracking-widest">Order #URB-2931 / 2m ago</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold">₹84,500</p>
                                    <span className="text-[10px] text-green-500 bg-green-500/10 px-2 py-1 rounded-full uppercase tracking-tighter">Paid</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CUSTOMER FEEDBACK - PLACEHOLDER */}
                <div className="bg-[#111] rounded-3xl border border-[#c9a27d]/10 p-8 flex flex-col">
                    <h3 className="text-xl font-light mb-8">Latest Reviews</h3>
                    <div className="flex-1 space-y-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} className="fill-[#c9a27d] text-[#c9a27d]" />)}
                                </div>
                                <p className="text-sm italic text-white/80 leading-relaxed">
                                    "The lighting quality is exceptional. It transformed our dining room into a palace gallery."
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-[#c9a27d]/20" />
                                    <span className="text-[10px] text-[#c9a27d]/60 uppercase tracking-widest font-medium">Vikram Singh</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
