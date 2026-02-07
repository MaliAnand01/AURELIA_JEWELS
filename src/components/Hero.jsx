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
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-105"
        />
        {/* Cinematic Grain/Texture Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />
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
        <h1 className="text-6xl md:text-8xl font-serif tracking-normal mb-8 leading-tight text-[#f5e9d6]">
          AURELIA JEWELS
        </h1>

        <p className="text-gray-300 text-lg md:text-xl font-light tracking-wide mb-12 max-w-2xl mx-auto leading-relaxed">
          Discover a world where timeless elegance meets modern artistry. 
          Handcrafted masterpieces designed to be cherished for generations.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Magnetic>
              <Button to="/shop" variant="primary" size="lg" className="min-w-[180px]">
                  Explore Collection
              </Button>
            </Magnetic>
            <Magnetic>
              <Button to="/about" variant="outline" size="lg" className="min-w-[180px]">
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
        className="absolute bottom-10 z-20 text-white/50 text-xs tracking-widest uppercase flex flex-col items-center gap-2"
      >
        <span>Scroll to Discover</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>

    </section>
  );
};

export default Hero;
