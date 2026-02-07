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
      <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-8">
        <div>
            <h1 className="text-4xl font-serif mb-2">My Account</h1>
            <p className="text-gray-400">Welcome back, <span className="text-[#c9a36b]">{user.name}</span></p>
        </div>
        <div className="flex gap-4">
             {!isEditing && (
                <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                    Edit Account Details
                </Button>
             )}
             {user.role === "admin" && (
                 <Button onClick={() => navigate("/admin")} variant="outline" size="sm">
                     Admin Dashboard
                 </Button>
             )}
             <Button onClick={() => { logout(); navigate("/"); }} variant="secondary" size="sm">
                 Logout
             </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {/* Profile Info */}
        <div className="bg-white/5 p-8 border border-white/10 rounded-sm h-fit">
            <h2 className="text-xl font-serif mb-6 tracking-wide border-b border-white/10 pb-4">Profile Details</h2>
            <div className="space-y-6 text-sm tracking-wide">
                <div>
                    <span className="block text-gray-500 text-xs uppercase mb-2">Full Name</span>
                    {isEditing ? (
                        <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => setEditData({...editData, name: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 px-4 py-2 rounded-sm focus:border-[#c9a36b] outline-none text-white transition"
                        />
                    ) : (
                        <span className="text-lg">{user.name}</span>
                    )}
                </div>
                <div>
                    <span className="block text-gray-500 text-xs uppercase mb-2">Email Address</span>
                    <span className="text-gray-400">{user.email}</span>
                </div>
                <div>
                    <span className="block text-gray-500 text-xs uppercase mb-2">Phone Number</span>
                    {isEditing ? (
                        <input
                            type="tel"
                            value={editData.phone}
                            onChange={(e) => setEditData({...editData, phone: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 px-4 py-2 rounded-sm focus:border-[#c9a36b] outline-none text-white transition"
                        />
                    ) : (
                        <span className="text-lg">{user.phone || "Not provided"}</span>
                    )}
                </div>
                
                {isEditing && (
                    <div className="flex gap-3 pt-4">
                        <Button 
                            onClick={handleSave} 
                            disabled={saving}
                            variant="primary" 
                            size="sm" 
                            className="flex-1"
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </Button>
                        <Button 
                            onClick={() => { setIsEditing(false); setEditData({ name: user.name, phone: user.phone || '' }); }} 
                            variant="outline" 
                            size="sm"
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                    </div>
                )}
            </div>
        </div>

        {/* Order History */}
        <div className="md:col-span-2">
            <h2 className="text-xl font-serif mb-6 tracking-wide">Order History</h2>
            
            {myOrders.length === 0 ? (
                <p className="text-gray-400">You haven't placed any orders yet.</p>
            ) : (
                <div className="space-y-4">
                    {myOrders.slice().reverse().map(order => (
                        <div key={order.id} className="bg-white/5 border border-white/10 p-6 rounded-sm flex justify-between items-center hover:border-[#c9a36b]/30 transition">
                            <div>
                                <p className="text-[#c9a36b] text-sm mb-1 uppercase tracking-widest">Order ID: {order.id.slice(0,8)}</p>
                                <p className="text-xs text-gray-500 mb-2">{new Date(order.date).toLocaleDateString()}</p>
                                <p className="text-sm font-medium">{order.items.length} items • ₹{order.total.toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                                <span className={`inline-block px-3 py-1 text-xs rounded-full mb-3 ${
                                    order.status === 'Completed' ? 'bg-green-900/50 text-green-400' :
                                    order.status === 'Pending' ? 'bg-yellow-900/50 text-yellow-400' :
                                    'bg-red-900/50 text-red-400'
                                }`}>
                                    {order.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
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
