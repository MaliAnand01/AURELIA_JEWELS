import { products } from "../data/aureliaData";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import Button from "./Button";
import ProductSkeleton from "./ProductSkeleton";
import { useState, useEffect } from "react";

const FeaturedProducts = () => {
  const [loading, setLoading] = useState(true);
  const featured = products.filter((p) => p.isFeatured).slice(0, 4);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-[#050505] max-w-[1920px] mx-auto px-6 py-20 md:py-32 md:px-12 border-b border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <span className="text-[#c9a36b] tracking-[0.2em] uppercase text-xs font-bold mb-3 block">Curated Selection</span>
            <h2 className="text-4xl md:text-5xl tracking-wide font-serif text-[#f5e9d6]">
                Featured Creations
            </h2>
        </motion.div>

        <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
        >
            <Button to="/shop" variant="outline">View All Collections</Button>
        </motion.div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {loading ? (
             <ProductSkeleton cards={4} />
        ) : (
            featured.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
