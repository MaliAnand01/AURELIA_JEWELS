import { brand } from "../data/aureliaData";

const Footer = () => {
  return (
    <footer className="border-t border-[#c9a36b]/30 py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-sm">
        
        <div>
          <h3 className="text-xl mb-6 font-serif tracking-wide text-[#c9a36b]">{brand.name}</h3>
          <p className="text-gray-400 leading-relaxed">{brand.description}</p>
        </div>

        <div>
          <h4 className="mb-6 font-serif text-lg tracking-wide">Explore</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Shop</li>
            <li>Collections</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4">Connect</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Instagram</li>
            <li>Facebook</li>
            <li>WhatsApp</li>
          </ul>
        </div>

      </div>

      <p className="text-center text-gray-500 mt-12 text-xs">
        © {new Date().getFullYear()} {brand.name}. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
