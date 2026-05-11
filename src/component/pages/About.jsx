import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      
      {/* Background Decorative Element */}
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-red-900/10 blur-[130px] -z-10 rounded-full" />
      
      <section className="mt-12 flex flex-col lg:flex-row items-center gap-20">
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 space-y-10"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-black uppercase tracking-[0.4em] shadow-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Our Musical Legacy
          </div>

          <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            A Symphony of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-400 italic">Light & Sound</span>
          </h1>

          <div className="space-y-8 text-xl text-slate-200 font-serif leading-relaxed italic opacity-90">
            <p>
              Welcome to the <strong className="text-white font-black not-italic border-b border-red-500/30">Retro Beats Orchestra</strong>. We specialize in bringing the timeless elegance of orchestral music to a contemporary audience, beautifully harmonizing classical instrumentation with accessible, popular melodies.
            </p>
            <p>
              From the golden age of light music—featuring lively waltzes and show tunes—to sweeping cinematic scores and modern jazz-infused arrangements, our ensemble creates an atmosphere of pure enchantment for any occasion.
            </p>
          </div>

          <div className="pt-12 border-t border-white/10 flex flex-wrap items-center gap-10 md:gap-20">
             {[
               { val: "50+", label: "Musicians" },
               { val: "10k+", label: "Performances" },
               { val: "Est.", label: "1998", sub: "Since" }
             ].map((stat, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
               >
                  <p className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{stat.val}</p>
                  <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em] mt-2" style={{ fontFamily: "'Inter', sans-serif" }}>{stat.label}</p>
               </motion.div>
             ))}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-[45%] relative mt-16 lg:mt-0"
        >
          {/* Enhanced Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-red-600/30 to-transparent rounded-[3.5rem] transform rotate-3 scale-105 -z-10 blur-3xl transition-transform duration-1000 group-hover:rotate-6"></div>
          
          <div className="relative rounded-[3.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] border border-white/10 group aspect-[4/5] bg-[#111]">
            <img 
              src="https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=2070&auto=format&fit=crop" 
              alt="Orchestra Performance" 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[3s] ease-[cubic-bezier(0.25,1,0.5,1)]" 
            />
            
            {/* Elegant Caption Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#240202] via-transparent to-transparent flex items-end p-10">
               <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-[2.5rem] w-full transform group-hover:-translate-y-2 transition-all duration-700"
               >
                  <p className="text-white font-serif italic text-2xl md:text-3xl mb-3 leading-tight">"Music gives a soul to the universe and wings to the mind."</p>
                  <p className="text-red-400 text-xs tracking-[0.4em] uppercase font-black" style={{ fontFamily: "'Inter', sans-serif" }}>— Plato</p>
               </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
