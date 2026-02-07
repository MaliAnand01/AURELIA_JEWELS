import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { StorageService } from "../services/storage";
import Button from "../components/Button";
import toast from "react-hot-toast";
import confetti from 'canvas-confetti';
import { CheckCircle, Gift, PenTool, Sparkles, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Checkout = () => {
  const { cart, dispatch } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [gifting, setGifting] = useState({
    isGift: false,
    wrap: false,
    message: false,
    messageContent: ""
  });
  const navigate = useNavigate();

  const handlePincodeLookup = async (pincode) => {
      try {
          const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
          const data = await response.json();

          if (data[0].Status === "Success") {
              const details = data[0].PostOffice[0];
              setValue("city", details.District);
              setValue("state", details.State);
              toast.success("Address details found!");
          } else {
              toast.error("Invalid Pincode");
          }
      } catch (error) {
          toast.error("Error fetching pincode details");
      }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const GIFT_WRAP_PRICE = 500;
  const GIFT_MESSAGE_PRICE = 200;
  
  const total = subtotal + 
                (gifting.wrap ? GIFT_WRAP_PRICE : 0) + 
                (gifting.message ? GIFT_MESSAGE_PRICE : 0);

  const onSubmit = (data) => {
    const orderData = {
        userId: user?.id || "guest",
        shipping: data,
        items: cart,
        total: total,
        gifting: gifting.isGift ? {
            wrap: gifting.wrap,
            message: gifting.message,
            messageContent: gifting.messageContent
        } : null
    };
    
    StorageService.addOrder(orderData);
    dispatch({ type: "CLEAR_CART" });
    setOrderPlaced(true);
    reset();
  };

  useEffect(() => {
    if (orderPlaced) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { 
        startVelocity: 30, 
        spread: 360, 
        ticks: 60, 
        zIndex: 100,
        colors: ['#c9a36b', '#ffffff', '#1a1a1a']
      };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 30 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
    }
  }, [orderPlaced]);

  const handleClose = () => {
    setOrderPlaced(false)
    navigate("/");
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-32 text-white">
      <h2 className="text-4xl mb-12 font-serif tracking-wide border-b border-white/10 pb-6">Checkout</h2>

      <div className="grid md:grid-cols-2 gap-16">
          {/* Order summary */}
          <div className="border border-white/10 p-8 rounded-sm h-fit">
            <h3 className="text-xl mb-6 font-serif">Order Summary</h3>

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between mb-4 text-sm"
              >
                <span>
                  {item.name} <span className="text-gray-400">× {item.qty}</span>
                </span>
                <span>₹{(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}

            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>

            {gifting.wrap && (
              <div className="flex justify-between text-sm text-[#c9a36b] mb-2 font-medium">
                <span className="flex items-center gap-2 italic"><Sparkles size={12}/> Luxury Gift Wrap</span>
                <span>₹{GIFT_WRAP_PRICE.toLocaleString()}</span>
              </div>
            )}

            {gifting.message && (
              <div className="flex justify-between text-sm text-[#c9a36b] mb-2 font-medium">
                <span className="flex items-center gap-2 italic"><PenTool size={12}/> Wax-Sealed Note</span>
                <span>₹{GIFT_MESSAGE_PRICE.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between font-medium mt-6 pt-6 border-t border-white/10 text-lg">
              <span>Total Amount</span>
              <span className="text-[#c9a36b]">₹{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Gifting Options */}
          <div className="mt-8 bg-white/[0.02] border border-white/10 p-8 rounded-sm">
             <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setGifting({...gifting, isGift: !gifting.isGift})}
             >
                <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full transition-colors ${gifting.isGift ? 'bg-[#c9a36b] text-black' : 'bg-white/5 text-gray-500'}`}>
                        <Gift size={20} />
                    </div>
                    <div>
                        <h4 className="text-sm font-serif tracking-widest uppercase">Premium Gifting</h4>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Add a touch of heritage to your acquisition</p>
                    </div>
                </div>
                <motion.div
                    animate={{ rotate: gifting.isGift ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown size={20} className="text-gray-500" />
                </motion.div>
             </div>

             <AnimatePresence>
                {gifting.isGift && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-8 space-y-6">
                            <div 
                                className={`flex items-center justify-between p-4 border rounded-sm cursor-pointer transition ${gifting.wrap ? 'border-[#c9a36b] bg-[#c9a36b]/5' : 'border-white/5 bg-transparent'}`}
                                onClick={() => setGifting({...gifting, wrap: !gifting.wrap})}
                            >
                                <div className="flex items-center gap-4">
                                    <Sparkles size={16} className={gifting.wrap ? 'text-[#c9a36b]' : 'text-gray-600'} />
                                    <div>
                                        <p className="text-xs uppercase tracking-widest font-bold">Luxury Gift Wrap</p>
                                        <p className="text-[10px] text-gray-500 mt-1">Silk ribbon & signature gold-foil packaging</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-[#c9a36b]">₹{GIFT_WRAP_PRICE}</span>
                            </div>

                            <div 
                                className={`p-4 border rounded-sm transition ${gifting.message ? 'border-[#c9a36b] bg-[#c9a36b]/5' : 'border-white/5 bg-transparent'}`}
                            >
                                <div 
                                    className="flex items-center justify-between cursor-pointer"
                                    onClick={() => setGifting({...gifting, message: !gifting.message})}
                                >
                                    <div className="flex items-center gap-4">
                                        <PenTool size={16} className={gifting.message ? 'text-[#c9a36b]' : 'text-gray-600'} />
                                        <div>
                                            <p className="text-xs uppercase tracking-widest font-bold">Personalized Note</p>
                                            <p className="text-[10px] text-gray-500 mt-1">Hand-written message with wax seal</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-[#c9a36b]">₹{GIFT_MESSAGE_PRICE}</span>
                                </div>

                                <AnimatePresence>
                                    {gifting.message && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden pt-4"
                                        >
                                            <textarea 
                                                value={gifting.messageContent}
                                                onChange={(e) => setGifting({...gifting, messageContent: e.target.value})}
                                                placeholder="Write your message here... Our calligrapher will transcribe it onto parchment."
                                                className="w-full bg-black/40 border border-white/10 p-4 text-xs font-light tracking-wide outline-none focus:border-[#c9a36b] transition rounded-sm resize-none"
                                                rows="3"
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                )}
             </AnimatePresence>
          </div>

          {/* Address form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h3 className="text-xl mb-2 font-serif">Delivery Address</h3>

            <div>
                <label className="block text-xs uppercase text-gray-400 mb-2">Full Name</label>
                <input
                {...register("name", { required: true })}
                className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-sm focus:border-[#c9a36b] outline-none transition"
                />
            </div>

            <div>
                <label className="block text-xs uppercase text-gray-400 mb-2">Phone Number</label>
                <input
                {...register("phone", { required: true })}
                className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-sm focus:border-[#c9a36b] outline-none transition"
                />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs uppercase text-gray-400 mb-2">Pincode</label>
                    <input
                    {...register("pincode", { 
                        required: true, 
                        minLength: 6, 
                        maxLength: 6,
                        onChange: (e) => {
                            if (e.target.value.length === 6) {
                                handlePincodeLookup(e.target.value);
                            }
                        }
                    })}
                    placeholder="Example: 110001"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-sm focus:border-[#c9a36b] outline-none transition"
                    />
                </div>
                 <div>
                    <label className="block text-xs uppercase text-gray-400 mb-2">City</label>
                    <input
                    {...register("city", { required: true })}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-sm focus:border-[#c9a36b] outline-none transition"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs uppercase text-gray-400 mb-2">State</label>
                    <input
                    {...register("state", { required: true })}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-sm focus:border-[#c9a36b] outline-none transition"
                    />
                </div>
                 <div>
                    <label className="block text-xs uppercase text-gray-400 mb-2">Country</label>
                    <input
                    {...register("country", { required: true })}
                    defaultValue="India"
                    readOnly
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-sm focus:border-[#c9a36b] outline-none transition opacity-50 cursor-not-allowed"
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs uppercase text-gray-400 mb-2">Full Address</label>
                <textarea
                {...register("address", { required: true })}
                className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-sm focus:border-[#c9a36b] outline-none transition"
                rows="4"
                />
            </div>

            <Button
                disabled={cart.length === 0}
                type="submit"
                className="w-full"
                size="lg"
            >
              Place Order
            </Button>
          </form>
      </div>

      {/* Success popup */}
      {orderPlaced && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-[150] p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-[#0a0a0a] border border-[#c9a36b]/30 text-white p-8 md:p-12 text-center max-w-lg w-full rounded-sm shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c9a36b] to-transparent opacity-50" />
            
            <div className="flex justify-center mb-6">
                <div className="bg-[#c9a36b]/10 p-4 rounded-full border border-[#c9a36b]/20">
                    <CheckCircle className="text-[#c9a36b]" size={48} />
                </div>
            </div>

            <h3 className="text-4xl mb-4 font-serif text-[#c9a36b] tracking-wider uppercase">Order Confirmed</h3>
            <p className="mb-10 text-gray-400 text-lg leading-relaxed font-light">
              Your exquisite selection has been secured. <br />
              Expect a confirmation email shortly.
            </p>
            
            <div className="flex flex-col gap-4 max-w-xs mx-auto">
                <Button
                    onClick={() => handleClose()}
                    variant="primary"
                    className="w-full"
                >
                Continue Shopping
                </Button>
                <Button
                    onClick={() => navigate("/account")}
                    variant="outline"
                    className="w-full"
                    size="sm"
                >
                Track Order
                </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
