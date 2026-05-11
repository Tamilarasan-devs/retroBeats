import React, { useState } from 'react';
import evn1 from '../../assets/img/event.jpeg';
import evn2 from '../../assets/img/event1.jpeg';
import logo from '../../assets/img/logo.jpeg'
export default function CommingSoon() {
  const [selectedImage, setSelectedImage] = useState(null);

  const events = [
    {
      img: evn1,
      
    },
    {
      img: evn2,
    
    }
  ];

  return (
    <>
      <section 
        className="relative min-h-screen flex items-center justify-center py-20 px-6 bg-[#0a0a0a] overflow-hidden"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Subtle Background Pattern/Glow */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-900/10 rounded-full mix-blend-multiply filter blur-[120px] pointer-events-none"
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-950/10 rounded-full mix-blend-multiply filter blur-[100px] pointer-events-none"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 relative z-20 w-full max-w-6xl mx-auto">
          {/* Top Left: Logo */}
          <div className="flex items-center justify-center p-8 bg-[#111] rounded-3xl shadow-lg border border-white/5 hover:shadow-xl transition-shadow duration-300 min-h-[300px] lg:min-h-[400px]">
            <img 
              src={logo} 
              alt="logo" 
              className="w-full max-w-sm h-auto object-contain rounded-xl" 
            />
          </div>

          {/* Top Right: Content */}
          <div className="flex flex-col justify-center p-8 lg:p-12 bg-[#111] rounded-3xl shadow-lg border border-white/5 hover:shadow-xl transition-shadow duration-300 min-h-[300px] lg:min-h-[400px]">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Coming Soon
            </h2>
            <div className="mt-6 h-1 w-20 bg-red-600 rounded-full" />
            <p className="mt-6 text-slate-400 text-lg md:text-xl leading-relaxed">
              We are preparing something extraordinary. Check back soon for our upcoming spectacular events and exclusive performances.
            </p>
          </div>

          {/* Bottom Left: First Image */}
          {events[0] && (
            <div 
              className="group relative bg-[#111] rounded-3xl overflow-hidden flex flex-col shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/5 h-full cursor-pointer"
              onClick={() => setSelectedImage(events[0].img)}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img 
                src={events[0].img} 
                alt="Event 1" 
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          )}

          {/* Bottom Right: Second Image */}
          {events[1] && (
            <div 
              className="group relative bg-[#111] rounded-3xl overflow-hidden flex flex-col shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/5 h-full cursor-pointer"
              onClick={() => setSelectedImage(events[1].img)}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img 
                src={events[1].img} 
                alt="Event 2" 
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          )}
        </div>
      </section>

      {/* Full Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex justify-center items-center">
            {/* Close button */}
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 sm:-right-12 text-white/70 hover:text-white transition-colors p-2 text-3xl"
              aria-label="Close"
            >
              &times;
            </button>
            <img 
              src={selectedImage} 
              alt="Event full size" 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl bg-[#111] p-2"
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        </div>
      )}
    </>
  );
}
