import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight } from 'lucide-react';
import { urlFor } from '@/sanity/lib/sanity';

export interface Event {
  _id: string;
  title: string;
  slug: { current: string };
  date: string;
  coverImage: any;
  description: string;
}

export default function EventCard({
  event,
  isUpcoming,
}: {
  event: Event;
  isUpcoming: boolean;
}) {
  const dateObj = new Date(event.date);

  // Check if date is valid
  const isValidDate = !isNaN(dateObj.getTime());
  
  const formattedDate = isValidDate ? dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }) : "TBA";

  const formattedTime = isValidDate ? dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }) : "";

  return (
    <Link href={event.slug?.current ? `/events/${event.slug.current}` : '#'} className="block h-full group relative flex flex-col bg-black overflow-hidden border transition-all duration-300 hover:-translate-y-2">
      <div
        className={`
          relative flex flex-col h-full
          ${isUpcoming
            ? "border border-ers-yellow/40 hover:border-ers-yellow hover:shadow-[0_0_20px_rgba(244,196,48,0.15)]"
            : "border border-white/10 hover:border-white/30"
          }
        `}
      >
        {/* GLOW EFFECT BEHIND */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-ers-yellow/5 to-transparent pointer-events-none z-0" />

        {/* TOP BAR */}
        <div className={`
          absolute top-0 left-0 right-0 h-1 z-20 shadow-[0_0_10px_#f4c430]
          ${isUpcoming ? "bg-ers-yellow" : "bg-gray-600"}
        `} />

        {/* IMAGE */}
        <div className="relative h-64 w-full overflow-hidden border-b border-white/10">
          {event.coverImage ? (
            <Image
              src={urlFor(event.coverImage).width(800).height(500).url()}
              alt={event.title}
              fill
              className={`
                object-cover transition-transform duration-700 ease-out
                ${isUpcoming ? "group-hover:scale-110" : "opacity-80 grayscale group-hover:grayscale-0"}
              `}
            />
          ) : (
            <div className="w-full h-full bg-black flex items-center justify-center">
              <span className="text-gray-600 font-tech tracking-widest">
                NO SIGNAL
              </span>
            </div>
          )}

          {/* SCANLINE OVERLAY */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-40 ml-[1px]" />

          {/* DATE BADGE */}
          <div
            className={`
              absolute top-3 right-0 px-4 py-2 font-tech text-sm font-bold z-20
              skew-x-[-10deg] translate-x-2 shadow-lg
              ${isUpcoming
                ? "bg-ers-yellow text-black"
                : "bg-gray-700 text-gray-300"
              }
            `}
          >
            <div className="skew-x-[10deg]">{formattedDate}</div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 flex flex-col flex-grow relative z-20 bg-black/80 backdrop-blur-sm">
          <h3
            className={`
              text-2xl font-tech mb-3 transition-colors duration-300
              ${isUpcoming ? "text-white group-hover:text-ers-yellow" : "text-gray-400 group-hover:text-white"}
            `}
          >
            {event.title}
          </h3>

          <p className="text-gray-400 text-sm line-clamp-3 mb-6 font-mono leading-relaxed">
            {event.description}
          </p>

          {/* FOOTER */}
          <div className="mt-auto flex items-center justify-between text-sm border-t border-white/10 pt-4 group-hover:border-ers-yellow/30 transition-colors">
            {formattedTime && (
              <div className="flex items-center gap-2 text-gray-500">
                <Clock size={16} className={isUpcoming ? "text-ers-yellow" : "text-gray-600"} />
                <span>{formattedTime}</span>
              </div>
            )}

            {isUpcoming ? (
              <div className="flex items-center gap-2 text-ers-yellow group-hover:translate-x-1 transition-transform font-bold ml-auto">
                DETAILS <ArrowRight size={16} />
              </div>
            ) : (
              <span className="text-gray-500 font-tech tracking-widest ml-auto">
                ARCHIVED
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
