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
      viewBox="0 0 28 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M25.826 36.2423C24.1628 35.2302 22.3284 34.9354 20.4357 34.7259C19.6852 34.6204 18.9236 34.4691 18.193 34.2705C17.3545 34.0474 16.5347 33.7576 15.7419 33.4062L16.4438 31.9431C17.2169 30.332 16.5375 28.3991 14.9263 27.6261L14.0759 29.3985C13.5361 30.5234 13.7046 31.805 14.4037 32.7394C13.3196 32.1373 12.3026 31.4146 11.3802 30.5845L12.6328 29.1752C13.8199 27.8396 13.6998 25.7945 12.364 24.6072L11.0579 26.0765C10.0602 27.199 9.98609 28.8225 10.7806 30.0168C10.6575 29.8939 10.5358 29.7692 10.4166 29.6422C9.49052 28.6654 8.6932 27.5814 8.02681 26.4223L9.41226 25.5441C10.9217 24.5875 11.3698 22.5885 10.4131 21.0791L8.75281 22.1315C7.7684 22.7554 7.23555 23.8229 7.24942 24.9087C6.7712 23.8595 6.39118 22.7641 6.11088 21.6429L7.61991 21.1998C9.33444 20.6962 10.3162 18.8982 9.81266 17.1835L7.92644 17.7374C6.85358 18.0523 6.06774 18.8744 5.75319 19.8655C5.57825 18.727 5.50281 17.5732 5.52904 16.4239L7.2633 16.4128C9.05024 16.4013 10.4897 14.9435 10.4782 13.1565L8.5124 13.1691C7.23035 13.1773 6.12736 13.93 5.61055 15.0146C5.73 13.7312 5.98818 12.4645 6.37211 11.2376L8.06062 11.7101C9.78144 12.1916 11.5669 11.1871 12.0486 9.46623L10.1554 8.93641C8.90673 8.58696 7.62424 9.02009 6.83038 9.94142C7.30904 8.72939 7.91213 7.56635 8.62664 6.47593L10.1355 7.40528C11.6568 8.34265 13.6501 7.86898 14.5873 6.3476L12.9135 5.31658C11.788 4.62331 10.4045 4.70222 9.38126 5.40589C9.87033 4.76053 10.4008 4.14639 10.9692 3.56888C11.3054 3.84679 11.7648 3.98423 12.2801 3.86023C12.6898 3.7616 13.1 3.57083 13.4724 3.24067C15.26 1.65751 15.26 0.0708753 15.26 0.0708753C13.0683 -0.225683 11.698 0.452629 10.855 1.28334C10.1931 1.93542 10.3013 2.86694 10.8194 3.42667C10.0988 4.13143 9.44456 4.88605 8.85752 5.68142C9.29 4.30204 8.75303 2.75334 7.46577 1.96057L5.792 0.929551C4.85463 2.45093 5.3283 4.44425 6.84968 5.3814L8.39642 6.33437C7.60321 7.51085 6.94961 8.76602 6.43887 10.0721C6.32463 8.76906 5.42108 7.61187 4.087 7.23857L2.19384 6.70876C1.71237 8.42958 2.71694 10.215 4.43776 10.6967L6.05409 11.1491C5.63353 12.4429 5.34824 13.7772 5.2004 15.1264C4.69182 13.9916 3.54916 13.2042 2.22571 13.2127L0.259922 13.2252C0.271412 15.0122 1.72927 16.4516 3.51621 16.4401L5.10068 16.4299C5.03933 17.8386 5.12691 19.2542 5.36667 20.6479C4.57671 19.6171 3.20665 19.1237 1.88601 19.5115L0 20.0652C0.503586 21.7797 2.30158 22.7615 4.01633 22.2579L5.59928 21.7931C5.90776 23.1092 6.35563 24.398 6.94419 25.6345C5.91621 24.9679 4.55222 24.917 3.44966 25.6157L1.78932 26.6681C2.74598 28.1776 4.74494 28.6257 6.25439 27.669L7.56983 26.8353C8.22039 27.9801 9.00038 29.0699 9.91151 30.0823C8.7617 29.767 7.48073 30.1015 6.63528 31.053L5.32916 32.5224C6.66476 33.7095 8.70989 33.5894 9.89721 32.2535L10.9189 31.1042C11.9553 32.0671 13.113 32.8948 14.3532 33.5737C13.0642 33.4781 11.7889 34.1658 11.196 35.4014L10.3455 37.1739C11.9566 37.9469 13.8895 37.2675 14.6625 35.6564L15.4065 34.1057C16.8386 34.7702 18.36 35.2451 19.9167 35.5122C20.2867 35.5738 20.73 35.6432 21.0908 35.6865C23.2018 35.9542 24.9211 36.55 26.5574 37.9224L27.162 37.1667C26.7397 36.8346 26.2964 36.5207 25.8264 36.2426L25.826 36.2423Z"
      />
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
                    <div className="flex items-center gap-x-2">
                      <StarGlyph className="size-6 text-white" />
                      <div className="relative aspect-[20/9] w-12">
                        <Image
                          src={PLATFORM_LOGOS[3]!.src}
                          alt="Global Search Awards"
                          fill
                          className="object-contain"
                          sizes="120px"
                        />
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
