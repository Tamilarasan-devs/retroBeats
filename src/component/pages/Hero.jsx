import { useEffect, useState } from "react";
import bg1 from '../../assets/img/inst2.png'

export default function Hero() {

  // Indian classical / orchestra themed images (royalty-free)
  const images = [
    bg1, // sitar
    "https://t4.ftcdn.net/jpg/19/59/64/27/360_F_1959642787_CCcVSuLuAyF3t5wdFJ179lvdf73zj2HF.jpg",   // stage orchestra
    "https://t4.ftcdn.net/jpg/12/03/32/57/360_F_1203325778_h1OjUaRAnm64RaeD8UCi1QA3kfoTqgRQ.jpg",   // violin performance
    "https://t4.ftcdn.net/jpg/15/99/30/71/360_F_1599307144_WUnqDCDwyh4CcJwBEbt9mIuHUP9Uqv5O.jpg", // flute
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-4 sm:px-6 overflow-hidden">

      {/* Background Slides */}
      <div className="absolute inset-0">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-[1400ms] ease-in-out ${index === current
                ? "opacity-100 scale-105"
                : "opacity-0 scale-100"
              }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${img})`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Strong Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0a0a0a]" />

      {/* Red Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(220,38,38,0.2),transparent_60%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl md:max-w-5xl flex flex-col items-center">

        {/* Heading */}
        <h1
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            textShadow: "0 8px 30px rgba(0,0,0,0.9)",
          }}
        >
          A Symphony of Nostalgia, Passion,{" "}
          <br className="hidden sm:block" />
          and <span className="text-red-500">Timeless Music</span>
        </h1>

        {/* Subheading */}
        <h2 className="mt-4 text-sm sm:text-lg md:text-xl text-gray-100 max-w-3xl leading-relaxed">
          Retro Beats Orchestra brings the magic of soulful live orchestral music to modern audiences through nostalgic, emotionally rich performances
        </h2>

        {/* Highlight */}
        <p
          className="mt-3 text-lg sm:text-xl md:text-2xl font-semibold"
          style={{
            color: "#ef4444",
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          Experience Music. Feel the Legacy.
        </p>

        {/* Description */}
        <p className="mt-5 text-sm sm:text-base md:text-lg text-gray-100 max-w-xl md:max-w-2xl leading-relaxed">
          Welcome to Retro Beats Orchestra, Coimbatore's premier live musical ensemble dedicated to preserving and celebrating the timeless melodies of Indian cinema. Reliving the Golden Era of Indian Cinema Through Live Orchestral Excellence.
        </p>

        {/* CTA */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button className="px-6 sm:px-8 py-3 rounded-full bg-red-600 text-white font-semibold hover:bg-red-500 hover:scale-105 transition duration-300 shadow-[0_0_30px_rgba(220,38,38,0.3)]">
            Book an Event
          </button>

          <button className="px-6 sm:px-8 py-3 rounded-full border border-red-600 text-red-400 bg-white/5 backdrop-blur-md hover:bg-red-600/10 transition duration-300">
            Explore Shows
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-5 flex gap-2 z-20">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${i === current
                ? "w-6 bg-red-500"
                : "w-2 bg-white/40"
              }`}
          />
        ))}
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  );
}