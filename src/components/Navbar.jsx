import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, User, Menu, X, Heart, LogOut, LayoutDashboard } from "lucide-react";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { AnimatePresence, motion } from "framer-motion";
import AuthModal from "./AuthModal";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });
  const dropdownRef = useRef(null);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
      const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
              setDropdownOpen(false);
          }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
      logout();
      setDropdownOpen(false);
      navigate("/");
  };

  return (
    <nav
      className={`
        fixed top-0 w-full z-[100] transition-all duration-300
        ${scrolled ? "backdrop-blur-xl bg-black/40 border-b border-white/10" : "bg-transparent"}
      `}
    >
      <div className="max-w-[1920px] mx-auto flex justify-between items-center px-6 md:px-12 py-5 text-white">
        
        {/* Logo */}
        <Link to="/" className="text-3xl tracking-widest font-serif font-bold text-[#c9a36b]">
          AURELIA
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-10 items-center text-sm tracking-widest uppercase">
          <Link to="/shop" className="hover:text-[#c9a36b] transition duration-300">
            Shop
          </Link>

          <Link to="/about" className="hover:text-[#c9a36b] transition duration-300">
            About
          </Link>

          <Link to="/contact" className="hover:text-[#c9a36b] transition duration-300">
            Contact
          </Link>

          {user?.role === "admin" && (
            <Link to="/admin" className="hover:text-[#c9a36b] transition duration-300">
               Dashboard
            </Link>
          )}

          <div className="flex items-center gap-6 border-l border-white/20 pl-6 ml-2">
            <Link to="/wishlist" className="relative group transition-transform active:scale-95">
                <Heart size={20} className="group-hover:text-[#c9a36b] transition duration-300" />
            </Link>
 
            <Link to="/cart" className="relative group transition-transform active:scale-95">
                <ShoppingBag size={20} className="group-hover:text-[#c9a36b] transition duration-300" />
                {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#c9a36b] text-black text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                    {cartCount}
                </span>
                )}
            </Link>

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="hover:text-[#c9a36b] transition duration-300 flex items-center focus:outline-none"
                >
                    <User size={20} />
                </button>

                <AnimatePresence>
                    {dropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute right-0 mt-4 w-56 bg-[#0a0a0a] border border-[#c9a36b]/30 rounded-sm shadow-xl overflow-hidden backdrop-blur-3xl"
                        >
                            {user ? (
                                <div className="py-2">
                                    <div className="px-4 py-3 border-b border-white/10">
                                        <p className="text-[10px] text-[#c9a36b] uppercase tracking-widest font-bold mb-1">
                                            {user.role === 'admin' ? 'Curator' : 'Member'}
                                        </p>
                                        <p className="text-sm font-serif text-white truncate normal-case">
                                            Welcome back, {user.name.split(' ')[0]}
                                        </p>
                                    </div>
                                    
                                    {user.role === "admin" && (
                                        <Link 
                                            to="/admin" 
                                            onClick={() => setDropdownOpen(false)}
                                            className="px-4 py-3 text-xs uppercase tracking-widest hover:bg-white/5 flex items-center gap-3 transition"
                                        >
                                            <LayoutDashboard size={16} className="text-[#c9a36b]" /> Dashboard
                                        </Link>
                                    )}

                                    <Link 
                                        to="/account" 
                                        onClick={() => setDropdownOpen(false)}
                                        className="px-4 py-3 text-xs uppercase tracking-widest hover:bg-white/5 flex items-center gap-3 transition"
                                    >
                                        <User size={16} className="text-[#c9a36b]" /> My Account
                                    </Link>

                                    <button 
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-3 text-xs uppercase tracking-widest text-red-500/80 hover:bg-white/5 flex items-center gap-3 transition border-t border-white/10"
                                    >
                                        <LogOut size={16} /> Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="py-2">
                                    <button 
                                        onClick={() => { setAuthModal({ isOpen: true, mode: 'login' }); setDropdownOpen(false); }}
                                        className="w-full text-left px-4 py-3 text-xs uppercase tracking-widest hover:bg-white/5 transition"
                                    >
                                        Login
                                    </button>
                                    <button 
                                        onClick={() => { setAuthModal({ isOpen: true, mode: 'signup' }); setDropdownOpen(false); }}
                                        className="w-full text-left px-4 py-3 text-xs uppercase tracking-widest hover:bg-white/5 transition text-[#c9a36b] font-bold"
                                    >
                                        Create Account
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile right icons */}
        <div className="flex items-center gap-5 md:hidden">
          <Link to="/wishlist" className="relative p-2 active:scale-90 transition-transform">
            <Heart size={22} />
          </Link>
          
          <Link to="/cart" className="relative p-2 active:scale-90 transition-transform">
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#c9a36b] text-black text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="p-2 active:scale-90 transition-transform"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Hamburger Menu */}
      <AnimatePresence>
        {menuOpen && (
            <>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1]"
                    onClick={() => setMenuOpen(false)}
                />
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="md:hidden fixed top-0 right-0 h-screen w-[80%] bg-[#0a0a0a] border-l border-white/10 z-[100] shadow-2xl"
                >
                    <div className="flex flex-col h-full">
                        <div className="flex justify-between items-center p-6 border-b border-white/5">
                            <span className="text-[#c9a36b] font-serif tracking-widest uppercase text-xs">Navigation</span>
                            <button onClick={() => setMenuOpen(false)} className="text-white hover:text-[#c9a36b]">
                                <X size={24} />
                            </button>
                        </div>
                        
                        <div className="flex-1 px-8 py-12 space-y-8 overflow-y-auto">
                            <Link to="/shop" onClick={() => setMenuOpen(false)} className="block text-2xl font-serif tracking-widest uppercase hover:text-[#c9a36b] transition">Shop</Link>
                            <Link to="/about" onClick={() => setMenuOpen(false)} className="block text-2xl font-serif tracking-widest uppercase hover:text-[#c9a36b] transition">About</Link>
                            <Link to="/contact" onClick={() => setMenuOpen(false)} className="block text-2xl font-serif tracking-widest uppercase hover:text-[#c9a36b] transition">Contact</Link>
                            
                            <div className="pt-8 border-t border-white/5 space-y-6">
                                {user ? (
                                    <>
                                        <Link to="/account" onClick={() => setMenuOpen(false)} className="flex items-center gap-4 text-gray-400 hover:text-white uppercase tracking-widest text-sm transition font-medium">
                                            <User size={18} className="text-[#c9a36b]" /> My Account
                                        </Link>
                                        
                                        {user.role === "admin" && (
                                            <Link to="/admin" onClick={() => setMenuOpen(false)} className="flex items-center gap-4 text-[#c9a36b] uppercase tracking-widest text-sm transition font-bold">
                                                <LayoutDashboard size={18} /> Admin Dashboard
                                            </Link>
                                        )}

                                        <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="flex items-center gap-4 text-red-500/70 hover:text-red-500 uppercase tracking-widest text-sm transition font-bold pt-4 border-t border-white/5">
                                            <LogOut size={18} /> Logout
                                        </button>
                                    </>
                                ) : (
                                    <button 
                                        onClick={() => { setAuthModal({ isOpen: true, mode: 'login' }); setMenuOpen(false); }}
                                        className="w-full py-4 border border-[#c9a36b] text-[#c9a36b] uppercase tracking-widest text-sm font-bold hover:bg-[#c9a36b] hover:text-black transition"
                                    >
                                        Client Login
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </>
        )}
      </AnimatePresence>

      <AuthModal 
        isOpen={authModal.isOpen} 
        onClose={() => setAuthModal({ ...authModal, isOpen: false })} 
        initialMode={authModal.mode} 
      />
    </nav>
  );
};

export default Navbar;
