"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RevealInView } from "@/components/RevealInView";

const IMG =
  "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=400";

const SERVICES = [
  { 
    title: "Digital PR", 
    href: "/services",
    img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=400"
  },
  { 
    title: "Organic Social & Content", 
    href: "/services",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400"
  },
  { 
    title: "Search & Growth Strategy", 
    href: "/services",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400"
  },
  { 
    title: "Content Experience", 
    href: "/services",
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=400"
  },
  { 
    title: "Data & Insights", 
    href: "/services",
    img: "https://images.unsplash.com/photo-1551288049-bbbda5366392?auto=format&fit=crop&q=80&w=400"
  },
  { 
    title: "Onsite SEO", 
    href: "/services",
    img: "https://images.unsplash.com/photo-1562577353-2ba33a6f6bd9?auto=format&fit=crop&q=80&w=400"
  },
];

export function ServicesHome() {
  return (
    <section className="w-full bg-grey-100 pb-12 | xl:pb-24" aria-labelledby="services-heading">
      <div className="w-full px-4 | md:px-7">
        <div className="border-t border-grey-200 pt-8 | xl:pt-12">
          <div className="flex flex-col gap-8 | md:flex-row md:items-center md:justify-between">
            <RevealInView>
              <h2
                id="services-heading"
                className="flex items-center gap-4 text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[0.9] tracking-tight text-grey-900"
              >
                Our
                <span className="relative inline-flex h-[0.8em] w-[0.8em] shrink-0 items-center overflow-hidden rounded-lg bg-black/10 align-middle">
                  <Image
                    src={IMG}
                    alt=""
                    fill
                    className="object-cover object-center"
                    sizes="80px"
                  />
                </span>
                Services
              </h2>
            </RevealInView>

            <Link
              href="/services"
              className="group hidden h-11 items-center justify-center gap-x-2 overflow-hidden rounded-full bg-white px-6 text-sm font-medium capitalize tracking-tight text-grey-900 ring-1 ring-grey-900/5 | md:inline-flex"
            >
              View All Services
              <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-0 | md:grid-cols-2 | xl:mt-24">
            {SERVICES.map((s, i) => (
              <RevealInView key={s.title} delay={i * 0.05} className="w-full">
                <Link
                  href={s.href}
                  data-cursor="true"
                  className="group relative flex w-full items-center py-4 | xl:py-6"
                >
                  {/* Default State: Label with border */}
                  <div className="flex w-full items-center border-b border-grey-200 pb-6 transition-opacity duration-300 group-hover:opacity-0 | xl:pb-8">
                    <span className="text-3xl font-medium tracking-tighter text-grey-900 | xl:text-5xl">
                      {s.title}
                    </span>
                  </div>

                  {/* Hover State: Image Pill */}
                  <div className="absolute inset-0 flex items-center opacity-0 transition-all duration-500 ease-out group-hover:opacity-100">
                    <div className="relative flex h-full w-full items-center overflow-hidden rounded-[3rem] px-8 shadow-2xl">
                      <Image 
                        src={s.img}
                        alt=""
                        fill
                        className="object-cover object-center brightness-50 transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="relative z-10 flex items-center gap-4 text-white">
                        <ArrowUpRight className="size-8 transition-transform duration-500 group-hover:rotate-12 | xl:size-10" />
                        <span className="text-3xl font-medium tracking-tighter | xl:text-5xl">
                          {s.title}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </RevealInView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
