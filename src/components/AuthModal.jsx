import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight, Eye, EyeOff, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const { login, signup } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Explicitly reset form when modal opens or closes to prevent stale state
  useEffect(() => {
    if (isOpen) {
      setFormData({
        email: '',
        password: '',
        name: '',
        phone: ''
      });
      setShowPassword(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (mode === 'login') {
        const result = await login(formData.email, formData.password);
        if (result.success) {
          toast.success(`Welcome back, ${result.user.name}!`);
          onClose();
        } else {
          toast.error(result.message);
        }
      } else {
        const result = await signup(formData.name, formData.email, formData.password, formData.phone);
        if (result.success) {
          toast.success("Account created successfully!");
          onClose();
        } else {
          toast.error(result.message);
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-[#121212] border border-white/10 rounded-sm overflow-hidden"
        >
          {/* Top Design Element */}
          <div className="h-1 w-full bg-[#c9a36b]" />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-white transition"
          >
            <X size={20} />
          </button>

          <div className="p-8 md:p-10">
            <div className="text-center mb-8">
              <span className="text-[#c9a36b] uppercase tracking-[0.3em] text-[10px] font-bold mb-2 block">
                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
              </span>
              <h2 className="text-3xl font-serif text-white tracking-wide">
                {mode === 'login' ? 'Aurelia Access' : 'Join the Legacy'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
              {mode === 'signup' && (
                <div className="group">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 ml-1 group-focus-within:text-[#c9a36b] transition-colors font-bold">Full Identity</label>
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-sm focus-within:border-[#c9a36b] transition-all duration-300 overflow-hidden">
                    <div className="px-4 border-r border-white/5 bg-white/[0.02]">
                      <User className="text-gray-500" size={18} />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      autoComplete="name"
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="flex-1 bg-transparent py-3.5 px-4 text-white outline-none placeholder:text-gray-600 text-sm tracking-wide"
                    />
                  </div>
                </div>
              )}

              <div className="group">
                <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 ml-1 group-focus-within:text-[#c9a36b] transition-colors font-bold">Email Address</label>
                <div className="flex items-center bg-white/5 border border-white/10 rounded-sm focus-within:border-[#c9a36b] transition-all duration-300 overflow-hidden">
                  <div className="px-4 border-r border-white/5 bg-white/[0.02]">
                    <Mail className="text-gray-500" size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    autoComplete="email"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="flex-1 bg-transparent py-3.5 px-4 text-white outline-none placeholder:text-gray-600 text-sm tracking-wide"
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <div className="group">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 ml-1 group-focus-within:text-[#c9a36b] transition-colors font-bold">Contact Number</label>
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-sm focus-within:border-[#c9a36b] transition-all duration-300 overflow-hidden">
                    <div className="px-4 border-r border-white/5 bg-white/[0.02]">
                      <Phone className="text-gray-500" size={18} />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="+91 XXXX XXX XXX"
                      value={formData.phone}
                      autoComplete="tel"
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="flex-1 bg-transparent py-3.5 px-4 text-white outline-none placeholder:text-gray-600 text-sm tracking-wide"
                    />
                  </div>
                </div>
              )}

              <div className="group">
                <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 ml-1 group-focus-within:text-[#c9a36b] transition-colors font-bold">Secure Password</label>
                <div className="flex items-center bg-white/5 border border-white/10 rounded-sm focus-within:border-[#c9a36b] transition-all duration-300 overflow-hidden">
                  <div className="px-4 border-r border-white/5 bg-white/[0.02]">
                    <Lock className="text-gray-500" size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    autoComplete="current-password"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="flex-1 bg-transparent py-3.5 px-4 text-white outline-none placeholder:text-gray-600 text-sm tracking-wide"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="px-4 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#c9a36b] text-black font-bold py-4 rounded-sm hover:bg-[#d4b483] transition duration-300 flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {loading ? (
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                    <>
                        {mode === 'login' ? 'Sign In' : 'Register Now'}
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
                    </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center text-sm">
              <p className="text-gray-500">
                {mode === 'login' ? "Don't have an account?" : "Already member of legacy?"}
                <button 
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="ml-2 text-[#c9a36b] hover:underline transition"
                >
                  {mode === 'login' ? 'Create one' : 'Sign in here'}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
