"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHeaderChrome } from "@/contexts/HeaderChromeContext";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

const WORK = [
  {
    title: "SIXT",
    range: "[2023-2025]",
    href: "https://riseatseven.com/work/sixt/",
    image:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&q=80&w=1200",
    color: "#cb7b3a",
  },
  {
    title: "Dojo - B2B",
    range: "[2021-2025]",
    href: "https://riseatseven.com/work/dojo/",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200",
    color: "#fdd8c4",
  },
  {
    title: "Magnet Trade - B2B",
    range: "[2020-2025]",
    href: "https://riseatseven.com/work/magnet-trade-b2b/",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
    color: "#d8c4fd",
  },
  {
    title: "Leading E Sim brand globally",
    range: "[2024-2025]",
    href: "https://riseatseven.com/work/esim-case-study/",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=1200",
    color: "#cb7b3a",
  },
];

export function FeaturedWork() {
  const [hovered, setHovered] = useState<number | null>(null);
  const { setForceHideHeader, setCursorActive, setCursorIcon } =
    useHeaderChrome();

  const triggerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const headingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const images = imagesRef.current;
    const headingsContainer = headingsRef.current;
    if (!trigger || !images || !headingsContainer) return;

    let ctx: gsap.Context | null = null;
    let isMounted = true;

    const build = () => {
      if (!isMounted) return;
      ctx?.revert();
      ctx = null;

      if (window.innerWidth < 1024) {
        setForceHideHeader(false);
        return;
      }

      const headings = gsap.utils.toArray<HTMLElement>(
        headingsContainer.querySelectorAll(".js-work-heading"),
      );
      const windowHeight = window.innerHeight;

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px) and (pointer: fine)", () => {
          gsap.set(trigger, { height: images.offsetHeight });

          const imgTween = gsap.to(images, {
            y: () => -(images.offsetHeight - windowHeight),
            ease: "none",
            scrollTrigger: {
              trigger,
              start: "top top",
              end: () => `+=${images.offsetHeight - windowHeight}`,
              scrub: true,
              invalidateOnRefresh: true,
              onEnter: () => setForceHideHeader(true),
              onLeave: () => setForceHideHeader(false),
              onEnterBack: () => setForceHideHeader(true),
              onLeaveBack: () => setForceHideHeader(false),
            },
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger,
              start: "top top",
              end: () => `+=${images.offsetHeight - windowHeight}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          headings.forEach((heading) => {
            tl.fromTo(
              heading,
              { y: 150 },
              {
                y: () => headingsContainer.offsetHeight * -1 + 300,
                ease: "none",
                duration: 4,
              },
              0,
            );
          });

          return () => imgTween.scrollTrigger?.kill();
        });

        mm.add("(min-width: 1024px) and (pointer: coarse)", () => {
          gsap.set(trigger, { height: images.offsetHeight });
          const imgTween = gsap.to(images, {
            y: () => -(images.offsetHeight - windowHeight * 1.1),
            ease: "none",
            scrollTrigger: {
              trigger,
              start: "top top",
              end: () =>
                `+=${images.offsetHeight - windowHeight * 1.1}`,
              scrub: true,
              pin: true,
              invalidateOnRefresh: true,
              onEnter: () => setForceHideHeader(true),
              onLeave: () => setForceHideHeader(false),
              onEnterBack: () => setForceHideHeader(true),
              onLeaveBack: () => setForceHideHeader(false),
            },
          });
          return () => imgTween.scrollTrigger?.kill();
        });
      }, trigger);

      ScrollTrigger.refresh();
    };

    const t1 = window.setTimeout(build, 0);
    const t2 = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      isMounted = false;
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      ctx?.revert();
      setForceHideHeader(false);
    };
  }, [setForceHideHeader]);

  return (
    <section
      className="w-full pb-12 | xl:pb-24"
      id="work"
      aria-label="Featured work"
    >
      <div className="w-full px-4 | md:px-7">
        <div
          ref={triggerRef}
          className="relative -my-7 flex overflow-hidden | pointer-fine:overflow-visible"
        >
          <div className="top-0 w-full py-7 | min-h-[100svh] lg:sticky lg:h-screen lg:min-h-0 lg:max-h-screen">
            <div className="grid h-full w-full grid-cols-12 overflow-hidden rounded-3xl bg-grey-900 px-5 | lg:pl-8 lg:pr-8 xl:pl-10 xl:pr-10">
              <div className="relative col-span-12 hidden min-h-0 flex-col items-start | lg:col-span-6 lg:flex lg:h-[96svh] lg:flex-row lg:items-center">
                <div className="relative z-10 flex h-full flex-col items-start gap-y-20 pt-16 | lg:pt-24 lg:pb-32">
                  <h2 className="text-left text-base font-medium leading-tight tracking-tight text-white | lg:text-lg xl:text-xl 4xl:text-2xl">
                    Featured Work
                  </h2>
                  <div className="relative hidden flex-1 overflow-hidden pr-5 | lg:inline-block">
                    <div className="pointer-events-none absolute left-0 top-0 z-20 hidden h-1/3 w-full bg-linear-to-b from-grey-900 | lg:flex" />
                    <div className="pointer-events-none absolute bottom-0 left-0 z-20 hidden h-1/3 w-full bg-linear-to-t from-grey-900 | lg:flex" />
                    <div
                      ref={headingsRef}
                      className="relative z-10 grid gap-y-2 | 2xl:gap-y-3 4xl:gap-y-5"
                    >
                      {WORK.map((item, i) => (
                        <div
                          key={item.title}
                          className="js-work-heading relative transition"
                        >
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-start gap-x-2 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                              hovered === i && "lg:translate-x-3",
                            )}
                            onMouseEnter={() => {
                              setHovered(i);
                              setCursorActive(true);
                              setCursorIcon(true);
                            }}
                            onMouseLeave={() => {
                              setHovered(null);
                              setCursorActive(false);
                              setCursorIcon(false);
                            }}
                          >
                            <span className="text-left text-[clamp(2rem,4vw,5rem)] font-medium leading-[0.9] tracking-tight text-white">
                              {item.title}
                            </span>
                            <span className="mt-2 text-xs font-medium text-white">
                              {item.range}
                            </span>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div
                ref={imagesRef}
                className="col-span-12 grid pt-7 pb-14 | lg:col-span-6 lg:col-start-7 3xl:col-span-5 3xl:col-start-8 4xl:col-span-5 4xl:col-start-8"
              >
                <div className="mb-5 | lg:hidden">
                  <h2 className="text-base font-medium leading-tight tracking-tight text-white">
                    Featured Work
                  </h2>
                </div>

                <div className="flex flex-col gap-6">
                  {WORK.map((item, i) => (
                    <WorkCard
                      key={item.title}
                      item={item}
                      onHover={(v) => {
                        if (v) setHovered(i);
                        else setHovered(null);
                        setCursorActive(v);
                        setCursorIcon(v);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkCard({
  item,
  onHover,
}: {
  item: (typeof WORK)[0];
  onHover: (v: boolean) => void;
}) {
  return (
    <Link
      href={item.href}
      className="group grid overflow-hidden rounded-2xl | lg:mb-7 lg:rounded-2xl"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      data-colour={item.color}
    >
      <div className="col-start-1 row-start-1 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] | pointer-fine:group-hover:scale-105">
        <div className="relative w-full overflow-hidden pt-[75%]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </Link>
  );
}
