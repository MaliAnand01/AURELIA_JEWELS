import { Link } from "react-router-dom";
import Button from "./Button";
import { Heart } from "lucide-react";
import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";

const ProductCard = ({ product, showMoveToCart = false, onMoveToCart = null }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const inWishlist = isInWishlist(product.id);

  const toggleWishlist = (e) => {
      e.preventDefault(); // Prevent link navigation
      e.stopPropagation();
      if (inWishlist) {
          removeFromWishlist(product.id);
          toast.success("Removed from wishlist");
      } else {
          addToWishlist(product);
          toast.success("Added to wishlist");
      }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group border border-[#c9a36b]/20 bg-white/5 rounded-sm p-4 hover:border-[#c9a36b]/60 transition-all duration-300 relative will-change-transform active:scale-[0.98] sm:active:scale-100"
    >
      <div className="overflow-hidden mb-4 relative aspect-[3/4] bg-white/5">
        <Link to={`/product/${product.id}`}>
            <motion.img
                layoutId={`image-${product.id}`}
                src={product.image}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover group-hover:scale-105 transition duration-500 ease-in-out"
            />
        </Link>
        <button 
            onClick={toggleWishlist}
            className="absolute top-3 right-3 bg-black/40 backdrop-blur-md p-2 rounded-full hover:bg-white hover:text-red-500 transition z-10 active:scale-75"
        >
            <Heart size={18} className={inWishlist ? "fill-red-500 text-red-500" : "text-white"} />
        </button>
      </div>

      <Link to={`/product/${product.id}`} className="block mt-4 text-lg font-serif tracking-wide text-white group-hover:text-[#c9a36b] transition">
        {product.name}
      </Link>

      <p className="mt-1 text-[#c9a36b] font-medium tracking-widest text-sm">
        ₹{product.price.toLocaleString()}
      </p>

      <div className="mt-5 flex flex-col gap-3">
        {showMoveToCart ? (
          <Magnetic>
            <Button 
                onClick={(e) => { e.preventDefault(); onMoveToCart(product); }} 
                variant="primary" 
                size="sm" 
                className="w-full"
            >
                Move to Cart
            </Button>
          </Magnetic>
        ) : (
          <Magnetic>
            <Button to={`/product/${product.id}`} variant="outline" size="sm" className="w-full">
                View Details
            </Button>
          </Magnetic>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
