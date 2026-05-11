"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const CLIENT_LOGOS = [
  "https://placehold.co/400x200/000000/FFFFFF/png?text=HUBSPOT",
  "https://placehold.co/400x200/000000/FFFFFF/png?text=XBOX",
  "https://placehold.co/400x200/000000/FFFFFF/png?text=SIXT",
  "https://placehold.co/400x200/000000/FFFFFF/png?text=REVOLUTION",
];

const dup = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];

export function ClientMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const marquee = marqueeRef.current;
    if (!el || !marquee) return;

    const mm = gsap.matchMedia();

    mm.add("(pointer: fine)", () => {
      const loop = gsap.to(marquee, {
        xPercent: -50,
        repeat: -1,
        duration: 30,
        ease: "none",
      });

      const parallax = gsap.to(el, {
        xPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 100%",
          end: "bottom -100%",
          scrub: true,
        },
      });

      return () => {
        loop.kill();
        parallax.scrollTrigger?.kill();
        parallax.kill();
      };
    });

    mm.add("(pointer: coarse)", () => {
      gsap.set(el, { xPercent: 0 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="w-full pt-6 pb-12 | xl:pt-12 xl:pb-24" aria-label="Clients">
      <div className="w-full px-4 | md:px-7">
        <div className="grid w-full grid-cols-12 gap-y-2">
          <div className="col-span-12 flex items-center | md:col-span-4 | lg:col-span-3 | xl:col-span-2">
            <h2 className="max-w-32 text-left text-xs font-normal leading-tight tracking-tight text-grey-500 | xl:text-sm">
              The agency behind ...
            </h2>
          </div>
          <div className="relative col-span-12 w-full | md:col-span-8 | lg:col-span-9 | xl:col-span-10">
            <div className="relative z-0 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div
                ref={containerRef}
                className="relative z-0 flex w-[120vw] overflow-hidden"
              >
                <div
                  ref={marqueeRef}
                  className="flex w-max items-center gap-16 | lg:gap-24"
                >
                  {dup.map((src, i) => (
                    <div
                      key={`${src}-${i}`}
                      className="relative w-28 py-6 | lg:w-36"
                    >
                      <div className="relative aspect-[20/9] w-full">
                        <Image
                          src={src}
                          alt=""
                          fill
                          className="object-contain"
                          sizes="(max-width: 1024px) 112px, 144px"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.opacity =
                              "0.2";
                          }}
                        />
                      </div>
                    </div>
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
