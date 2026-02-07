import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import PageWrapper from "./components/PageWrapper";
import CustomCursor from "./components/CustomCursor";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import Wishlist from "./pages/Wishlist";

import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";

const App = () => {
  const location = useLocation();

  return (
    <>
      <CustomCursor />
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
      <Footer />
    </>
  );
};

export default App;
