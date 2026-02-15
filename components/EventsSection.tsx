import Link from 'next/link';
import { sanityFetch } from "@/sanity/lib/live";
import EventCard, { Event } from "./EventCard";

async function getEvents() {
  const query = `*[_type == "event"] | order(date desc) {
    _id,
    title,
    slug,
    date,
    coverImage,
    description
  }`;
  const { data } = await sanityFetch({ query });
  return data;
}

export default async function EventsSection({ limit }: { limit?: number }) {
  const allEvents: Event[] = await getEvents();

  const now = new Date();
  const upcomingEvents = allEvents.filter((event) => new Date(event.date) >= now);
  const pastEvents = allEvents.filter((event) => new Date(event.date) < now);

  // Apply limits if provided
  // If limit is provided, we can split it or apply it to total. 
  // Let's create a combined view or prioritize upcoming.
  // Strategy: If limit is 3, show up to 3 upcoming. If < 3 upcoming, fill with past?
  // Or just limit each section to 'limit'. 
  // Let's limit total items shown.
  
  const shownUpcoming = limit ? upcomingEvents.slice(0, limit) : upcomingEvents;
  // If we show upcoming, we might not want to show past if limit is small (like on home).
  // But usually "Events" section shows both.
  // Let's limit EACH subsection to 'limit' if provided, BUT if total exceeds limit, show view all button.
  // Wait, if I limit both to 3, I show 6 items. 
  // Let's limit upcoming to 'limit' and past to 'limit'.
  
  const shownPast = limit ? pastEvents.slice(0, limit) : pastEvents;
  const showViewMore = limit && (upcomingEvents.length > limit || pastEvents.length > limit);

  return (
    <section id="events" className="min-h-screen relative px-8 md:px-24 py-24 border-t border-ers-yellow/20">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col items-center mb-16 text-center animate-fade-in opacity-0 [animation-delay:100ms] reveal-on-scroll">
        <h2 className="text-4xl md:text-6xl font-tech text-transparent bg-clip-text bg-gradient-to-r from-ers-yellow to-white mb-4">
          CLUB EVENTS
        </h2>
        <div className="h-1 w-32 bg-ers-yellow skew-x-[-20deg]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-24">
        {/* --- UPCOMING EVENTS SECTION --- */}
        {shownUpcoming.length > 0 && (
          <div className="animate-fade-in opacity-0 [animation-delay:300ms] reveal-on-scroll">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-3 h-8 bg-ers-yellow" />
              <h3 className="text-2xl md:text-3xl font-tech tracking-wide text-white">
                INCOMING SIGNALS <span className="text-ers-yellow text-lg animate-pulse ml-2">(UPCOMING)</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {shownUpcoming.map((event) => (
                <EventCard key={event._id} event={event} isUpcoming={true} />
              ))}
            </div>
          </div>
        )}

        {/* --- PAST EVENTS SECTION --- */}
        {shownPast.length > 0 && (
          <div className="animate-fade-in opacity-0 [animation-delay:500ms] reveal-on-scroll">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-3 h-8 bg-gray-600" />
              <h3 className="text-2xl md:text-3xl font-tech tracking-wide text-gray-400">
                ARCHIVED LOGS <span className="text-gray-600 text-lg ml-2">(PAST)</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {shownPast.map((event) => (
                <EventCard key={event._id} event={event} isUpcoming={false} />
              ))}
            </div>
          </div>
        )}
      </div>

       {/* View More Button */}
       {showViewMore && (
        <div className="flex justify-center mt-16 animate-fade-in opacity-0 [animation-delay:500ms] reveal-on-scroll">
          <Link href="/events" className="group relative px-8 py-3 bg-transparent border border-ers-yellow/50 hover:border-ers-yellow text-ers-yellow font-bold font-tech skew-x-[-10deg] transition-all hover:shadow-[0_0_20px_rgba(244,196,48,0.2)]">
            <span className="block skew-x-[10deg] flex items-center gap-2">
              VIEW ALL EVENTS <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </Link>
        </div>
      )}
    </section>
  );
}
