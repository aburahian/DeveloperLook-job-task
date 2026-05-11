"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function ReadyToRise() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "bottom bottom",
        pin: true,
        pinSpacing: false,
      });

      gsap.fromTo(contentRef.current, 
        { y: 50, opacity: 0.8 },
        { 
          y: 0, 
          opacity: 1, 
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          }
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative z-0 w-full bg-grey-900 py-24 text-white | xl:py-48"
    >
      <div ref={contentRef} className="w-full px-4 | md:px-7">
        <div className="flex flex-col items-start gap-8">
          <h2 className="text-[clamp(3.5rem,12vw,12rem)] font-medium leading-[0.85] tracking-tight">
            Ready <br /> to Rise <br /> at Seven?
          </h2>
          <Link
            href="/contact"
            className="group flex items-center gap-4 text-2xl font-medium tracking-tight | xl:text-4xl"
          >
            Get in touch
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-mint text-grey-900 transition-transform duration-500 group-hover:rotate-45 | xl:h-16 xl:w-16">
              <ArrowUpRight className="size-6 | xl:size-8" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
