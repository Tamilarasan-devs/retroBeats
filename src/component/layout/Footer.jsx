import React, { useState, useEffect } from 'react';
import { FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa";
import { Eye } from 'lucide-react';

export default function Footer() {
  const [visitorCount, setVisitorCount] = useState(null);

  useEffect(() => {
    // Local visitor count starting at 10
    let currentCount = parseInt(localStorage.getItem('retrobest_visitor_count'));
    
    if (isNaN(currentCount)) {
      currentCount = 10; // Start at 10 on first visit
    } else {
      currentCount += 1; // Increase on subsequent visits
    }
    
    localStorage.setItem('retrobest_visitor_count', currentCount.toString());
    setVisitorCount(currentCount);
  }, []);

  return (
    <>
      {visitorCount !== null && (
        <div className="w-full flex items-center justify-center gap-2 py-3 opacity-80 hover:opacity-100 transition-opacity duration-300">
          <Eye size={16} className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
          <span 
            className="text-sm font-medium tracking-[0.2em] text-slate-300"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {visitorCount.toLocaleString()}
          </span>
        </div>
      )}
      <footer className="relative bg-gradient-to-br from-[#4a0505] via-[#3a0404] to-[#240202] text-slate-300 pt-24 pb-12 px-6 md:px-16 overflow-hidden border-t border-red-900/30">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      {/* Elegant Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.12),transparent_70%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-4 gap-12 lg:gap-16">

        {/* Brand Section */}
        <div className="space-y-6">
          <h2
            className="text-4xl md:text-5xl font-black text-white"
            style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: "0 0 20px rgba(239,68,68,0.3)" }}
          >
            Retro Beats
          </h2>

          <p className="text-slate-200 text-base md:text-lg leading-relaxed font-serif italic">
            Crafting unforgettable musical experiences with world-class artists,
            blending tradition and modern sound for every stage.
          </p>
          
          <div className="flex gap-4 pt-2">
            {[
              { icon: FaInstagram, link: "#" },
              { icon: FaYoutube, link: "#" },
              { icon: FaFacebookF, link: "#" }
            ].map((social, i) => (
              <a 
                key={i}
                href={social.link}
                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-red-600 hover:border-red-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all duration-500 group"
              >
                <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="space-y-8">
          <h3 className="text-xs uppercase tracking-[0.4em] text-red-400 font-black" style={{ fontFamily: "'Inter', sans-serif" }}>
            Navigation
          </h3>

          <ul className="space-y-4">
            {["Home", "About", "Gallery", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-slate-300 hover:text-white font-serif transition-all duration-300 text-lg font-medium flex items-center gap-3 group"
                >
                  <span className="w-0 h-[1px] bg-red-500 group-hover:w-4 transition-all duration-300" />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services Links */}
        <div className="space-y-8">
          <h3 className="text-xs uppercase tracking-[0.4em] text-red-400 font-black" style={{ fontFamily: "'Inter', sans-serif" }}>
            Services
          </h3>

          <ul className="space-y-4">
            {["Live Orchestra", "Wedding Events", "Corporate Shows", "Private Concerts"].map((service) => (
              <li key={service} className="text-slate-300 hover:text-white font-serif transition-all duration-300 text-lg font-medium flex items-center gap-3 group cursor-pointer">
                <span className="w-0 h-[1px] bg-red-500 group-hover:w-4 transition-all duration-300" />
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <h3 className="text-xs uppercase tracking-[0.4em] text-red-400 font-black" style={{ fontFamily: "'Inter', sans-serif" }}>
            Connect
          </h3>

          <div className="space-y-6 text-slate-200 text-base md:text-lg font-serif leading-relaxed">
            <p className="flex items-start gap-4">
              <span className="text-red-500">📍</span>
              <span>Avinashi Road <br /> Coimbatore, Tamil Nadu ,641018</span>
            </p>
            <p className="flex items-center gap-4 group">
              <span className="text-red-500">📞</span>
              <a href="tel:+919791455877" className="hover:text-white transition-colors">+91 97914 55877</a>
            </p>
            <p className="flex items-center gap-4">
              <span className="text-red-500">✉️</span>
              <span className="hover:text-white transition-colors cursor-pointer">hello@retrobeats.com</span>
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="relative mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm font-bold tracking-widest uppercase">
        <p>© {new Date().getFullYear()} Retro Beats Orchestra. All rights reserved.</p>
      </div>

      {/* Decorative Glow Orb */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-red-600/10 blur-[100px] rounded-full pointer-events-none" />
    </footer>
    </>
  );
}