import { useParams } from "react-router-dom";
import { products } from "../data/aureliaData";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button";
import { Share2, Heart, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const { dispatch } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef(null);

  const product = products.find((p) => p.id === id);

  if (!product) return <p className="p-10 text-white">Product not found</p>;

  const inWishlist = isInWishlist(product.id);

  const toggleWishlist = () => {
      if (inWishlist) {
          removeFromWishlist(product.id);
          toast.success("Removed from wishlist");
      } else {
          addToWishlist(product);
          toast.success("Added to wishlist");
      }
  };

  const handleShare = async () => {
      try {
          if (navigator.share) {
              await navigator.share({
                  title: `Aurelia Jewels - ${product.name}`,
                  text: product.description,
                  url: window.location.href,
              });
          } else {
              await navigator.clipboard.writeText(window.location.href);
              toast.success("Link copied to clipboard");
          }
      } catch (err) {
          console.error("Error sharing:", err);
      }
  };

  const handleMouseMove = (e) => {
      if (!imageRef.current) return;
      const { left, top, width, height } = imageRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
      dispatch({ type: "ADD_TO_CART", payload: product });
      toast.success("Added to cart");
  }

  const handleBuyNow = () => {
      if (!user) {
          toast.error("Please login to continue");
          navigate("/login", { state: { from: `/product/${id}`, product: product } });
          return;
      }
      dispatch({ type: "ADD_TO_CART", payload: product });
      navigate("/checkout");
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-gray-500 hover:text-white transition mb-12 uppercase tracking-widest text-xs"
        >
            <ArrowLeft size={16} /> Back to Collection
        </button>

        <div className="grid md:grid-cols-2 gap-16 items-start mb-32">
            {/* Cinematic Image Zoom */}
            <div 
                className="overflow-hidden rounded-sm border border-white/10 relative group aspect-[3/4] cursor-zoom-in"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseMove={handleMouseMove}
                ref={imageRef}
            >
                <motion.img
                    layoutId={`image-${product.id}`}
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-200"
                    style={{
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                        scale: isHovered ? 2 : 1
                    }}
                />
                
                <div className="absolute top-4 right-4 flex flex-col gap-3">
                    <button 
                        onClick={toggleWishlist}
                        className="bg-black/50 backdrop-blur-md p-3 rounded-full hover:bg-white hover:text-red-500 transition text-white"
                        title="Add to Wishlist"
                    >
                        <Heart size={20} className={inWishlist ? "fill-red-500 text-red-500" : ""} />
                    </button>
                    <button 
                        onClick={handleShare}
                        className="bg-black/50 backdrop-blur-md p-3 rounded-full hover:bg-white hover:text-[#c9a36b] transition text-white"
                        title="Share this piece"
                    >
                        <Share2 size={20} />
                    </button>
                </div>

                {isHovered && (
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-[10px] uppercase tracking-widest text-[#c9a36b] border border-[#c9a36b]/30">
                        Interactive Detail View
                    </div>
                )}
            </div>

            <div className="text-white">
                <p className="text-[#c9a36b] text-xs uppercase tracking-[0.3em] mb-4 font-bold">{product.category}</p>
                <h1 className="text-3xl md:text-5xl font-serif mb-6 tracking-wide text-[#f5e9d6] leading-tight">{product.name}</h1>
                <p className="text-gray-400 mb-8 leading-relaxed tracking-wide text-base md:text-lg border-b border-white/10 pb-8">{product.description}</p>

                <div className="mb-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white/5 p-4 border border-white/5 rounded-sm flex flex-row sm:flex-col justify-between items-center sm:items-start">
                        <span className="block text-gray-500 text-[10px] uppercase tracking-tighter mb-0 sm:mb-1">Material</span>
                        <span className="text-xs sm:text-sm tracking-wide text-[#c9a36b] font-medium">{product.material}</span>
                    </div>
                    <div className="bg-white/5 p-4 border border-white/5 rounded-sm flex flex-row sm:flex-col justify-between items-center sm:items-start">
                        <span className="block text-gray-500 text-[10px] uppercase tracking-tighter mb-0 sm:mb-1">Purity</span>
                        <span className="text-xs sm:text-sm tracking-wide text-[#c9a36b] font-medium">{product.purity}</span>
                    </div>
                    <div className="bg-white/5 p-4 border border-white/5 rounded-sm flex flex-row sm:flex-col justify-between items-center sm:items-start">
                        <span className="block text-gray-500 text-[10px] uppercase tracking-tighter mb-0 sm:mb-1">Weight</span>
                        <span className="text-xs sm:text-sm tracking-wide text-[#c9a36b] font-medium">{product.weight}</span>
                    </div>
                </div>

                <div className="flex items-end gap-4 mb-12">
                    <p className="text-4xl font-light text-white">
                        ₹{product.price.toLocaleString()}
                    </p>
                    {product.originalPrice && (
                        <p className="text-xl text-gray-600 line-through mb-1">
                            ₹{product.originalPrice.toLocaleString()}
                        </p>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                        onClick={handleAddToCart}
                        variant="outline"
                        className="flex-1 py-6 h-auto text-xs"
                    >
                        ADD TO BAG
                    </Button>

                    <Button
                        onClick={handleBuyNow}
                        variant="primary"
                        className="flex-1 py-6 h-auto text-xs"
                    >
                        ACQUIRE NOW
                    </Button>
                </div>

                <div className="mt-12 pt-12 border-t border-white/10">
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                        <div className="flex items-center gap-2 italic">✓ Ethically Sourced</div>
                        <div className="flex items-center gap-2 italic">✓ Lifetime Warranty</div>
                        <div className="flex items-center gap-2 italic">✓ Insured Delivery</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
            <div>
                <h2 className="text-3xl font-serif text-white mb-10 tracking-wide border-b border-white/10 pb-6">Curated For You</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {relatedProducts.map(p => (
                         <div 
                            key={p.id} 
                            onClick={() => {
                                navigate(`/product/${p.id}`);
                                window.scrollTo(0, 0);
                            }} 
                            className="cursor-pointer group"
                         >
                             <div className="overflow-hidden mb-6 relative aspect-[3/4] border border-white/5 rounded-sm">
                                 <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" />
                                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition duration-500" />
                                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                                     <span className="bg-white text-black px-6 py-2 text-[10px] uppercase tracking-[0.2em] font-bold">View Detail</span>
                                 </div>
                             </div>
                             <h3 className="text-white font-serif text-lg mb-1 group-hover:text-[#c9a36b] transition">{p.name}</h3>
                             <p className="text-[#c9a36b]/80 text-sm tracking-widest">₹{p.price.toLocaleString()}</p>
                         </div>
                    ))}
                </div>
            </div>
        )}
    </div>
  );
};

export default ProductDetails;
