"use client";

import { useEffect, useState } from 'react';
import { urlFor } from '@/sanity/lib/sanity';
import { sanityFetch } from '@/sanity/lib/live';
import Image from 'next/image';
import Link from 'next/link';
import { Github, ExternalLink, Terminal } from 'lucide-react';

export default function ProjectsSection({ limit }: { limit?: number }) {
  const [allProjects, setAllProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const query = `*[_type == "project"] | order(_createdAt desc)`;

    sanityFetch({ query })
      .then(({ data }) => {
        if (!isMounted) return;
        setAllProjects(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!isMounted) return;
        setAllProjects([]);
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const projects = limit ? allProjects.slice(0, limit) : allProjects;
  const showViewMore = limit && allProjects.length > limit;

  return (
    <section id="projects" className="min-h-screen px-6 md:px-20 py-24 relative border-t border-ers-yellow/20">
      <div className="text-center mb-16 animate-fade-in opacity-0 [animation-delay:100ms] reveal-on-scroll">
        <h2 className="text-4xl md:text-6xl font-tech text-transparent bg-clip-text bg-gradient-to-r from-ers-yellow to-white mb-4">
          PROJECT LABS
        </h2>
        <p className="text-gray-400 font-mono text-sm tracking-widest animate-pulse">// INNOVATION_STATUS: ACTIVE</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto animate-fade-in opacity-0 [animation-delay:300ms] reveal-on-scroll">
        {isLoading && (
          <div className="col-span-full text-center text-gray-500 font-mono">
            Loading projects...
          </div>
        )}

        {!isLoading && projects.length === 0 && (
          <div className="col-span-full text-center text-gray-500 font-mono">
            No projects found.
          </div>
        )}

        {projects.map((proj: any) => (
          <div key={proj._id} className="group relative bg-black border border-ers-yellow/20 hover:border-ers-yellow transition-all duration-300 flex flex-col h-full hover:shadow-[0_0_20px_rgba(244,196,48,0.15)] hover:-translate-y-2 overflow-hidden">

            {/* GLOW EFFECT BEHIND */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-ers-yellow/5 to-transparent pointer-events-none z-0" />

            {/* TOP BAR */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-ers-yellow shadow-[0_0_10px_#f4c430] z-20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            {/* Image Header */}
            <div className="relative h-48 w-full overflow-hidden border-b border-white/10">
              {proj.image ? (
                <Image
                  src={urlFor(proj.image).width(600).url()}
                  alt={proj.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-black flex items-center justify-center text-gray-700">
                  <Terminal size={40} />
                </div>
              )}

              {/* SCANLINE OVERLAY */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-40 ml-[1px]" />

              {/* Status Badge */}
              <div className="absolute top-3 right-2 bg-black/90 backdrop-blur text-ers-yellow text-xs font-mono px-2 py-1 border border-ers-yellow/30 z-20">
                {proj.status || 'Prototype'}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow relative z-20">
              <h3 className="text-2xl font-tech text-white mb-2 group-hover:text-ers-yellow transition-colors duration-300">{proj.title}</h3>
              <p className="text-gray-400 text-sm mb-6 flex-grow font-mono line-clamp-3 leading-relaxed">{proj.description}</p>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {proj.techStack?.map((tech: string) => (
                  <span key={tech} className="text-xs font-mono text-ers-yellow bg-ers-yellow/10 px-2 py-1 rounded-sm border border-ers-yellow/20">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Footer Link */}
              {proj.githubLink && (
                <Link href={proj.githubLink} target="_blank" className="mt-auto flex items-center gap-2 text-white hover:text-ers-yellow transition-colors text-sm font-bold border-t border-white/10 pt-4 group-hover:border-ers-yellow/30">
                  <Github size={16} /> VIEW SOURCE CODE <ExternalLink size={12} />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      {showViewMore && (
        <div className="flex justify-center mt-16 animate-fade-in opacity-0 [animation-delay:500ms] reveal-on-scroll">
          <Link href="/project" className="group relative px-8 py-3 bg-transparent border border-ers-yellow/50 hover:border-ers-yellow text-ers-yellow font-bold font-tech skew-x-[-10deg] transition-all hover:shadow-[0_0_20px_rgba(244,196,48,0.2)]">
            <span className="block skew-x-[10deg] flex items-center gap-2">
              VIEW ALL PROJECTS <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </Link>
        </div>
      )}
    </section>
  );
}
