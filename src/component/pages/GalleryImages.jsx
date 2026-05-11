import React, { useState, useEffect } from 'react';
import "../../App.css";

// Fallback images (your original local images)
import img1 from '../../assets/attachments/1.jpg';
import img2 from '../../assets/attachments/2.jpg';
import img3 from '../../assets/attachments/3.jpg';
import img4 from '../../assets/attachments/4.jpg';
import img5 from '../../assets/attachments/5.jpg';
import img6 from '../../assets/attachments/6.jpg';
import img7 from '../../assets/attachments/7.jpg';
import img8 from '../../assets/attachments/8.jpg';
import img9 from '../../assets/attachments/9.jpg';

export default function GalleryImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

  const fetchImages = async () => {
    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const tag = 'retrobest-gallery';
      
      const response = await fetch(`https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`);
      
      if (response.ok) {
        const data = await response.json();
        const remoteImages = data.resources.map(res => ({
          url: `https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto,w_1200,c_limit/v${res.version}/${res.public_id}.${res.format}`,
          isRemote: true
        }));
        
        if (remoteImages.length > 0) {
          setImages(remoteImages);
        } else {
          setImages(fallbackImages.map(url => ({ url, isRemote: false })));
        }
      } else {
        setImages(fallbackImages.map(url => ({ url, isRemote: false })));
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      setImages(fallbackImages.map(url => ({ url, isRemote: false })));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-[#0a0a0a]">
        <div className="w-12 h-12 border-4 border-red-900/30 border-t-red-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-4 md:px-8 lg:px-12">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <p className="text-red-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 animate-pulse">Our Collection</p>
        <h1 className="text-5xl md:text-7xl font-bold text-white font-serif mb-6">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-400">Visual</span> Journey
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-transparent mx-auto mb-8 rounded-full"></div>
        <p className="text-slate-400 font-serif text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Explore our handcrafted instruments and captured moments through the lens of Retro Beats.
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 max-w-[1400px] mx-auto">
        {images.map((item, i) => (
          <div
            key={`image-${i}`}
            className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-[#111] border border-white/5 shadow-2xl hover:border-red-500/30 transition-all duration-500"
          >
            {/* Image Wrapper */}
            <div className="relative overflow-hidden cursor-zoom-in">
              <img
                src={item.url}
                alt={`gallery-img-${i}`}
                className="w-full h-auto object-contain transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                loading="lazy"
              />
              
              {/* Premium Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-red-500 text-xs font-bold tracking-widest uppercase mb-2 block">Retro Beats Gallery</span>
                  <div className="w-8 h-[2px] bg-red-600 mb-2"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative background element */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10 opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-900/10 blur-[150px] rounded-full"></div>
      </div>
    </main>
  );
}