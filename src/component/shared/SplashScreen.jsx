import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/img/logo.jpeg';

const NOTES = ["♩", "♪", "♫", "♬", "𝄞", "🎼"];
const FLOWERS = ["🌸", "🌼", "🌻", "🌺", "🌹", "🌷"];

const FallingFlower = ({ index }) => {
  const flower = FLOWERS[index % FLOWERS.length];
  const delay = index * 0.15;
  const duration = 6 + (index * 1.2) % 8;
  const xPos = (index * 27) % 100;
  const size = 20 + (index * 8) % 20;

  return (
    <motion.span
      initial={{ y: "-10vh", x: `${xPos}vw`, opacity: 0, rotate: 0 }}
      animate={{
        y: "110vh",
        opacity: [0, 0.8, 0.8, 0],
        rotate: [0, 180, 360, 540],
        x: [`${xPos}vw`, `${xPos + (index % 2 === 0 ? 5 : -5)}vw`, `${xPos}vw`],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
      style={{ fontSize: size, willChange: "transform, opacity" }}
      className="absolute pointer-events-none select-none z-0"
    >
      {flower}
    </motion.span>
  );
};

const FloatingNote = ({ index }) => {
  const note = NOTES[index % NOTES.length];
  const delay = index * 0.7;
  const duration = 10 + (index * 1.3) % 12;
  const xPos = 5 + (index * 137) % 88;
  const size = 16 + (index * 7) % 14;

  return (
    <motion.span
      initial={{ y: "110vh", x: `${xPos}vw`, opacity: 0, rotate: 0 }}
      animate={{
        y: "-10vh",
        opacity: [0, 0.5, 0.5, 0],
        rotate: [0, 90, -90, 360],
        scale: [0.8, 1.2, 0.9, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
      style={{ fontSize: size, willChange: "transform, opacity" }}
      className="absolute text-red-600/20 pointer-events-none select-none z-0"
    >
      {note}
    </motion.span>
  );
};

const AnimatedRings = () => (
  <>
    {[1, 2, 3].map((i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: [0, 0.6, 0], scale: [0.85, 1.5 + i * 0.25] }}
        transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.7, ease: "easeOut" }}
        className="absolute inset-0 rounded-full border border-red-500/30"
      />
    ))}
  </>
);

const VinylDisk = ({ className }) => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
    className={`rounded-full border border-red-900/10 ${className}`}
  >
    <div className="absolute inset-[20%] rounded-full border border-red-900/08" />
    <div className="absolute inset-[40%] rounded-full border border-red-900/06" />
    <div className="absolute inset-[48%] rounded-full bg-red-900/10" />
  </motion.div>
);

const ScanLine = () => (
  <motion.div
    initial={{ top: "-2px", opacity: 0 }}
    animate={{ top: ["−2px", "102%"], opacity: [0, 0.8, 0.8, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent pointer-events-none z-20"
  />
);

const VerticalLine = ({ delay, left, height, top }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 0] }}
    transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
    style={{ left, height, top }}
    className="absolute w-px bg-gradient-to-b from-transparent via-red-600/25 to-transparent pointer-events-none"
  />
);

const CornerDecor = () => (
  <>
    {[
      "top-5 left-5 border-t border-l",
      "top-5 right-5 border-t border-r",
      "bottom-5 left-5 border-b border-l",
      "bottom-5 right-5 border-b border-r",
    ].map((cls, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.25, scale: 1 }}
        transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
        className={`absolute w-6 h-6 border-red-800/50 ${cls}`}
      />
    ))}
  </>
);

const LOADING_LABELS = [
  "Tuning the instruments...",
  "Warming up the stage...",
  "Almost ready...",
];

const SplashScreen = ({ finishLoading }) => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [labelIndex, setLabelIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const timer = setInterval(() => {
      setLabelIndex((prev) => (prev + 1) % LOADING_LABELS.length);
    }, 1300);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const brandName = "RETRO BEATS";
  const letters = Array.from(brandName);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.4 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 32, scaleY: 0.4, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      scaleY: 1,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.06, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#060606] overflow-hidden"
    >
      {/* === BACKGROUND LAYER === */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(rgba(220,38,38,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.5)_1px,transparent_1px)] bg-[size:44px_44px]" />

        {/* Floating Notes */}
        {Array.from({ length: isMobile ? 6 : 14 }).map((_, i) => <FloatingNote key={`note-${i}`} index={i} />)}

        {/* Falling Flowers */}
        {Array.from({ length: isMobile ? 25 : 60 }).map((_, i) => <FallingFlower key={`flower-${i}`} index={i} />)}

        {/* Ambient Orbs */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.12, 0.22, 0.12], rotate: [0, 60, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-15%] left-[-12%] w-[700px] h-[700px] bg-red-900/15 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.18, 0.1], rotate: [0, -60, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] bg-rose-950/15 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.6, 1], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-700/10 blur-[80px] rounded-full"
        />

        {/* Vinyl discs */}
        <VinylDisk className="absolute right-[-60px] top-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-25" />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute left-[-55px] top-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full border border-red-900/8 opacity-20"
        />

        {/* Scan Line */}
        <ScanLine />

        {/* Vertical accent lines */}
        <VerticalLine delay={0} left="18%" height="55%" top="22%" />
        <VerticalLine delay={2} left="82%" height="40%" top="30%" />

        {/* Corner brackets */}
        <CornerDecors />
      </div>

      {/* === MAIN CONTENT === */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Logo */}
        <motion.div
          initial={{ scale: 0.4, opacity: 0, rotate: -15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.2 }}
          className="relative mb-10"
        >
          <AnimatedRings />
          <div className="relative p-[3px] bg-gradient-to-tr from-red-900 via-red-600 to-red-900 rounded-full shadow-[0_0_60px_rgba(220,38,38,0.3)] z-10">
            <img
              src={Logo}
              alt="Retro Beats Logo"
              className="h-24 w-24 md:h-32 md:w-32 object-cover rounded-full border-2 border-[#0a0a0a]"
            />
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <div className="flex gap-[2px] md:gap-[4px] mb-5" style={{ transformOrigin: "bottom" }}>
            {letters.map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className={`text-[44px] md:text-[72px] font-black uppercase leading-none tracking-tight ${
                  char === " " ? "w-3 md:w-5" : ""
                } ${
                  index >= 6
                    ? "text-red-600 drop-shadow-[0_0_18px_rgba(220,38,38,0.6)]"
                    : "text-white drop-shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
                }`}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Animated Divider */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 1.4, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[2px] mb-7 w-64 md:w-[340px] overflow-hidden"
          >
            <div className="h-full bg-gradient-to-r from-transparent via-red-600 to-transparent" />
            <motion.div
              animate={{ left: ["-20%", "120%"] }}
              transition={{ duration: 2, repeat: Infinity, delay: 2.5, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 w-16 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
            />
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 2.5 }}
            className="relative overflow-hidden"
          >
            <span className="text-red-500 font-bold uppercase tracking-[0.55em] text-[12px] md:text-[15px]">
              Officially Launching
            </span>
            <motion.div
              animate={{ left: ["-20%", "120%"], opacity: [0, 1, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 w-14 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* === BOTTOM: Loader or Launch Button === */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-5">
        <AnimatePresence mode="wait">
          {!isLoaded ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, filter: "blur(8px)", transition: { duration: 0.4 } }}
              className="flex flex-col items-center gap-4"
            >
              {/* Waveform bars */}
              <div className="flex justify-between items-end h-9 gap-[3px] w-52 md:w-64">
                {[...Array(22)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 3 }}
                    animate={{ height: [3, 6 + (i * 13 + 7) % 20, 3] }}
                    transition={{
                      duration: 0.45 + (i * 0.07) % 0.7,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: (i * 0.04) % 0.5,
                    }}
                    className="w-[4px] bg-red-600/55 rounded-full"
                  />
                ))}
              </div>

              {/* Progress bar */}
              <div className="w-52 md:w-64">
                <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden mb-3 relative">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 4, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    onAnimationComplete={() => setIsLoaded(true)}
                    className="h-full bg-gradient-to-r from-red-900 to-red-600 origin-left relative"
                  >
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-[6px] h-[6px] bg-red-500 rounded-full shadow-[0_0_8px_rgba(220,38,38,0.9)]"
                    />
                  </motion.div>
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={labelIndex}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.35 }}
                    className="text-white/30 text-[10px] uppercase tracking-[0.35em] text-center font-medium"
                  >
                    {LOADING_LABELS[labelIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.button
              key="launch-button"
              initial={{ opacity: 0, y: 20, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                navigate('/');
                finishLoading();
              }}
              className="group relative px-12 py-[14px] bg-transparent overflow-hidden rounded-full border border-red-600/50 cursor-pointer"
            >
              {/* Fill on hover */}
              <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />

              {/* Outer glow pulse */}
              <motion.div
                animate={{ boxShadow: ["0 0 0px rgba(220,38,38,0)", "0 0 28px rgba(220,38,38,0.45)", "0 0 0px rgba(220,38,38,0)"] }}
                transition={{ duration: 2.2, repeat: Infinity }}
                className="absolute inset-0 rounded-full"
              />

              <span className="relative z-10 flex items-center gap-3 text-white font-bold uppercase tracking-[0.25em] text-[13px] md:text-[15px]">
                Launch Officially
                <motion.span
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </span>

              {/* Shine sweep */}
              <motion.div
                animate={{ left: ["-100%", "200%"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 0.8 }}
                className="absolute top-0 bottom-0 w-12 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 pointer-events-none"
              />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-5 text-[9px] text-white/50 tracking-widest uppercase font-light"
      >
        Designed for Perfection • 2025
      </motion.div>
    </motion.div>
  );
};

// Corner decorations as a component
const CornerDecors = () => (
  <>
    {[
      { cls: "top-5 left-5 border-t border-l" },
      { cls: "top-5 right-5 border-t border-r" },
      { cls: "bottom-5 left-5 border-b border-l" },
      { cls: "bottom-5 right-5 border-b border-r" },
    ].map(({ cls }, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 0.25, scale: 1 }}
        transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
        className={`absolute w-6 h-6 border-red-800/50 ${cls}`}
      />
    ))}
  </>
);

export default SplashScreen;