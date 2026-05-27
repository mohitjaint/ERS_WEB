"use client";

import { useEffect, useState } from "react";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/sanity";
import Image from "next/image";

export default function GallerySection() {
  const [images, setImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const query = `
      *[_type == "gallery" && defined(images)]{
        images
      }
    `;

    sanityFetch({ query })
      .then(({ data: collections }) => {
        if (!isMounted) return;
        const items = Array.isArray(collections)
          ? collections.flatMap((c: any) => c.images || [])
          : [];
        setImages(items);
      })
      .catch(() => {
        if (!isMounted) return;
        setImages([]);
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <section id="gallery" className="px-6 md:px-24 py-24 border-t border-white/10 bg-black">
        <div className="text-center text-gray-500 font-mono">Loading gallery...</div>
      </section>
    );
  }

  if (images.length === 0) return null;

  return (
    <section id="gallery" className="px-6 md:px-24 py-24 border-t border-white/10 bg-black">
      {/* Title */}
      <div className="flex flex-col items-center mb-16 animate-fade-in opacity-0 [animation-delay:100ms] reveal-on-scroll">
        <h2 className="text-center font-tech text-4xl md:text-6xl tracking-widest text-ers-yellow drop-shadow-[0_0_10px_rgba(244,196,48,0.3)]">
          EVENTS GALLERY
        </h2>
        <div className="h-1 w-24 bg-ers-yellow mt-4 rounded-full shadow-[0_0_10px_#f4c430]" />
      </div>

      {/* Collage */}
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 animate-fade-in opacity-0 [animation-delay:300ms] reveal-on-scroll">
        {images.map((img: any, index: number) => (
          <div
            key={img._key || index}
            className="
              mb-4 break-inside-avoid group relative overflow-hidden bg-black border border-white/10
              transition-transform duration-500 hover:-translate-y-2 hover:z-10 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]
            "
          >
            <Image
              src={urlFor(img).width(600).url()}
              alt="ERS Gallery"
              width={600}
              height={800}
              className="
                w-full h-auto object-cover
                opacity-90
                transition-all duration-700 ease-out
                group-hover:opacity-100
                group-hover:scale-110
              "
            />
            {/* Overlay Gradient on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="absolute inset-0 pointer-events-none border-2 border-ers-yellow/0 group-hover:border-ers-yellow/50 transition-colors duration-300" />
          </div>
        ))}
      </div>
    </section>
  );
}
