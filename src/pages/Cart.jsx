import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Button from "../components/Button";
import { Trash2, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, dispatch } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-white px-6">
        <ShoppingBag size={64} className="text-gray-600 mb-6" />
        <h2 className="text-3xl font-serif mb-4">Your Cart is Empty</h2>
        <p className="text-gray-400 mb-8 tracking-wide">Looks like you haven't added any pieces yet.</p>
        <Button onClick={() => navigate("/shop")} variant="primary">
          Explore Collection
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-32 text-white">
      <h1 className="text-4xl font-serif mb-12 tracking-wide text-center">Your Shopping Bag</h1>

      <div className="grid lg:grid-cols-3 gap-16">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-8">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 p-4 border border-white/10 rounded-sm bg-white/5 hover:border-[#c9a36b]/30 transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-sm"
              />
              
              <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-serif tracking-wide mb-1">{item.name}</h3>
                    <p className="text-gray-400 text-sm">₹{item.price.toLocaleString()}</p>
                </div>

                <div className="flex justify-between items-end">
                    <div className="flex items-center gap-3 bg-black/50 border border-white/20 rounded-full px-3 py-1">
                        <button
                        onClick={() => dispatch({ type: "DECREASE_QTY", payload: item.id })}
                        className="text-gray-400 hover:text-white transition w-5 text-center"
                        >
                        -
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.qty}</span>
                        <button
                        onClick={() => dispatch({ type: "INCREASE_QTY", payload: item.id })}
                        className="text-gray-400 hover:text-white transition w-5 text-center"
                        >
                        +
                        </button>
                    </div>

                    <button
                        onClick={() => dispatch({ type: "REMOVE", payload: item.id })}
                        className="text-gray-500 hover:text-red-500 transition"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 h-fit bg-white/5 border border-white/10 p-8 rounded-sm sticky top-32">
          <h2 className="text-xl font-serif mb-6 border-b border-white/10 pb-4">Order Summary</h2>
          
          <div className="space-y-4 mb-8 text-sm tracking-wide">
            <div className="flex justify-between">
              <span className="text-gray-400">Subtotal</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Shipping</span>
              <span className="text-green-400">Free</span>
            </div>
            <div className="flex justify-between text-lg font-medium pt-4 border-t border-white/10">
              <span>Total</span>
              <span className="text-[#c9a36b]">₹{total.toLocaleString()}</span>
            </div>
          </div>

          <Button
            onClick={() => navigate("/checkout")}
            variant="primary"
            className="w-full"
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
