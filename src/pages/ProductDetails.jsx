import { useParams } from "react-router-dom";
import { products } from "../data/aureliaData";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { id } = useParams();
  const { dispatch } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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
      // Pass product directly to checkout if buy now (bypassing cart for instant buy? or clear cart?)
      // User requested: "on clicking Buy Now it redirects to checkout... check validity... show product info in order summary"
      // Simplest flow: Add to cart -> Go to Checkout. Or Pass state.
      // Let's pass state to Checkout to treat it as "Direct Buy" item, ignoring cart? Or just Add and Go.
      // "Add and Go" is safer for persistence.
      dispatch({ type: "ADD_TO_CART", payload: product });
      navigate("/checkout");
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-2 gap-16 items-start mb-32">
            <div className="overflow-hidden rounded-sm border border-white/10 relative group aspect-[3/4]">
                <motion.img
                    layoutId={`image-${product.id}`}
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-700"
                />
                <button 
                    onClick={toggleWishlist}
                    className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-3 rounded-full hover:bg-white hover:text-red-500 transition"
                >
                    <Heart size={24} className={inWishlist ? "fill-red-500 text-red-500" : "text-white"} />
                </button>
            </div>

            <div className="text-white">
                <h1 className="text-4xl md:text-5xl font-serif mb-6 tracking-wide text-[#f5e9d6]">{product.name}</h1>
                <p className="text-gray-400 mb-8 leading-relaxed tracking-wide text-lg border-b border-white/10 pb-8">{product.description}</p>

                <div className="mb-8 space-y-3 text-sm tracking-widest text-[#c9a36b]">
                <p><span className="text-gray-500 mr-2">MATERIAL:</span> {product.material}</p>
                <p><span className="text-gray-500 mr-2">PURITY:</span> {product.purity}</p>
                <p><span className="text-gray-500 mr-2">WEIGHT:</span> {product.weight}</p>
                </div>

                <p className="text-3xl mb-10 font-light">
                ₹{product.price.toLocaleString()}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                <Button
                    onClick={handleAddToCart}
                    variant="outline"
                    className="flex-1"
                >
                    ADD TO CART
                </Button>

                <Button
                    onClick={handleBuyNow}
                    variant="primary"
                    className="flex-1"
                >
                    BUY NOW
                </Button>
                </div>
            </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
            <div>
                <h2 className="text-3xl font-serif text-white mb-10 text-center tracking-wide">You May Also Like</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {relatedProducts.map(p => (
                         // Using a simple Link or ProductCard here. 
                         // To avoid circular dependency if ProductCard imports something heavy, let's duplicate or make sure ProductCard is lightweight.
                         // Or better, assume we import ProductCard.
                         <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} className="cursor-pointer group">
                             <div className="overflow-hidden mb-4 relative aspect-[3/4]">
                                 <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                                 <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition duration-300" />
                             </div>
                             <h3 className="text-white font-serif text-lg mb-1 group-hover:text-[#c9a36b] transition">{p.name}</h3>
                             <p className="text-gray-400">₹{p.price.toLocaleString()}</p>
                         </div>
                    ))}
                </div>
            </div>
        )}
    </div>
  );
};

export default ProductDetails;
