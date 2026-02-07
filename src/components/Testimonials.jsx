import { testimonials } from "../data/aureliaData";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const Testimonials = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
      <motion.div
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.8 }}
         className="text-center mb-20"
      >
         <h2 className="text-3xl md:text-4xl font-serif text-[#f5e9d6] mb-4">Client Experiences</h2>
         <div className="w-16 h-[1px] bg-[#c9a36b] mx-auto opacity-50"></div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-10">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="bg-white/5 p-10 rounded-sm relative hover:bg-white/10 transition duration-500 group"
          >
            <Quote className="text-[#c9a36b]/20 absolute top-8 left-8" size={48} />
            
            <p className="text-gray-300 mb-8 relative z-10 font-light leading-7 tracking-wide italic">"{t.text}"</p>

            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#c9a36b] flex items-center justify-center text-black font-serif font-bold">
                    {t.name[0]}
                </div>
                <div>
                    <p className="text-[#c9a36b] font-medium text-sm tracking-wide">{t.name}</p>
                    <p className="text-gray-600 text-xs uppercase tracking-widest">{t.location}</p>
                </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
