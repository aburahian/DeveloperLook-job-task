"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { RiseLogo } from "@/components/RiseLogo";
import { SplitTextButton } from "@/components/SplitTextButton";
import { useHeaderChrome } from "@/contexts/HeaderChromeContext";
import { cn } from "@/lib/cn";

const MEGA_SERVICES = [
  { label: "Search & Growth Strategy", href: "/services" },
  { label: "Onsite SEO", href: "/services" },
  { label: "Content Experience", href: "/services" },
  { label: "Organic Social & Content", href: "/services" },
  { label: "Digital PR", href: "/services" },
  { label: "Data & Insights", href: "/services" },
];

type NavItem = {
  label: string;
  href: string;
  mega: number | false;
  badge?: string;
};

const NAV: NavItem[] = [
  { label: "Services", href: "/services", mega: 102 },
  { label: "Industries", href: "/services", mega: 23929 },
  { label: "International", href: "/international", mega: 103 },
  { label: "About", href: "/about", mega: 16913 },
  { label: "Work", href: "/work", mega: false, badge: "25" },
  { label: "Careers", href: "/careers", mega: false },
  { label: "Blog", href: "/blog", mega: 106 },
];

const MOBILE_NAV = [
  { 
    label: "Services", 
    href: "/services", 
    sub: [
      { label: "Digital PR", href: "/services" },
      { label: "Search & Growth Strategy", href: "/services" },
      { label: "Social", href: "/services" },
      { label: "Content Experience", href: "/services" },
      { label: "Data & Insights", href: "/services" },
      { label: "Onsite SEO", href: "/services" },
    ]
  },
  { 
    label: "Industries", 
    href: "/services",
    sub: [
      { label: "B2B Marketing", href: "/services" },
      { label: "Retail", href: "/services" },
      { label: "Travel", href: "/services" },
    ]
  },
  { label: "International", href: "/international", sub: [] },
  { label: "About", href: "/about", sub: [] },
  { label: "Work", href: "/work", badge: "25" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
];

export function Header() {
  const { forceHideHeader } = useHeaderChrome();
  const [y, setY] = useState(0);
  const [dir, setDir] = useState<"up" | "down">("up");
  const lastY = useRef(0);

  const [megaId, setMegaId] = useState<number | false>(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [hoverNav, setHoverNav] = useState(false);

  const megaA = useRef<HTMLDivElement>(null);
  const megaB = useRef<HTMLDivElement>(null);
  const prevMegaDims = useRef<{ w: number; h: number } | null>(null);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const cur = window.scrollY;
      setDir(cur > lastY.current ? "down" : "up");
      lastY.current = cur;
      setY(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = () => setMegaId(false);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, []);

  useEffect(() => {
    if (megaId || mobileOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [megaId, mobileOpen]);

  useEffect(() => {
    if (megaId === false) {
      prevMegaDims.current = null;
      return;
    }
    const activeEl =
      megaId === 102 || megaId === 23929
        ? megaA.current
        : megaId === 103 || megaId === 16913 || megaId === 106
          ? megaB.current
          : null;
    if (!activeEl) return;

    const id = window.requestAnimationFrame(() => {
      const rect = activeEl.getBoundingClientRect();
      const nw = Math.max(rect.width, 1);
      const nh = Math.max(rect.height, 1);
      const from = prevMegaDims.current;
      if (from && from.w > 0 && from.h > 0) {
        gsap.fromTo(
          activeEl,
          {
            transformOrigin: "top center",
            scaleX: from.w / nw,
            scaleY: from.h / nh,
            opacity: 1,
          },
          {
            scaleX: 1,
            scaleY: 1,
            duration: 0.4,
            ease: "power4.out",
          },
        );
      }
      prevMegaDims.current = { w: nw, h: nh };
    });
    return () => window.cancelAnimationFrame(id);
  }, [megaId]);

  const hideAnnouncement = y > 20;
  const atTop = y <= 100;
  const hideHeader =
    dir === "down" && y > 100 && !hoverNav && !megaId && !mobileOpen;
  const headerHidden = hideHeader || forceHideHeader;

  const megaPrimary = megaId === 102 || megaId === 23929;
  const megaSecondary =
    megaId === 103 || megaId === 16913 || megaId === 106;

  return (
    <>
      <div
        className={cn(
          "w-full px-2.5 pt-2.5 transition-opacity",
          mobileOpen && "pointer-events-none opacity-0",
        )}
      >
        <Link
          href="/category-leaderboard"
          className="group flex w-full items-center justify-center rounded-2xl bg-mint py-2 px-5 text-center text-xs font-semibold leading-none tracking-tight text-grey-900 transition-[border-radius] duration-300 | lg:text-sm pointer-fine:hover:rounded-md"
        >
          <span className="mt-0.5 block | lg:hidden">
            🚨 The Category Leaderboard - Live Now
          </span>
          <span className="relative mt-0.5 hidden overflow-hidden | lg:block">
            <span className="pointer-fine:group-hover:-translate-y-6 block transition-transform duration-300">
              🚨 The Category Leaderboard - Live Now
            </span>
            <span className="pointer-fine:group-hover:translate-y-0 absolute left-0 top-0 block translate-y-6 transition-transform duration-300">
              🚨 The Category Leaderboard - Live Now
            </span>
          </span>
        </Link>
      </div>

      <header
        className={cn(
          "fixed left-0 top-0 z-50 flex h-[4.5rem] w-full transition-transform duration-700 | lg:h-[5.5rem] lg:p-3",
          headerHidden && "-translate-y-full",
        )}
      >
        <div
          className={cn(
            "fixed inset-0 z-50 p-2 transition-opacity duration-500 | lg:hidden",
            mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
          
          <motion.div
            initial={false}
            animate={mobileOpen ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex h-full w-full flex-col overflow-hidden rounded-[2rem] bg-grey-900/90 p-4 pt-16 shadow-2xl"
          >
            {/* Mobile Header Top */}
            <div className="absolute left-0 top-0 flex w-full items-center justify-between px-6 py-4">
              <Link href="/" className="w-32 text-white">
                <RiseLogo />
              </Link>
              <button
                type="button"
                className="inline-flex h-8 w-12 items-center justify-center text-white"
                onClick={() => setMobileOpen(false)}
              >
                <MobileBurger open light />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="custom-scrollbar flex-1 overflow-y-auto px-2 pt-4 pb-20">
              <nav className="flex flex-col">
                {MOBILE_NAV.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={mobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: mobileOpen ? 0.1 + i * 0.05 : 0, duration: 0.5 }}
                    className="border-b border-white/10"
                  >
                    <div className="flex items-center justify-between py-4">
                      <Link
                        href={item.href}
                        className="text-4xl font-medium tracking-tight text-white"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                      {item.sub && item.sub.length > 0 && (
                        <button
                          onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20"
                        >
                          <span className={cn("text-white transition-transform duration-300", expanded === item.label ? "rotate-180" : "rotate-0")}>
                            <ArrowUpRight className="size-4 rotate-90" />
                          </span>
                        </button>
                      )}
                    </div>
                    
                    {/* Sub-menu Accordion */}
                    {item.sub && item.sub.length > 0 && expanded === item.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="overflow-hidden pb-4"
                      >
                        <ul className="flex flex-col gap-3 pl-2">
                          {item.sub.map((sub) => (
                            <li key={sub.label}>
                              <Link
                                href={sub.href}
                                className="text-xl text-white/60"
                                onClick={() => setMobileOpen(false)}
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Menu Footer */}
              <div className="mt-12 flex flex-col gap-12 px-2 pb-12">
                <Link
                  href="/contact"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-5 text-lg font-medium text-grey-900 shadow-xl"
                >
                  Get in Touch
                  <ArrowUpRight className="size-5" />
                </Link>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-white/40">Offices</p>
                    <ul className="flex flex-col gap-1 text-lg font-medium text-white">
                      <li>SHEFFIELD <span className="text-xs text-white/40">(HQ)</span></li>
                      <li>LONDON</li>
                      <li>MANCHESTER</li>
                      <li>NEW YORK</li>
                    </ul>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-white/40">Social</p>
                    <ul className="flex flex-col gap-1 text-lg font-medium text-white">
                      <li>INSTAGRAM</li>
                      <li>LINKEDIN</li>
                      <li>TIKTOK</li>
                      <li>X</li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col gap-4 border-t border-white/10 pt-12">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/40">Our Mission</p>
                  <h3 className="text-3xl font-medium leading-none tracking-tight text-white">
                    We Create Category Leaders on every searchable platform
                  </h3>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div
          className={cn(
            "pointer-events-none fixed inset-0 z-40 transition-all duration-500",
            megaId ? "pointer-events-auto backdrop-blur-lg" : "",
          )}
          aria-hidden
          onMouseDown={() => setMegaId(false)}
        />

        <div
          className={cn(
            "relative z-50 flex w-full max-w-[100vw] items-center justify-between px-4 transition-transform duration-500 | lg:mx-auto lg:rounded-full lg:px-3",
            hideAnnouncement ? "translate-y-0" : "translate-y-12",
            !atTop ? "bg-white/60 backdrop-blur-lg" : "",
          )}
          onMouseLeave={() => {
            setHoverNav(false);
            setMegaId(false);
          }}
        >
          <Link
            href="/"
            className={cn(
              "ml-2 flex w-32 shrink-0 | md:w-40",
              atTop && !megaId ? "text-white" : "text-grey-900",
            )}
          >
            <span className="aspect-[4/3] w-full text-current">
              <RiseLogo />
            </span>
          </Link>

          <nav
            className="relative ml-6 hidden min-w-0 flex-1 items-center justify-center gap-0 | lg:flex"
            onMouseEnter={() => setHoverNav(true)}
          >
            {NAV.map((item) => (
              <div key={item.label} className="relative shrink-0">
                <Link
                  href={item.href}
                  className={cn(
                    "group relative inline-flex items-center px-3 py-1 text-sm font-medium tracking-tight transition-colors duration-300 | xl:px-4",
                    atTop && megaId !== item.mega
                      ? "text-white"
                      : "text-grey-900",
                    item.mega &&
                      megaId === item.mega &&
                      "text-grey-900",
                  )}
                  onMouseEnter={() => {
                    if (item.mega) setMegaId(item.mega);
                    else setMegaId(false);
                  }}
                >
                  {item.label}
                  {item.mega !== false && (
                    <span className="ml-0.5 hidden | pointer-fine:inline">
                      +
                    </span>
                  )}
                  {item.badge && (
                    <span className="pointer-fine:group-hover:-translate-y-4 absolute -right-2 -top-2 hidden translate-y-[-0.35rem] rounded-full bg-mint px-1.5 py-0.5 text-[0.625rem] font-normal leading-none text-grey-900 transition-transform | pointer-fine:inline-flex">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </div>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 | lg:gap-3">
            <Link
              href="/connect-with-us"
              className={cn(
                "group hidden items-center justify-center overflow-hidden rounded-3xl px-5 py-2.5 text-sm font-medium capitalize tracking-tight ring-1 transition-[border-radius] duration-300 | lg:inline-flex xl:px-6 xl:py-3 xl:text-base pointer-fine:hover:rounded-xl",
                "bg-grey-900 text-white ring-grey-900/10",
              )}
            >
              <SplitTextButton reverse>Get in touch</SplitTextButton>
            </Link>

            <div className="lg:hidden">
              <button
                type="button"
                className="inline-flex h-8 w-12 items-center justify-center"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen((o) => !o)}
              >
                <MobileBurger open={mobileOpen} light={atTop && !mobileOpen} />
              </button>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "pointer-events-none fixed left-1/2 z-[60] hidden -translate-x-1/2 -translate-y-4 opacity-0 transition-all duration-300 | pointer-fine:block",
            "top-20 lg:top-24",
            megaPrimary && !headerHidden && "pointer-events-auto translate-y-0 opacity-100",
          )}
          onMouseEnter={() => setHoverNav(true)}
          onMouseLeave={() => setMegaId(false)}
        >
          <div
            ref={megaA}
            className={cn(
              "rounded-3xl bg-white shadow-2xl transition-opacity duration-200",
              megaPrimary && !headerHidden ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <div className="flex gap-x-12 px-10 py-7 | xl:px-12 xl:py-8">
              <div>
                <p className="mb-5 text-base font-medium text-grey-300">
                  {megaId === 23929 ? "Industries" : "Core Services"}
                </p>
                <ul className="flex max-h-[50vh] flex-col gap-y-1 overflow-y-auto">
                  {MEGA_SERVICES.map((s) => (
                    <li key={s.label}>
                      <Link
                        href={s.href}
                        className="group relative inline-block h-8 overflow-hidden text-lg font-medium text-grey-900 | xl:text-xl"
                      >
                        <span className="pointer-fine:group-hover:-translate-y-8 block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
                          {s.label}
                        </span>
                        <span className="pointer-fine:group-hover:translate-y-0 absolute left-0 top-0 block translate-y-8 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
                          {s.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "pointer-events-none fixed left-1/2 z-[60] hidden -translate-x-1/2 -translate-y-4 opacity-0 transition-all duration-300 | pointer-fine:block",
            "top-20 lg:top-24",
            megaSecondary && !headerHidden && "pointer-events-auto translate-y-0 opacity-100",
          )}
          onMouseEnter={() => setHoverNav(true)}
          onMouseLeave={() => setMegaId(false)}
        >
          <div
            ref={megaB}
            className={cn(
              "min-w-[280px] rounded-3xl bg-white px-10 py-7 shadow-2xl transition-opacity duration-200 | xl:px-12 xl:py-8",
              megaSecondary && !headerHidden ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            {megaId === 103 && (
              <div>
                <p className="mb-3 text-xl font-medium text-grey-900">
                  International
                </p>
                <div className="flex flex-col gap-2 text-lg font-medium">
                  <Link href="/international" className="text-grey-900">
                    US Digital PR
                  </Link>
                  <Link href="/international" className="text-grey-900">
                    EU &amp; Global
                  </Link>
                </div>
              </div>
            )}
            {(megaId === 16913 || megaId === 106) && (
              <div>
                <p className="mb-3 text-xl font-medium text-grey-900">
                  {megaId === 16913 ? "About" : "Blog & Resources"}
                </p>
                <div className="flex flex-col gap-2 text-lg font-medium">
                  <Link href="/about">About Rise at Seven</Link>
                  <Link href="/meet-the-team">Meet The Risers</Link>
                  {megaId === 106 && (
                    <>
                      <Link href="/blog">Blog</Link>
                      <Link href="/category-leaderboard">Category Leaderboard</Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

function MobileBurger({ open, light }: { open: boolean; light?: boolean }) {
  const bar = light ? "bg-white" : "bg-grey-900";
  return (
    <div className="flex h-2 w-5 flex-col items-start justify-between">
      <div
        className={cn(
          "relative -top-px h-px w-full transition-transform duration-500",
          open ? "translate-y-1 rotate-45" : "rotate-0",
        )}
      >
        <div className={cn("h-0.5 w-full", bar)} />
      </div>
      <div
        className={cn(
          "h-px w-full transition-transform duration-500",
          open ? "-translate-y-1 -rotate-45" : "rotate-0",
        )}
      >
        <div className={cn("h-0.5 w-full", bar)} />
      </div>
    </div>
  );
}
