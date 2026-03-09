import type { Metadata } from "next";
import { JetBrains_Mono, Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer";
import PopupNotification from "@/components/PopupNotification";
import { client } from "@/sanity/lib/sanity";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

const display = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const body = Rajdhani({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://ers-pcte.vercel.app'),
  title: {
    default: "ERS | Electronics & Robotics Society",
    template: "%s | ERS"
  },
  description: "Electronics & Robotics Society (ERS) - The industrial cyberpunk hub for makers, coders, and circuit-smiths. Building the future one solder joint at a time.",
  keywords: ["Robotics", "Electronics", "IoT", "Coding", "Engineering", "Club", "Society", "Projects", "Workshops", "Hackathons"],
  authors: [{ name: "ERS Team" }],
  creator: "ERS",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "ERS | Electronics & Robotics Society",
    description: "Industrial cyberpunk hub for makers, coders, and circuit-smiths.",
    siteName: "ERS",
    images: [
      {
        url: "/og-image.jpg", // Ensure you have an og-image.jpg in public folder
        width: 1200,
        height: 630,
        alt: "ERS - Electronics & Robotics Society",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ERS | Electronics & Robotics Society",
    description: "Industrial cyberpunk hub for makers, coders, and circuit-smiths.",
    images: ["/og-image.jpg"],
    creator: "@ers_club", 
  },
  icons: {
    icon: "/logo1.png",
    shortcut: "/logo1.png",
    apple: "/logo1.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

async function getPopup() {
  // Fetch the latest active popup
  // We fetch a bit more than needed to let the client handle the exact date logic
  // or we could filter here. For now, fetching the latest active one is good.
  const query = `*[_type == "popup" && isActive == true] | order(date desc)[0] {
    ...,
    button1,
    button2
  }`;
  const { data } = await sanityFetch({ query });
  return data;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const popup = await getPopup();

  return (
    <html lang="en" >
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} antialiased circuit-bg`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ERS",
              "url": "https://ers-pcte.vercel.app",
              "logo": "https://ers-pcte.vercel.app/logo1.png",
              "sameAs": [
                "https://www.instagram.com/ers_club",
                "https://www.linkedin.com/company/ers-club"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "",
                "contactType": "customer service"
              }
            })
          }}
        />
        <Navbar />
        <PopupNotification popup={popup} />
        <SanityLive />
        {children}
        <Footer />
      </body>
    </html>
  );
}
