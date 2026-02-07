import { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Newsletter from "./components/Newsletter";
import PageWrapper from "./components/PageWrapper";
import CustomCursor from "./components/CustomCursor";

// Lazy Loaded Pages
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Account = lazy(() => import("./pages/Account"));
const Cart = lazy(() => import("./pages/Cart"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Checkout = lazy(() => import("./pages/Checkout"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Wishlist = lazy(() => import("./pages/Wishlist"));

import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";

const PageLoader = () => (
  <div className="fixed inset-0 bg-black z-[200] flex items-center justify-center">
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-6"
    >
      <div className="w-16 h-16 border-t-2 border-[#c9a36b] rounded-full animate-spin" />
      <span className="text-[#c9a36b] tracking-[0.4em] uppercase text-[10px] animate-pulse">Aurelia</span>
    </motion.div>
  </div>
);

const App = () => {
  const location = useLocation();

  return (
    <>
      <CustomCursor />
      <Newsletter />
      <ScrollToTop />
      <Toaster position="top-center" reverseOrder={false} toastOptions={{
          style: {
            background: '#050505',
            color: '#fff',
            border: '1px solid #c9a36b',
            fontFamily: '"Inter", sans-serif',
          },
      }} />
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/shop" element={<PageWrapper><Shop /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            <Route path="/product/:id" element={<PageWrapper><ProductDetails /></PageWrapper>} />
            <Route path="/login" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/signup" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/account" element={<PageWrapper><Account /></PageWrapper>} />
            <Route path="/cart" element={<PageWrapper><Cart /></PageWrapper>} />
            <Route path="/wishlist" element={<PageWrapper><Wishlist /></PageWrapper>} />
            <Route path="/checkout" element={<PageWrapper><Checkout /></PageWrapper>} />
            <Route 
              path="/admin" 
              element={
                  <PageWrapper>
                      <ProtectedRoute adminOnly={true}>
                          <AdminDashboard />
                      </ProtectedRoute>
                  </PageWrapper>
              } 
            />
          </Routes>
        </AnimatePresence>
      </Suspense>
      <Footer />
    </>
  );
};

export default App;
