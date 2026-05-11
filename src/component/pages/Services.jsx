import React, { useEffect, useRef, useState } from "react";
import { Music, Star, Mic2, Sparkles, ArrowRight } from "lucide-react";
import bg from "../../assets/img/mus.jpg";

const MUSIC_SYMBOLS = [
  "𝄞", "𝄢", "♩", "♪", "♫", "♬", "♭", "♮", "♯",
  "𝄐", "𝄑", "𝄻", "𝄼", "𝄽", "𝆏", "𝆑", "𝅘𝅥𝅮", "𝅘𝅥𝅯", "𝅘𝅥𝅰", "𝄪"
];

function seededRand(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function FloatingSymbols() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const r = seededRand(88);
    const init = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      symbol: MUSIC_SYMBOLS[i % MUSIC_SYMBOLS.length],
      x: r() * 100,
      y: r() * 100,
      size: 15 + r() * 35,
      opacity: 0.05 + r() * 0.1,
      dur: 12 + r() * 18,
      delay: r() * 10,
      rotate: r() * 360,
      driftX: (r() - 0.5) * 40,
    }));
    setParticles(init);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {particles.map(({ id, symbol, x, y, size, opacity, dur, delay, rotate, driftX }) => (
        <span
          key={id}
          style={{
            position: "absolute",
            left: `${x}%`,
            top: `${y}%`,
            fontSize: `${size}px`,
            opacity,
            color: "#dc2626",
            fontFamily: "'Cormorant Garamond', serif",
            animation: `floatSym ${dur}s ease-in-out ${delay}s infinite`,
            transform: `rotate(${rotate}deg)`,
            "--dx": `${driftX}px`,
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          {symbol}
        </span>
      ))}
    </div>
  );
}

export default function Services() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const services = [
    {
      title: "Symphony of Light",
      description:
        "Experience the magic of our signature 'Light Orchestra' performances. We provide lush, tuneful background arrangements and engaging center-stage concerts.",
      icon: <Music className="w-8 h-8 text-[#ef4444]" />,
      tag: "ORCHESTRAL",
    },
    {
      title: "Bespoke Arrangements",
      description:
        "Our talented arrangers transform popular songs, classical ballads, or cinematic scores into magnificent orchestrated pieces tailored to your vision.",
      icon: <Star className="w-8 h-8 text-[#ef4444]" />,
      tag: "CUSTOM SCORES",
    },
    {
      title: "Vocal Accompaniment",
      description:
        "Enhance the orchestral experience with our acclaimed vocalists. From operatic solos to contemporary pop covers, adding a captivating human element.",
      icon: <Mic2 className="w-8 h-8 text-[#ef4444]" />,
      tag: "VOCALS",
    },
    {
      title: "Event Ambience",
      description:
        "We curate the complete atmosphere, synchronizing our performances with lighting and event flow to ensure a seamless sensory experience.",
      icon: <Sparkles className="w-8 h-8 text-[#ef4444]" />,
      tag: "PRODUCTION",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#0a0a0a] py-24 lg:py-32"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Background Overlays */}
      <div className="absolute inset-0 bg-[#0a0a0a]/95 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] z-0" />
      
      {/* Floating Elements */}
      <FloatingSymbols />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-28">
          <div className={`flex justify-center items-center gap-4 mb-6 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`}>
            <div className="h-px w-8 bg-red-600" />
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#dc2626", fontWeight: 700 }}>
              OUR ARTISTRY
            </p>
            <div className="h-px w-8 bg-red-600" />
          </div>

          <h1
            className={`transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontSize: "clamp(48px, 6vw, 84px)",
              lineHeight: 1,
              color: "#ffffff",
              marginBottom: "1.5rem",
            }}
          >
            Orchestral <span className="italic" style={{ background: "linear-gradient(to right, #dc2626, #ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Services</span>
          </h1>

          <p
            className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "18px",
              lineHeight: 1.8,
              color: "#94a3b8",
            }}
          >
            Elevate your event with our diverse range of musical offerings. We deliver unparalleled artistry that resonates long after the final note.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, idx) => (
            <div
              key={idx}
              className={`group relative transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${300 + idx * 100}ms` }}
            >
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  background: "linear-gradient(145deg, #1a0101 0%, #2b0000 45%, #0a0a0a 100%)",
                  borderRadius: "24px",
                  padding: "48px 40px",
                  border: "1px solid rgba(239,68,68,0.15)",
                  height: "100%",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(239,68,68,0.4)";
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(220,38,38,0.1)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(239,68,68,0.15)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 w-24 h-1 bg-red-600/50 group-hover:w-full transition-all duration-700" />

                {/* Tag */}
                <p className="text-[9px] font-bold tracking-[0.3em] text-red-500/80 mb-6 uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {service.tag}
                </p>

                <div className="flex items-start justify-between mb-8">
                  <div className="p-4 rounded-2xl bg-red-950/30 border border-red-900/20 group-hover:scale-110 transition-transform duration-500">
                    {service.icon}
                  </div>
                  <span className="text-5xl font-serif text-red-600/10 group-hover:text-red-600/20 transition-colors duration-500 select-none">
                    0{idx + 1}
                  </span>
                </div>

                <h3
                  className="mb-4 text-white group-hover:text-red-400 transition-colors duration-300"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", fontWeight: 600 }}
                >
                  {service.title}
                </h3>

                <p className="mb-8 text-slate-400 leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "16px" }}>
                  {service.description}
                </p>

                <div className="flex items-center gap-3 text-red-500 font-bold text-xs tracking-widest uppercase group-hover:gap-5 transition-all duration-300 cursor-pointer">
                  Explore Details
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes floatSym {
          0%   { transform: translateY(0px) rotate(0deg); }
          30%  { transform: translateY(-20px) rotate(7deg); }
          60%  { transform: translateY(-10px) translateX(var(--dx, 14px)) rotate(-5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
      `}</style>
    </section>
  );
}

