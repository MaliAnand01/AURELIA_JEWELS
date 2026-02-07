import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { StorageService } from "../services/storage";
import Button from "../components/Button";
import toast from "react-hot-toast";
import { Trash2, AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Account = () => {
  const { user, logout, updateProfile, deleteAccount, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [myOrders, setMyOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', phone: '' });
  const [saving, setSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    } else if (user) {
        setMyOrders(StorageService.getUserOrders(user.id));
        setEditData({ name: user.name, phone: user.phone || '' });
    }
  }, [user, loading, navigate]);

  const handleSave = async () => {
      setSaving(true);
      const result = await updateProfile(editData);
      setSaving(false);
      if (result.success) {
          toast.success("Profile updated successfully");
          setIsEditing(false);
      } else {
          toast.error(result.message);
      }
  };

  const handleAccountDeletion = async () => {
      const result = await deleteAccount();
      if (result.success) {
          toast.success("Account deleted successfully. Farewell.");
          navigate("/");
      } else {
          toast.error(result.message);
      }
  };

  if (loading || !user) return <p className="text-center py-20 text-white">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-32 text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 border-b border-white/10 pb-12"
      >
        <div className="relative">
            <h1 className="text-4xl md:text-5xl font-serif mb-4 tracking-wide">My Account</h1>
            <div className="flex items-center gap-3">
                <p className="text-gray-400">Welcome back, <span className="text-[#c9a36b] font-medium">{user.name}</span></p>
                <div className="h-1 w-1 rounded-full bg-white/20" />
                <span className={`text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border ${
                    user.role === 'admin' 
                    ? 'border-[#c9a36b] text-[#c9a36b] bg-[#c9a36b]/5' 
                    : 'border-white/20 text-white/40'
                }`}>
                    {user.role === 'admin' ? 'Heritage Curator' : 'Heritage Member'}
                </span>
            </div>
        </div>
        <div className="flex flex-wrap gap-4 pt-4 md:pt-0">
             {!isEditing && (
                <Button onClick={() => setIsEditing(true)} variant="outline" size="sm" className="text-[10px] px-6">
                    Update Details
                </Button>
             )}
             {user.role === "admin" && (
                 <Button onClick={() => navigate("/admin")} variant="primary" size="sm" className="text-[10px] px-6">
                     Access Dashboard
                 </Button>
             )}
             <Button onClick={() => { logout(); navigate("/"); }} variant="secondary" size="sm" className="text-[10px] px-6">
                 Logout
             </Button>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-12">
        {/* Profile Info */}
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0a0a0a] p-8 border border-white/10 rounded-sm h-fit shadow-2xl backdrop-blur-3xl relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-1 h-full bg-[#c9a36b]/30" />
            <h2 className="text-lg font-serif mb-8 tracking-widest uppercase text-gray-300 border-b border-white/5 pb-4">Personal Profile</h2>
            <div className="space-y-8">
                <div className="group">
                    <span className="block text-gray-500 text-[9px] uppercase tracking-widest mb-2 font-bold group-hover:text-[#c9a36b] transition-colors">Full Identity</span>
                    {isEditing ? (
                        <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => setEditData({...editData, name: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-sm focus:border-[#c9a36b] outline-none text-white transition text-sm"
                        />
                    ) : (
                        <span className="text-base tracking-wide block border-l-2 border-[#c9a36b]/20 pl-4">{user.name}</span>
                    )}
                </div>
                <div className="group">
                    <span className="block text-gray-500 text-[9px] uppercase tracking-widest mb-2 font-bold">Encrypted Email</span>
                    <span className="text-gray-400 text-sm tracking-wide block border-l-2 border-white/5 pl-4">{user.email}</span>
                </div>
                <div className="group">
                    <span className="block text-gray-500 text-[9px] uppercase tracking-widest mb-2 font-bold group-hover:text-[#c9a36b] transition-colors">Direct Contact</span>
                    {isEditing ? (
                        <input
                            type="tel"
                            value={editData.phone}
                            onChange={(e) => setEditData({...editData, phone: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-sm focus:border-[#c9a36b] outline-none text-white transition text-sm"
                        />
                    ) : (
                        <span className="text-base tracking-wide block border-l-2 border-[#c9a36b]/20 pl-4">{user.phone || "Not linked"}</span>
                    )}
                </div>
                
                <AnimatePresence mode="wait">
                    {isEditing && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex gap-3 pt-6 overflow-hidden"
                        >
                            <Button 
                                onClick={handleSave} 
                                disabled={saving}
                                variant="primary" 
                                size="sm" 
                                className="flex-1 text-[10px]"
                            >
                                {saving ? "Updating..." : "Confirm Changes"}
                            </Button>
                            <Button 
                                onClick={() => { setIsEditing(false); setEditData({ name: user.name, phone: user.phone || '' }); }} 
                                variant="outline" 
                                size="sm"
                                className="flex-1 text-[10px]"
                            >
                                Cancel
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>

        {/* Order History */}
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2"
        >
            <h2 className="text-lg font-serif mb-8 tracking-widest uppercase text-gray-300">Acquisition History</h2>
            
            {myOrders.length === 0 ? (
                <div className="bg-white/[0.02] border border-dashed border-white/10 p-12 text-center rounded-sm">
                    <p className="text-gray-500 italic tracking-wide">Your collection journey hasn't started yet.</p>
                    <Button to="/shop" variant="outline" size="sm" className="mt-6 text-[10px]">
                        Begin Exploration
                    </Button>
                </div>
            ) : (
                <div className="space-y-6">
                    {myOrders.slice().reverse().map((order, idx) => (
                        <motion.div 
                            key={order.id} 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + (idx * 0.1) }}
                            className="group bg-[#0a0a0a] border border-white/10 p-6 rounded-sm flex flex-col sm:flex-row justify-between items-start sm:items-center hover:border-[#c9a36b]/40 transition duration-500 shadow-xl relative"
                        >
                            <div className="absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-l from-[#c9a36b]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <p className="text-[#c9a36b] text-xs font-bold uppercase tracking-[0.2em]">Order #{order.id.slice(0,8)}</p>
                                    <span className="text-[10px] text-gray-500">• {new Date(order.date).toLocaleDateString()}</span>
                                </div>
                                <p className="text-sm font-light tracking-wide text-gray-300">
                                    {order.items.length} {order.items.length === 1 ? 'Masterpiece' : 'Masterpieces'} 
                                    <span className="mx-2 text-white/10">|</span> 
                                    <span className="text-white font-medium">₹{order.total.toLocaleString()}</span>
                                </p>
                            </div>
                            <div className="mt-4 sm:mt-0 flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                <span className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded-sm border ${
                                    order.status === 'Completed' ? 'border-green-500/20 text-green-500 bg-green-500/5' :
                                    order.status === 'Pending' ? 'border-yellow-500/20 text-yellow-500 bg-yellow-500/5' :
                                    'border-red-500/20 text-red-500 bg-red-500/5'
                                }`}>
                                    {order.status}
                                </span>
                                <button className="text-[10px] uppercase tracking-[0.2em] text-[#c9a36b] hover:text-white transition font-bold group-hover:translate-x-1 duration-300">
                                    Track →
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
      </div>

      {/* Extreme Bottom Actions */}
      <div className="mt-20 pt-8 border-t border-white/5 flex justify-center">
            <button 
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors text-xs uppercase tracking-[0.2em] font-bold py-2 px-4 group"
            >
                <Trash2 size={14} className="group-hover:animate-pulse" />
                Delete My Aurelia Account
            </button>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-[#0a0a0a] border border-red-500/20 max-w-md w-full p-10 rounded-sm relative shadow-2xl"
                >
                    <button 
                        onClick={() => setShowDeleteConfirm(false)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-white transition"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex justify-center mb-6">
                        <div className="bg-red-500/10 p-4 rounded-full border border-red-500/20">
                            <AlertTriangle className="text-red-500" size={40} />
                        </div>
                    </div>

                    <h3 className="text-2xl font-serif text-white text-center mb-4 tracking-wide">Account Deletion</h3>
                    <p className="text-gray-400 text-center text-sm leading-relaxed mb-8">
                        This action is irreversible. All your order history, personal preferences, and membership data will be permanently removed from our lineage.
                    </p>

                    <div className="flex flex-col gap-4">
                        <Button 
                            onClick={handleAccountDeletion}
                            variant="primary" 
                            className="w-full bg-red-600 hover:bg-red-700 border-none text-white font-bold"
                        >
                            Confirm Irreversible Deletion
                        </Button>
                        <Button 
                            onClick={() => setShowDeleteConfirm(false)}
                            variant="outline" 
                            className="w-full"
                        >
                            Maintain My Legacy
                        </Button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Account;
