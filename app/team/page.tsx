"use client";

import { useEffect, useState } from "react";
import { urlFor } from "@/sanity/lib/sanity";
import { sanityFetch } from "@/sanity/lib/live";
import TeamCard from "@/components/TeamCard";

// ================= TYPES =================
interface Member {
  _id: string;
  name: string;
  role: string;
  photo?: any;
  linkedin?: string;
}


// ================= DATA FETCH =================
// ================= PAGE =================
export default function TeamPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const query = `
      *[_type == "teamMember"]{
        _id,
        name,
        role,
        photo,
        linkedin
      } | order(name asc)
    `;

    sanityFetch({ query })
      .then(({ data }) => {
        if (!isMounted) return;
        setMembers(Array.isArray(data) ? (data as Member[]) : []);
      })
      .catch(() => {
        if (!isMounted) return;
        setMembers([]);
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const fics = members.filter((m) => m.role === "FIC");
  const coordinators = members.filter((m) => m.role === "Coordinator");
  const coCoordinators = members.filter((m) => m.role === "Co-Coordinator");
  const allCoordinators = [...coordinators, ...coCoordinators];
  const coreMembers = members.filter((m) => m.role === "Member");

  return (
    <main className="min-h-screen bg-ers-black text-white px-6 md:px-24 py-24 font-body">

      {/* PAGE TITLE */}
      <h1 className="text-5xl md:text-6xl font-tech text-ers-yellow text-center mb-24 tracking-widest animate-fade-in opacity-0 [animation-delay:100ms]">
        OUR TEAM
      </h1>

      {isLoading && (
        <div className="text-center text-gray-500 font-mono">
          Loading team...
        </div>
      )}

      {!isLoading && members.length === 0 && (
        <div className="text-center text-gray-500 font-mono">
          No team members found.
        </div>
      )}

      {/* ================= FACULTY IN-CHARGE ================= */}
      <section className="mb-32 animate-fade-in opacity-0 [animation-delay:300ms]">
        <h2 className="text-3xl font-tech mb-14 border-l-4 border-ers-yellow pl-4">
          FACULTY IN-CHARGE
        </h2>

        <div className="flex flex-wrap gap-8">
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
      </section>


      {/* ================= COORDINATORS ================= */}
      <section className="mb-32 animate-fade-in opacity-0 [animation-delay:500ms]">
        <h2 className="text-3xl font-tech mb-14 border-l-4 border-white pl-4">
          COORDINATORS
        </h2>

        <div className="flex flex-wrap gap-8">
          {allCoordinators.map((coord) => (
            <TeamCard
              key={coord._id}
              name={coord.name}
              role={coord.role}
              imageUrl={coord.photo && urlFor(coord.photo).width(500).url()}
              linkedin={coord.linkedin}
            />

          ))}
        </div>
      </section>

      {/* ================= CORE MEMBERS ================= */}
      <section className="animate-fade-in opacity-0 [animation-delay:700ms]">
        <h2 className="text-2xl font-tech mb-12 text-gray-400">
          CORE MEMBERS
        </h2>

        <div className="flex flex-wrap gap-8">
          {coreMembers.map((mem) => (
            <TeamCard
              key={mem._id}
              name={mem.name}
              role={mem.role}
              imageUrl={mem.photo && urlFor(mem.photo).width(400).url()}
              linkedin={mem.linkedin}
            />

          ))}
        </div>
      </section>

    </main>
  );
}
