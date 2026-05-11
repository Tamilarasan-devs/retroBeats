import { useState, useEffect } from "react";

const eventDate = new Date("May 9, 2026 17:00:00").getTime();

function useCountdown() {
  const [time, setTime] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const gap = eventDate - now;
      setTime({
        days: String(Math.floor(gap / (1000 * 60 * 60 * 24))).padStart(2, "0"),
        hours: String(Math.floor((gap / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
        minutes: String(Math.floor((gap / (1000 * 60)) % 60)).padStart(2, "0"),
        seconds: String(Math.floor((gap / 1000) % 60)).padStart(2, "0"),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

const LOGO = "https://uploads.onecompiler.io/44gksvjj3/44n89wfae/1000441415.jpg";
const POSTER1 = "https://uploads.onecompiler.io/44gksvjj3/44n89wfae/1000441416.jpg";
const POSTER2 = "https://uploads.onecompiler.io/44gksvjj3/44n89wfae/1000442155.jpg";
const ARTISTS = [
  "https://uploads.onecompiler.io/44gksvjj3/44n89wfae/1000441462.jpg",
  "https://uploads.onecompiler.io/44gksvjj3/44n89wfae/1000441467.jpg",
  "https://uploads.onecompiler.io/44gksvjj3/44n89wfae/1000441466.jpg",
  "https://uploads.onecompiler.io/44gksvjj3/44n89wfae/1000441468.jpg",
  "https://uploads.onecompiler.io/44gksvjj3/44n89wfae/1000441470.jpg",
  "https://uploads.onecompiler.io/44gksvjj3/44n89wfae/1000441469.jpg",
];

const WAVE_DELAYS = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

export default function RetroBeat() {
  const [introVisible, setIntroVisible] = useState(true);
  const [introFading, setIntroFading] = useState(false);
  const { days, hours, minutes, seconds } = useCountdown();

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIntroFading(true), 2500);
    const hideTimer = setTimeout(() => setIntroVisible(false), 3500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const slideImages = [...ARTISTS, ...ARTISTS];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap');

        * { font-family: 'Poppins', sans-serif; }

        .gradient-text {
          background: linear-gradient(90deg, #ff4d4d, #ff8c00);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gradient-bg {
          background: linear-gradient(90deg, #ff4d4d, #ff8c00);
        }

        /* Intro logo drop */
        @keyframes logoDrop {
          0%   { opacity: 0; transform: translateY(-80px) scale(0.6); }
          60%  { opacity: 1; transform: translateY(10px) scale(1.05); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes logoReveal {
          0%   { opacity: 0; transform: scale(0.6); letter-spacing: 25px; }
          60%  { opacity: 1; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); letter-spacing: 10px; }
        }

        @keyframes barLoad {
          0%   { width: 0px; }
          100% { width: 130px; }
        }

        .intro-img {
          opacity: 0;
          transform: translateY(-60px) scale(0.7);
          animation: logoDrop 1.2s ease forwards;
        }

        .intro-logo {
          font-size: clamp(32px, 8vw, 65px);
          font-weight: 700;
          letter-spacing: 10px;
          opacity: 0;
          transform: scale(0.7);
          animation: logoReveal 1.8s ease forwards;
        }

        .intro-bar {
          width: 0px;
          height: 4px;
          margin: 20px auto 0;
          border-radius: 10px;
          animation: barLoad 1.5s ease forwards;
          animation-delay: 1s;
        }

        /* Wave animation */
        @keyframes wave {
          0%, 100% { height: 20px; }
          50%       { height: 70px; }
        }

        .wave-bar {
          width: 6px;
          height: 40px;
          border-radius: 10px;
          animation: wave 1.2s infinite ease-in-out;
        }

        /* Float animation */
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-15px); }
        }

        .poster-float { animation: float 5s ease-in-out infinite; }
        .poster-float-2 { animation: float 5s ease-in-out infinite; animation-delay: 1.5s; }

        /* Slider */
        @keyframes scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .slide-track {
          display: flex;
          width: calc(220px * ${slideImages.length});
          animation: scroll 25s linear infinite;
        }

        /* Intro fade/scale out */
        .intro-exit {
          opacity: 0;
          transform: scale(1.1);
          transition: opacity 1s ease, transform 1s ease;
        }
      `}</style>

      {/* ── INTRO ─────────────────────────────────────────── */}
      {introVisible && (
        <div
          className={`fixed inset-0 bg-white flex justify-center items-center z-[9999] ${
            introFading ? "intro-exit" : ""
          }`}
        >
          <div className="text-center relative">
            <img src={LOGO} alt="logo" className="intro-img w-[90px] mx-auto mb-5 rounded-full" />
            <h1 className="intro-logo gradient-text">RETRO BEATS</h1>
            <div className="intro-bar gradient-bg mx-auto" />
          </div>
        </div>
      )}

      {/* ── MAIN ──────────────────────────────────────────── */}
      <div className="bg-white text-[#222] overflow-x-hidden min-h-screen">
        <div className="text-center px-5 py-10">

          {/* Logo */}
          <img src={LOGO} alt="Retro Beats" className="w-[150px] mx-auto rounded-full" />

          {/* Heading */}
          <h1 className="text-[50px] font-bold mt-5 mb-3 gradient-text leading-tight">
            COMING SOON
          </h1>

          {/* Subtitle */}
          <p className="text-[#666] max-w-xl mx-auto text-sm leading-relaxed">
            Experience the magic of retro music 🎶 Step into a world where melodies tell stories,
            vinyl crackles bring nostalgia, and every beat carries the soul of a golden era. Let
            timeless tunes take you on a journey through memories, emotions, and pure musical
            bliss.🎶
          </p>

          {/* Wave */}
          <div className="flex justify-center gap-[6px] my-6">
            {WAVE_DELAYS.map((delay, i) => (
              <span
                key={i}
                className="wave-bar gradient-bg"
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          </div>

          {/* Countdown */}
          <div className="flex justify-center gap-4 flex-wrap my-6">
            {[
              { label: "Days", value: days },
              { label: "Hours", value: hours },
              { label: "Minutes", value: minutes },
              { label: "Seconds", value: seconds },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-black/[0.03] px-5 py-4 rounded-2xl shadow-md"
              >
                <h2 className="text-3xl font-bold">{value}</h2>
                <small className="text-sm text-[#555]">{label}</small>
              </div>
            ))}
          </div>

          {/* Posters */}
          <div className="flex justify-center gap-5 flex-wrap mt-4">
            <img
              src={POSTER1}
              alt="poster1"
              className="poster-float w-[280px] rounded-2xl shadow-lg"
            />
            <img
              src={POSTER2}
              alt="poster2"
              className="poster-float-2 w-[280px] rounded-2xl shadow-lg"
            />
          </div>

          {/* CTA Button */}
          <a
            href="#"
            className="mt-8 inline-block px-9 py-3 gradient-bg text-white rounded-full font-semibold no-underline transition-transform duration-300 hover:scale-110"
          >
            Get Notified
          </a>

          {/* Artist Slider */}
          <div className="mt-16 overflow-hidden">
            <h2 className="text-2xl font-semibold mb-5 text-[#ff4d4d]">Our Artists 🎤</h2>
            <div className="overflow-hidden">
              <div className="slide-track">
                {slideImages.map((src, i) => (
                  <div key={i} className="mx-[10px]" style={{ minWidth: "200px" }}>
                    <img
                      src={src}
                      alt={`artist-${i}`}
                      className="w-full h-[220px] object-cover rounded-2xl shadow-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 text-[#888] text-sm">©️ 2026 Retro Beats</footer>
        </div>
      </div>
    </>
  );
}