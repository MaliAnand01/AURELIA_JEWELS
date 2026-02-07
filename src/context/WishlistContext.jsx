import { createContext, useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

// Since user didn't explicitly ask for local storage persistence for wishlist in detail but mentioned it "wishlist data", 
// we can implement simple persistence similar to Cart.
const getInitialWishlist = (userId) => {
    const key = userId ? `aurelia_wishlist_${userId}` : "aurelia_wishlist";
    return JSON.parse(localStorage.getItem(key) || "[]");
};

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist when user changes
  useEffect(() => {
    setWishlist(getInitialWishlist(user?.id));
  }, [user]);

  // Save wishlist on change
  useEffect(() => {
    const key = user?.id ? `aurelia_wishlist_${user.id}` : "aurelia_wishlist";
    localStorage.setItem(key, JSON.stringify(wishlist));
  }, [wishlist, user]);

  const addToWishlist = (product) => {
      // Check if already in wishlist
      if (!wishlist.find(i => i.id === product.id)) {
          setWishlist([...wishlist, product]);
      }
  };

  const removeFromWishlist = (productId) => {
      setWishlist(wishlist.filter(i => i.id !== productId));
  };

  const isInWishlist = (productId) => {
      return wishlist.some(i => i.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
