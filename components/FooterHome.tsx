"use client";

import Link from "next/link";
import { ArrowUpRight, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { RiseLogo } from "@/components/RiseLogo";

const SOCIAL_LINKS = [
  { href: "https://www.facebook.com/riseatseven", icon: Facebook, label: "Facebook" },
  { href: "https://x.com/riseatseven", icon: TwitterX, label: "X" },
  { href: "https://www.linkedin.com/company/riseatseven/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://www.youtube.com/channel/UCAjOP9BgpZPTgae-QT9HGCw", icon: Youtube, label: "YouTube" },
  { href: "https://www.tiktok.com/@riseatseven", icon: TikTokGlyph, label: "TikTok" },
  { href: "https://www.instagram.com/riseatseven/", icon: Instagram, label: "Instagram" },
];

const FOOTER_COLUMNS = [
  {
    links: [
      { label: "Services", href: "/services" },
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
      { label: "Culture", href: "/about" },
      { label: "Meet The Risers", href: "/about" },
    ],
  },
  {
    links: [
      { label: "Testimonials", href: "/work" },
      { label: "Blog & Resources", href: "/blog" },
      { label: "Webinars", href: "/blog" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    links: [
      { label: "Sheffield", href: "/contact" },
      { label: "Manchester", href: "/contact" },
      { label: "London", href: "/contact" },
      { label: "New York", href: "/contact" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function FooterHome() {
  return (
    <footer className="relative z-10 w-full bg-grey-900 px-2 pb-2 text-white">
      <div className="rounded-[2rem] bg-black px-6 py-16 md:px-12 md:py-24 xl:rounded-[3rem]">
        
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-12 lg:gap-x-12">
          
          {/* Newsletter & Socials */}
          <div className="flex flex-col gap-10 lg:col-span-5">
            <h2 className="text-2xl font-medium tracking-tight xl:text-3xl">
              Stay updated with Rise news
            </h2>
            <form className="relative w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="Your Email Address"
                className="h-16 w-full rounded-full bg-grey-900/80 pl-8 pr-20 text-lg text-white outline-none ring-1 ring-white/10 transition-all focus:ring-mint/50"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-mint text-grey-900 transition-transform hover:rotate-45"
              >
                <ArrowUpRight className="size-6" />
              </button>
            </form>

            <div className="flex flex-wrap gap-2.5">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-grey-900 transition-all hover:scale-110"
                >
                  <Icon className="size-4" />
                  <ArrowUpRight className="size-3" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-7 lg:grid-cols-3">
            {FOOTER_COLUMNS.map((col, i) => (
              <div key={i} className="flex flex-col gap-4 border-l border-white/10 pl-6 lg:pl-10">
                <ul className="flex flex-col gap-4">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-lg font-medium tracking-tight transition-colors hover:text-white/60 xl:text-xl"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Large Brand Logo */}
        <div className="mt-24 w-full xl:mt-40">
          <RiseLogo className="w-full fill-white" />
        </div>

        {/* Legal Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 text-[11px] uppercase tracking-wider text-white/40 md:flex-row">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-start">
            <p>© {new Date().getFullYear()} Rise at Seven Ltd.</p>
            <span className="hidden md:block">•</span>
            <p>VAT GB 322402945</p>
            <span className="hidden md:block">•</span>
            <Link href="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
            <span className="hidden md:block">•</span>
            <Link href="/terms" className="transition-colors hover:text-white">Terms</Link>
          </div>
          <p className="font-medium">Site by MadeByShape</p>
        </div>
      </div>
    </footer>
  );
}

function TwitterX(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TikTokGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64v-3.5a6.39 6.39 0 1 0 5.13 6.27V9.43a8.16 8.16 0 0 0 5.98 2.56V8.05a4.85 4.85 0 0 1-1-.36z" />
    </svg>
  );
}
