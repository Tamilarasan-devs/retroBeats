import React, { useState } from "react";
import { MessageCircle, X, Send, User, Phone, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    purpose: ""
  });

  const phoneNumber = "919791455877";

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct the message with the data provided in the form
    const message = `Hello! I'm interested in your services.%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Purpose:* ${formData.purpose}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    console.log("Redirecting to WhatsApp with message:", message);
    window.location.href = whatsappUrl;
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end">
      {/* Lead Capture Form */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-6 w-[320px] md:w-[380px] bg-[#111]/90 backdrop-blur-2xl border border-red-500/20 rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden relative"
          >
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-[60px] -z-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-rose-600/10 blur-[60px] -z-10" />

            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Quick Inquiry
                </h3>
                <p className="text-[10px] text-red-500 uppercase tracking-[0.2em] font-bold mt-1">
                  We'll reply on WhatsApp
                </p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative group">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-red-500 transition-colors" />
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all text-sm"
                />
              </div>

              <div className="relative group">
                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-red-500 transition-colors" />
                <input
                  required
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all text-sm"
                />
              </div>

              <div className="relative group">
                <MessageSquare size={18} className="absolute left-4 top-4 text-slate-500 group-focus-within:text-red-500 transition-colors" />
                <textarea
                  required
                  name="purpose"
                  placeholder="Purpose of Inquiry"
                  rows="3"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-red-600/20"
              >
                Start Chatting
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center"
        aria-label="Contact us on WhatsApp"
      >
        {/* Tooltip (Only when closed) */}
        {!isOpen && (
          <span className="absolute right-full mr-6 px-5 py-2.5 bg-[#111] border border-red-500/20 text-white text-[10px] font-black tracking-[0.25em] uppercase rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 whitespace-nowrap shadow-2xl backdrop-blur-md">
            Get in Touch
          </span>
        )}

        {/* Button Circle */}
        <div className="relative">
          {/* Pulse Animation */}
          <div className={`absolute inset-0 rounded-full bg-red-600/30 animate-ping transition-all duration-500 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></div>
          
          <div className={`
            relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 transform
            ${isOpen ? 'bg-[#111] border border-red-500/20 rotate-90 scale-90' : 'bg-[#25D366] hover:scale-110 hover:-translate-y-2'}
          `}>
            {isOpen ? (
              <X className="text-red-500" size={28} />
            ) : (
              <svg 
                viewBox="0 0 24 24" 
                width="32" 
                height="32" 
                fill="currentColor"
                className="text-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.628 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            )}
          </div>
        </div>
      </button>
    </div>
  );
};

export default WhatsAppButton;

