"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

/** Desktop-only circular reveal matching the live site's GSAP ellipse intro. */
export function PageEnterMask() {
  const ellipseRef = useRef<SVGEllipseElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ellipseRef.current;
    if (!el) return;

    gsap.to(el, {
      attr: { rx: 2700, ry: 2150 },
      duration: 1.25,
      ease: "power2.out",
    });
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] hidden h-svh w-screen | pointer-fine:block"
      aria-hidden
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        className="block h-svh w-screen"
      >
        <defs>
          <mask id="circle-reveal-mask">
            <rect width="100%" height="100%" fill="white" />
            <ellipse
              ref={ellipseRef}
              className="js-reveal-ellipse"
              cx={960}
              cy={2000}
              rx={0}
              ry={0}
              fill="black"
            />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="var(--mask-colour)"
          mask="url(#circle-reveal-mask)"
        />
      </svg>
    </div>
  );
}
