import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, X } from "lucide-react";
import { useEffect } from "react";

const Toast = ({ message, type = "success", onClose, duration = 4000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[2000] w-[90%] max-w-[400px]"
        >
            <div className={`
        relative overflow-hidden
        bg-[#1a1a1a] border border-[#c9a27d]/20 
        backdrop-blur-xl shadow-2xl rounded-2xl p-4
        flex items-center gap-4
      `}>
                {/* Progress Bar */}
                <motion.div
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: duration / 1000, ease: "linear" }}
                    className="absolute bottom-0 left-0 h-1 bg-[#c9a27d]"
                />

                <div className={`p-2 rounded-xl ${type === "success" ? "bg-green-500/10 text-green-500" :
                        type === "info" ? "bg-blue-500/10 text-blue-500" : "bg-red-500/10 text-red-500"
                    }`}>
                    {type === "success" ? <CheckCircle size={20} /> :
                        type === "info" ? <AlertCircle size={20} /> : <AlertCircle size={20} />}
                </div>

                <div className="flex-1">
                    <p className="text-white text-sm font-medium leading-tight">
                        {type === "success" ? "Success" : type === "info" ? "Info" : "Error"}
                    </p>
                    <p className="text-[#c9a27d]/60 text-xs mt-1">
                        {message}
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className="text-[#c9a27d]/40 hover:text-[#c9a27d] transition-colors p-1 cursor-pointer"
                >
                    <X size={16} />
                </button>
            </div>
        </motion.div>
    );
};

export default Toast;
