"use client";

import { useEffect, useState } from 'react';
import { urlFor } from '@/sanity/lib/sanity';
import { sanityFetch } from '@/sanity/lib/live';
import Image from 'next/image';
import Link from 'next/link';
import { Trophy, Calendar, Users } from 'lucide-react';

interface Achievement {
  _id: string;
  title: string;
  event: string;
  date: string;
  slug: { current: string };
  coverImage?: any;
  image?: any;
  teamMembers?: string;
}

export default function AchievementsSection({ limit }: { limit?: number }) {
  const [allAchievements, setAllAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const query = `*[_type == "achievement"] | order(date desc) {
      _id,
      title,
      event,
      date,
      slug,
      coverImage,
      image,
      teamMembers
    }`;

    sanityFetch({ query })
      .then(({ data }) => {
        if (!isMounted) return;
        setAllAchievements(Array.isArray(data) ? (data as Achievement[]) : []);
      })
      .catch(() => {
        if (!isMounted) return;
        setAllAchievements([]);
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const achievements = limit ? allAchievements.slice(0, limit) : allAchievements;
  const showViewMore = limit && allAchievements.length > limit;

  return (
    <section id="achievements" className="min-h-screen px-6 md:px-24 py-24 relative border-t border-white/10 bg-black/40">
       {/* Background Noise/Pattern */}
       <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] pointer-events-none" />

      <div className="text-center mb-16 animate-fade-in opacity-0 [animation-delay:100ms] reveal-on-scroll">
        <h2 className="text-4xl md:text-6xl font-tech text-white mb-4">
          HALL OF FAME
        </h2>
        <div className="h-1 w-32 bg-ers-yellow mx-auto skew-x-[-20deg]" />
      </div>

      <div className="max-w-5xl mx-auto space-y-8 animate-fade-in opacity-0 [animation-delay:300ms] reveal-on-scroll">
        {isLoading && (
          <div className="text-center text-gray-500 font-mono">
            Loading achievements...
          </div>
        )}

        {!isLoading && achievements.length === 0 && (
          <div className="text-center text-gray-500 font-mono">
            No achievements found.
          </div>
        )}

        {achievements.map((item: Achievement) => (
          <Link 
            href={item.slug?.current ? `/achievements/${item.slug.current}` : '#'} 
            key={item._id} 
            className="block group"
          >
            <div className="relative flex flex-col md:flex-row bg-ers-dark border border-white/10 hover:border-ers-yellow/50 transition-all p-6 md:p-8 gap-6 cursor-pointer hover:bg-white/5 overflow-hidden">
               
               {/* Hover Glow */}
               <div className="absolute inset-0 bg-gradient-to-r from-ers-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Trophy Icon Decoration */}
              <div className="absolute -top-3 -left-3 bg-ers-yellow text-black p-2 skew-x-[-10deg] shadow-lg shadow-ers-yellow/20 z-10">
                <Trophy size={20} />
              </div>

              {/* Image */}
              <div className="w-full md:w-1/3 relative h-48 md:h-auto overflow-hidden border border-white/5 min-h-[200px]">
                {(item.coverImage || item.image) && (
                  <Image
                    src={urlFor(item.coverImage || item.image).width(500).url()}
                    alt={item.title}
                    fill
                    className="object-cover transition-all duration-500"
                  />
                )}
              </div>

              {/* Text Content */}
              <div className="flex-1 flex flex-col justify-center relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-ers-yellow font-tech text-xl tracking-wider uppercase">{item.event}</span>
                  <span className="h-px flex-1 bg-white/10"></span>
                  <div className="flex items-center gap-1 text-gray-500 text-xs font-mono">
                    <Calendar size={12} /> {item.date ? new Date(item.date).toLocaleDateString() : ''}
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-tech group-hover:text-ers-yellow transition-colors">{item.title}</h3>

                {item.teamMembers && (
                  <div className="flex items-start gap-2 text-gray-400 text-sm mt-auto bg-black/30 p-3 rounded-sm border border-white/5">
                    <Users size={16} className="mt-1 text-ers-yellow shrink-0" />
                    <div>
                      <span className="block text-xs uppercase text-gray-500 mb-1">Squad</span>
                      {item.teamMembers}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

       {/* View More Button */}
       {showViewMore && (
        <div className="flex justify-center mt-16 animate-fade-in opacity-0 [animation-delay:500ms] reveal-on-scroll">
          <Link href="/achievements" className="group relative px-8 py-3 bg-transparent border border-ers-yellow/50 hover:border-ers-yellow text-ers-yellow font-bold font-tech skew-x-[-10deg] transition-all hover:shadow-[0_0_20px_rgba(244,196,48,0.2)]">
            <span className="block skew-x-[10deg] flex items-center gap-2">
              VIEW HALL OF FAME <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </Link>
        </div>
      )}
    </section>
  );
}
