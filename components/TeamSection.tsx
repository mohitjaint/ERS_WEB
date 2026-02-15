import { client, urlFor } from "@/sanity/lib/sanity";
import TeamCard from "@/components/TeamCard";
import Link from 'next/link';
import { Users } from 'lucide-react';

// ================= TYPES =================
interface Member {
  _id: string;
  name: string;
  role: string;
  photo?: any;
  linkedin?: string;
}

// ================= DATA FETCH =================
async function getTeam(): Promise<Member[]> {
  const query = `
    *[_type == "teamMember"]{
      _id,
      name,
      role,
      photo,
      linkedin
    } | order(name asc)
  `;
  return await client.fetch(query);
}

export default async function TeamSection({ limit }: { limit?: number }) {
  const members = await getTeam();

  const fics = members.filter((m) => m.role === "FIC");
  const coordinators = members.filter((m) => m.role === "Coordinator");
  const coCoordinators = members.filter((m) => m.role === "Co-Coordinator");
  const allCoordinators = [...coordinators, ...coCoordinators];
  const coreMembers = members.filter((m) => m.role === "Member");

  // If limited, show up to 'limit' coordinators and 'limit' members.
  // Actually, usually headers show limited view implies leaders.
  const displayedCoordinators = limit ? allCoordinators.slice(0, limit) : allCoordinators;
  const displayedCore = limit ? coreMembers.slice(0, limit) : coreMembers;
  
  const showViewMore = limit && (allCoordinators.length > limit || coreMembers.length > limit);

  return (
    <section id="team" className="min-h-screen px-6 md:px-24 py-24 border-t border-white/10 bg-black/80">
      
      {/* PAGE TITLE */}
      <div className="text-center mb-24 animate-fade-in opacity-0 [animation-delay:100ms] reveal-on-scroll">
        <h2 className="text-4xl md:text-6xl font-tech text-ers-yellow tracking-widest mb-4">
          OUR TEAM
        </h2>
        <p className="text-gray-500 font-mono">The minds behind the machines.</p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* ================= FACULTY IN-CHARGE ================= */}
        {fics.length > 0 && (
          <div className="mb-32 animate-fade-in opacity-0 [animation-delay:300ms] reveal-on-scroll">
            <h3 className="text-2xl font-tech mb-14 border-l-4 border-ers-yellow pl-4 text-white">
              FACULTY IN-CHARGE
            </h3>

            <div className="flex flex-wrap gap-8 justify-center md:justify-start">
              {fics.map((fic) => (
                <TeamCard
                  key={fic._id}
                  name={fic.name}
                  role="Faculty In-Charge"
                  imageUrl={fic.photo && urlFor(fic.photo).width(600).url()}
                  linkedin={fic.linkedin}
                />
              ))}
            </div>
          </div>
        )}

        {/* ================= COORDINATORS ================= */}
        {displayedCoordinators.length > 0 && (
          <div className="mb-32 animate-fade-in opacity-0 [animation-delay:500ms] reveal-on-scroll">
            <h3 className="text-2xl font-tech mb-14 border-l-4 border-white pl-4 text-white">
              LEADERSHIP & COORDINATORS
            </h3>

            <div className="flex flex-wrap gap-8 justify-center md:justify-start">
              {displayedCoordinators.map((coord) => (
                <TeamCard
                  key={coord._id}
                  name={coord.name}
                  role={coord.role}
                  imageUrl={coord.photo && urlFor(coord.photo).width(500).url()}
                  linkedin={coord.linkedin}
                />

              ))}
            </div>
          </div>
        )}

        {/* ================= CORE MEMBERS ================= */}
        {displayedCore.length > 0 && (
          <div className="animate-fade-in opacity-0 [animation-delay:700ms] reveal-on-scroll">
            <h3 className="text-xl font-tech mb-12 text-gray-400">
              CORE MEMBERS
            </h3>

            <div className="flex flex-wrap gap-8 justify-center md:justify-start">
              {displayedCore.map((mem) => (
                <TeamCard
                  key={mem._id}
                  name={mem.name}
                  role={mem.role}
                  imageUrl={mem.photo && urlFor(mem.photo).width(400).url()}
                  linkedin={mem.linkedin}
                />
              ))}
            </div>
          </div>
        )}

        {/* View More Button */}
        {showViewMore && (
          <div className="flex justify-center mt-24 animate-fade-in opacity-0 [animation-delay:800ms] reveal-on-scroll">
            <Link href="/team" className="group relative px-8 py-3 bg-transparent border border-ers-yellow/50 hover:border-ers-yellow text-ers-yellow font-bold font-tech skew-x-[-10deg] transition-all hover:shadow-[0_0_20px_rgba(244,196,48,0.2)]">
              <span className="block skew-x-[10deg] flex items-center gap-2">
                MEET THE FULL TEAM <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
