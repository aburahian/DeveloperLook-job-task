"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

const ease = [0.33, 1, 0.68, 1] as const;

export function RevealInView({
  children,
  className,
  delay = 0,
  y = 48,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration: 0.85,
        delay,
        ease,
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealWords({
  text,
  className,
  delay = 0.05,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <span ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="mr-[0.2em] inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : { y: "100%" }}
            transition={{
              duration: 0.75,
              delay: i * delay,
              ease,
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
