import React, { useEffect, useRef, useState } from "react";
import { Phone, MapPin, Mail, Clock, Send } from "lucide-react";
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
    const r = seededRand(99);
    const init = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      symbol: MUSIC_SYMBOLS[i % MUSIC_SYMBOLS.length],
      x: r() * 100,
      y: r() * 100,
      size: 15 + r() * 30,
      opacity: 0.04 + r() * 0.08,
      dur: 15 + r() * 20,
      delay: r() * 12,
      rotate: r() * 360,
      driftX: (r() - 0.5) * 45,
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
            color: "#991b1b",
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

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    purpose: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const { fname, lname, email, phone, purpose, message } = formData;
    
    // Basic validation
    if (!fname || !email || !phone) {
      alert("Please fill in the required fields (First Name, Email, and Phone).");
      return;
    }

    const phoneNumber = "919791455877";
    const whatsappMessage = `*New Inquiry from Website*%0A%0A*Name:* ${fname} ${lname}%0A*Email:* ${email}%0A*Phone:* ${phone}%0A*Purpose:* ${purpose}%0A*Details:* ${message}`;
    window.location.href = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
  };

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

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#0a0a0a] py-20 lg:py-28"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Background Overlays */}
      <div className="absolute inset-0 bg-[#0a0a0a]/96 z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a] z-0" />
      
      {/* Floating Elements */}
      <FloatingSymbols />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="bg-[#111]/40 backdrop-blur-sm rounded-[2.5rem] border border-red-900/20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col lg:flex-row">
            
            {/* Left Side: Contact Info */}
            <div className="w-full lg:w-5/12 bg-gradient-to-br from-[#1a0101] to-[#0a0a0a] p-10 sm:p-16 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-red-600/10 blur-[80px]"></div>
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px w-8 bg-red-600" />
                  <p className="text-[10px] font-bold tracking-[0.4em] text-red-500 uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    REACH OUT
                  </p>
                </div>

                <h2 className="mb-8 text-white leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 700 }}>
                  Get in <span className="italic text-red-600">Touch</span>
                </h2>

                <p className="mb-14 text-slate-400 max-w-sm leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "17px" }}>
                  Let us help you create a musical experience that resonates long after the final note. Your masterpiece begins with a single conversation.
                </p>
                
                <div className="space-y-10 mt-auto">
                  <div className="flex items-start gap-6 group cursor-pointer">
                    <div className="w-14 h-14 rounded-2xl bg-red-950/20 flex items-center justify-center shrink-0 border border-red-900/30 group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-500 shadow-[0_0_15px_rgba(220,38,38,0.1)] group-hover:shadow-[0_0_25px_rgba(220,38,38,0.3)]">
                      <Phone size={22} className="text-red-500 group-hover:text-white transition-colors duration-500" />
                    </div>
                    <div>
                      <p className="text-[9px] text-red-500/60 uppercase tracking-[0.3em] font-bold mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Call Us</p>
                      <a href="tel:+919791455877" className="text-xl text-slate-100 font-medium hover:text-red-500 transition-colors block" style={{ fontFamily: "'Cormorant Garamond', serif" }}>+91 97914 55877</a>
                      <a href="tel:+919486122022" className="text-xl text-slate-100 font-medium hover:text-red-500 transition-colors block" style={{ fontFamily: "'Cormorant Garamond', serif" }}>+91 94861 22022</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group cursor-pointer">
                    <div className="w-14 h-14 rounded-2xl bg-red-950/20 flex items-center justify-center shrink-0 border border-red-900/30 group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-500 shadow-[0_0_15px_rgba(220,38,38,0.1)] group-hover:shadow-[0_0_25px_rgba(220,38,38,0.3)]">
                      <MapPin size={22} className="text-red-500 group-hover:text-white transition-colors duration-500" />
                    </div>
                    <div>
                      <p className="text-[9px] text-red-500/60 uppercase tracking-[0.3em] font-bold mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Visit Us</p>
                      <p className="text-xl text-slate-100 font-medium leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif" }}>CMS Hall, Gandhi puram<br/>Coimbatore, Tamil Nadu</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-6 group cursor-pointer">
                    <div className="w-14 h-14 rounded-2xl bg-red-950/20 flex items-center justify-center shrink-0 border border-red-900/30 group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-500 shadow-[0_0_15px_rgba(220,38,38,0.1)] group-hover:shadow-[0_0_25px_rgba(220,38,38,0.3)]">
                      <Clock size={22} className="text-red-500 group-hover:text-white transition-colors duration-500" />
                    </div>
                    <div>
                      <p className="text-[9px] text-red-500/60 uppercase tracking-[0.3em] font-bold mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Available</p>
                      <p className="text-xl text-slate-100 font-medium" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Mon - Sat: 9:00 AM - 7:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="w-full lg:w-7/12 p-10 sm:p-16 bg-[#0a0a0a]/40">
              <div className="max-w-xl mx-auto h-full flex flex-col justify-center">
                <h3 className="mb-2 text-white" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", fontWeight: 600 }}>Send an Inquiry</h3>
                <p className="mb-12 text-slate-200" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "16px" }}>Fill out the form below and our team will get back to you promptly.</p>
                
                <form className="space-y-10" onSubmit={handleWhatsAppSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div className="relative group">
                      <input type="text" id="fname" value={formData.fname} onChange={handleChange} className="peer w-full px-0 py-3 border-0 border-b border-slate-800 bg-transparent text-white focus:ring-0 focus:border-red-600 placeholder-transparent transition-all duration-300" placeholder="First Name" />
                      <label htmlFor="fname" className="absolute left-0 -top-3.5 text-[11px] uppercase tracking-widest text-white font-bold transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:text-white/60 peer-placeholder-shown:top-3 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-[11px] peer-focus:text-white cursor-text">First Name</label>
                    </div>
                    <div className="relative group">
                      <input type="text" id="lname" value={formData.lname} onChange={handleChange} className="peer w-full px-0 py-3 border-0 border-b border-slate-800 bg-transparent text-white focus:ring-0 focus:border-red-600 placeholder-transparent transition-all duration-300" placeholder="Last Name" />
                      <label htmlFor="lname" className="absolute left-0 -top-3.5 text-[11px] uppercase tracking-widest text-white font-bold transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:text-white/60 peer-placeholder-shown:top-3 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-[11px] peer-focus:text-white cursor-text">Last Name</label>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div className="relative group">
                      <input type="tel" id="phone" value={formData.phone} onChange={handleChange} className="peer w-full px-0 py-3 border-0 border-b border-slate-800 bg-transparent text-white focus:ring-0 focus:border-red-600 placeholder-transparent transition-all duration-300" placeholder="Phone Number" required />
                      <label htmlFor="phone" className="absolute left-0 -top-3.5 text-[11px] uppercase tracking-widest text-white font-bold transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:text-white/60 peer-placeholder-shown:top-3 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-[11px] peer-focus:text-white cursor-text">Phone Number</label>
                    </div>
                    <div className="relative group">
                      <input type="text" id="purpose" value={formData.purpose} onChange={handleChange} className="peer w-full px-0 py-3 border-0 border-b border-slate-800 bg-transparent text-white focus:ring-0 focus:border-red-600 placeholder-transparent transition-all duration-300" placeholder="Purpose (e.g. Wedding, Concert)" />
                      <label htmlFor="purpose" className="absolute left-0 -top-3.5 text-[11px] uppercase tracking-widest text-white font-bold transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:text-white/60 peer-placeholder-shown:top-3 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-[11px] peer-focus:text-white cursor-text">Purpose of Inquiry</label>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <textarea id="message" rows={3} value={formData.message} onChange={handleChange} className="peer w-full px-0 py-3 border-0 border-b border-slate-800 bg-transparent text-white focus:ring-0 focus:border-red-600 placeholder-transparent transition-all duration-300 resize-none mt-2" placeholder="Event Details"></textarea>
                    <label htmlFor="message" className="absolute left-0 -top-3.5 text-[11px] uppercase tracking-widest text-white font-bold transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:text-white/60 peer-placeholder-shown:top-5 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-[11px] peer-focus:text-white cursor-text">Event Details & Requirements</label>
                  </div>
                  
                  <button
                    type="submit"
                    className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 bg-red-600 text-white text-xs font-bold tracking-[0.3em] uppercase rounded-lg overflow-hidden transition-all duration-500 shadow-[0_10px_30px_rgba(220,38,38,0.2)] hover:shadow-[0_20px_50px_rgba(220,38,38,0.4)]"
                    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Submit Request
                      <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                  </button>
                </form>
              </div>
            </div>
            
          </div>
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

