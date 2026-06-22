import sr1 from "../../assets/img/sr1.jpeg";
import sr2 from "../../assets/img/sr2.jpeg";
import sr12 from "../../assets/img/sr12.jpeg";
import sr11 from "../../assets/img/sr11.jpeg";
import sr6 from "../../assets/img/sr6.jpeg";
import sr10 from "../../assets/img/sr10.jpeg";
import sr8 from "../../assets/img/sr8.jpeg";
import sr9 from "../../assets/img/sr9.jpeg";
import dir1 from "../../assets/img/dr1.jpeg";
import dir2 from "../../assets/img/dr2.jpeg";

export default function Artists() {
  const artists = [
    { img: sr2, name: "Aadya prajeesh", role: "Singer" },
    // { img: sr3, name: "Sreekumar", role: "Singer" },
    { img: sr1, name: "Mayalakshmi", role: "Singer" },
    { img: sr9, name: "Vishnu", role: "Singer" },
    { img: sr12, name: "Jestin", role: "Singer" },
    { img: sr11, name: "Reji sadanandan", role: "Singer" },
    { img: sr6, name: "Chithra shobhana", role: "Singer" },
    { img: sr10, name: "Rema narayanankutty", role: "Singer" },
    { img: sr8, name: "Sreedevi  thiruvizha", role: "Singer" },

  ];



  const directors = [
    { img: dir1, role: "Programme Director", name: "Sreekumar ", designation: "Founder" },
    { img: dir2, role: "Orchestra Director", name: "Gopal sarma  ", },
  ]
  // duplicate for seamless loop
  const loopArtists = [...artists, ...artists];

  return (
    <section className="mb-10 bg-[#0a0a0a] overflow-hidden">

      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-[fadeIn_1s_ease-out_forwards]">
          <h2 className="text-red-500 font-bold tracking-widest uppercase text-sm mb-4">The Musicians</h2>
          <h1 className="text-4xl md:text-6xl font-bold text-white font-serif mb-6 leading-tight">
            Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-400">Artistry</span> behind the scenes
          </h1>
          <p className="text-lg md:text-xl text-slate-200 font-serif leading-relaxed italic">
            "The true beauty of music is that it connects people. It carries a message, and we, the musicians, are the messengers." — Roy Ayers
          </p>
        </div>
      </main>

      <div className="flex justify-center items-center gap-10 w-full mb-16">
        {directors.map((d, i) => (
          <div
            key={i}
            className="flex flex-col items-center"
          >
            <div className="w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-red-900/10 hover:scale-110 transition duration-500">
              <img
                src={d.img}
                alt={d.role}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-4 text-center">
              <h3 className="text-sm md:text-base font-bold uppercase text-white min-h-[1.5rem]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {d.name || "\u00A0"}
              </h3>
              <p className="text-[10px] md:text-xs tracking-widest uppercase text-red-500 font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {d.role}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Marquee */}
      <div className="relative w-full overflow-hidden">



        <div className="flex gap-10 animate-marquee w-max">

          {loopArtists.map((a, i) => (
            <div
              key={i}
              className="flex flex-col items-center min-w-[120px] md:min-w-[180px]"
            >
              <div className="w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-red-900/10 hover:scale-110 transition duration-500 bg-[#111]">
                <img
                  src={a.img}
                  alt={a.role}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-4 text-center">
                <h4 className="text-xs md:text-sm font-bold uppercase text-white min-h-[1.2rem]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {a.name || "\u00A0"}
                </h4>
                <p className="text-[9px] md:text-[10px] tracking-widest uppercase text-slate-400" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {a.role}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
