import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music2, Drum, Mic2, Sparkles, Radio, Guitar, ChevronRight, Play } from "lucide-react";
import logo from "../../assets/img/logo.jpeg";

const slides = [
  { src: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1200", caption: "Live Performances" },
  { src: "https://images.unsplash.com/photo-1465821185615-20b3c2fbf41b?q=80&w=1200", caption: "Soulful Strings" },
  { src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200", caption: "Studio Sessions" },
  { src: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=1200", caption: "Grand Ensemble" },
];

const services = [
  {
    icon: <Music2 className="w-6 h-6" />,
    title: "Light Music Orchestra",
    desc: "High-energy live orchestra performances featuring timeless Tamil melodies and modern hits.",
  },
  {
    icon: <Drum className="w-6 h-6" />,
    title: "Instrumental Melodies",
    desc: "Immersive experiences featuring flute, violin, and symphonic arrangements of cine hits.",
  },
  {
    icon: <Mic2 className="w-6 h-6" />,
    title: "Wedding Shows",
    desc: "Luxury entertainment for weddings with romantic melodies and vibrant celebration energy.",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Cultural Events",
    desc: "Grand orchestral music for temple festivals and cultural programs across South India.",
  },
];

const SYMBOLS = ["♩", "♪", "♫", "♬", "𝄞"];

function FloatingNote({ id, onDone }) {
  const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
  const left = Math.random() * 100;
  const fontSize = Math.random() * 2 + 1;
  const duration = Math.random() * 6 + 4;

  useEffect(() => {
    const t = setTimeout(() => onDone(id), duration * 1000);
    return () => clearTimeout(t);
  }, [id, duration, onDone]);

  return (
    <motion.span
      initial={{ y: "110vh", opacity: 0, x: `${left}vw` }}
      animate={{ 
        y: "-20vh", 
        opacity: [0, 0.6, 0],
        rotate: [0, 360]
      }}
      transition={{ duration, ease: "linear" }}
      className="absolute pointer-events-none z-10 text-red-600/30"
      style={{ fontSize: `${fontSize}rem` }}
    >
      {symbol}
    </motion.span>
  );
}

export default function RetroBeat() {
  const [notes, setNotes] = useState([]);
  const [current, setCurrent] = useState(0);
  const nextId = useRef(0);

  useEffect(() => {
    const spawn = setInterval(() => {
      setNotes((n) => [...n, nextId.current++]);
    }, 800);
    return () => clearInterval(spawn);
  }, []);

  const removeNote = (id) => setNotes((n) => n.filter((x) => x !== id));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#050505] text-[#eeeeee] min-h-screen overflow-x-hidden selection:bg-red-600 selection:text-white">
      {/* Dynamic Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Playfair+Display:wght@700;900&display=swap');
        
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-playfair { font-family: 'Playfair Display', serif; }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        .animate-pulse-slow { animation: pulse-slow 8s infinite; }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient { animation: gradient 6s ease infinite; }
      `}</style>

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a0000_0%,#000000_100%)]" />
        
        {/* Animated Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-900/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-red-900/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '4s' }} />

        {/* Floating Notes */}
        {notes.map((id) => (
          <FloatingNote key={id} id={id} onDone={removeNote} />
        ))}

        <div className="relative z-20 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1.5, 
              ease: [0.16, 1, 0.3, 1],
              scale: { type: "spring", stiffness: 100, damping: 20 }
            }}
            className="mb-12 relative inline-block"
          >
            {/* Logo Glow Effect */}
            <div className="absolute inset-0 bg-red-600/20 blur-[60px] rounded-full scale-150 animate-pulse" />
            
            <div className="relative w-40 h-40 md:w-56 md:h-56 mx-auto rounded-full overflow-hidden border-4 border-white/10 p-2 shadow-[0_0_60px_rgba(220,38,38,0.5)] bg-black/40 backdrop-blur-sm">
              <img src={logo} alt="Retro Beats Logo" className="w-full h-full object-cover rounded-full transition-transform duration-[3s] hover:scale-110" />
            </div>
            
            {/* Decorative Rings */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 border border-red-600/20 rounded-full border-dashed" 
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 border border-white/5 rounded-full border-dashed" 
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="font-playfair text-7xl md:text-9xl font-black text-white leading-none tracking-tight mb-4">
              RETRO <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-500 to-red-600 bg-[length:200%_auto] animate-gradient">BEATS</span>
            </h1>
            
            <div className="h-[2px] w-48 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mb-8" />
            
            <p className="text-red-500 font-outfit font-bold tracking-[0.8em] text-sm md:text-xl uppercase mb-12">
              DEVERAGAM BY SHREE KUMAR
            </p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap justify-center gap-6"
            >
              <button className="px-10 py-4 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-all shadow-[0_10px_30px_rgba(220,38,38,0.3)] hover:shadow-[0_15px_40px_rgba(220,38,38,0.5)] hover:-translate-y-1">
                Explore Our Music
              </button>
              <a href="http://www.retrobeatscbe.com" className="px-10 py-4 border border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-all backdrop-blur-md">
                Main Website
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[4px] text-gray-500">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-red-600 to-transparent" />
        </motion.div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-32 bg-[#080808] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-red-600/30 hover:bg-white/[0.08] transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-red-600/10 flex items-center justify-center text-red-500 mb-6 group-hover:bg-red-600 group-hover:text-white transition-all">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-outfit">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY/SLIDER SECTION */}
      <section id="gallery" className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[40px] overflow-hidden group shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <img 
                  src={slides[current].src} 
                  alt={slides[current].caption}
                  className="w-full h-full object-cover brightness-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-12 left-12 right-12 flex items-end justify-between">
                  <div className="max-w-xl">
                    <motion.p 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-red-500 font-bold tracking-widest text-sm uppercase mb-2"
                    >
                      Gallery Showcase
                    </motion.p>
                    <motion.h3 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-4xl md:text-5xl font-black text-white font-playfair"
                    >
                      {slides[current].caption}
                    </motion.h3>
                  </div>
                  <div className="hidden md:flex gap-2">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-1 transition-all duration-500 rounded-full ${i === current ? 'w-12 bg-red-600' : 'w-4 bg-white/30 hover:bg-white/50'}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <button 
              className="absolute top-1/2 left-6 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}
            >
              <ChevronRight className="rotate-180" />
            </button>
            <button 
              className="absolute top-1/2 right-6 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setCurrent((current + 1) % slides.length)}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-red-600/5" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-sm font-bold tracking-[6px] text-gray-500 mb-8 uppercase">
            Experience the Full Website Soon
          </h2>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <a
              href="http://www.retrobeatscbe.com"
              className="inline-flex flex-col md:flex-row items-center gap-4 bg-gradient-to-r from-red-600 to-rose-600 p-1 pr-12 rounded-full group"
            >
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-red-600 group-hover:rotate-12 transition-transform">
                <Play fill="currentColor" className="ml-1" />
              </div>
              <span className="text-white font-outfit font-black text-2xl md:text-3xl tracking-tighter">
                WWW.RETROBEATSCBE.COM
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
            <img src={logo} alt="Logo" className="w-8 h-8 rounded-full" />
            <span className="font-outfit font-bold tracking-widest text-sm">RETRO BEATS</span>
          </div>
          <p className="text-gray-600 text-xs tracking-widest font-outfit uppercase">
            &copy; 2026 DEVERAGAM BY RETRO BEATS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6">
            {['Instagram', 'Facebook', 'YouTube'].map(social => (
              <a key={social} href="#" className="text-xs text-gray-500 hover:text-red-500 transition-colors uppercase tracking-widest">{social}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}