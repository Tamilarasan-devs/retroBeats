import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════════
   ANIMATION PRESETS
   ═══════════════════════════════════════════════════════════════════ */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.92 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
});

const slideIn = (direction = 'left', delay = 0) => ({
  initial: { opacity: 0, x: direction === 'left' ? -60 : 60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay },
});

/* ═══════════════════════════════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════════════════════════════ */
function AnimatedCounter({ value, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isInView) return;
    const num = parseInt(value.replace(/\D/g, ''));
    const duration = 2000;
    const steps = 60;
    const increment = num / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), num);
      setDisplay(current.toLocaleString());
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════════════════
   FLOATING PARTICLES
   ═══════════════════════════════════════════════════════════════════ */
function FloatingParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden>
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-red-500"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAGNETIC CARD (3D tilt on hover)
   ═══════════════════════════════════════════════════════════════════ */
function MagneticCard({ children, className = '' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  function handleMouse(e) {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ORNAMENTAL DIVIDER
   ═══════════════════════════════════════════════════════════════════ */
const LuxuryDivider = () => (
  <div className="my-28 flex items-center gap-4 max-w-md mx-auto">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
    <div className="flex items-center gap-2">
      <div className="w-1 h-1 rounded-full bg-red-500/40" />
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-red-500/30" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 9l10.5-3m0 6.5v-13m0 13l-10.5-3M9 9v13" />
      </svg>
      <div className="w-1 h-1 rounded-full bg-red-500/40" />
    </div>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
  </div>
);

/* ═══════════════════════════════════════════════════════════════════
   SECTION BADGE
   ═══════════════════════════════════════════════════════════════════ */
const SectionBadge = ({ text, center = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className={`inline-flex items-center gap-3 px-5 py-2 rounded-full border border-red-500/20 mb-6 ${center ? 'mx-auto' : ''}`}
    style={{
      fontFamily: "'Inter', sans-serif",
      background: 'linear-gradient(135deg, rgba(127,29,29,0.3) 0%, rgba(127,29,29,0.05) 100%)',
      backdropFilter: 'blur(8px)',
    }}
  >
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-60" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
    </span>
    <span className="text-red-400 text-[10px] font-bold uppercase tracking-[0.35em]">{text}</span>
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════ */
const stats = [
  { value: '50', suffix: '+', label: 'Live Performances', icon: '🎼' },
  { value: '10', suffix: '+', label: 'Years of Legacy', icon: '⏳' },
  { value: '30', suffix: '+', label: 'Talented Musicians', icon: '🎵' },
  { value: '10', suffix: 'K+', label: 'Happy Audience', icon: '❤️' },
];

const differentiators = [
  {
    num: '01',
    title: 'Authentic Live Orchestra',
    desc: 'Every note is performed live by talented musicians and singers, creating an experience that recorded music can never replicate.',
    accent: 'from-red-500 to-rose-400',
    glow: 'bg-red-600/20',
  },
  {
    num: '02',
    title: 'Curated Musical Themes',
    desc: 'Our programmes are thoughtfully built around legendary composers, singers, musical eras, and thematic concepts.',
    accent: 'from-amber-400 to-orange-300',
    glow: 'bg-amber-600/20',
  },
  {
    num: '03',
    title: 'Professional Standards',
    desc: 'From orchestration and sound design to stage presentation and audience engagement, we strive for excellence in every performance.',
    accent: 'from-rose-400 to-pink-300',
    glow: 'bg-rose-600/20',
  },
  {
    num: '04',
    title: 'Cultural Preservation',
    desc: 'We are committed to introducing younger generations to the timeless masterpieces that shaped Indian film music.',
    accent: 'from-sky-400 to-cyan-300',
    glow: 'bg-sky-600/20',
  },
];

const idealFor = [
  { label: 'Cultural Associations', icon: '🎭' },
  { label: 'Malayalee Associations', icon: '🌴' },
  { label: 'Tamil Associations', icon: '🏛️' },
  { label: 'Corporate Events', icon: '💼' },
  { label: 'Educational Institutions', icon: '📚' },
  { label: 'Social Organizations', icon: '🤝' },
  { label: 'Community Celebrations', icon: '🎉' },
  { label: 'Memorial & Tribute Events', icon: '🕊️' },
  { label: 'Fundraising Programmes', icon: '🎗️' },
  { label: 'Music Festivals', icon: '🎵' },
];

const journey = [
  { year: '2014', title: 'The Beginning', desc: 'Retro Beats was founded with a vision to revive classic film music through live orchestral performances.' },
  { year: '2017', title: 'First Major Show', desc: 'Our first large-scale public performance drew thousands, establishing us as a premier live orchestra collective.' },
  { year: '2020', title: 'Digital Expansion', desc: 'Adapted to reach global audiences through digital platforms and virtual concert experiences.' },
  { year: '2024', title: 'Today & Beyond', desc: 'Continuing to grow with sold-out shows, new collaborations, and a commitment to musical excellence.' },
];

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.12], [1, 0.95]);

  return (
    <main
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Global CSS for custom animations */}
      <style>{`
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        .shimmer-text {
          background: linear-gradient(90deg, #ef4444 0%, #fbbf24 25%, #ef4444 50%, #fbbf24 75%, #ef4444 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(16px) saturate(1.5); border: 1px solid rgba(255,255,255,0.06); }
        .glass-hover:hover { background: rgba(255,255,255,0.06); border-color: rgba(220,38,38,0.2); box-shadow: 0 20px 60px -15px rgba(220,38,38,0.15); }
      `}</style>

      <FloatingParticles />

      {/* ═══════════════════════════════════════════════════════
         CINEMATIC HERO SECTION
      ═══════════════════════════════════════════════════════ */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20"
      >
        {/* Radial ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,rgba(220,38,38,0.12),transparent_70%)] -z-10" />
        <div className="absolute top-20 right-[15%] w-72 h-72 bg-red-900/8 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-20 left-[10%] w-60 h-60 bg-amber-900/8 rounded-full blur-[80px] -z-10" />

        {/* Decorative rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-red-500/[0.04] rounded-full -z-10"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-red-500/[0.03] rounded-full -z-10"
        />

        <motion.div {...fadeUp(0)}>
          <SectionBadge text="About Us" center />
        </motion.div>

        <motion.h1
          {...fadeUp(0.1)}
          className="text-5xl sm:text-7xl lg:text-[6.5rem] font-black text-white leading-[0.9] mb-6 max-w-5xl"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          About{' '}
          <span className="shimmer-text italic">
            Retro Beats
          </span>
        </motion.h1>

        {/* Decorative accent line */}
        <motion.div {...fadeUp(0.2)} className="flex items-center gap-3 mb-10">
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent to-red-500/50 rounded-full" />
          <div className="w-2 h-2 rounded-full bg-red-500/60" />
          <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-red-500/50 rounded-full" />
        </motion.div>

        <motion.p
          {...fadeUp(0.25)}
          className="text-lg sm:text-xl text-slate-300/90 max-w-3xl leading-relaxed font-light"
        >
          <strong className="text-white font-semibold">Retro Beats</strong> is more than an orchestra. It is a collective
          of passionate singers, accomplished musicians, and music lovers united by a common mission — to keep
          timeless music alive.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] uppercase tracking-[0.4em] text-slate-500 font-bold">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-red-500/40 to-transparent" />
        </motion.div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════
         ABOUT STORY + STATS BENTO GRID
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main story card */}
          <motion.div
            {...slideIn('left', 0)}
            className="lg:col-span-7 glass rounded-[2rem] p-10 lg:p-14 relative overflow-hidden group glass-hover transition-all duration-700"
          >
            <div className="absolute -top-16 -right-16 text-[14rem] font-black text-red-900/[0.04] select-none leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>R</div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-600/5 rounded-full blur-[80px] group-hover:bg-red-600/10 transition-all duration-700" />

            <div className="relative space-y-6">
              <SectionBadge text="Our Story" />
              <h2
                className="text-3xl lg:text-4xl font-black text-white leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Recreating the Beauty of{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-300 italic">
                  Classic Film Music
                </span>
              </h2>
              <div className="space-y-5 text-slate-300/90 leading-relaxed text-[15px]">
                <p>
                  Our performances recreate the beauty and authenticity of classic film music through live orchestral
                  arrangements, capturing the richness, emotion, and nostalgia that only a live ensemble can deliver.
                </p>
                <p>
                  Every programme is carefully designed to offer audiences an immersive musical experience that evokes
                  memories, emotions, and a deep appreciation for India's rich musical heritage.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats bento */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-5">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                {...scaleIn(0.1 + i * 0.08)}
                className="glass rounded-[1.5rem] p-6 flex flex-col justify-between glass-hover transition-all duration-500 group relative overflow-hidden"
              >
                <div className={`absolute -top-8 -right-8 w-24 h-24 ${stat.icon === '❤️' ? 'bg-red-600/10' : 'bg-red-600/5'} rounded-full blur-[40px] group-hover:scale-150 transition-all duration-700`} />
                <span className="text-2xl mb-3 block" style={{ animation: 'float 3s ease-in-out infinite', animationDelay: `${i * 0.3}s` }}>{stat.icon}</span>
                <div className="relative">
                  <p
                    className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-300"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-2">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <LuxuryDivider />

      {/* ═══════════════════════════════════════════════════════
         WHAT MAKES US DIFFERENT — NUMBERED CARDS
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-20">
          <motion.div {...fadeUp(0)} className="flex justify-center">
            <SectionBadge text="What Sets Us Apart" center />
          </motion.div>
          <motion.h2
            {...fadeUp(0.1)}
            className="text-4xl lg:text-6xl font-black text-white mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            What Makes Us{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 italic">
              Different
            </span>
          </motion.h2>
          <motion.p {...fadeUp(0.15)} className="text-slate-500 max-w-lg mx-auto text-sm">
            Four pillars that define our commitment to live orchestral excellence
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {differentiators.map((item, i) => (
            <MagneticCard key={i} className="h-full">
              <motion.div
                {...fadeUp(0.1 * i)}
                className="relative h-full glass rounded-[2rem] p-8 lg:p-10 overflow-hidden group glass-hover transition-all duration-700"
              >
                {/* Large number watermark */}
                <div
                  className="absolute -top-6 -right-2 text-[8rem] font-black text-white/[0.02] select-none leading-none group-hover:text-white/[0.04] transition-all duration-700"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {item.num}
                </div>

                {/* Glow orb */}
                <div className={`absolute -bottom-12 -left-12 w-40 h-40 ${item.glow} rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-all duration-700`} />

                {/* Numbered accent */}
                <div className="relative flex items-start gap-5">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${item.accent} flex items-center justify-center shadow-lg`}>
                    <span className="text-white text-sm font-black">{item.num}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-xl lg:text-2xl font-black text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-red-200 transition-all duration-500"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-500">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom accent bar */}
                <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.accent} opacity-0 group-hover:opacity-40 transition-opacity duration-700`} />
              </motion.div>
            </MagneticCard>
          ))}
        </div>
      </section>

      <LuxuryDivider />

      {/* ═══════════════════════════════════════════════════════
         OUR JOURNEY — CINEMATIC TIMELINE
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-20">
          <motion.div {...fadeUp(0)} className="flex justify-center">
            <SectionBadge text="Our Journey" center />
          </motion.div>
          <motion.h2
            {...fadeUp(0.1)}
            className="text-4xl lg:text-6xl font-black text-white"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400 italic">
              Story
            </span>{' '}
            So Far
          </motion.h2>
        </div>

        {/* ── Horizontal Filmstrip Reel ── */}
        <div className="relative">
          {/* Connecting horizontal line (desktop) */}
          <div className="hidden lg:block absolute top-[72px] left-0 right-0 h-px z-0">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-red-500/25 to-transparent" />
            {/* Animated spark running along the line */}
            <motion.div
              animate={{ left: ['-5%', '105%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              className="absolute top-0 w-16 h-px bg-gradient-to-r from-transparent via-red-400/80 to-transparent"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {journey.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                {/* Year circle node */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    {/* Outer ring pulse */}
                    <div className="absolute inset-0 rounded-full border border-red-500/20 scale-125 group-hover:scale-150 group-hover:border-red-500/30 transition-all duration-700" />
                    {/* Main circle */}
                    <div className="relative w-[90px] h-[90px] rounded-full flex items-center justify-center overflow-hidden"
                      style={{
                        background: 'linear-gradient(145deg, rgba(127,29,29,0.5) 0%, rgba(10,10,10,0.9) 100%)',
                        border: '2px solid rgba(220,38,38,0.3)',
                        boxShadow: '0 0 25px rgba(220,38,38,0.15)',
                      }}
                    >
                      {/* Inner glow on hover */}
                      <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span
                        className="relative text-2xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-400 to-rose-300"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {item.year}
                      </span>
                    </div>
                    {/* Dot below circle connecting to card */}
                    <div className="hidden lg:flex flex-col items-center mt-2">
                      <div className="w-px h-4 bg-gradient-to-b from-red-500/30 to-transparent" />
                    </div>
                  </div>
                </div>

                {/* Card */}
                <div className="relative rounded-[1.5rem] overflow-hidden transition-all duration-700 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-red-900/10"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(16px)',
                  }}
                >
                  {/* Top gradient accent bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-red-600/60 via-rose-500/40 to-transparent group-hover:from-red-500 group-hover:via-rose-400/60 transition-all duration-700" />

                  <div className="p-7">
                    {/* Step number */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] font-black tracking-[0.3em] uppercase text-red-400/70">Step</span>
                      <span
                        className="text-3xl font-black text-white/[0.06] group-hover:text-white/[0.1] transition-colors duration-500"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        0{i + 1}
                      </span>
                    </div>

                    <h3
                      className="text-xl font-black text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-200 group-hover:to-rose-200 transition-all duration-500"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-500">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom glow on hover */}
                  <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <LuxuryDivider />

      {/* ═══════════════════════════════════════════════════════
         WHY CHOOSE US + IDEAL FOR
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-16">
          <motion.div {...fadeUp(0)} className="flex justify-center">
            <SectionBadge text="Why Choose Us" center />
          </motion.div>
          <motion.h2
            {...fadeUp(0.1)}
            className="text-4xl lg:text-6xl font-black text-white mb-5"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Why Choose{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400 italic">
              Retro Beats
            </span>
          </motion.h2>
          <motion.p {...fadeUp(0.15)} className="text-lg text-slate-300/80 max-w-3xl mx-auto leading-relaxed">
            Whether it is a cultural festival, corporate event, anniversary celebration, association gathering, charity
            fundraiser, or memorial tribute, Retro Beats delivers a musical experience that audiences remember long after
            the curtain falls.
          </motion.p>
        </div>

        {/* Ideal-for grid */}
        <motion.div {...fadeUp(0.2)} className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-10 justify-center">
            <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-transparent to-red-500/30" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-400/70">Our programmes are ideal for</span>
            <div className="h-px flex-1 max-w-16 bg-gradient-to-l from-transparent to-red-500/30" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {idealFor.map((item, i) => (
              <motion.div
                key={i}
                {...scaleIn(0.03 * i)}
                className="glass rounded-xl px-4 py-3.5 flex items-center gap-3 cursor-default group glass-hover transition-all duration-400 hover:-translate-y-0.5"
              >
                <span className="text-base group-hover:scale-125 transition-transform duration-300">{item.icon}</span>
                <span className="text-slate-300 text-[11px] font-semibold leading-tight group-hover:text-white transition-colors duration-300">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <LuxuryDivider />

      {/* ═══════════════════════════════════════════════════════
         VISION & MISSION — GLASS PANELS
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-16">
          <motion.div {...fadeUp(0)} className="flex justify-center">
            <SectionBadge text="Our Purpose" center />
          </motion.div>
          <motion.h2
            {...fadeUp(0.1)}
            className="text-4xl lg:text-6xl font-black text-white"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            What Drives{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 italic">
              Us Forward
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vision */}
          <MagneticCard>
            <motion.div
              {...slideIn('left', 0)}
              className="relative p-10 lg:p-14 rounded-[2.5rem] overflow-hidden group transition-all duration-700"
              style={{
                background: 'linear-gradient(145deg, rgba(127,29,29,0.2) 0%, rgba(10,10,10,0.6) 100%)',
                border: '1px solid rgba(239,68,68,0.12)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="absolute -top-10 -right-6 text-[12rem] font-black text-red-900/[0.06] select-none leading-none group-hover:text-red-900/[0.12] transition-all duration-1000"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>V</div>
              <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-red-600/8 rounded-full blur-[80px] group-hover:bg-red-600/15 transition-all duration-1000" />

              <div className="relative">
                <SectionBadge text="Our Vision" />
                <h3
                  className="text-2xl lg:text-3xl font-black text-white mb-5"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Preserving the Legacy
                </h3>
                <p className="text-slate-300/90 leading-relaxed text-base">
                  To become one of South India's most respected live orchestral ensembles, preserving the legacy of great
                  composers and bringing timeless music to new generations through exceptional live performances.
                </p>
              </div>

              <div className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-red-500/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          </MagneticCard>

          {/* Mission */}
          <MagneticCard>
            <motion.div
              {...slideIn('right', 0.1)}
              className="relative p-10 lg:p-14 rounded-[2.5rem] overflow-hidden group transition-all duration-700"
              style={{
                background: 'linear-gradient(145deg, rgba(120,53,15,0.15) 0%, rgba(10,10,10,0.6) 100%)',
                border: '1px solid rgba(245,158,11,0.12)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="absolute -top-10 -right-6 text-[12rem] font-black text-amber-900/[0.06] select-none leading-none group-hover:text-amber-900/[0.12] transition-all duration-1000"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>M</div>
              <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-amber-600/8 rounded-full blur-[80px] group-hover:bg-amber-600/15 transition-all duration-1000" />

              <div className="relative">
                <SectionBadge text="Our Mission" />
                <h3
                  className="text-2xl lg:text-3xl font-black text-white mb-5"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Honouring Heritage
                </h3>
                <p className="text-slate-300/90 leading-relaxed text-base">
                  To inspire, entertain, and connect people through the power of live music while honouring the rich musical
                  heritage of Indian cinema.
                </p>
              </div>

              <div className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-amber-500/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          </MagneticCard>
        </div>
      </section>

      <LuxuryDivider />

      {/* ═══════════════════════════════════════════════════════
         LET MUSIC BRING US TOGETHER
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <motion.div {...fadeUp(0)}>
          <SectionBadge text="The Emotion" center />
          <h2
            className="text-4xl lg:text-6xl font-black text-white mb-5"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Let Music{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 italic">
              Bring Us Together
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 my-14">
          {[
            { line: 'Every great song tells a story.', symbol: '𝄞' },
            { line: 'Every melody evokes a memory.', symbol: '♪' },
            { line: 'Every performance creates an emotion.', symbol: '♫' },
          ].map((item, i) => (
            <motion.div
              key={i}
              {...scaleIn(0.1 * i)}
              className="relative glass rounded-2xl p-8 glass-hover transition-all duration-500 group"
            >
              <span className="text-5xl text-red-500/10 absolute top-3 right-4 group-hover:text-red-500/20 transition-colors duration-500 font-serif">{item.symbol}</span>
              <p className="text-slate-200 font-serif italic text-lg leading-relaxed relative">
                "{item.line}"
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp(0.3)} className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-rose-500/10 to-amber-500/10 rounded-full blur-xl" />
          <div className="relative glass px-10 py-5 rounded-full">
            <p className="text-lg text-slate-300/90 leading-relaxed">
              At <strong className="text-white font-bold">Retro Beats Orchestra</strong>, we transform those emotions into
              unforgettable live musical experiences.
            </p>
          </div>
        </motion.div>
      </section>

      <LuxuryDivider />

      {/* ═══════════════════════════════════════════════════════
         CTA SECTION — GRAND FINALE
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 pt-10">
        <motion.div
          {...scaleIn(0)}
          className="relative text-center rounded-[3rem] overflow-hidden p-12 lg:p-20"
          style={{
            background: 'linear-gradient(160deg, rgba(127,29,29,0.25) 0%, rgba(10,5,5,0.8) 50%, rgba(10,10,10,0.9) 100%)',
            border: '1px solid rgba(239,68,68,0.15)',
            backdropFilter: 'blur(24px)',
          }}
        >
          {/* Animated breathing glow */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-700/15 rounded-full blur-[120px] -z-10"
          />

          {/* Decorative corner dots */}
          <div className="absolute top-6 left-6 w-2 h-2 rounded-full bg-red-500/30" />
          <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-red-500/30" />
          <div className="absolute bottom-6 left-6 w-2 h-2 rounded-full bg-red-500/30" />
          <div className="absolute bottom-6 right-6 w-2 h-2 rounded-full bg-red-500/30" />

          <div className="relative">
            <motion.p
              {...fadeUp(0)}
              className="text-[10px] font-black uppercase tracking-[0.5em] text-red-400/70 mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Experience the Magic of Live Music
            </motion.p>

            <motion.h2
              {...fadeUp(0.1)}
              className="text-4xl lg:text-6xl font-black text-white mb-3 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Retro Beats Orchestra
            </motion.h2>

            <motion.p
              {...fadeUp(0.15)}
              className="shimmer-text font-black uppercase tracking-[0.4em] text-xs mb-8 inline-block"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Where Timeless Music Lives On
            </motion.p>

            <motion.div {...fadeUp(0.2)} className="flex items-center gap-2 justify-center mb-10">
              <div className="w-8 h-px bg-red-500/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
              <div className="w-8 h-px bg-red-500/40" />
            </motion.div>

            <div className="flex flex-col items-center gap-4">
              <p
                className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-2"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Book a Concert
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                {['+91 94861 22022', '+91 97914 55877', '+91 98404 69489'].map((num, i) => (
                  <motion.a
                    key={i}
                    href={`tel:${num.replace(/\s/g, '')}`}
                    {...fadeUp(0.25 + i * 0.08)}
                    className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full text-white font-semibold text-sm transition-all duration-300 hover:scale-105 group overflow-hidden"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      background: 'linear-gradient(135deg, rgba(220,38,38,0.15) 0%, rgba(220,38,38,0.05) 100%)',
                      border: '1px solid rgba(220,38,38,0.25)',
                      backdropFilter: 'blur(8px)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(220,38,38,0.8) 0%, rgba(220,38,38,0.6) 100%)';
                      e.currentTarget.style.borderColor = 'rgba(220,38,38,0.8)';
                      e.currentTarget.style.boxShadow = '0 0 30px rgba(220,38,38,0.3)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(220,38,38,0.15) 0%, rgba(220,38,38,0.05) 100%)';
                      e.currentTarget.style.borderColor = 'rgba(220,38,38,0.25)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-red-400 group-hover:text-white transition-colors duration-300" stroke="currentColor" strokeWidth="2">
                      <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    <span className="relative">{num}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
