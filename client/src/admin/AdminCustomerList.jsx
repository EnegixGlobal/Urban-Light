import { useState, useEffect } from "react";
import axios from "axios";
import { Search, UserCircle2, Mail, Calendar, ShieldCheck } from "lucide-react";

const AdminCustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/customers`, {
                    withCredentials: true,
                });
                if (response.data.success) {
                    setCustomers(response.data.users);
                }
            } catch (error) {
                console.error("Failed to fetch customers", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    const filteredCustomers = customers.filter(
        (customer) =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#c9a27d]/20 border-t-[#c9a27d] rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-light tracking-tight mb-2">Customers</h1>
                    <p className="text-[#c9a27d]/60 text-sm tracking-widest uppercase">
                        Manage your registered users
                    </p>
                </div>

                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c9a27d]/40 group-focus-within:text-[#c9a27d] transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#111] border border-white/10 rounded-xl py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-[#c9a27d]/50 transition-all font-light text-white"
                    />
                </div>
            </div>

            <div className="bg-[#111] rounded-3xl border border-[#c9a27d]/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                <th className="py-5 px-6 font-medium text-[#c9a27d]/60 text-xs uppercase tracking-widest">User</th>
                                <th className="py-5 px-6 font-medium text-[#c9a27d]/60 text-xs uppercase tracking-widest">Contact</th>
                                <th className="py-5 px-6 font-medium text-[#c9a27d]/60 text-xs uppercase tracking-widest">Role</th>
                                <th className="py-5 px-6 font-medium text-[#c9a27d]/60 text-xs uppercase tracking-widest">Joined On</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredCustomers.length > 0 ? (
                                filteredCustomers.map((customer) => (
                                    <tr key={customer._id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="py-5 px-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-[#c9a27d]/10 flex items-center justify-center text-[#c9a27d]">
                                                    <UserCircle2 size={24} />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">{customer.name}</p>
                                                    <p className="text-[10px] text-white/40 font-mono mt-0.5">ID: {customer._id.substring(customer._id.length - 6)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-5 px-6">
                                            <div className="flex items-center gap-2 text-white/80">
                                                <Mail size={14} className="text-[#c9a27d]/60" />
                                                <span className="text-sm font-light">{customer.email}</span>
                                            </div>
                                        </td>
                                        <td className="py-5 px-6">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide ${customer.role === 'admin'
                                                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                                                : 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                }`}>
                                                {customer.role === 'admin' ? <ShieldCheck size={12} /> : <UserCircle2 size={12} />}
                                                {customer.role.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="py-5 px-6">
                                            <div className="flex items-center gap-2 text-white/60">
                                                <Calendar size={14} className="text-[#c9a27d]/40" />
                                                <span className="text-sm font-light">
                                                    {new Date(customer.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="py-16 text-center text-white/40">
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <UserCircle2 size={48} className="text-[#c9a27d]/20" />
                                            <p className="text-lg">No customers found</p>
                                            {searchTerm && <p className="text-sm text-white/30">Try adjusting your search query</p>}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminCustomerList;
