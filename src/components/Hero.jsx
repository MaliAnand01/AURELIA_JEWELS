import { motion } from "framer-motion";
import Button from "./Button";
import { products } from "../data/aureliaData";
import Magnetic from "./Magnetic";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          src="/VideoProject.mp4"
          poster="https://images.pexels.com/photos/16056792/pexels-photo-16056792.jpeg?auto=compress&cs=tinysrgb&w=1920"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover md:scale-105 transition-opacity duration-1000"
          onCanPlayThrough={(e) => e.target.classList.remove('opacity-0')}
        />
        {/* Cinematic Grain/Texture Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-20 text-center max-w-4xl px-6 text-white"
      >
        <span className="block text-[#c9a36b] tracking-[0.3em] uppercase text-xs md:text-sm mb-6 font-medium">
             Est. 1995 • Heritage & Craft
        </span>
        <h1 className="text-5xl md:text-8xl font-serif tracking-normal mb-8 leading-tight text-[#f5e9d6]">
          AURELIA JEWELS
        </h1>

        <p className="text-gray-300 text-base md:text-xl font-light tracking-wide mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4 md:px-0">
          Discover a world where timeless elegance meets modern artistry. 
          Handcrafted masterpieces designed to be cherished for generations.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Magnetic>
              <Button to="/shop" variant="primary" size="lg" className="min-w-[180px] w-full sm:w-auto">
                  Explore Collection
              </Button>
            </Magnetic>
            <Magnetic>
              <Button to="/about" variant="outline" size="lg" className="min-w-[180px] w-full sm:w-auto">
                  Our Story
              </Button>
            </Magnetic>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-6 md:bottom-10 z-20 text-white/50 text-[10px] md:text-xs tracking-widest uppercase flex flex-col items-center gap-2"
      >
        <span className="opacity-70">Scroll to Discover</span>
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>

    </section>
  );
};

export default Hero;
