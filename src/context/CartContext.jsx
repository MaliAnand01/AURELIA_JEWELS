import { createContext, useReducer, useEffect, useContext } from "react";
import { StorageService } from "../services/storage";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return action.payload;

    case "ADD_TO_CART": {
      const existing = state.find(
        (item) => item.id === action.payload.id
      );

      if (existing) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...state, { ...action.payload, qty: 1 }];
    }

    case "INCREASE_QTY":
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, qty: item.qty + 1 }
          : item
      );

    case "DECREASE_QTY":
      return state
        .map((item) =>
          item.id === action.payload
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0);

    case "REMOVE":
      return state.filter((item) => item.id !== action.payload);

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, dispatch] = useReducer(cartReducer, []);

  // Load cart when user changes (or on mount)
  useEffect(() => {
    const userId = user?.id;
    const storedCart = StorageService.getCart(userId);
    if (storedCart) {
        dispatch({ type: "SET_CART", payload: storedCart });
    }
  }, [user]);

  // Save cart whenever it changes
  useEffect(() => {
    const userId = user?.id;
    StorageService.saveCart(userId, cart);
  }, [cart, user]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
