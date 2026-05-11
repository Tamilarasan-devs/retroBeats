import React from 'react';

export default function Gallery() {
const images = [
  "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg", // tabla style
  "https://images.pexels.com/photos/210854/pexels-photo-210854.jpeg", // classical instrument
  "https://images.pexels.com/photos/164743/pexels-photo-164743.jpeg", // strings
  "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg", // flute vibe
  "https://images.pexels.com/photos/462510/pexels-photo-462510.jpeg", // performance
  "https://images.pexels.com/photos/290660/pexels-photo-290660.jpeg"  // concert
];

  return (
    <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-red-500 font-bold tracking-widest uppercase text-sm mb-4">
          Portfolio
        </h2>

        <h1 className="text-4xl md:text-6xl font-bold text-white font-serif mb-6 leading-tight">
          Indian <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-400">Classical</span> Gallery
        </h1>

        <p className="text-lg md:text-xl text-slate-400 font-serif leading-relaxed">
          Experience timeless Indian instruments — tabla, veena, sitar, mridangam and more.
        </p>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 max-w-6xl mx-auto">
        {images.map((src, idx) => (
          <div key={idx} className="break-inside-avoid relative group rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 bg-[#111] border border-red-900/10">
            
            <img 
              src={src} 
              alt={`Indian Instrument ${idx + 1}`} 
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-6">
              <span className="text-white text-xl font-serif">
                Indian Classical Instrument
              </span>
            </div>

          </div>
        ))}
      </div>

    </main>
  );
}