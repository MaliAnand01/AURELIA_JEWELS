import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Sparkles } from "lucide-react";
import Button from "./Button";

const Newsletter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        // Check if already subscribed or recently closed
        const isDismissed = localStorage.getItem("aurelia_newsletter_dismissed");
        if (!isDismissed) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 5000); // Show after 5 seconds for demonstration, can be longer
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        // Set a timestamp to not show it again for 7 days
        localStorage.setItem("aurelia_newsletter_dismissed", Date.now().toString());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setTimeout(() => {
                handleClose();
                localStorage.setItem("aurelia_newsletter_subscribed", "true");
            }, 2000);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative max-w-2xl w-full bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-sm overflow-hidden shadow-2xl flex flex-col md:flex-row mx-4 md:mx-0"
                    >
                        {/* Image/Decorative Side */}
                        <div className="hidden md:flex md:w-5/12 bg-[#c9a36b]/10 p-10 flex-col justify-center items-center relative overflow-hidden">
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute -top-10 -left-10 w-40 h-40 bg-[#c9a36b]/5 rounded-full blur-3xl"
                            />
                            <motion.div 
                                animate={{ rotate: -360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#c9a36b]/5 rounded-full blur-3xl"
                            />
                            <Sparkles className="text-[#c9a36b] mb-4" size={48} />
                            <p className="text-[#c9a36b] font-serif italic text-center text-sm">Join the Elite</p>
                        </div>
 
                        {/* Content Side */}
                        <div className="w-full md:w-7/12 p-8 md:p-12 relative flex flex-col justify-center">
                            <button 
                                onClick={handleClose}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
                            >
                                <X size={20} />
                            </button>

                            {!subscribed ? (
                                <>
                                    <h2 className="text-3xl font-serif text-white mb-4 leading-tight">Elevate Your Lineage</h2>
                                    <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                                        Join the Aurelia Inner Circle. Receive curated styling guides, early access to new collections, and a **10% welcome gift** on your next acquisition.
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="flex px-2 items-center bg-white/[0.03] border border-white/10 rounded-sm focus-within:border-[#c9a36b]/50 focus-within:bg-white/[0.05] transition-all group overflow-hidden">
                                            <div className="pl-3 pr-3 py-4 flex items-center justify-center border-r border-white/5">
                                                <Mail className="text-gray-500 group-focus-within:text-[#c9a36b] transition-colors" size={18} />
                                            </div>
                                            <input 
                                                type="email" 
                                                required
                                                placeholder="Enter your refined email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-transparent border-none py-4 px-4 text-sm text-white outline-none placeholder:text-gray-600 placeholder:font-light tracking-wide h-full"
                                            />
                                        </div>
                                        <Button type="submit" className="w-full py-5 tracking-[0.2em] text-[10px] font-bold">
                                            REQUEST INVITATION
                                        </Button>
                                    </form>
                                </>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-full flex flex-col justify-center items-center text-center py-10"
                                >
                                    <div className="w-16 h-16 bg-[#c9a36b]/20 rounded-full flex items-center justify-center mb-6">
                                        <Sparkles className="text-[#c9a36b]" size={32} />
                                    </div>
                                    <h2 className="text-2xl font-serif text-white mb-2">Welcome to the Lineage</h2>
                                    <p className="text-gray-400 text-sm">Your journey with Aurelia Jewels begins now. Check your inbox for your welcome gift.</p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Newsletter;
