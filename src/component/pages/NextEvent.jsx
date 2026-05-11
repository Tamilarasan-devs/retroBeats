import React from "react";
import { Calendar, MapPin, Clock, Ticket, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function NextEvent() {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] overflow-hidden border-t border-red-900/10">
      
      {/* Background Decorative Elements - Match WhoWeAre/WhyChooseUs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-900/10 blur-[130px] -z-10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-900/10 blur-[120px] -z-10 rounded-full -translate-x-1/2 translate-y-1/2"></div>
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Side: Event Details */}
          <div className="flex-1 space-y-10 order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-red-950/20 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                <Calendar size={13} /> Next Performance
              </div>
              <h2 className="text-5xl md:text-7xl font-bold text-white leading-[1.05]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Devārāgam: <br />
                <span className="text-red-600 italic">Musical Odyssey</span>
              </h2>
              <p className="text-slate-200 text-lg md:text-xl font-medium leading-relaxed max-w-xl" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Experience an extraordinary evening where ancient tradition meets modern symphonic grandeur.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: MapPin, label: "Venue", val: "Codissia Ground", sub: "Coimbatore, Tamil Nadu" },
                { icon: Clock, label: "Date & Time", val: "May 24, 2025", sub: "06:30 PM Onwards" }
              ].map((info, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="group flex items-start gap-5 p-6 rounded-2xl bg-[#0f0f0f] border border-white/5 hover:border-red-600/40 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-950/30 flex items-center justify-center shrink-0 text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    <info.icon size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>{info.label}</p>
                    <p className="text-lg font-semibold text-white mb-0.5" style={{ fontFamily: "'Outfit', sans-serif" }}>{info.val}</p>
                    <p className="text-sm text-slate-400">{info.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="p-8 rounded-3xl bg-[#111] border border-red-600/20 relative overflow-hidden group"
            >
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8">
                <div className="text-center sm:text-left">
                  <p className="text-slate-400 text-[11px] uppercase tracking-widest font-bold mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>Starting from</p>
                  <p className="text-4xl font-bold text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>₹499 <span className="text-sm font-medium text-slate-500">/ person</span></p>
                </div>
                
                <button className="w-full sm:w-auto px-10 py-5 bg-red-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-red-700 transition-all shadow-lg shadow-red-900/20 active:scale-95 flex items-center justify-center gap-3">
                  Book Your Tickets <Ticket size={18} />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Visual Element */}
          <div className="w-full lg:w-[45%] relative order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-red-600/20 rounded-[3.5rem] rotate-3 blur-3xl -z-10 group-hover:rotate-6 transition-transform duration-700"></div>
              
              <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] border border-white/10 ring-1 ring-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop" 
                  alt="Upcoming Event" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[3s]"
                />
                
                {/* Visual Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#240202] via-transparent to-transparent flex items-end p-10">
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-[2.5rem] w-full shadow-2xl">
                    <div className="flex items-center gap-5 mb-5">
                      <div className="flex -space-x-3">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="w-11 h-11 rounded-full border-2 border-[#240202] bg-slate-800 overflow-hidden shadow-lg">
                            <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" className="w-full h-full object-cover" />
                          </div>
                        ))}
                        <div className="w-11 h-11 rounded-full border-2 border-[#240202] bg-red-600 flex items-center justify-center text-[10px] text-white font-black shadow-lg">
                          +1.2k
                        </div>
                      </div>
                      <p className="text-white text-sm font-bold tracking-tight">People attending</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-300">
                        <span>Ticket Progress</span>
                        <span className="text-red-400">85% Sold</span>
                      </div>
                      <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden p-[2px]">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "85%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-red-600 to-rose-400 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]" 
                        />
                      </div>
                    </div>
                    
                    <p className="text-[10px] text-red-300/60 mt-4 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                      <Star size={12} fill="currentColor" /> Strictly Limited Availability
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}