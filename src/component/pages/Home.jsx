import { useState, useEffect, useRef } from "react";

// ── NOTE: Replace these image imports with your actual paths ──────────────────
// import sr1 from '../../assets/img/sr1.jpeg'  ... etc.
// For now, placeholder strings are used; swap them with your real imports.
const sr1="sr1",sr2="sr2",sr3="sr3",sr4="sr4",sr5="sr5",sr6="sr6",sr7="sr7",sr8="sr8";
const dir1="dir1",dir2="dir2";
const bg="bg";

import Hero from "./Hero";
import Artists from "./Artist";
import NextEvent from "./NextEvent";
import WhoWeAre from "./WhoWeAre";
import OurServices from "./OurServices";
import OurEvents from "./OurEvents";
import WhyChooseUs from "./WhyChooseUs";
import GalleryImages from "./GalleryImages";
import Founder from "./Founder";
// ── Design Tokens ─────────────────────────────────────────────────────────────
const CRIMSON_GRADIENT_TEXT = {
  background: "linear-gradient(135deg, #dc2626, #ef4444, #991b1b)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};
const CRIMSON_GRADIENT_BG   = "linear-gradient(135deg, #4a0505 0%, #dc2626 50%, #991b1b 100%)";
const CRIMSON_GRADIENT_H    = "linear-gradient(90deg, #dc2626, #ef4444, transparent)";
const CRIMSON_DIM           = "rgba(220,38,38,0.10)";
const CRIMSON_BORDER        = "rgba(220,38,38,0.20)";
const DEEP_OXBLOOD          = "#1a0505";
const CRIMSON_DARK          = "#240202";

// ── Reusable primitives ────────────────────────────────────────────────────────
const GoldBtn = ({ children, outline = false, style = {}, className = "", ...p }) => (
  <button
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "14px 32px",
      borderRadius: 99,
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      cursor: "pointer",
      transition: "all 0.3s",
      border: outline ? "2px solid #dc2626" : "none",
      background: outline ? "transparent" : CRIMSON_GRADIENT_BG,
      color: outline ? "#dc2626" : "#fff",
      ...style,
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = "scale(1.05)";
      e.currentTarget.style.boxShadow = outline
        ? "none"
        : "0 0 28px rgba(220,38,38,0.45)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "none";
    }}
    {...p}
  >
    {children}
  </button>
);

const SectionTitle = ({ sup, title, center = false }) => (
  <div style={{ marginBottom: 48, textAlign: center ? "center" : "left" }}>
    {sup && (
      <p style={{
        ...CRIMSON_GRADIENT_TEXT,
        fontSize: 13,
        letterSpacing: "0.35em",
        textTransform: "uppercase",
        fontWeight: 700,
        marginBottom: 12,
      }}>
        {sup}
      </p>
    )}
    <h2 style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "clamp(40px, 5vw, 56px)",
      fontWeight: 700,
      color: "#ffffff",
      lineHeight: 1.12,
      whiteSpace: "pre-line",
    }}>
      {title}
    </h2>
    <div style={{
      marginTop: 14,
      height: 2,
      width: 64,
      borderRadius: 2,
      background: CRIMSON_GRADIENT_H,
      marginLeft: center ? "auto" : 0,
      marginRight: center ? "auto" : 0,
    }} />
  </div>
);

// ── Floating music notes ────────────────────────────────────────────────────────
const NOTES = ["♩", "♪", "♫", "♬", "𝄞"];
const FloatingNotes = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", userSelect: "none" }} aria-hidden>
      {Array.from({ length: isMobile ? 6 : 18 }).map((_, i) => {
        const note = NOTES[i % NOTES.length];
        const left = `${5 + (i * 53) % 90}%`;
        const delay = `${(i * 1.3) % 9}s`;
        const dur = `${12 + (i * 2.7) % 10}s`;
        const size = 14 + (i * 7) % 18;
        return (
          <span key={i} style={{
            position: "absolute",
            bottom: 0,
            left,
            fontSize: size,
            color: "#dc2626",
            animation: `floatNote ${dur} ${delay} infinite ease-in-out`,
            opacity: 0,
            willChange: "transform, opacity",
          }}>
            {note}
          </span>
        );
      })}
      <style>{`
        @keyframes floatNote {
          0%   { transform:translateY(0) rotate(-10deg); opacity:0; }
          10%  { opacity:0.15; }
          80%  { opacity:0.08; }
          100% { transform:translateY(-110vh) rotate(20deg); opacity:0; }
        }
        @keyframes waveBar {
          0%,100% { transform:scaleY(0.4); }
          50%     { transform:scaleY(1); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes pulseGlow {
          0%,100% { box-shadow:0 0 18px rgba(220,38,38,0.15); }
          50%     { box-shadow:0 0 38px rgba(220,38,38,0.35); }
        }
      `}</style>
    </div>
  );
};

// ── Wave Bars ──────────────────────────────────────────────────────────────────
const WaveBars = ({ count = 14 }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const actualCount = isMobile ? Math.min(count, 6) : count;

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3 }} aria-hidden>
      {Array.from({ length: actualCount }).map((_, i) => (
        <span key={i} style={{
          width: 3,
          borderRadius: 2,
          height: 8 + (i % 4) * 6,
          background: GOLD_GRADIENT_BG,
          animation: `waveBar ${0.6 + (i % 5) * 0.15}s ${i * 0.07}s infinite ease-in-out`,
          opacity: 0.65 + (i % 3) * 0.12,
          display: "inline-block",
          willChange: "transform",
        }} />
      ))}
    </div>
  );
};

// ── Card hover helper ──────────────────────────────────────────────────────────
const useHover = () => {
  const [hovered, setHovered] = useState(false);
  return [hovered, { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) }];
};

// ── Data ───────────────────────────────────────────────────────────────────────
const services = [
  { icon: "🎻", title: "Live Orchestra Shows",     desc: "Full ensemble performances for grand stages and intimate venues alike." },
  { icon: "🎤", title: "Musical Tribute Events",   desc: "Heartfelt tributes to iconic legends — from Ilaiyaraaja to Beethoven." },
  { icon: "🏢", title: "Corporate Events",         desc: "Elevate your brand evenings with bespoke orchestral experiences." },
  { icon: "🎭", title: "Cultural Programs",         desc: "Celebrating heritage through curated classical and folk performances." },
  { icon: "🥂", title: "Private Functions",         desc: "Weddings, galas, and private celebrations with a musical soul." },
];

const shows = [
  { icon: "🎶", title: "Devārāgam",     subtitle: "Musical Tribute Night",    tag: "Tribute",   desc: "A soul-stirring tribute to the maestros who shaped Indian classical and film music." },
  { icon: "🎵", title: "Retro Beats",   subtitle: "Golden Era Celebration",   tag: "Live",      desc: "Re-live the magic of timeless melodies from the golden decades, performed live." },
  { icon: "🎼", title: "Golden Classics",subtitle: "Grand Orchestral Concert",tag: "Concert",   desc: "A spectacular full-orchestra concert spanning centuries of classical masterpieces." },
  { icon: "🪗", title: "Rāga Utsavam", subtitle: "Carnatic Night",            tag: "Classical", desc: "An evening dedicated to the pure, profound beauty of South Indian classical music." },
];

const artists = [
  { img: dir1, role: "Director" },
  { img: dir2, role: "Director" },
  { img: sr1,  role: "Singer" },
  { img: sr2,  role: "Singer" },
  { img: sr3,  role: "Singer" },
  { img: sr4,  role: "Singer" },
  { img: sr5,  role: "Singer" },
  { img: sr6,  role: "Singer" },
  { img: sr7,  role: "Singer" },
  { img: sr8,  role: "Singer" },
];

const whyUs = [
  { icon: "🎼", title: "Expert Musicians",     desc: "Trained professionals with decades of stage experience." },
  { icon: "🔊", title: "Premium Sound",        desc: "Concert-grade audio engineering for flawless live sound." },
  { icon: "💡", title: "Unique Concepts",      desc: "Every show is crafted with a distinct artistic vision." },
  { icon: "✨", title: "Unforgettable Moments",desc: "We don't perform shows. We create memories." },
];

const testimonials = [
  { name: "Ramesh Iyer",     initials: "RI", role: "Event Director, TN Heritage Foundation", text: "The orchestra transformed our cultural evening into an ethereal experience. Every guest was moved to tears. Simply world-class." },
  { name: "Kavitha Suresh",  initials: "KS", role: "Wedding Planner",                        text: "Booking them for my client's wedding was the best decision. The ambience, the music, the professionalism — absolutely flawless." },
  { name: "Mr. Venkat Raman",initials: "VR", role: "CEO, Coimbatore Arts Trust",             text: "Their Devārāgam tribute night sold out in two days. The audience's standing ovation said everything we needed to know." },
];

// ── Shared card style ──────────────────────────────────────────────────────────
const cardBase = (hovered) => ({
  background: "#111",
  border: `1px solid ${hovered ? "rgba(220,38,38,0.3)" : GOLD_BORDER}`,
  borderRadius: 18,
  padding: 28,
  transition: "all 0.3s",
  boxShadow: hovered ? "0 14px 40px rgba(220,38,38,0.18)" : "0 4px 20px rgba(0,0,0,0.4)",
  transform: hovered ? "translateY(-4px)" : "none",
  cursor: "default",
});

// ── Sections ───────────────────────────────────────────────────────────────────







function ServiceCard({ s }) {
  const [hovered, handlers] = useHover();
  return (
    <div {...handlers} style={cardBase(hovered)}>
      <div style={{
        width: 52, height: 52,
        borderRadius: 14,
        background: GOLD_DIM,
        border: `1px solid ${GOLD_BORDER}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 24,
        marginBottom: 18,
      }}>{s.icon}</div>
      <h3 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 23,
        fontWeight: 700,
        color: "#ffffff",
        marginBottom: 10,
      }}>{s.title}</h3>
      <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.75 }}>{s.desc}</p>
    </div>
  );
}

function Services() {
  return (
    <section style={{
      background: `linear-gradient(170deg, ${NAVY} 0%, ${DARK_NAVY} 100%)`,
      padding: "100px 40px",
    }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <SectionTitle sup="What We Offer" title="Our Services" center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {services.map(s => <ServiceCard key={s.title} s={s} />)}
        </div>
      </div>
    </section>
  );
}

function ShowCard({ s }) {
  const [hovered, handlers] = useHover();
  return (
    <div {...handlers} style={{
      background: "#111",
      border: `1px solid ${hovered ? "rgba(220,38,38,0.3)" : GOLD_BORDER}`,
      borderRadius: 18,
      overflow: "hidden",
      transition: "all 0.3s",
      boxShadow: hovered ? "0 16px 48px rgba(220,38,38,0.2)" : "0 4px 20px rgba(0,0,0,0.4)",
      transform: hovered ? "translateY(-6px)" : "none",
    }}>
      <div style={{
        height: 128,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "linear-gradient(135deg, rgba(217,119,6,0.07) 0%, transparent 100%)",
      }}>
        <span style={{
          fontSize: 48,
          filter: "drop-shadow(0 0 16px rgba(217,119,6,0.3))",
          transform: hovered ? "scale(1.12)" : "scale(1)",
          transition: "transform 0.3s",
          display: "block",
        }}>{s.icon}</span>
      </div>
      <div style={{ padding: "18px 20px 22px" }}>
        <span style={{
          fontSize: 10,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          padding: "5px 12px",
          borderRadius: 20,
          background: GOLD_DIM,
          color: "#b45309",
          border: `1px solid ${GOLD_BORDER}`,
          fontWeight: 700,
        }}>{s.tag}</span>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 24,
          fontWeight: 700,
          color: "#ffffff",
          margin: "12px 0 4px",
        }}>{s.title}</h3>
        <p style={{ ...GOLD_GRADIENT_TEXT, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em" }}>{s.subtitle}</p>
        <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.75, marginTop: 10 }}>{s.desc}</p>
      </div>
    </div>
  );
}

function Shows() {
  return (
    <section style={{ background: DARK_NAVY, padding: "100px 40px" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <SectionTitle sup="Signature Events" title="Our Signature Shows" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {shows.map(s => <ShowCard key={s.title} s={s} />)}
        </div>
      </div>
    </section>
  );
}

function ArtistCard({ a }) {
  const [hovered, handlers] = useHover();
  return (
    <div {...handlers} style={{
      borderRadius: 18,
      overflow: "hidden",
      border: `1px solid ${hovered ? "rgba(217,119,6,0.4)" : GOLD_BORDER}`,
      transition: "all 0.3s",
      boxShadow: hovered ? "0 12px 32px rgba(217,119,6,0.2)" : "0 4px 18px rgba(0,0,0,0.05)",
      transform: hovered ? "translateY(-4px)" : "none",
      background: "#111",
    }}>
      <div style={{
        aspectRatio: "1 / 1",
        background: GOLD_DIM,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 48,
      }}>
        {/* Replace with <img src={a.img} alt={a.role} style={{width:"100%",height:"100%",objectFit:"cover"}} /> */}
        <span>🎤</span>
      </div>
      <div style={{
        padding: "14px 16px",
        borderTop: `1px solid ${GOLD_BORDER}`,
        textAlign: "center",
      }}>
        <p style={{
          ...GOLD_GRADIENT_TEXT,
          fontSize: 12,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontWeight: 700,
        }}>{a.role}</p>
      </div>
    </div>
  );
}



function WhyUsCard({ w }) {
  const [hovered, handlers] = useHover();
  return (
    <div {...handlers} style={{
      ...cardBase(hovered),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    }}>
      <div style={{
        width: 56, height: 56,
        borderRadius: 16,
        background: GOLD_DIM,
        border: `1px solid ${GOLD_BORDER}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 26,
        marginBottom: 18,
      }}>{w.icon}</div>
      <h3 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 22,
        fontWeight: 700,
        color: "#ffffff",
        marginBottom: 10,
      }}>{w.title}</h3>
      <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.75 }}>{w.desc}</p>
    </div>
  );
}

function WhyUs() {
  return (
    <section style={{
      background: `linear-gradient(160deg, ${NAVY} 0%, ${DARK_NAVY} 100%)`,
      padding: "100px 40px",
    }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <SectionTitle sup="Our Edge" title="Why Choose Us" center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {whyUs.map(w => <WhyUsCard key={w.title} w={w} />)}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t }) {
  const [hovered, handlers] = useHover();
  return (
    <div {...handlers} style={{
      ...cardBase(hovered),
      display: "flex",
      flexDirection: "column",
    }}>
      <div style={{
        fontSize: 52,
        fontFamily: "Georgia, serif",
        lineHeight: 1,
        marginBottom: 14,
        ...GOLD_GRADIENT_TEXT,
      }}>"</div>
      <p style={{
        fontSize: 16,
        color: "#94a3b8",
        lineHeight: 1.85,
        fontStyle: "italic",
        marginBottom: 22,
        flexGrow: 1,
      }}>{t.text}</p>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        borderTop: `1px solid rgba(217,119,6,0.12)`,
        paddingTop: 18,
      }}>
        <div style={{
          width: 42, height: 42,
          borderRadius: "50%",
          background: GOLD_DIM,
          border: `1px solid rgba(217,119,6,0.28)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700,
          color: "#b45309",
          flexShrink: 0,
        }}>{t.initials}</div>
        <div>
          <p style={{ fontSize: 15, fontWeight: 700, color: "#ffffff" }}>{t.name}</p>
          <p style={{ fontSize: 12, color: "#64748b", marginTop: 3 }}>{t.role}</p>
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <section style={{ background: DARK_NAVY, padding: "100px 40px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <SectionTitle sup="Voices" title="What People Say" center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {testimonials.map(t => <TestimonialCard key={t.name} t={t} />)}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section style={{
      background: "radial-gradient(ellipse 80% 80% at 50% 50%, #1a0505 0%, #0a0a0a 70%)",
      padding: "100px 40px",
      textAlign: "center",
      position: "relative",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center, rgba(217,119,6,0.07) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "relative",
        maxWidth: 700,
        margin: "0 auto",
        background: "rgba(20,20,20,0.65)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: 32,
        padding: "72px 52px",
        boxShadow: "0 24px 72px rgba(220,38,38,0.1)",
      }}>
        <p style={{
          ...GOLD_GRADIENT_TEXT,
          fontSize: 13,
          letterSpacing: "0.38em",
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: 18,
        }}>Let's Create Together</p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(40px, 5vw, 58px)",
          fontWeight: 700,
          color: "#ffffff",
          lineHeight: 1.1,
          marginBottom: 20,
        }}>
          Plan Your Next Event<br />
          <span style={GOLD_GRADIENT_TEXT}>With Us</span>
        </h2>
        <p style={{
          fontSize: 17,
          color: "#94a3b8",
          lineHeight: 1.85,
          marginBottom: 40,
          maxWidth: 520,
          margin: "0 auto 40px",
        }}>
          Whether it's an intimate private gathering or a grand cultural evening, we craft performances that leave audiences breathless. Let's begin your musical journey.
        </p>
        <GoldBtn>Contact Us →</GoldBtn>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section style={{
      background: `linear-gradient(160deg, #0a0a0a 0%, ${NAVY} 100%)`,
      padding: "100px 40px",
    }}>
      <div style={{
        maxWidth: 960,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 64,
      }}>
        <div>
          <SectionTitle sup="Reach Us" title="Get in Touch" />
          {[
            { icon: "📞", label: "Phone",    val: "+91 98765 43210" },
            { icon: "✉️", label: "Email",    val: "hello@orchestrabrand.in" },
            { icon: "📍", label: "Location", val: "Coimbatore, Tamil Nadu, India" },
          ].map(c => (
            <div key={c.label} style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 24 }}>
              <div style={{
                width: 46, height: 46,
                borderRadius: 14,
                background: "#111",
                border: `1px solid #333`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20,
                flexShrink: 0,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}>{c.icon}</div>
              <div>
                <p style={{
                  ...GOLD_GRADIENT_TEXT,
                  fontSize: 11,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  marginBottom: 4,
                }}>{c.label}</p>
                <p style={{ fontSize: 16, color: "#cbd5e1" }}>{c.val}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          background: "#111",
          border: `1px solid ${GOLD_BORDER}`,
          borderRadius: 22,
          padding: 36,
          boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
        }}>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 28,
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: 24,
          }}>Send a Message</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {["Your Name", "Phone Number"].map(ph => (
              <input key={ph} placeholder={ph} style={{
                width: "100%",
                background: "#0a0a0a",
                border: "1px solid #333",
                borderRadius: 13,
                padding: "13px 16px",
                fontSize: 15,
                color: "#ffffff",
                outline: "none",
                boxSizing: "border-box",
              }}
                onFocus={e => { e.target.style.border = "1px solid #d97706"; e.target.style.boxShadow = "0 0 0 3px rgba(217,119,6,0.1)"; }}
                onBlur={e => { e.target.style.border = "1px solid #333"; e.target.style.boxShadow = "none"; }}
              />
            ))}
            <textarea placeholder="Your Message" rows={4} style={{
              width: "100%",
              background: "#0a0a0a",
              border: "1px solid #333",
              borderRadius: 13,
              padding: "13px 16px",
              fontSize: 15,
              color: "#ffffff",
              outline: "none",
              resize: "none",
              boxSizing: "border-box",
              fontFamily: "inherit",
            }}
              onFocus={e => { e.target.style.border = "1px solid #d97706"; e.target.style.boxShadow = "0 0 0 3px rgba(217,119,6,0.1)"; }}
              onBlur={e => { e.target.style.border = "1px solid #e2e8f0"; e.target.style.boxShadow = "none"; }}
            />
            <GoldBtn style={{ justifyContent: "center", width: "100%", marginTop: 4 }}>
              Send Message
            </GoldBtn>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      background: "#050505",
      borderTop: `1px solid ${GOLD_BORDER}`,
      padding: "56px 40px 36px",
    }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 48, marginBottom: 40 }}>
          <div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 28,
              fontWeight: 700,
              ...GOLD_GRADIENT_TEXT,
              marginBottom: 12,
            }}>♪ Orchestra</h2>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.8 }}>
              Bringing timeless music to every stage, every heart.
            </p>
          </div>
          <div>
            <p style={{ ...GOLD_GRADIENT_TEXT, fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>Quick Links</p>
            {["Home", "Services", "Shows", "Artists", "Contact"].map(l => (
              <p key={l} style={{ fontSize: 15, color: "#64748b", marginBottom: 10, cursor: "pointer", fontWeight: 500 }}
                onMouseEnter={e => e.target.style.color = "#d97706"}
                onMouseLeave={e => e.target.style.color = "#64748b"}
              >{l}</p>
            ))}
          </div>
          <div>
            <p style={{ ...GOLD_GRADIENT_TEXT, fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>Follow Us</p>
            <div style={{ display: "flex", gap: 10 }}>
              {["📘", "📸", "▶️", "🐦"].map((icon, i) => (
                <button key={i} style={{
                  width: 42, height: 42,
                  borderRadius: 13,
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#d97706"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(217,119,6,0.2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div style={{
          borderTop: `1px solid ${GOLD_BORDER}`,
          paddingTop: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}>
          <p style={{ fontSize: 13, color: "#94a3b8" }}>© 2025 Orchestra Brand. All rights reserved.</p>
          <p style={{ fontSize: 13, color: "#94a3b8" }}>In association with FCMA, Coimbatore</p>
        </div>
      </div>
    </footer>
  );
}

// ── App root ───────────────────────────────────────────────────────────────────
export default function OrchestraHome() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <div style={{ fontFamily: "'Inter', sans-serif", WebkitFontSmoothing: "antialiased" }}>
     
        <Hero />
        {/* <NextEvent /> */}
        <Artists />

        <WhoWeAre />
        <Founder/>
       <OurServices/>
        <OurEvents/>
        <WhyChooseUs/>
        {/* <WhyUs /> */}
       
      </div>
    </>
  );
}