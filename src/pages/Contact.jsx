import Button from "../components/Button";

const Contact = () => {
  return (
    <div className="min-h-screen text-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        
        <div>
            <h1 className="text-4xl md:text-5xl font-serif mb-8 tracking-wide text-[#f5e9d6]">Contact Us</h1>
            <p className="text-gray-400 mb-10 text-lg">
                Have a question about our collections or a custom order? 
                Our team is here to assist you with every detail.
            </p>

            <div className="space-y-8">
                <div>
                    <h3 className="text-[#c9a36b] tracking-widest uppercase text-sm mb-2">Visit Our Boutique</h3>
                    <p className="text-gray-300">123 Luxury Avenue, Jubilee Hills,<br/>Hyderabad, India 500033</p>
                </div>
                <div>
                    <h3 className="text-[#c9a36b] tracking-widest uppercase text-sm mb-2">Concierge Service</h3>
                    <p className="text-gray-300">+91 98765 43210<br/>concierge@aurelia.com</p>
                </div>
                <div>
                    <h3 className="text-[#c9a36b] tracking-widest uppercase text-sm mb-2">Opening Hours</h3>
                    <p className="text-gray-300">Mon - Sat: 11:00 AM - 8:00 PM<br/>Sun: By Appointment Only</p>
                </div>
            </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-sm">
            <form className="space-y-6">
                <div>
                    <label className="block text-xs uppercase text-gray-500 mb-2">Name</label>
                    <input className="w-full bg-black/50 border border-white/10 p-3 rounded-sm focus:border-[#c9a36b] outline-none transition text-white" />
                </div>
                <div>
                    <label className="block text-xs uppercase text-gray-500 mb-2">Email</label>
                    <input type="email" className="w-full bg-black/50 border border-white/10 p-3 rounded-sm focus:border-[#c9a36b] outline-none transition text-white" />
                </div>
                <div>
                    <label className="block text-xs uppercase text-gray-500 mb-2">Message</label>
                    <textarea rows="4" className="w-full bg-black/50 border border-white/10 p-3 rounded-sm focus:border-[#c9a36b] outline-none transition text-white"></textarea>
                </div>
                
                <Button variant="primary" className="w-full">Send Message</Button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;