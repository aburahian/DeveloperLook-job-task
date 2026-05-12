"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const RANDOM_HERO_IMAGES = [
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1481481600450-891cc738a02a?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1600",
];

const PLATFORM_LOGOS = [
  { src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400", alt: "Platform 1" },
  { src: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=400", alt: "Platform 2" },
  { src: "https://images.unsplash.com/photo-1611162618071-b39a2ec055ce?auto=format&fit=crop&q=80&w=400", alt: "Platform 3" },
  { src: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&q=80&w=400", alt: "Platform 4" },
];

const ease = [0.33, 1, 0.68, 1] as const;

function StarGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 40"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M16 35C12 35 8 32 6 28C4 24 4 18 6 14M16 35C20 35 24 32 26 28C28 24 28 18 26 14" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M12 32C10 31 8 28 8 28M11 28C8 26 6 22 6 22M10 24C7 22 5 18 5 18M10 20C7 18 5 14 5 14M11 16C8 14 7 11 7 11" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function HeroHome() {
  const heroSrc = RANDOM_HERO_IMAGES[0];

  return (
    <section className="w-full py-0" aria-label="Introduction">
      <div className="w-full px-0">
        <div className="h-screen-fix relative h-svh p-2">
          <div className="absolute bottom-0 left-0 z-30 flex w-full items-end justify-between p-7">
            <div className="hidden flex-shrink-0 | md:inline">
              <p className="mb-0 max-w-md text-pretty text-sm font-medium leading-normal text-white | lg:text-base">
                Organic media planners creating, distributing &amp; optimising
                <br />
                <strong className="font-medium">search-first</strong> content
                for SEO, Social, PR, Ai and LLM search
              </p>
            </div>
            <div className="w-full text-center | md:w-auto md:text-right">
              <p className="mb-0 text-pretty text-sm font-medium leading-normal text-white | lg:text-base">
                <strong className="font-medium">4 Global Offices serving</strong>
                <br />
                <strong className="font-medium">
                  UK, USA (New York) &amp; EU
                </strong>
              </p>
            </div>
          </div>

          <div className="relative h-full w-full overflow-hidden rounded-3xl">
            <motion.div
              className="grid h-full w-full scale-105 bg-grey-900"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 1.4, ease }}
            >
              <div className="relative col-start-1 row-start-1 overflow-hidden blur-sm | lg:blur-md">
                <Image
                  src={heroSrc}
                  alt=""
                  fill
                  priority
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              <div className="relative z-20 col-start-1 row-start-1 flex items-center justify-center bg-grey-900/30">
                <div className="flex flex-col items-center px-4">
                  <motion.div
                    className="mb-5 flex flex-col items-center justify-center"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.35, ease }}
                  >
                    <div className="mb-2 max-w-52 text-center text-xs font-medium uppercase leading-tight tracking-tight text-balance text-white">
                      #1 Most recommended content marketing agency
                    </div>
                    <div className="flex items-center gap-x-2.5">
                      <StarGlyph className="size-8 text-white/90" />
                      <div className="relative flex size-8 items-center justify-center overflow-hidden rounded-md bg-[#0f172a] shadow-lg">
                        <svg viewBox="0 0 24 24" className="size-5 fill-red-600">
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>

                  <motion.h1
                    className="pointer-fine:pr-1 pointer-fine:pb-2 pointer-fine:mt-4 pointer-fine:-mb-3 flex flex-col items-center justify-center text-center text-[clamp(2.5rem,8vw,7rem)] font-medium leading-[0.9] tracking-tight text-white | md:text-[clamp(2.75rem,7vw,6rem)] lg:text-[clamp(3.25rem,6vw,7rem)] xl:text-[clamp(4rem,6.5vw,8.5rem)]"
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: {},
                      show: {
                        transition: {
                          staggerChildren: 0.06,
                          delayChildren: 0.45,
                        },
                      },
                    }}
                  >
                    <span className="pointer-fine:-mt-6 pointer-fine:pb-6 pointer-fine:overflow-hidden flex flex-wrap justify-center overflow-hidden text-center">
                      {["We", "Create"].map((w) => (
                        <motion.span
                          key={w}
                          className="mr-2 inline-block last:mr-0 | pointer-fine:mr-0"
                          variants={{
                            hidden: { y: "100%" },
                            show: {
                              y: 0,
                              transition: { duration: 0.85, ease },
                            },
                          }}
                        >
                          {w}
                        </motion.span>
                      ))}
                    </span>
                    <span className="pointer-fine:-mt-6 pointer-fine:pb-6 pointer-fine:overflow-hidden flex flex-wrap items-center justify-center overflow-hidden text-center">
                      <motion.span
                        className="mr-2 inline-block | pointer-fine:mr-0"
                        variants={{
                          hidden: { y: "100%" },
                          show: {
                            y: 0,
                            transition: { duration: 0.85, ease },
                          },
                        }}
                      >
                        Category
                      </motion.span>
                      <span className="bg-black/5 pointer-fine:mr-0 relative mr-2 inline-flex h-[0.85em] w-[2.8rem] shrink-0 overflow-hidden rounded-sm bg-black/10 sm:w-[3.2rem] md:w-[3.8rem] lg:h-[0.9em] lg:w-[4.5rem]">
                        <Image
                          src={heroSrc}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="120px"
                        />
                      </span>
                      <motion.span
                        className="mr-2 inline-block | pointer-fine:mr-0"
                        variants={{
                          hidden: { y: "100%" },
                          show: {
                            y: 0,
                            transition: { duration: 0.85, ease },
                          },
                        }}
                      >
                        Leaders
                      </motion.span>
                    </span>
                  </motion.h1>

                  <motion.p
                    className="mt-2 text-center text-lg font-medium leading-tight tracking-tight text-white | md:text-xl xl:text-2xl 4xl:text-3xl lg:mt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: 0.85, ease }}
                  >
                    on every searchable platform
                  </motion.p>

                  <div className="relative z-0 mt-12 hidden w-full justify-center gap-x-14 | 3xl:flex">
                    {PLATFORM_LOGOS.slice(0, 3).map((logo) => (
                      <div
                        key={logo.alt}
                        className="relative aspect-[20/9] w-16"
                      >
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          fill
                          className="object-contain object-center"
                          sizes="64px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
