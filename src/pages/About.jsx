import { motion } from "framer-motion";

const About = () => {
    return (
      <div className="min-h-screen text-white pt-40 pb-20 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
             <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
             >
                <span className="text-[#c9a36b] tracking-[0.2em] uppercase text-sm font-bold mb-4 block">Our Story</span>
                <h1 className="text-5xl md:text-7xl font-serif mb-8 tracking-wide text-[#f5e9d6] leading-none">
                    Heritage & <br/> <span className="italic text-gray-500">Craftsmanship</span>
                </h1>
                <p className="text-lg text-gray-300 leading-relaxed font-light mb-8">
                    Founded in 1995, Aurelia Jewels has been a hallmark of elegance and sophistication. 
                    Each piece is a testament to our commitment to craftsmanship, sourcing only the finest gemstones 
                    and metals to create timeless treasures that transcend generations.
                </p>
             </motion.div>
             
             <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative"
             >
                 <div className="absolute inset-0 border border-[#c9a36b]/30 translate-x-4 translate-y-4 -z-10 rounded-sm"></div>
                 <img 
                    src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2938" 
                    alt="Jewelry Making" 
                    className="w-full h-[500px] object-cover rounded-sm grayscale hover:grayscale-0 transition duration-1000 ease-in-out"
                />
             </motion.div>
          </div>
  
          <div className="grid md:grid-cols-3 gap-12 mb-20">
              {[
                { title: "Artistry", text: "Every design entails hours of meticulous hand-sketching and 3D modeling before it comes to life." },
                { title: "Purity", text: "We certify every diamond and gemstone, ensuring ethical sourcing and supreme quality." },
                { title: "Legacy", text: "Creating heirlooms that tell your story, designed to be cherished forever." }
              ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    className="p-10 border-t border-white/10 hover:border-[#c9a36b] transition duration-500 group"
                  >
                      <h3 className="text-3xl font-serif mb-6 text-[#f5e9d6] group-hover:text-[#c9a36b] transition">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-7 tracking-wide">{item.text}</p>
                  </motion.div>
              ))}
          </div>
  
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="w-full h-96 relative overflow-hidden rounded-sm"
          >
             <img 
                src="https://images.unsplash.com/photo-1531995811006-35cb42e1a022?q=80&w=2940&auto=format&fit=crop" 
                alt="Workshop" 
                className="w-full h-full object-cover opacity-60 hover:scale-105 transition duration-[2000ms]"
             />
             <div className="absolute inset-0 flex items-center justify-center">
                 <p className="text-3xl md:text-4xl font-serif text-white italic">"Jewelry is silence, displayed."</p>
             </div>
          </motion.div>
        </div>
      </div>
    );
  };
  
  export default About;