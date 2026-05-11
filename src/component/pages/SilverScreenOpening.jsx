import { useState, useEffect } from "react";

const musicBarDelays = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6];
const musicBarHeights = [15, 35, 55, 30, 50, 20, 45];

export default function SilverScreenOpening({ onNext }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleNext() {
    setIsOpen(true);
    setTimeout(() => {
      if (onNext) onNext();
    }, 900);
  }

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-7">
        {/* Logo */}
        <img
          src="https://uploads.onecompiler.io/44gksvjj3/44nng272z/1000446453.jpg"
          alt="Logo"
          className="w-52 max-w-[80vw] rounded-2xl"
          style={{
            boxShadow: "0 0 25px rgba(255,255,255,0.35)",
            animation: "logoZoom 2s ease-in-out infinite alternate",
          }}
        />

        {/* Music Waves */}
        <div className="flex items-end gap-1.5" style={{ height: 60 }}>
          {musicBarHeights.map((h, i) => (
            <span
              key={i}
              className="w-2 rounded-full"
              style={{
                height: h,
                background: "linear-gradient(to top, #ffffff, #c0c0c0)",
                animation: `wave 0.9s infinite ease-in-out`,
                animationDelay: `${musicBarDelays[i]}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Top Silver Screen */}
      <div
        className="fixed top-0 left-0 w-full z-20 transition-transform duration-[1000ms] ease-in-out"
        style={{
          height: "50%",
          background: "linear-gradient(180deg, #bdbdbd, #f5f5f5, #c0c0c0, #ffffff, #bdbdbd)",
          boxShadow: "inset 0 0 40px rgba(255,255,255,0.8), inset 0 0 80px rgba(0,0,0,0.3)",
          transform: isOpen ? "translateY(-100%)" : "translateY(0)",
        }}
      />

      {/* Bottom Silver Screen */}
      <div
        className="fixed bottom-0 left-0 w-full z-20 transition-transform duration-[1000ms] ease-in-out"
        style={{
          height: "50%",
          background: "linear-gradient(180deg, #bdbdbd, #f5f5f5, #c0c0c0, #ffffff, #bdbdbd)",
          boxShadow: "inset 0 0 40px rgba(255,255,255,0.8), inset 0 0 80px rgba(0,0,0,0.3)",
          transform: isOpen ? "translateY(100%)" : "translateY(0)",
        }}
      />

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute bottom-12 z-30 px-10 py-3.5 rounded-full font-bold text-base text-black transition-transform duration-300 hover:scale-105 active:scale-95"
        style={{
          background: "linear-gradient(90deg, #ffffff, #c0c0c0)",
          boxShadow: "0 0 18px rgba(255,255,255,0.5)",
        }}
      >
        Open
      </button>

      {/* Keyframe Styles */}
      <style>{`
        @keyframes logoZoom {
          from { transform: scale(1); }
          to { transform: scale(1.05); }
        }
        @keyframes wave {
          0%, 100% { transform: scaleY(0.5); opacity: 0.5; }
          50% { transform: scaleY(1.3); opacity: 1; }
        }
      `}</style>
    </div>
  );
}