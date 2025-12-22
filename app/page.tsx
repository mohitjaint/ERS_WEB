import Link from "next/link";
import HeroRobot from "@/components/HeroRobot";
import { client, urlFor } from "@/sanity/lib/sanity";
import Image from "next/image";

async function getGalleryImages() {
  const query = `
    *[_type == "gallery" && defined(images)]{
      images
    }
  `;
  const collections = await client.fetch(query);
  return collections.flatMap((c: any) => c.images || []);
}


/* -------------------------------
   Page Component (Server)
--------------------------------*/

export default async function Home() {
  const images = await getGalleryImages();

  return (
    <main className="min-h-screen bg-ers-black text-white selection:bg-ers-yellow selection:text-black font-body">

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden border-b border-ers-yellow/30">
        <div className="absolute inset-0 bg-gradient-to-br from-ers-dark via-black to-black opacity-90" />

        <div className="relative w-full grid min-h-[80vh] grid-cols-1 md:grid-cols-2 gap-8 px-6 py-20 items-center">

          {/* LEFT: ROBOT */}
          <div className="relative flex items-center justify-center overflow-visible order-2 md:order-1">

            {/* Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <div className="w-72 h-56 md:w-90 md:h-70 bg-ers-yellow/20 rounded-full blur-3xl -translate-x-20" />
            </div>

            {/* Canvas */}
            <div className="relative h-[60vh] md:h-[70vh] w-full z-10">
              <HeroRobot />
            </div>
          </div>

          {/* RIGHT: TEXT */}
          <div className="flex flex-col justify-center text-left md:pl-12 order-1 md:order-2">
            <h1 className="font-tech text-5xl md:text-7xl font-bold tracking-[0.12em] text-transparent bg-clip-text bg-gradient-to-r from-ers-yellow via-white to-ers-yellow drop-shadow-[0_0_18px_rgba(244,196,48,0.45)]">
              ERS CLUB
            </h1>

            <p className="mt-6 max-w-xl text-lg md:text-xl text-[#c8c8c8]">
              Industrial cyberpunk hub for makers, coders, and circuit-smiths.
              Building the future one solder joint at a time.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/events" className="px-8 py-3 bg-ers-yellow text-black font-bold font-tech skew-x-[-10deg] hover:bg-white transition-colors">
                <span className="block skew-x-[10deg]">VIEW EVENTS</span>
              </Link>

              <Link href="/team" className="px-8 py-3 border border-ers-yellow text-ers-yellow font-bold font-tech skew-x-[-10deg] hover:bg-ers-yellow/10 transition-colors">
                <span className="block skew-x-[10deg]">MEET THE TEAM</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GALLERY SECTION ================= */}
      <section className="px-4 md:px-8 py-24">
        {/* Title */}
        <h2 className="text-center font-tech text-3xl md:text-4xl tracking-widest text-ers-yellow mb-16">
          SIGNAL ARCHIVE
        </h2>

        {/* Collage */}
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4">
          {images.map((img: any, index: number) => (
            <div
              key={img._key || index}
              className="mb-4 break-inside-avoid group relative overflow-hidden bg-black border border-white/5"
            >
              <Image
                src={urlFor(img).width(600).url()}
                alt="ERS Gallery"
                width={600}
                height={800}
                className="
                  w-full h-auto object-cover
                  grayscale opacity-80
                  transition-all duration-500
                  group-hover:grayscale-0
                  group-hover:opacity-100
                  group-hover:scale-[1.03]
                "
              />
              <div className="absolute inset-0 pointer-events-none border border-ers-yellow/0 group-hover:border-ers-yellow/60 transition-colors" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
