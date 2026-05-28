import Link from "next/link";
import HeroRobot from "@/components/HeroRobot";
import ProjectsSection from "@/components/ProjectsSection";
import EventsSection from "@/components/EventsSection";
import AchievementsSection from "@/components/AchievementsSection";
import TeamSection from "@/components/TeamSection";
import GallerySection from "@/components/GallerySection";

/* -------------------------------
   Page Component (Server)
--------------------------------*/

export default async function Home() {
  return (
    <main className="min-h-screen bg-ers-black text-white selection:bg-ers-yellow selection:text-black font-body">


      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden border-b border-ers-yellow/30 min-h-[100dvh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-ers-dark via-black to-black opacity-90" />

        {/* Animated Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(244,196,48,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,196,48,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem] md:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="relative w-full grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 px-6 pt-24 pb-12 md:py-20 items-center max-w-7xl mx-auto h-full">

          {/* LEFT: ROBOT (Mobile: Bottom, Desktop: Left) */}
          <div className="relative hidden md:flex items-center justify-center overflow-visible order-2 md:order-1 animate-fade-in [animation-delay:200ms] opacity-0 md:h-[80vh] w-full">

            {/* Glow */}
            <div className="absolute inset-x-0 bottom-0 md:inset-0 flex items-center justify-center pointer-events-none z-0">
              <div className="w-48 h-48 md:w-[500px] md:h-[500px] bg-ers-yellow/10 rounded-full blur-[60px] md:blur-[100px] md:-translate-x-10 translate-y-10 md:translate-y-0" />
            </div>

            {/* Canvas */}
            <div className="relative h-full w-full md:w-[120%] md:-ml-[10%] z-10 transition-transform duration-700 hover:scale-[1.02]">
              <HeroRobot />
            </div>
          </div>

          {/* RIGHT: TEXT (Mobile: Top, Desktop: Right) */}
          <div className="flex flex-col justify-center text-center md:text-left md:pl-12 order-1 md:order-2 z-20 mt-4 md:mt-0">

            <h1 className="font-tech text-6xl min-[400px]:text-7xl md:text-8xl font-bold tracking-[0.05em] leading-[0.9] text-transparent bg-clip-text bg-gradient-to-br from-ers-yellow via-white to-ers-yellow drop-shadow-[0_0_25px_rgba(244,196,48,0.3)] animate-fade-in [animation-delay:100ms] opacity-0">
             ERS
            </h1>

            <p className="mt-4 md:mt-6 max-w-xl text-base md:text-xl text-[#c8c8c8] font-light leading-relaxed animate-fade-in [animation-delay:300ms] opacity-0 mx-auto md:mx-0">
              Industrial cyberpunk hub for makers, coders, and circuit-smiths.
              Building the future one solder joint at a time.
            </p>

            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 md:gap-6 animate-fade-in [animation-delay:500ms] opacity-0 justify-center md:justify-start w-full sm:w-auto">
              <Link href="#events" className="group relative px-6 md:px-8 py-3 bg-ers-yellow text-black font-bold font-tech skew-x-[-10deg] hover:bg-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(244,196,48,0.6)] text-center">
                <span className="block skew-x-[10deg]">VIEW EVENTS</span>
                <div className="absolute inset-0 border border-white opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
              </Link>

              <Link href="#team" className="group relative px-6 md:px-8 py-3 border border-ers-yellow text-ers-yellow font-bold font-tech skew-x-[-10deg] hover:bg-ers-yellow/10 transition-colors text-center">
                <span className="block skew-x-[10deg]">MEET THE TEAM</span>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-ers-yellow group-hover:w-full transition-all duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTIONS ================= */}
      {/* 4. Gallery Section */}
      <GallerySection />
      {/* 1. Projects Section */}
      <ProjectsSection limit={3} />

      {/* 2. Events Section */}
      <EventsSection limit={3} />

      {/* 3. Achievements Section */}
      <AchievementsSection limit={3} />

      {/* 5. Team Section */}
      <TeamSection limit={6} />

    </main>
  );
}
