import React, { useState, useEffect, useRef } from 'react';
import "../../App.css";

// Fallback images
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

  const scrollRef = useRef(null);

  const fallbackImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

  const fetchImages = async () => {
    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const tag = 'retrobest-gallery';

      const response = await fetch(
        `https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`
      );

      if (response.ok) {
        const data = await response.json();

        const remoteImages = data.resources.map((res) => ({
          url: `https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto,w_800/v${res.version}/${res.public_id}.${res.format}`,
          isRemote: true,
        }));

        setImages(
          remoteImages.length > 0
            ? remoteImages
            : fallbackImages.map((url) => ({ url, isRemote: false }))
        );
      } else {
        setImages(fallbackImages.map((url) => ({ url, isRemote: false })));
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      setImages(fallbackImages.map((url) => ({ url, isRemote: false })));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Auto Scroll
  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    const scrollSpeed = 1;

    const autoScroll = () => {
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth
      ) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += scrollSpeed;
      }
    };

    const interval = setInterval(autoScroll, 20);

    return () => clearInterval(interval);
  }, [images]);

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center bg-[#0a0a0a]">
        <div className="w-10 h-10 border-4 border-red-900/30 border-t-red-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="bg-[#0a0a0a] py-10 px-4 overflow-hidden">

      {/* Auto Scroll Gallery */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {[...images, ...images].map((item, i) => (
          <div
            key={i}
            className="group relative min-w-[180px] sm:min-w-[220px] md:min-w-[260px] rounded-xl overflow-hidden bg-[#111] border border-white/5 hover:border-red-500/30 transition-all duration-500 flex-shrink-0"
          >
            <img
              src={item.url}
              alt={`gallery-${i}`}
              loading="lazy"
              className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.03]"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end">
              <div className="p-3">
                <span className="text-red-500 text-[10px] tracking-[2px] uppercase font-semibold">
                  Retro Beats
                </span>

                <div className="w-8 h-[2px] bg-red-600 mt-1"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}