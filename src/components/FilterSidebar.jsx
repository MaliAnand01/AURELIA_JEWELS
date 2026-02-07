import React from 'react';
import { X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterSidebar = ({ isOpen, onClose, filters, setFilters }) => {
  const materials = ["Gold", "White Gold", "Rose Gold", "Platinum", "Silver"];
  const purities = ["14K", "18K", "22K", "950", "925"];

  const handleCheckboxChange = (category, value) => {
    const current = filters[category];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    setFilters({ ...filters, [category]: updated });
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 500000],
      material: [],
      purity: [],
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] lg:hidden"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-80 bg-[#0a0a0a] border-r border-white/10 z-[90] p-8 pt-24 overflow-y-auto lg:relative lg:translate-x-0 lg:z-0 lg:w-64 lg:p-0 lg:bg-transparent lg:border-none"
          >
            <div className="flex justify-between items-center mb-10 lg:hidden">
              <h2 className="text-xl font-serif text-white">Filters</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-10">
              {/* Price Range */}
              <div>
                <h3 className="text-[#c9a36b] uppercase tracking-widest text-xs font-bold mb-6">Price Range</h3>
                <input 
                    type="range" 
                    min="0" 
                    max="500000" 
                    step="5000"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({...filters, priceRange: [0, parseInt(e.target.value)]})}
                    className="w-full accent-[#c9a36b] bg-white/10 h-1 rounded-full cursor-pointer"
                />
                <div className="flex justify-between mt-4 text-xs font-light tracking-widest text-gray-400">
                    <span>₹0</span>
                    <span>Up to ₹{filters.priceRange[1].toLocaleString()}</span>
                </div>
              </div>

              {/* Material */}
              <div>
                <h3 className="text-[#c9a36b] uppercase tracking-widest text-xs font-bold mb-6">Material</h3>
                <div className="space-y-3">
                  {materials.map(mat => (
                    <label key={mat} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 border border-white/20 rounded-sm flex items-center justify-center transition ${filters.material.includes(mat) ? 'bg-[#c9a36b] border-[#c9a36b]' : ''}`}>
                        {filters.material.includes(mat) && <div className="w-2 h-2 bg-black rounded-full" />}
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={filters.material.includes(mat)}
                        onChange={() => handleCheckboxChange('material', mat)}
                      />
                      <span className="text-sm text-gray-400 group-hover:text-white transition">{mat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Purity */}
              <div>
                <h3 className="text-[#c9a36b] uppercase tracking-widest text-xs font-bold mb-6">Purity</h3>
                <div className="grid grid-cols-2 gap-3">
                  {purities.map(purity => (
                    <button
                      key={purity}
                      onClick={() => handleCheckboxChange('purity', purity)}
                      className={`text-[10px] tracking-widest py-2 border rounded-sm transition ${
                        filters.purity.includes(purity)
                        ? "bg-[#c9a36b] text-black border-[#c9a36b]"
                        : "text-gray-500 border-white/10 hover:border-[#c9a36b] hover:text-[#c9a36b]"
                      }`}
                    >
                      {purity}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button 
                onClick={clearFilters}
                className="w-full py-3 text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-white border border-white/10 hover:border-white transition duration-500 rounded-sm"
              >
                Reset All
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterSidebar;
