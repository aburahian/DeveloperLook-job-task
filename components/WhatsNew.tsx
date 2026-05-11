"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RevealInView } from "./RevealInView";

const ARTICLES = [
  {
    category: "News",
    title: "Rise at Seven Appoints Hollie Lovell as Managing Director",
    href: "/blog",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
  },
  {
    category: "Insights",
    title: "How to dominate Social Search in 2024",
    href: "/blog",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=400",
  },
  {
    category: "Case Study",
    title: "Driving 300% growth for SIXT via Search-First Content",
    href: "/blog",
    image: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&q=80&w=400",
  },
];

export function WhatsNew() {
  return (
    <section className="w-full bg-grey-100 py-24 | xl:py-48">
      <div className="w-full px-4 | md:px-7">
        <div className="mb-12 flex items-end justify-between border-b border-grey-200 pb-8 | xl:mb-24">
          <RevealInView>
            <h2 className="text-5xl font-medium tracking-tighter | xl:text-7xl">
              What&apos;s new
            </h2>
          </RevealInView>
          <Link
            href="/blog"
            className="group hidden items-center gap-2 text-lg font-medium | md:flex"
          >
            Explore More Thoughts
            <ArrowUpRight className="size-5 transition-transform group-hover:rotate-45" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 | md:grid-cols-3 | xl:gap-12">
          {ARTICLES.map((article, i) => (
            <RevealInView key={article.title} delay={i * 0.1}>
              <Link href={article.href} className="group block">
                <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden rounded-3xl">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-grey-400">
                  {article.category}
                </p>
                <h3 className="text-2xl font-medium leading-tight tracking-tight text-grey-900 group-hover:text-grey-500 | xl:text-3xl">
                  {article.title}
                </h3>
              </Link>
            </RevealInView>
          ))}
        </div>
      </div>
    </section>
  );
}
