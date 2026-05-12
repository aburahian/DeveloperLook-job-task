"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TEXT = "Ready to Rise at Seven?";

/*
  S-curve matching the sketch:
  - Flat low on the left (~60% of chars)
  - Steep ramp up around 60-75%
  - Flat high on the right (~25% of chars)
  centerAt controls where the ramp happens
*/
function sCurve(t: number, steepness = 12, centerAt = 0.62): number {
  return 1 / (1 + Math.exp(-steepness * (t - centerAt)));
}

export function ReadyToRise() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pinWrap = pinWrapRef.current;
    const row = rowRef.current;
    const cta = ctaRef.current;
    if (!section || !pinWrap || !row || !cta) return;

    const chars = charsRef.current.filter(Boolean) as HTMLSpanElement[];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=150%",
          pin: pinWrap,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      /* Phase 1: Slide right-to-left into view */
      tl.fromTo(
        row,
        { xPercent: 100 },
        { xPercent: -10, ease: "none", duration: 1 }
      );

      /*
        Phase 1: Build the S-curve per character
        Left chars stay LOW (positive Y = pushed down on screen)
        Right chars go HIGH (negative Y = pushed up on screen)
        Matches the sketch: flat bottom-left → steep ramp → flat top-right
      */
      const amplitude = 120;
      chars.forEach((ch, i) => {
        const t = i / (chars.length - 1);
        const curveVal = sCurve(t);
        const yOffset = (1 - curveVal) * amplitude;
        tl.fromTo(
          ch,
          { y: 0 },
          { y: yOffset, ease: "power1.inOut", duration: 1 },
          0
        );
      });

      /* CTA fades in */
      tl.fromTo(
        cta,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.3 },
        0.8
      );

      /* Phase 2: Walk out to the left */
      tl.to(
        row,
        { xPercent: -120, ease: "none", duration: 1 },
        1.3
      );

      /* Phase 2: Flatten curve as it exits */
      chars.forEach((ch) => {
        tl.to(
          ch,
          { y: 0, ease: "power1.out", duration: 0.6 },
          1.3
        );
      });

      /* CTA fades out */
      tl.to(
        cta,
        { opacity: 0, ease: "power2.in", duration: 0.2 },
        1.4
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const chars = TEXT.split("").map((ch, i) => {
    const isSpace = ch === " ";
    return (
      <span
        key={i}
        ref={(el) => {
          charsRef.current[i] = el;
        }}
        className={
          isSpace
            ? "inline-block w-[0.3em]"
            : "inline-block will-change-transform"
        }
        aria-hidden={i > 0 ? true : undefined}
      >
        {isSpace ? "\u00A0" : ch}
      </span>
    );
  });

  return (
    <section ref={sectionRef} className="relative z-0 w-full bg-grey-100">
      <div
        ref={pinWrapRef}
        className="relative flex h-screen w-full items-center justify-center overflow-hidden"
      >
        <div
          ref={rowRef}
          className="whitespace-nowrap will-change-transform"
        >
          <h2
            className="text-[clamp(3.5rem,12vw,13rem)] font-medium leading-none tracking-tight text-grey-900"
            aria-label={TEXT}
          >
            {chars}
          </h2>
        </div>

        <div ref={ctaRef} className="absolute bottom-[12%] opacity-0">
          <Link
            href="/contact"
            className="group flex items-center gap-4 text-2xl font-medium tracking-tight text-grey-900 | xl:text-4xl"
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
