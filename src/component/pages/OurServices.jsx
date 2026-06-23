import React from "react";
import { motion } from "framer-motion";
import {
  Music2,
  Drum,
  Mic2,
  Sparkles,
  Radio,
  Guitar,
} from "lucide-react";
import img from '../../assets/attachments/img.png'
export default function OurServices() {
  const services = [
    {
      icon: <Music2 className="w-7 h-7" />,
      title: "Tamil Light Music Orchestra",
      desc: "High-energy live orchestra performances featuring timeless Tamil melodies, Ilaiyaraaja classics, A.R. Rahman hits, melody medleys, and modern stage entertainment for grand audiences.",
      image:
        "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=2000&auto=format&fit=crop",
      accent: "from-red-600 via-red-500 to-rose-500",
    },
    {
      icon: <Drum className="w-7 h-7" />,
      title: "Cine Instrumental Melodies",
      desc: "Immersive instrumental experiences featuring flute, violin, and symphonic arrangements of timeless Tamil film hits and cinematic masterpieces.",
      image:
        "https://t4.ftcdn.net/jpg/13/45/68/81/360_F_1345688111_Rm653ETF3zQzfsMpsTx8qfv55N4YwMCU.jpg",
      accent: "from-rose-600 via-red-500 to-red-400",
    },
    {
      icon: <Mic2 className="w-7 h-7" />,
      title: "Wedding Orchestra Shows",
      desc: "Luxury live orchestra entertainment for weddings and receptions with romantic melodies, cinematic performances, devotional music, and vibrant celebration energy.",
      image:[img],
      accent: "from-red-500 via-rose-400 to-red-600",
    },
    {
      icon: <Sparkles className="w-7 h-7" />,
      title: "Temple & Cultural Events",
      desc: "Grand orchestral music for temple festivals and cultural programs featuring Cine Devotional hits, spiritual melodies, and vibrant light music arrangements.",
      image:
        "https://media.gettyimages.com/id/693046396/photo/mumbai-india-classical-music-kishori-amonkar-performs-at-ncpa.jpg?s=612x612&w=0&k=20&c=kNSkB2P1P42CmpEnZWOfK9a9YjhfPIoFOkD1ureOKsM=",
      accent: "from-red-700 via-red-600 to-rose-600",
    },
    {
      icon: <Radio className="w-7 h-7" />,
      title: "Live Stage & Sound Setup",
      desc: "Professional concert stage production including premium sound systems, LED walls, live audio mixing, dynamic lighting, and immersive orchestra stage experiences.",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000&auto=format&fit=crop",
      accent: "from-rose-500 via-red-500 to-red-700",
    },
    {
      icon: <Guitar className="w-7 h-7" />,
      title: "Celebrity Tribute Concerts",
      desc: "Emotionally powerful tribute concerts dedicated to legendary Indian music composers and singers with live orchestration, vocals, and cinematic stage atmosphere.",
      image:
        "https://media.gettyimages.com/id/2059625132/photo/new-delhi-india-crowds-enjoy-the-performance-of-singer-javed-ali-during-a-concert-organized.jpg?s=612x612&w=0&k=20&c=Y8mQqSzxciant02p97mYacNU7BCzywTgfNVv73Dv77w=",
      accent: "from-red-600 via-rose-500 to-red-500",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-28 px-6 md:px-14">
      {/* Luxury Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-rose-900/10 rounded-full blur-[120px] opacity-40" />
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-red-950/10 rounded-full blur-[120px] opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-24"
        >
          <span 
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-red-950/20 border border-red-500/20 shadow-lg text-[10px] font-bold uppercase tracking-[0.3em] text-red-500"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Premium Orchestra Services
          </span>

          <h2 
            className="mt-8 text-5xl md:text-7xl font-black leading-[0.95] text-white"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Grand Indian
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-rose-500">
              Musical Experiences
            </span>
          </h2>

          <p 
            className="max-w-3xl mx-auto mt-8 text-lg md:text-xl leading-relaxed text-slate-100 font-medium"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Bringing together the soul of Indian music and the energy of live
            orchestra performances for weddings, temple festivals, cultural
            celebrations, and luxury stage events across Tamil Nadu.
          </p>
        </motion.div>

        {/* SERVICES */}
       <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
  {services.map((service, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: i * 0.1 }}
      className="
        group relative overflow-hidden rounded-[2.5rem]
        border border-red-400/25

        /* BRIGHTER RED BACKGROUND */
        bg-gradient-to-br
        from-[#4a0505]
        via-[#3a0404]
        to-[#240202]

        shadow-[0_12px_45px_rgba(0,0,0,0.35)]
        hover:-translate-y-3
        hover:shadow-[0_25px_70px_rgba(239,68,68,0.28)]
        transition-all duration-700
      "
    >
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(248,113,113,0.22),transparent_45%)] pointer-events-none" />

      {/* Soft Inner Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-400/5 to-transparent pointer-events-none" />

      {/* Image */}
      <div className="relative h-[320px] overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2500ms]"
        />

        {/* Rich Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#240202] via-[#240202]/30 to-transparent" />

        {/* Red Tint */}
        <div className="absolute inset-0 bg-red-700/10 mix-blend-screen" />

        {/* Icon */}
        <div
          className={`
            absolute top-6 left-6
            w-16 h-16 rounded-2xl
            bg-gradient-to-br ${service.accent}
            flex items-center justify-center
            text-white
            shadow-[0_0_35px_rgba(248,113,113,0.35)]
            backdrop-blur-md
            border border-white/10
          `}
        >
          {service.icon}
        </div>

        {/* Floating Shine */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/15 via-transparent to-transparent transition-opacity duration-700" />
      </div>

      {/* Content */}
      <div className="relative p-8">
        {/* Accent Divider */}
        <div
          className={`
            w-20 h-[3px] rounded-full
            bg-gradient-to-r ${service.accent}
            mb-6
            shadow-[0_0_20px_rgba(248,113,113,0.45)]
          `}
        />

        {/* Title */}
        <h3
          className="text-2xl font-bold text-[#fff7f7] mb-5 leading-snug tracking-wide"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p
          className="text-slate-200 leading-relaxed text-[16px] font-medium"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {service.desc}
        </p>

        {/* Bottom Glow Line */}
        <div
          className={`
            absolute bottom-0 left-0
            h-[4px] w-0 group-hover:w-full
            bg-gradient-to-r ${service.accent}
            transition-all duration-700
            shadow-[0_0_20px_rgba(248,113,113,0.45)]
          `}
        />
      </div>

      {/* Decorative Glow */}
      <div className="absolute -bottom-16 -right-16 w-44 h-44 bg-red-400/15 blur-3xl rounded-full group-hover:bg-red-400/25 transition-all duration-700" />
    </motion.div>
  ))}
</div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mt-24 overflow-hidden rounded-[3rem] bg-[#0f0f0f] border border-red-900/20 shadow-[0_10px_50px_rgba(220,38,38,0.1)]"
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-950/20 via-transparent to-red-900/20" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 px-10 md:px-16 py-14">
            <div>
              <span 
                className="text-red-500 uppercase tracking-[0.25em] text-sm font-semibold"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Tamil Nadu’s Premium Orchestra Team
              </span>

              <h3 
                className="text-4xl md:text-5xl font-black text-white mt-4 leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Creating Magical
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">
                  Indian Music Moments
                </span>
              </h3>
            </div>

            <button 
              className="group relative overflow-hidden px-10 py-5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-lg shadow-[0_10px_40px_rgba(220,38,38,0.3)] hover:scale-105 transition-all duration-500"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              <span className="relative z-10">Book Your Orchestra</span>

              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}