import React, { useEffect, useRef, useState } from "react";


// Fallback Images
import img1 from "../../assets/attachments/1.jpg";
import img2 from "../../assets/attachments/2.jpg";
import img3 from "../../assets/attachments/3.jpg";
import img4 from "../../assets/attachments/4.jpg";
import img5 from "../../assets/attachments/5.jpg";
import img6 from "../../assets/attachments/6.jpg";
import img7 from "../../assets/attachments/7.jpg";
import img8 from "../../assets/attachments/8.jpg";
import img9 from "../../assets/attachments/9.jpg";

export default function GalleryImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef(null);

  const fallbackImages = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
  ];

  // ================= FETCH IMAGES =================
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const tag = "retrobest-gallery";

        const response = await fetch(
          `https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`
        );

        if (response.ok) {
          const data = await response.json();

          const remoteImages = data.resources.map((res) => ({
            url: `https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto,w_800/v${res.version}/${res.public_id}.${res.format}`,
          }));

          setImages(
            remoteImages.length > 0
              ? remoteImages
              : fallbackImages.map((url) => ({ url }))
          );
        } else {
          setImages(fallbackImages.map((url) => ({ url })));
        }
      } catch (error) {
        console.error(error);
        setImages(fallbackImages.map((url) => ({ url })));
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // ================= SCROLL LOGIC (AUTO & MANUAL) =================
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || images.length === 0) return;

    let animationFrame;
    let isPaused = false;
    let isDragging = false;
    let startX;
    let scrollLeft;
    let resumeTimeout;

    const speed = 0.8; // Pixels per frame

    // 1. Infinite Wrap Logic
    const handleInfiniteWrap = () => {
      const halfWidth = container.scrollWidth / 2;
      if (container.scrollLeft >= halfWidth) {
        container.scrollLeft -= halfWidth;
        if (isDragging) scrollLeft -= halfWidth;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft += halfWidth;
        if (isDragging) scrollLeft += halfWidth;
      }
    };

    // 2. Auto Scroll Function
    const autoScroll = () => {
      if (!isPaused && !isDragging) {
        container.scrollLeft += speed;
        handleInfiniteWrap();
      }
      animationFrame = requestAnimationFrame(autoScroll);
    };

    // 3. Manual Drag Handlers
    const startDragging = (e) => {
      isDragging = true;
      isPaused = true;
      startX = (e.pageX || e.touches[0].pageX) - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      container.style.cursor = "grabbing";
      container.style.userSelect = "none";
    };

    const stopDragging = () => {
      isDragging = false;
      container.style.cursor = "grab";
      container.style.userSelect = "auto";
      
      // Delay resuming auto-scroll
      clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => {
        isPaused = false;
      }, 2000);
    };

    const moveDragging = (e) => {
      if (!isDragging) return;
      const x = (e.pageX || e.touches[0].pageX) - container.offsetLeft;
      const walk = (x - startX) * 1.5; // Drag speed multiplier
      container.scrollLeft = scrollLeft - walk;
      handleInfiniteWrap();
    };

    // 4. Listeners
    container.addEventListener("mousedown", startDragging);
    container.addEventListener("touchstart", startDragging, { passive: true });

    window.addEventListener("mousemove", moveDragging);
    window.addEventListener("touchmove", moveDragging, { passive: true });

    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchend", stopDragging);

    // Pause on hover
    const onEnter = () => { isPaused = true; };
    const onLeave = () => { if (!isDragging) isPaused = false; };

    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);

    // Start animation
    animationFrame = requestAnimationFrame(autoScroll);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(resumeTimeout);
      container.removeEventListener("mousedown", startDragging);
      container.removeEventListener("touchstart", startDragging);
      window.removeEventListener("mousemove", moveDragging);
      window.removeEventListener("touchmove", moveDragging);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchend", stopDragging);
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, [images]);

  // ================= LOADER =================
  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center bg-[#0a0a0a]">
        <div className="w-10 h-10 border-4 border-red-900/30 border-t-red-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="bg-[#0a0a0a] py-8 sm:py-10 px-3 sm:px-4 overflow-hidden">

      {/* Gallery */}
      <div
        ref={scrollRef}
        className="
          flex
          gap-3
          sm:gap-4
          overflow-x-auto
          scrollbar-hide
          w-full
          cursor-grab
        "
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        {[...images, ...images].map((item, index) => (
          <div
            key={index}
            className="
              group
              relative
              min-w-[160px]
              sm:min-w-[220px]
              md:min-w-[260px]
              lg:min-w-[300px]
              rounded-xl
              overflow-hidden
              bg-[#111]
              border
              border-white/5
              hover:border-red-500/30
              transition-all
              duration-500
              flex-shrink-0
            "
          >
            <img
              src={item.url}
              alt={`gallery-${index}`}
              loading="lazy"
              draggable="false"
              className="
                w-full
                h-[220px]
                sm:h-[280px]
                md:h-[320px]
                object-cover
                transition-transform
                duration-700
                group-hover:scale-[1.03]
                select-none
              "
            />

            {/* Overlay */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/70
                via-transparent
                to-transparent
                opacity-0
                group-hover:opacity-100
                transition
                duration-500
                flex
                items-end
              "
            >
              <div className="p-3">
                <span className="text-red-500 text-[10px] sm:text-xs tracking-[2px] uppercase font-semibold">
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