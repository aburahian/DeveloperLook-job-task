"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    title: "Pioneers",
    subtitle: "Legacy In The Making",
    content: "We're dedicated to creating the industry narrative that others follow 3 years from now. We paved the path for creative SEO, multi-channel search with Digital PR, and Social Search and we will continue to do it.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
    bg: "bg-black",
    text: "text-white",
    rotate: "-rotate-1",
  },
  {
    title: "Award Winning",
    subtitle: "A roll top bath full of 79 awards",
    content: "Voted The Drum's best agency outside of London, we've won 79 awards in just 4 years. From Best Large Agency to Best Campaign, we're consistent winners on the global stage.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    bg: "bg-mint",
    text: "text-grey-900",
    rotate: "rotate-1",
  },
  {
    title: "Speed",
    subtitle: "Of Culture",
    content: "People ask us why we are called Rise at Seven? Ever heard the saying Early Bird catches the worm? We move at the speed of culture. We don't just react to trends; we predict them.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800",
    bg: "bg-white",
    text: "text-grey-900",
    rotate: "-rotate-1",
  },
];

export function Pioneers() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const isLast = i === CARDS.length - 1;
        
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          pin: true,
          pinSpacing: false,
          endTrigger: container,
          end: "bottom bottom",
          invalidateOnRefresh: true,
        });

        if (!isLast) {
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.5,
            ease: "none",
            scrollTrigger: {
              trigger: cardRefs.current[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
            }
          });
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-grey-100">
      <div className="w-full">
        {CARDS.map((card, i) => (
          <div
            key={card.title}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="sticky top-0 flex min-h-screen w-full flex-col items-center justify-center"
          >
            <div className="w-full px-4 | md:px-7">
              <div className={cn(
                "relative mx-auto flex max-w-4xl flex-col items-center rounded-[3rem] px-8 py-20 text-center shadow-2xl transition-transform duration-500 | md:px-16 md:py-32",
                card.bg,
                card.text,
                card.rotate
              )}>
                {/* Icon/Image at Top Center */}
                <div className="relative mb-12 h-24 w-24 overflow-hidden rounded-2xl | md:h-32 md:w-32">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Subtitle */}
                <span className="mb-4 text-xs font-bold uppercase tracking-widest opacity-60">
                  {card.subtitle}
                </span>

                {/* Title */}
                <h2 className="mb-8 text-5xl font-medium tracking-tighter | md:text-8xl">
                  {card.title}
                </h2>

                {/* Content */}
                <p className="max-w-2xl text-xl font-medium leading-tight tracking-tight | md:text-2xl">
                  {card.content}
                </p>

                {/* CTA Button */}
                <Link
                  href="/contact"
                  className={cn(
                    "mt-12 group flex items-center gap-2 rounded-full px-8 py-4 text-sm font-medium transition-all duration-300 | pointer-fine:hover:scale-105",
                    card.bg === "bg-black" ? "bg-mint text-grey-900" : "bg-black text-white"
                  )}
                >
                  Send Us Your Brief
                  <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
