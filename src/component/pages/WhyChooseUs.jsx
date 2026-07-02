import React from "react";
import { motion } from "framer-motion";
import {
  Music2,
  Mic2,
  Sparkles,
  AudioWaveform,
  Crown,
  Disc3,
  Users2,
  Radio,
  Star,
  ArrowRight,
} from "lucide-react";

const reasons = [
  {
    title: "Luxury Stage Experience",
    icon: <Crown className="w-7 h-7" />,
    desc: "Every performance is crafted with premium stage aesthetics, cinematic lighting, immersive atmosphere, and elite orchestra presentation.",
    gradient: "from-red-600 to-rose-400",
  },
  {
    title: "Live Professional Orchestra",
    icon: <Music2 className="w-7 h-7" />,
    desc: "Highly skilled musicians, vocalists, and instrumental artists delivering emotionally rich live performances with precision and passion.",
    gradient: "from-rose-600 to-red-500",
  },
  {
    title: "Unique Musical Arrangements",
    icon: <Disc3 className="w-7 h-7" />,
    desc: "Original orchestral arrangements blending Indian classical soul with cinematic modern production for unforgettable experiences.",
    gradient: "from-red-700 to-rose-500",
  },
  {
    title: "Immersive Audio Experience",
    icon: <AudioWaveform className="w-7 h-7" />,
    desc: "High-quality live sound engineering designed to make every instrument and vocal feel alive, deep, and emotionally powerful.",
    gradient: "from-rose-600 to-red-400",
  },
  {
    title: "Audience-Centered Performances",
    icon: <Users2 className="w-7 h-7" />,
    desc: "We create emotional audience journeys — not just concerts. Every show is designed to engage, connect, and leave lasting memories.",
    gradient: "from-red-600 to-rose-600",
  },
  {
    title: "Creative Musical Vision",
    icon: <Sparkles className="w-7 h-7" />,
    desc: "From retro hits to grand orchestral productions, every concept is developed with artistic storytelling and premium visual direction.",
    gradient: "from-red-500 to-rose-400",
  },
];

export default function WhyChooseUs() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-24 md:py-32">
      {/* ================= BACKGROUND GLOW ================= */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-red-900/10 blur-[130px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-rose-950/10 blur-[130px] rounded-full" />

      {/* ================= FLOATING SYMBOLS ================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {(isMobile ? ["♪", "♫", "♬"] : ["♪", "♫", "♬", "♩", "♭", "♯"]).map((symbol, index) => (
          <motion.div
            key={index}
            animate={{
              y: [0, -30, 20, 0],
              x: [0, 15, -15, 0],
              rotate: [0, 12, -12, 0],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 10 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index,
            }}
            className="absolute text-red-500/10 font-black"
            style={{
              top: `${10 + index * 12}%`,
              left: `${5 + index * 14}%`,
              fontSize: `${isMobile ? 30 + index * 8 : 50 + index * 10}px`,
              fontFamily: "'Cormorant Garamond', serif",
              willChange: "transform, opacity",
            }}
          >
            {symbol}
          </motion.div>
        ))}

        {[...Array(isMobile ? 15 : 50)].map((_, index) => (
          <motion.div
            key={index}
            animate={{
              y: [0, -20, 0],
              opacity: [0.08, 0.4, 0.08],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 3 + (index % 5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.1,
            }}
            className="absolute rounded-full bg-red-900/30"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(1px)",
              willChange: "transform, opacity",
            }}
          />
        ))}
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="uppercase tracking-[0.3em] text-[10px] font-bold text-red-500" style={{ fontFamily: "'Outfit', sans-serif" }}>
            The Retro Difference
          </span>

          <h2
            className="mt-6 text-6xl md:text-8xl font-bold leading-[0.88] text-white"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Why Choose <br />
            <span className="italic text-red-600">
              Retro Beats
            </span>
          </h2>

          <div className="w-24 h-[1px] bg-red-600 mx-auto mt-10" />

          <p className="max-w-3xl mx-auto mt-10 text-lg md:text-xl text-slate-100 font-medium leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
            We combine live orchestral excellence, cinematic production, and
            emotional storytelling to create unforgettable musical experiences
            that feel premium, immersive, and timeless.
          </p>
        </motion.div>

        {/* ================= FEATURE GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-24">
          {reasons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -10,
              }}
              className={`group relative overflow-hidden rounded-[2.5rem] border border-red-900/10 bg-gradient-to-br
        from-[#4a0505]
        via-[#3a0404]
        to-[#240202] ${isMobile ? "" : "backdrop-blur-xl"} p-8 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.5)]`}
            >
              {/* Hover Glow */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition duration-700 bg-gradient-to-br ${item.gradient}`}
              />

              {/* Icon Container */}
              <div
                className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-xl mb-8 group-hover:scale-110 transition-transform duration-500`}
              >
                {item.icon}
              </div>

              {/* Content */}
              <div className="relative">
                <h3
                  className="text-2xl font-bold text-white leading-tight"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  {item.title}
                </h3>

                <p className="mt-4 text-slate-300 leading-relaxed text-[15px]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {item.desc}
                </p>
                
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================= STATS SECTION ================= */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32"
        >
          <div className={`relative overflow-hidden rounded-[3rem] bg-gradient-to-br
        from-[#4a0505]
        via-[#3a0404]
        to-[#240202] ${isMobile ? "" : "backdrop-blur-xl"} border border-red-900/10 shadow-[0_30px_100px_-25px_rgba(0,0,0,0.5)] px-8 md:px-16 py-16`}>
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-red-900/10 blur-[100px] rounded-full" />

            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
              {[
                {
                  value: "200+",
                  label: "shows",
                  icon: <Mic2 className="w-6 h-6" />,
                },
                {
                  value: "2+",
                  label: "Years",
                  icon: <Users2 className="w-6 h-6" />,
                },
                {
                  value: "25",
                  label: "Artist",
                  icon: <Radio className="w-6 h-6" />,
                },
                
              ].map((stat, index) => (
                <div key={index}>
                  <div className="flex justify-center mb-5 text-red-500">
                    {stat.icon}
                  </div>

                  <h3
                    className="text-4xl md:text-6xl font-bold text-white"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    {stat.value}
                  </h3>

                  <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-red-500 font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ================= CTA ================= */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-r from-red-700 via-red-600 to-rose-600 px-8 md:px-20 py-20 shadow-[0_30px_100px_-20px_rgba(220,38,38,0.4)]">
            {/* Overlay */}
            <div className="absolute inset-0 opacity-10 grayscale">
              <img
                src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2000&auto=format&fit=crop"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative z-10">
              <h2
                className="text-4xl md:text-7xl font-black text-white leading-[0.95]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                Let’s Create <br />
                Something Magical
              </h2>

              <p className="max-w-2xl mx-auto mt-8 text-white/90 text-lg leading-relaxed">
                From luxury weddings to grand orchestra productions, we bring
                unforgettable musical experiences to every stage.
              </p>

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="mt-10 inline-flex items-center gap-4 rounded-xl bg-white px-10 py-5 text-xs font-bold uppercase tracking-[0.25em] text-red-700 shadow-2xl"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Book Your Concert

                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}