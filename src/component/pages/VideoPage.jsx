import React from "react";

export default function VideoPage() {
    const videos = [
        "https://res.cloudinary.com/dizbpr8pc/video/upload/v1782361425/8_u5byjg.mp4",
        "https://res.cloudinary.com/dizbpr8pc/video/upload/v1782361394/WhatsApp_Video_2026-06-22_at_21.45.04_ahwyl3.mp4",
        "https://res.cloudinary.com/dizbpr8pc/video/upload/v1782361373/WhatsApp_Video_2026-06-23_at_08.18.09_arpqqb.mp4",
        "https://res.cloudinary.com/dizbpr8pc/video/upload/v1782361367/WhatsApp_Video_2026-06-23_at_08.29.22_kaiflg.mp4",
        "https://res.cloudinary.com/dizbpr8pc/video/upload/v1782361325/WhatsApp_Video_2026-06-23_at_08.55.49_dgdzas.mp4",
    ];

    return (
        <div className="min-h-screen bg-gray-950 text-white p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-2">
                    Video Gallery
                </h1>
                <p className="text-center text-gray-400 mb-10">
                    Watch and enjoy the latest videos
                </p>

                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {videos.map((video, index) => (
                        <div
                            key={index}
                            className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-2"
                        >
                            <video
                                controls
                                className="w-full h-64 object-cover bg-black"
                                preload="metadata"
                            >
                                <source src={video} type="video/mp4" />
                            </video>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}