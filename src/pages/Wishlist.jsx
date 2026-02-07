import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import Button from "../components/Button";
import toast from "react-hot-toast";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { dispatch: cartDispatch } = useContext(CartContext);

  const handleMoveToCart = (product) => {
    cartDispatch({ type: "ADD_TO_CART", payload: product });
    removeFromWishlist(product.id);
    toast.success(`${product.name} moved to bag`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-32 text-white">
      <h1 className="text-4xl font-serif mb-12 tracking-wide text-center">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
            <p className="text-gray-400 mb-6">Your wishlist is empty.</p>
            <Button to="/shop" variant="primary">Start Shopping</Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {wishlist.map((product) => (
            <ProductCard 
                key={product.id} 
                product={product} 
                showMoveToCart={true} 
                onMoveToCart={handleMoveToCart} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
