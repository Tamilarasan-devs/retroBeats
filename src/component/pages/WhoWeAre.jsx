import React, { useEffect, useRef, useState } from "react";
import bg from '../../assets/img/mus.jpg'
const STATS = [
  { num: "100+", label: "Performances" },
  { num: "15+", label: "Artists" },
  { num: "10+", label: "Years" },
];

const BAR_COUNT = 36;

const MUSIC_SYMBOLS = [
  "𝄞", "𝄢", "♩", "♪", "♫", "♬", "♭", "♮", "♯",
  "𝄐", "𝄑", "𝄻", "𝄼", "𝄽", "𝆏", "𝆑", "𝅘𝅥𝅮", "𝅘𝅥𝅯", "𝅘𝅥𝅰", "𝄪"
];

function seededRand(seed) {
  let s = seed;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}

function FloatingSymbols() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const r = seededRand(77);
    const init = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      symbol: MUSIC_SYMBOLS[i % MUSIC_SYMBOLS.length],
      x: r() * 100,
      y: r() * 100,
      size: 13 + r() * 30,
      opacity: 0.045 + r() * 0.12,
      dur: 11 + r() * 16,
      delay: r() * 9,
      rotate: r() * 360,
      driftX: (r() - 0.5) * 38,
    }));
    setParticles(init);

    const iv = setInterval(() => {
      setParticles(prev => {
        const next = [...prev];
        const idx = Math.floor(Math.random() * next.length);
        const rr = Math.random;
        next[idx] = {
          ...next[idx],
          symbol: MUSIC_SYMBOLS[Math.floor(rr() * MUSIC_SYMBOLS.length)],
          x: rr() * 100,
          y: rr() * 100,
          size: 13 + rr() * 30,
          opacity: 0.045 + rr() * 0.12,
          dur: 11 + rr() * 16,
          delay: 0,
          rotate: rr() * 360,
          driftX: (rr() - 0.5) * 38,
        };
        return next;
      });
    }, 1600);

    return () => clearInterval(iv);
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
            color: "#991b1b",
            fontFamily: "'Cormorant Garamond', serif",
            animation: `floatSym ${dur}s ease-in-out ${delay}s infinite`,
            transform: `rotate(${rotate}deg)`,
            "--dx": `${driftX}px`,
            transition: "left 1.4s cubic-bezier(.4,0,.2,1), top 1.4s cubic-bezier(.4,0,.2,1), opacity 0.9s",
            lineHeight: 1,
            userSelect: "none",
            willChange: "transform",
          }}
        >
          {symbol}
        </span>
      ))}
    </div>
  );
}

export default function WhoWeAre() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0a0a0a]"
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Top hairline */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-900/50 to-transparent" />

      {/* Floating musical symbols */}
      <FloatingSymbols />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(10, 10, 10, 0.94)", // deep dark overlay
          zIndex: 0,
        }}
      />

      {/* Ambient glows */}
      <div className="absolute top-1/2 left-0 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(153,27,27,0.15) 0%, transparent 70%)", transform: "translate(-42%, -50%)", opacity: 0.6 }} />
      <div className="absolute top-0 right-0 w-[650px] h-[650px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(220,38,38,0.1) 0%, transparent 65%)", transform: "translate(38%, -38%)", opacity: 0.3 }} />

      {/* ── CONTENT ── */}
      <div className="relative max-w-7xl mx-auto px-8 md:px-14 lg:px-20 py-24 lg:py-32">

        {/* Eyebrow */}
        <div className={`flex items-center gap-5 mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="h-px w-10 bg-red-600" />
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#dc2626", fontWeight: 700 }}>
            OUR STORY
          </p>
          <div className="h-px w-10 bg-red-600" />
        </div>

        {/* 3-col grid: text | divider | card */}
        <div className="grid lg:grid-cols-[1fr_1px_1fr] items-start">

          {/* ── LEFT ── */}
          <div className="lg:pr-20">

            {/* Big headline */}
            <div className={`transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 700,
                fontSize: "clamp(68px, 9.5vw, 112px)",
                lineHeight: 0.88, letterSpacing: "-0.025em",
                color: "#ffffff", marginBottom: "4px",
              }}>
                Who
              </h2>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: "clamp(68px, 9.5vw, 112px)",
                  lineHeight: 0.88,
                  letterSpacing: "-0.025em",
                  background: "linear-gradient(to right, #dc2626, #ef4444)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: "2rem",
                }}
              >
                We Are
              </h2>

              {/* Red rule */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "2rem" }}>
                <div style={{ height: "2.5px", width: "52px", background: "#dc2626", borderRadius: "9999px" }} />
                <div style={{ height: "2.5px", width: "16px", background: "rgba(220,38,38,0.35)", borderRadius: "9999px" }} />
              </div>
            </div>

            {/* Lead italic */}
            <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
                fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 400,
                lineHeight: 1.45, color: "#ffffff", marginBottom: "1.5rem",
              }}>
                Founded by music enthusiast and performer <span style={{ color: "#ef4444", fontWeight: 600 }}>Sreekumar</span> and a few passionate musicians, Retro Beats was born out of a passion to revive the grandeur, soul, and emotional depth of live orchestral music.
              </p>

              {/* Body */}
              <p style={{
               fontWeight: 400,
                fontSize: "20px", lineHeight: 1.8,
                color: "#e2e8f0", marginBottom: "1.25rem",
              }}>
                Retro Beats is committed to reviving the <span style={{ color: "#dc2626", fontWeight: 700 }}>timeless charm, grandeur, and emotional depth</span> of live orchestral music for today's audiences. In an era dominated by fast-paced digital sound and short-lived musical trends, we strive to reconnect music lovers with the soulful melodies, rich orchestration, and unforgettable compositions created by the legendary masters of Indian cinema.
              </p>

              <p style={{
               fontWeight: 400,
                fontSize: "20px", lineHeight: 1.8,
                color: "#e2e8f0", marginBottom: "1.25rem",
              }}>
                At Retro Beats, we believe that timeless music deserves to be experienced in its true spirit — live, vibrant, emotional, and grand. Through our orchestra, we aim to create moments of pure musical enchantment while honouring the legacy of the great composers whose melodies continue to live in the hearts of millions.
              </p>

              <p style={{
               fontWeight: 400,
                fontSize: "20px", lineHeight: 1.8,
                color: "#e2e8f0", marginBottom: "2.75rem",
              }}>
                Through professionally curated live performances, we pay tribute to the legendary composers, lyricists, and singers whose music continues to inspire generations.
              </p>
            </div>

            {/* CTA */}
            <div className={`transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <button
                className="group"
                style={{
                 fontSize: "16px",
                  letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700,
                  display: "inline-flex", alignItems: "center", gap: "14px",
                  background: "#dc2626", color: "#fff",
                  padding: "16px 36px", border: "none", borderRadius: "4px",
                  cursor: "pointer", transition: "all 0.35s",
                  boxShadow: "0 10px 30px rgba(220,38,38,0.2)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#ef4444";
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(220,38,38,0.4)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "#dc2626";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(220,38,38,0.2)";
                }}
              >
                Discover Our Journey
                <span style={{ display: "inline-block", transition: "transform 0.3s", color: "#ffffff" }}>→</span>
              </button>
            </div>
          </div>

          {/* ── DIVIDER ── */}
          <div className={`hidden lg:block self-stretch transition-all duration-700 delay-200 ${visible ? "opacity-100" : "opacity-0"}`}>
            <div style={{ width: "1px", height: "100%", margin: "0 auto", background: "linear-gradient(to bottom, transparent, rgba(220,38,38,0.45), transparent)" }} />
          </div>
          {/* ── RIGHT ── */}
          <div className="lg:pl-20 mt-16 lg:mt-0">

            {/* Dark Red Luxury Card */}
            <div
              className={`transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",

                  /* UPDATED RED THEME */
                  background:
                    "linear-gradient(145deg, #2b0000 0%, #4a0404 45%, #120101 100%)",

                  borderRadius: "18px",
                  padding: "44px 36px 36px",
                  border: "1px solid rgba(239,68,68,0.28)",
                  marginBottom: "20px",
                  boxShadow: "0 0 40px rgba(239,68,68,0.12)",
                }}
              >
                {/* Ambient glow */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(circle at top right, rgba(239,68,68,0.14), transparent 45%)",
                    pointerEvents: "none",
                  }}
                />

                {/* Corner brackets */}
                {[
                  { t: "16px", l: "16px", bt: true, bl: true },
                  { t: "16px", r: "16px", bt: true, br: true },
                  { b: "16px", l: "16px", bb: true, bl: true },
                  { b: "16px", r: "16px", bb: true, br: true },
                ].map((c, i) => (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      top: c.t,
                      bottom: c.b,
                      left: c.l,
                      right: c.r,
                      width: 20,
                      height: 20,
                      borderTop: c.bt
                        ? "1px solid rgba(239,68,68,0.55)"
                        : "none",
                      borderBottom: c.bb
                        ? "1px solid rgba(239,68,68,0.55)"
                        : "none",
                      borderLeft: c.bl
                        ? "1px solid rgba(239,68,68,0.55)"
                        : "none",
                      borderRight: c.br
                        ? "1px solid rgba(239,68,68,0.55)"
                        : "none",
                    }}
                  />
                ))}

                {/* Watermark */}
                <div
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "0px",
                    fontSize: "130px",
                    color: "#ef4444",
                    opacity: 0.08,
                    lineHeight: 1,
                    fontFamily: "'Cormorant Garamond', serif",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  𝄞
                </div>

                {/* Violin */}
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "56px",
                    marginBottom: "14px",
                    position: "relative",
                    zIndex: 1,
                    filter: "drop-shadow(0 0 12px rgba(239,68,68,0.45))",
                  }}
                >
                  🎻
                </div>

                {/* Sub-label */}
                <p
                  style={{
                    textAlign: "center",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "9px",
                    letterSpacing: "0.55em",
                    textTransform: "uppercase",
                    color: "rgba(255,220,220,0.72)",
                    marginBottom: "22px",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  Live Performance
                </p>

                {/* Equalizer */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    gap: "2.5px",
                    height: "68px",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {Array.from({ length: BAR_COUNT }).map((_, i) => {
                    const h = [
                      28, 55, 42, 78, 52, 88, 38, 68, 82, 48, 62, 92,
                      32, 72, 48, 58, 38, 82, 52, 68, 42, 78, 32, 88,
                      58, 48, 72, 38, 62, 82, 42, 68, 52, 78, 58, 92,
                    ][i];

                    return (
                      <div
                        key={i}
                        style={{
                          width: "3px",
                          height: `${h}%`,
                          background:
                            "linear-gradient(to top, #7f1d1d, #ef4444, #fca5a5)",
                          borderRadius: "999px",
                          flexShrink: 0,
                          boxShadow: "0 0 8px rgba(239,68,68,0.35)",
                          animation: `waveBar ${1.1 + (i % 6) * 0.12
                            }s ease-in-out infinite alternate`,
                          animationDelay: `${i * 0.042}s`,
                        }}
                      />
                    );
                  })}
                </div>

                {/* Footer tagline */}
                <p
                  style={{
                    textAlign: "center",
                    marginTop: "20px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "8.5px",
                    letterSpacing: "0.5em",
                    textTransform: "uppercase",
                    color: "rgba(255,220,220,0.55)",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  Live · Passionate · Timeless
                </p>
              </div>
            </div>

            {/* Stats block */}
            <div
              className={`grid grid-cols-3 transition-all duration-700 delay-[450ms] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              style={{
                border: "1px solid rgba(239,68,68,0.22)",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 0 25px rgba(239,68,68,0.08)",
              }}
            >
              {STATS.map(({ num, label }, i) => (
                <div
                  key={label}
                  style={{
                    padding: "28px 12px",
                    textAlign: "center",

                    /* RED MATCHING BG */
                    background:
                      "linear-gradient(180deg, #260202 0%, #140101 100%)",

                    borderRight:
                      i < STATS.length - 1
                        ? "1px solid rgba(239,68,68,0.18)"
                        : "none",

                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(180deg, #3b0303 0%, #220101 100%)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(180deg, #260202 0%, #140101 100%)";
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 700,
                      fontSize: "clamp(32px, 4vw, 48px)",
                      lineHeight: 1,
                      color: "#fff5f5",
                      marginBottom: "8px",
                      textShadow: "0 0 12px rgba(239,68,68,0.22)",
                    }}
                  >
                    {num}
                  </p>

                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "10px",
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "#f87171",
                      fontWeight: 500,
                    }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes floatSym {
          0%   { transform: translateY(0px) rotate(0deg); }
          30%  { transform: translateY(-20px) rotate(7deg); }
          60%  { transform: translateY(-10px) translateX(var(--dx, 14px)) rotate(-5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        @keyframes waveBar {
          0%   { transform: scaleY(0.22); opacity: 0.4; }
          100% { transform: scaleY(1);    opacity: 0.95; }
        }
      `}</style>
    </section>
  );
}