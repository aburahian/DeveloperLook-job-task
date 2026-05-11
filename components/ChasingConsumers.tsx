"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IMG =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800";

export function ChasingConsumers() {
  const outerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const row = rowRef.current;
    if (!outer || !row) return;

    const half = () => row.scrollWidth / 2;
    let x = 0;
    let raf = 0;

    const tick = () => {
      x -= 0.5;
      const offset = half();
      if (offset > 0 && x <= -offset) x = 0;
      row.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const mm = gsap.matchMedia();
    mm.add("(pointer: fine)", () => {
      const tween = gsap.to(outer, {
        xPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: outer,
          start: "top 100%",
          end: "bottom -100%",
          scrub: true,
        },
      });
      return () => tween.scrollTrigger?.kill();
    });

    return () => {
      cancelAnimationFrame(raf);
      mm.revert();
    };
  }, []);

  return (
    <section className="w-full overflow-hidden py-0" aria-label="Call to action">
      <div className="w-full px-0">
        <Link
          href="/contact"
          className="relative block w-full overflow-hidden"
        >
          <div
            ref={outerRef}
            className="relative z-0 flex w-[120vw] overflow-hidden"
          >
            <div
              ref={rowRef}
              className="flex w-max shrink-0 items-center px-2 pb-3 | lg:px-5 lg:pb-10 lg:pt-5"
            >
              <div className="flex items-center gap-x-4 | lg:gap-x-10">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={`a-${i}`}
                    className="flex shrink-0 items-center gap-x-4 | lg:gap-x-10"
                  >
                    <h2 className="flex-1 pb-0 text-[clamp(2.5rem,8vw,6rem)] font-medium leading-[0.9] tracking-tight text-grey-900 | lg:pb-10">
                      Chasing Consumers
                    </h2>
                    <div className="relative mb-0 w-[20vw] shrink-0 overflow-hidden rounded-2xl | md:w-[15vw] lg:mb-10 lg:w-[12vw] lg:rounded-3xl">
                      <div className="relative w-full pt-[100%]">
                        <Image
                          src={IMG}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="20vw"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="flex items-center gap-x-4 | lg:gap-x-10"
                aria-hidden
              >
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={`b-${i}`}
                    className="flex shrink-0 items-center gap-x-4 | lg:gap-x-10"
                  >
                    <h2 className="flex-1 pb-0 text-[clamp(2.5rem,8vw,6rem)] font-medium leading-[0.9] tracking-tight text-grey-900 | lg:pb-10">
                      Chasing Consumers
                    </h2>
                    <div className="relative mb-0 w-[20vw] shrink-0 overflow-hidden rounded-2xl | md:w-[15vw] lg:mb-10 lg:w-[12vw] lg:rounded-3xl">
                      <div className="relative w-full pt-[100%]">
                        <Image
                          src={IMG}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="20vw"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
