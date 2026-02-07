import { Link } from "react-router-dom";
import { brand } from "../data/aureliaData";
import Button from "./Button";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";

const CTA = () => {
  return (
    <section className="relative py-40 text-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2938&auto=format&fit=crop" 
            alt="Jewelry Background" 
            className="w-full h-full object-cover opacity-30 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-2xl mx-auto px-6"
      >
        <span className="text-[#c9a36b] uppercase tracking-[0.3em] text-xs font-bold mb-6 block">Join the Legacy</span>
        <h2 className="text-4xl md:text-6xl mb-8 tracking-wide font-serif text-white">
          {brand.tagline}
        </h2>

        <p className="text-gray-400 text-lg mb-12 font-light leading-relaxed">
          {brand.description}
        </p>

        <div className="flex justify-center">
          <Magnetic>
            <Button to="/shop" variant="primary" size="lg" className="min-w-[200px]">
              Explore Jewellery
            </Button>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
