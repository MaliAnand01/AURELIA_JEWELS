import { useState } from "react";
import { products } from "../data/aureliaData";
import ProductCard from "../components/ProductCard";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import ProductSkeleton from "../components/ProductSkeleton";
import FilterSidebar from "../components/FilterSidebar";
import { useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 500000],
    material: [],
    purity: [],
  });

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [category, searchTerm, filters]); // Reload on filter change

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === "All" || product.category === category.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
        product.name.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower);
    
    const matchesPrice = product.price <= filters.priceRange[1];
    const matchesMaterial = filters.material.length === 0 || filters.material.includes(product.material);
    const matchesPurity = filters.purity.length === 0 || filters.purity.includes(product.purity);
    
    return matchesCategory && matchesSearch && matchesPrice && matchesMaterial && matchesPurity;
  });

  const categories = ["All", "Necklaces", "Rings", "Earrings", "Bracelets"];

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 px-6 max-w-[1920px] mx-auto lg:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-white text-center mb-12 tracking-wide">
            Our Collection
        </h1>

        <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Toggle for Mobile */}
            <div className="lg:hidden flex justify-between items-center mb-6">
                <button 
                    onClick={() => setIsFilterOpen(true)}
                    className="flex items-center gap-2 text-white border border-white/10 px-6 py-3 rounded-sm text-xs uppercase tracking-widest hover:bg-white hover:text-black transition"
                >
                    <SlidersHorizontal size={16} /> Filters
                </button>
            </div>

            {/* Backdrop for Desktop Sidebar */}
            <FilterSidebar 
              isOpen={isFilterOpen || window.innerWidth >= 1024} 
              onClose={() => setIsFilterOpen(false)} 
              filters={filters} 
              setFilters={setFilters} 
            />

            <div className="flex-1">
                {/* Search & Categories Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          {/* Categories */}
          <div className="flex flex-wrap gap-4 justify-center">
              {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`text-sm uppercase tracking-widest px-4 py-2 rounded-full transition border ${
                        category === cat 
                        ? "bg-[#c9a36b] text-black border-[#c9a36b]" 
                        : "text-gray-400 border-white/10 hover:border-[#c9a36b] hover:text-[#c9a36b]"
                    }`}
                  >
                      {cat}
                  </button>
              ))}
          </div>

          {/* Search */}
          <div className="flex items-center gap-4 w-full md:w-80 border-b border-white/30 py-2 focus-within:border-[#c9a36b] transition-all duration-500">
            <Search className="text-[#c9a36b] min-w-[18px]" size={18} />
            <input
                type="text"
                placeholder="Search collection..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-white w-full placeholder:text-gray-500 text-sm tracking-widest font-light"
            />
          </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <ProductSkeleton cards={8} />
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-400 font-serif">No products found.</p>
        </div>
      )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
