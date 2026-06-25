import React from 'react'

export default function HeroSection() {
  const [active, setActive] = useState(0);

  const slides = [
    { image: bg1, title: "Live Performances", subtitle: "Experience music like never before", color: "#c9a84c" },
    { image: bg2, title: "Cultural Evenings", subtitle: "A journey through timeless melodies", color: "#f1f5f9" },
    { image: bg3, title: "Special Tributes", subtitle: "Celebrating the legends", color: "#faf9f6" },
    { image: bg4, title: "Music & Memories", subtitle: "Unforgettable moments created together", color: "#1c1917" },
    { image: bg5, title: "Feel the Rhythm", subtitle: "The heart of music beats here", color: "#0f172a" },
  ];

  return (
    <div>
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, #fff4e5 0%, ${darkNavy} 55%, #f8fafc 100%)`,
        }}
      >
        <FloatingNotes />

        {/* Subtle radial glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.12) 0%, transparent 70%)" }}
        />

        {/* Live indicator */}


        <h1
          className="text-5xl sm:text-6xl md:text-8xl font-bold leading-[1.05] text-slate-100 max-w-5xl"
          style={{
            fontFamily: "'Playfair Display', serif",
            animation: "fadeUp 1s 0.4s both",
            textShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          Best Instrumental Light Music Orchestra in Coimbatore
          There's nothing better than Live Music
          Experience Music.<br />
          <span style={{ color: gold }}>Feel the Legacy.</span>
        </h1>

        <p
          className="mt-6 text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed"
          style={{ animation: "fadeUp 1s 0.65s both" }}
        >
          We bring timeless melodies to life through grand live orchestral performances
          and unforgettable musical events across stages, festivals, and private celebrations.
        </p>

        <div
          className="mt-10 flex flex-wrap gap-4 justify-center"
          style={{ animation: "fadeUp 1s 0.85s both" }}
        >
          <GoldBtn>Book a Concert</GoldBtn>
          <GoldBtn outline>Explore Shows</GoldBtn>
        </div>

        <WaveBars count={20} className="absolute bottom-10 opacity-40" />
      </section>
    </div>
  )
}