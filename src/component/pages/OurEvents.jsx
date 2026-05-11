import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Music2, Sparkles, Mic2, Play, Disc3, AudioWaveform,
  Volume2, Headphones, ArrowRight, Radio, Pause,
} from "lucide-react";

const shows = [
  {
    id: 1, number: "01",
    title: "Devārāgam", subtitle: "Cine Devotional Experience", tag: "Spiritual Orchestra",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2000&auto=format&fit=crop",
    accent: "#dc2626", accent2: "#ef4444", glow: "rgba(220,38,38,0.18)",
    icon: Sparkles,
    desc: "An immersive orchestral journey inspired by cinematic devotional melodies — layered with cinematic strings, rhythmic percussion, and emotionally charged vocal harmonies that echo through the soul.",
    features: ["Live Orchestra", "Cine Percussion", "Vocal Ensemble", "Spiritual Melodies"],
  },
  {
    id: 2, number: "02",
    title: "Retro Beats", subtitle: "Vintage Musical Night", tag: "Retro Live Concert",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2000&auto=format&fit=crop",
    accent: "#e11d48", accent2: "#be123c", glow: "rgba(225,29,72,0.15)",
    icon: Disc3,
    desc: "A nostalgic celebration of legendary Tamil melodies, retro synth textures, and timeless cinematic orchestration — crafted to electrify live stages and awaken collective memory.",
    features: ["Retro Synths", "Tamil Classics", "Neon Staging", "Cinematic Mix"],
  },
  {
    id: 3, number: "03",
    title: "Golden Classics", subtitle: "Luxury Orchestra Production", tag: "Grand Stage Experience",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=2000&auto=format&fit=crop",
    accent: "#b91c1c", accent2: "#ef4444", glow: "rgba(185,28,28,0.18)",
    icon: Music2,
    desc: "An elite orchestral showcase featuring cinematic lighting, live symphonic arrangements, cinematic strings, and luxury concert production that redefines the grand stage.",
    features: ["Symphonic Live", "Luxury Staging", "Cinematic Strings", "Premium Sound"],
  },
];

/* ═══════════════════════════════════════════════
   SEEDED PSEUDO-RANDOM (stable positions)
   ═══════════════════════════════════════════════ */
function mkRand(seed) {
  let s = seed;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}

/* ═══════════════════════════════════════════════
   FLOATING SYMBOLS — full-page layer
   ═══════════════════════════════════════════════ */
const NOTE_SYMS = ["♩", "♪", "♫", "♬", "𝄞", "𝄢", "♭", "♯", "𝅘𝅥𝅮", "𝄐", "𝄂", "𝄡"];
const LICONS = [Music2, Volume2, Mic2, AudioWaveform, Disc3, Headphones, Radio];
const COLORS = ["#dc2626", "#ef4444", "#f43f5e", "#fb7185", "#fda4af", "#e11d48", "#991b1b", "#be123c"];

function FloatingSymbols() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const notes = Array.from({ length: isMobile ? 12 : 38 }, (_, i) => {
    const r = mkRand(i * 17 + 3);
    return {
      id: `n${i}`, sym: NOTE_SYMS[i % NOTE_SYMS.length],
      top: r() * 100, left: r() * 100, size: 12 + r() * 24,
      color: COLORS[i % COLORS.length], dur: 8 + r() * 12, delay: r() * 9,
      dx: (r() - 0.5) * 90, dy: -(25 + r() * 90), rot: (r() - 0.5) * 55, op: 0.07 + r() * 0.15
    };
  });
  const icons = Array.from({ length: isMobile ? 8 : 20 }, (_, i) => {
    const r = mkRand(i * 31 + 77);
    return {
      id: `ic${i}`, Icon: LICONS[i % LICONS.length],
      top: r() * 100, left: r() * 100, size: 11 + r() * 13,
      color: COLORS[(i + 3) % COLORS.length], dur: 10 + r() * 10, delay: r() * 8,
      dx: (r() - 0.5) * 70, dy: -(20 + r() * 80), rot: (r() - 0.5) * 35, op: 0.05 + r() * 0.10
    };
  });
  const dots = Array.from({ length: isMobile ? 15 : 45 }, (_, i) => {
    const r = mkRand(i * 53 + 11);
    return {
      id: `d${i}`, top: r() * 100, left: r() * 100,
      size: 2 + r() * 4, color: COLORS[i % COLORS.length], dur: 3 + r() * 5, delay: r() * 7, dy: -(15 + r() * 45)
    };
  });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Glow orbs */}
      {[
        { t: 8, l: 5, s: 440, c: "rgba(220,38,38,0.07)" },
        { t: 40, l: 72, s: 360, c: "rgba(244,63,94,0.06)" },
        { t: 68, l: 18, s: 300, c: "rgba(225,29,72,0.05)" },
        { t: 82, l: 58, s: 420, c: "rgba(153,27,27,0.06)" },
        { t: 22, l: 43, s: 280, c: "rgba(251,113,133,0.05)" },
        { t: 55, l: 85, s: 320, c: "rgba(220,38,38,0.04)" },
      ].map((o, i) => (
        <motion.div key={`orb-${i}`} className="absolute rounded-full" style={{ top: `${o.t}%`, left: `${o.l}%`, width: o.s, height: o.s, background: `radial-gradient(circle,${o.c} 0%,transparent 70%)`, transform: "translate(-50%,-50%)", filter: "blur(20px)" }}
          animate={{ scale: [1, 1.35, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 9 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 1.6 }} />
      ))}
      {/* Notes */}
      {notes.map(n => (
        <motion.span key={n.id} className="absolute select-none" style={{ top: `${n.top}%`, left: `${n.left}%`, fontSize: n.size, color: n.color, fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, filter: "drop-shadow(0 0 5px currentColor)", opacity: 0, willChange: "transform, opacity" }}
          animate={{ y: [0, n.dy * 0.4, n.dy, n.dy * 0.2, 0], x: [0, n.dx * 0.3, n.dx, n.dx * 0.5, 0], opacity: [0, n.op, n.op * 1.3, n.op * 0.5, 0], rotate: [0, n.rot * 0.5, n.rot, -n.rot * 0.3, 0], scale: [0.8, 1.1, 1.3, 0.95, 0.8] }}
          transition={{ duration: n.dur, repeat: Infinity, delay: n.delay, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] }}>
          {n.sym}
        </motion.span>
      ))}
      {/* Lucide icons */}
      {icons.map(({ id, Icon, ...ic }) => (
        <motion.div key={id} className="absolute" style={{ top: `${ic.top}%`, left: `${ic.left}%`, color: ic.color, filter: "drop-shadow(0 0 4px currentColor)", opacity: 0, willChange: "transform, opacity" }}
          animate={{ y: [0, ic.dy * 0.4, ic.dy, ic.dy * 0.2, 0], x: [0, ic.dx * 0.3, ic.dx, ic.dx * 0.4, 0], opacity: [0, ic.op, ic.op * 1.2, ic.op * 0.4, 0], rotate: [0, ic.rot, ic.rot * 0.5, -ic.rot * 0.3, 0] }}
          transition={{ duration: ic.dur, repeat: Infinity, delay: ic.delay, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] }}>
          <Icon style={{ width: ic.size, height: ic.size }} strokeWidth={1.4} />
        </motion.div>
      ))}
      {/* Particles */}
      {dots.map(d => (
        <motion.div key={d.id} className="absolute rounded-full" style={{ top: `${d.top}%`, left: `${d.left}%`, width: d.size, height: d.size, background: d.color, filter: "blur(0.8px)", opacity: 0, willChange: "transform, opacity" }}
          animate={{ y: [0, d.dy, 0], opacity: [0, 0.5, 0], scale: [1, 1.9, 1] }}
          transition={{ duration: d.dur, repeat: Infinity, delay: d.delay, ease: "easeInOut" }} />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   WAVEFORM
   ═══════════════════════════════════════════════ */
function Waveform({ color, active }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex items-center gap-[2px]" style={{ height: 28 }}>
      {Array.from({ length: isMobile ? 12 : 24 }, (_, i) => {
        const base = 4 + Math.abs(Math.sin(i * 0.7)) * 12 + (i % 4) * 2;
        return (
          <motion.div key={i} className="rounded-full flex-shrink-0" style={{ width: 2.5, background: color, willChange: "transform, opacity" }}
            animate={active ? { height: [base, base * 2.9, base * 0.4, base * 2.2, base], opacity: [0.55, 1, 0.45, 0.9, 0.55] } : { height: base, opacity: 0.3 }}
            transition={{ duration: 0.5 + i * 0.042, repeat: Infinity, ease: "easeInOut", delay: i * 0.025 }} />
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   VINYL
   ═══════════════════════════════════════════════ */
function Vinyl({ color, spin }) {
  return (
    <motion.div style={{ width: 68, height: 68 }} animate={spin ? { rotate: 360 } : {}} transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}>
      <svg viewBox="0 0 68 68" width={68} height={68}>
        <circle cx="34" cy="34" r="34" fill="#111" />
        {[26, 20, 14].map((r, i) => <circle key={i} cx="34" cy="34" r={r} fill="none" stroke="#333" strokeWidth="0.7" />)}
        {Array.from({ length: 14 }, (_, i) => { const a = (i / 14) * Math.PI * 2; return <line key={i} x1="34" y1="34" x2={34 + 26 * Math.cos(a)} y2={34 + 26 * Math.sin(a)} stroke="#ffffff07" strokeWidth="0.6" />; })}
        <circle cx="34" cy="34" r="8.5" fill={color} />
        <circle cx="34" cy="34" r="2.8" fill="#fff" opacity="0.85" />
      </svg>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   TICKER
   ═══════════════════════════════════════════════ */
const TICKER = ["Live Orchestra", "Cine Melodies", "Luxury Stage", "Retro Synths", "Tamil Classics", "Vocal Ensemble", "Cinematic Sound", "Rhythmic Percussion", "Grand Symphony", "Premium Concert"];
function Ticker() {
  const rep = [...TICKER, ...TICKER, ...TICKER, ...TICKER];
  return (
    <div className="w-full overflow-hidden py-3.5" style={{ borderTop: "1px solid rgba(220,38,38,0.14)", borderBottom: "1px solid rgba(220,38,38,0.14)", background: "rgba(20,20,20,0.65)", backdropFilter: "blur(8px)" }}>
      <motion.div className="flex gap-8 whitespace-nowrap" animate={{ x: ["0%", "-25%"] }} transition={{ duration: 36, repeat: Infinity, ease: "linear" }}>
        {rep.map((item, i) => (
          <span key={i} className="flex items-center gap-3 text-[9.5px] font-bold uppercase tracking-[0.45em] flex-shrink-0" style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(255,255,255,0.6)" }}>
            <span style={{ color: "#dc2626", fontSize: 13 }}>♪</span>{item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SHOW SECTION — image fills full half height
   ═══════════════════════════════════════════════ */
function ShowSection({ show, index }) {
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const isEven = index % 2 === 0;
  const Icon = show.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 55 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full"
    >
      {/* Soft glow behind card */}
      <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{ background: `radial-gradient(ellipse 55% 60% at ${isEven ? "22%" : "78%"} 50%, ${show.glow}, transparent)`, filter: "blur(50px)" }} />

      <div
        className={`relative flex flex-col lg:flex-row${isEven ? "" : " lg:flex-row-reverse"} w-full rounded-3xl overflow-hidden shadow-2xl`}
        style={{ border: `1px solid ${show.accent}33`, minHeight: 520 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ────── IMAGE PANEL ────── */}
        <div className="relative w-full lg:w-[50%] overflow-hidden flex-shrink-0" style={{ minHeight: 340 }}>
          <motion.img
            src={show.image} alt={show.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center center" }}
            animate={{ scale: hovered ? 1.065 : 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Gradient layers */}
          <div className="absolute inset-0" />
          {/* <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.8) 100%)" }} /> */}
          <div className="absolute inset-0" style={{ background: `linear-gradient(${isEven ? "to right" : "to left"},rgba(255, 255, 255, 0.4) 0%,transparent 55%)` }} />
          <div className="absolute inset-0 opacity-22" style={{ background: `linear-gradient(145deg,${show.accent}50 0%,transparent 50%)` }} />

          {/* Tag pill */}
          <div className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <Icon className="w-3 h-3 flex-shrink-0" style={{ color: show.accent }} />
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/90" style={{ fontFamily: "'Outfit', sans-serif" }}>{show.tag}</span>
          </div>

          {/* Watermark number */}
         

          {/* Bottom image bar */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <Waveform color={show.accent} active={hovered || playing} />
            <div className="mt-4 flex items-end justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-4xl md:text-5xl font-black text-white leading-[0.9] truncate" style={{ fontFamily: "'Cormorant Garamond',serif", textShadow: "0 2px 24px rgba(167, 22, 22, 0.55)" }}>
                  {show.title}
                </h3>
                <p className="mt-1.5 text-[10px] text-white/60 font-bold uppercase tracking-[0.3em] truncate" style={{ fontFamily: "'DM Mono',monospace" }}>{show.subtitle}</p>
              </div>
              {/* Play button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setPlaying(!playing)}
                className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl flex-shrink-0"
                style={{ background: `linear-gradient(135deg,${show.accent},${show.accent2})`, boxShadow: `0 8px 28px ${show.glow}` }}
              >
                <AnimatePresence mode="wait">
                  {playing
                    ? <motion.div key="p" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Pause className="w-5 h-5 text-white fill-white" /></motion.div>
                    : <motion.div key="pl" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Play className="w-5 h-5 text-white fill-white ml-0.5" /></motion.div>
                  }
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* ────── CONTENT PANEL ────── */}
        <div
          className="relative w-full lg:w-[50%] flex flex-col justify-between p-7 md:p-10 lg:p-12 bg-gradient-to-br
        from-[#4a0505]
        via-[#3a0404]
        to-[#240202]"
          // style={{ background: "rgba(233, 37, 37, 0.95)", backdropFilter: "blur(20px)" }}
          
        >
          {/* Top section */}
          <div>
            {/* Number + rule */}
            <div className="flex items-center gap-4 mb-7">
              <span className="text-[10px] font-black tracking-[0.55em] uppercase flex-shrink-0" style={{ fontFamily: "'DM Mono',monospace", color: show.accent }}>{show.number}</span>
              <div className="h-px flex-1" style={{ background: `linear-gradient(90deg,${show.accent}55,transparent)` }} />
            </div>

            {/* Title */}
            <h2
              className="font-black leading-[0.86] text-white mb-5"
              style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.6rem,5vw,5rem)" }}
            >
              {show.title}
            </h2>

            {/* Subtitle chip */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: `${show.accent}15`, border: `1px solid ${show.accent}30` }}>
              <Icon className="w-3 h-3 flex-shrink-0" style={{ color: show.accent }} />
              <span className="text-[9.5px] font-bold uppercase tracking-[0.25em]" style={{ fontFamily: "'Outfit', sans-serif", color: show.accent }}>{show.subtitle}</span>
            </div>

            {/* Description */}
            <p className="text-[16px] leading-[1.75] text-slate-100 mb-8" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400 }}>
              {show.desc}
            </p>

            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-2.5 mb-8">
              {show.features.map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.45 }}
                  whileHover={{ y: -2, boxShadow: `0 5px 18px ${show.glow}` }}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-300"
                  style={{ background: "white", border: `1px solid ${show.accent}33`, backdropFilter: "blur(8px)" }}
                >
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: `linear-gradient(135deg,${show.accent},${show.accent2})` }} />
                  <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest" style={{ fontFamily: "'Outfit', sans-serif" }}>{feat}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom row: vinyl + CTA */}
          <div className="flex items-center justify-between gap-4 pt-5" style={{ borderTop: `1px solid ${show.accent}33` }}>
            <div className="flex items-center gap-3 min-w-0">
              <Vinyl color={show.accent} spin={hovered || playing} />
              <div className="min-w-0">
                <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-slate-300 mb-0.5" style={{ fontFamily: "'Outfit', sans-serif" }}>NOW PLAYING</p>
                <p className="text-sm font-bold text-white truncate" style={{ fontFamily: "'Cormorant Garamond',serif" }}>{show.title} — Live Mix</p>
              </div>
            </div>
            <motion.button whileHover={{ x: 5 }} className="group flex items-center gap-2.5 flex-shrink-0">
              <div className="text-right">
                <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-red-500 mb-1.5" style={{ fontFamily: "'Outfit', sans-serif" }}>EXPLORE</p>
                <div className="h-[1px] w-7 group-hover:w-14 transition-all duration-500 bg-red-600 ml-auto" />
              </div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md flex-shrink-0" style={{ background: "#dc2626" }}>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   HEADER
   ═══════════════════════════════════════════════ */
function Header() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.1 }} className="w-full mb-14 md:mb-16">
      {/* Eyebrow */}
      <div className="flex items-center gap-5 mb-9">
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="h-px flex-1 origin-left" style={{ background: "linear-gradient(90deg,#dc2626,transparent)" }} />
        <span className="text-[9.5px] font-black uppercase tracking-[0.58em] text-red-500 flex-shrink-0" style={{ fontFamily: " DM Mono ,monospace" }}>Premium Orchestra Experiences</span>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="h-px flex-1 origin-right" style={{ background: "linear-gradient(90deg,transparent,#dc2626)" }} />
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-14">
        <div className="flex-1">
          <h1 className="font-black leading-[0.83] text-white" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(3.5rem,8vw,8.5rem)" }}>
            <motion.span className="block" initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.75 }}>Musical</motion.span>
            <motion.span className="block italic" style={{ WebkitTextStroke: "2px #dc2626", color: "transparent" }} initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.75 }}>Worlds</motion.span>
            <motion.span className="block italic text-slate-400" initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.75 }}>Crafted Live</motion.span>
          </h1>
        </div>
        <div className="lg:w-80 xl:w-96 flex-shrink-0">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7 }}>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400 }}>
              Every performance is designed as an immersive musical universe — blending orchestral emotion, luxury stage aesthetics, cinematic sound design, and unforgettable live energy.
            </p>
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <motion.div className="w-2 h-2 rounded-full bg-red-500" animate={{ opacity: [1, 0.2, 1], scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
              <span className="text-[9.5px] font-bold uppercase tracking-[0.4em] text-red-500" style={{ fontFamily: "'Outfit', sans-serif" }}>Live Season 2025</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom rule */}
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.9, duration: 1.3, ease: [0.16, 1, 0.3, 1] }} className="mt-11 h-px origin-left" style={{ background: "linear-gradient(90deg,#dc2626,#f43f5e 32%,#dc2626 62%,transparent)" }} />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   CLOSING QUOTE
   ═══════════════════════════════════════════════ */
function ClosingQuote() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 55 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full mt-10 rounded-3xl overflow-hidden bg-gradient-to-br
        from-[#4a0505]
        via-[#3a0404]
        to-[#240202]"
      style={{ border: "1px solid rgba(220,38,38,0.2)", backdropFilter: "blur(18px)" }}
    >
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(220,38,38,0.45),transparent)" }} />
      {/* Treble clef */}
      <div className="absolute -right-3 -top-6 text-[20rem] font-serif leading-none pointer-events-none select-none" style={{ fontFamily: "'Cormorant Garamond',serif", color: "rgba(220,38,38,0.06)" }}>𝄞</div>

      <div className="relative z-10 flex flex-col lg:flex-row items-stretch">
        <div className="hidden lg:block w-1.5 flex-shrink-0" style={{ background: "linear-gradient(180deg,#dc2626,#ef4444,#dc2626)" }} />
        <div className="flex-1 px-8 md:px-14 py-12 md:py-16">
          <div className="flex items-center gap-2.5 mb-8">
            {[Headphones, Volume2, AudioWaveform, Music2].map((Icon, i) => (
              <motion.div key={i} className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm" style={{ background: "#ffffffff", border: "1px solid rgba(220,38,38,0.2)" }}
                animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.28, ease: "easeInOut" }}>
                <Icon className="w-3.5 h-3.5" style={{ color: "#dc2626" }} />
              </motion.div>
            ))}
          </div>
          <blockquote className="italic font-black leading-[1.05] text-white mb-9" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.75rem,4vw,3.8rem)" }}>
            "We don't simply perform music — we create moments audiences carry forever."
          </blockquote>
          <div className="flex items-center gap-5">
            <div className="w-14 h-px" style={{ background: "linear-gradient(90deg,#dc2626,#ef4444)" }} />
            <span className="text-[9.5px] font-black uppercase tracking-[0.55em] text-red-500" style={{ fontFamily: "'DM Mono',monospace" }}>Retro Beats Orchestra</span>
          </div>
        </div>
        {/* Stats */}
        <div className="w-full lg:w-56 xl:w-60 flex-shrink-0 flex flex-row lg:flex-col justify-around lg:justify-center gap-5 px-7 py-10 lg:py-14" style={{ background: "rgba(220,38,38,0.05)", borderLeft: "1px solid rgba(220,38,38,0.15)" }}>
          {[["12+", "Years of Live Music"], ["200+", "Premium Shows"], ["50K+", "Audience Reached"]].map(([val, label], i) => (
            <motion.div key={i} className="text-center lg:text-left" initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1, duration: 0.55 }}>
              <div className="text-3xl xl:text-4xl font-black" style={{ fontFamily: "'Cormorant Garamond',serif", color: "#dc2626" }}>{val}</div>
              <div className="text-[8.5px] font-bold uppercase tracking-widest text-slate-100 mt-0.5" style={{ fontFamily: " DM Mono ,monospace" }}>{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════ */
export default function OurEvents() {
  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;0,800;0,900;1,400;1,700;1,800&family=DM+Mono:wght@400;500&family=Nunito+Sans:wght@300;400;600&display=swap";
    document.head.appendChild(l);
    return () => document.head.removeChild(l);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "#0a0a0a" }}>
      <FloatingSymbols />

      {/* Grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ zIndex: 1, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "256px" }} />

      {/* Staff lines */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.03]" style={{ zIndex: 1 }}>
        {[12, 20, 28, 36, 44, 56, 64, 72, 80, 88].map((p, i) => <div key={i} className="absolute w-full h-px bg-red-900/30" style={{ top: `${p}%` }} />)}
      </div>

      <section className="relative py-20 md:py-28 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto" style={{ zIndex: 10 }}>
        <Header />
        <Ticker />
        <div className="mt-10 space-y-9 md:space-y-11">
          {shows.map((show, i) => <ShowSection key={show.id} show={show} index={i} />)}
        </div>
        <ClosingQuote />
      </section>
    </div>
  );
}


