"use client";

import Link from "next/link";
import { logoFont } from "@/app/fonts/logoFont";
import { Github, Instagram, Linkedin, Mail, MapPin } from "lucide-react";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Team", href: "/team" },
  { name: "Projects", href: "/project" },
  { name: "Achievements", href: "/achievements" },
  { name: "Studio", href: "/studio" },
];

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/ers_iiitdmj?igsh=Y3UyZGxpanAzM3hq", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/robotics-electronics-club-iiitdmj/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/parthdude07/ERS_WEB", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t-4 border-ers-yellow text-white pt-16 pb-8">
      <div className="px-6 md:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center md:text-left">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex flex-col leading-none">
              <div
                className={`
                  text-white
                  font-semibold
                  text-5xl
                  ${logoFont.className}
                `}
              >
                ERS
              </div>
              <span className="text-ers-yellow font-body text-base tracking-widest mt-2">
                Electronics & Robotics Society
              </span>
            </div>
            <p className="text-gray-400 font-body text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
              Innovating the future through electronics and robotics. Join us in building the next generation of technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:text-center">
            <h3 className="font-display text-xl font-bold mb-6 text-ers-yellow uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3 font-body text-sm tracking-wide">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-ers-yellow transition-colors duration-200 flex items-center justify-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-ers-yellow rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="md:text-right">
            <h3 className="font-display text-xl font-bold mb-6 text-ers-yellow uppercase tracking-wider">
              Connect With Us
            </h3>
            <div className="space-y-5 font-body text-sm text-gray-300">
              <a href="mailto:ers@iiitdmj.ac.in" className="flex items-start md:justify-end gap-3 hover:text-ers-yellow transition-colors duration-200">
                <Mail className="w-5 h-5 text-ers-yellow flex-shrink-0 mt-0.5" />
                <span>ers@iiitdmj.ac.in</span>
              </a>
              <div className="flex md:justify-end gap-3">
                <MapPin className="w-5 h-5 text-ers-yellow flex-shrink-0 mt-0.5" />
                <div className="space-y-1 leading-snug">
                  <p>IIITDM Jabalpur</p>
                  <p className="text-xs text-gray-400">Dumna Airport Road</p>
                  <p className="text-xs text-gray-400">Jabalpur - 482 005</p>
                  <p className="text-xs text-gray-400">Madhya Pradesh, India</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center md:justify-end gap-3 mt-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-ers-yellow/40 bg-white/5 flex items-center justify-center hover:bg-ers-yellow hover:text-black hover:border-ers-yellow transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-xs text-gray-500">
          <p>© {new Date().getFullYear()} ERS Club. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-ers-yellow transition-colors duration-200">Privacy Policy</Link>
            <Link href="#" className="hover:text-ers-yellow transition-colors duration-200">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
