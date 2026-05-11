"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RevealInView } from "@/components/RevealInView";
import { SplitTextButton } from "@/components/SplitTextButton";

const INLINE_IMG =
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=400";

export function IntroHome() {
  return (
    <section
      className="w-full bg-grey-100 pt-12 pb-12 | xl:pt-24 xl:pb-24"
      aria-labelledby="intro-heading"
    >
      <div className="w-full px-4 | md:px-7">
        <div className="flex flex-col gap-12 | lg:flex-row lg:items-start lg:gap-24">
          {/* Left Column: Intro Text */}
          <div className="w-full | lg:w-[35%]">
            <RevealInView>
              <p
                id="intro-heading"
                className="text-lg font-medium leading-[1.1] tracking-tight text-grey-900 | lg:text-xl xl:text-2xl 4xl:text-3xl"
              >
                A global team of search-first content marketers engineering
                semantic relevancy &amp; category signals for both the internet
                and people
              </p>
            </RevealInView>
          </div>

          {/* Right Column: Large Heading & Buttons */}
          <div className="flex w-full flex-col gap-10 | lg:w-[65%] lg:gap-16">
            <RevealInView delay={0.08}>
              <h2 className="relative flex flex-col text-left text-[clamp(2.5rem,7.5vw,7.5rem)] font-medium leading-[0.85] tracking-tighter text-grey-900">
                <span className="flex flex-wrap items-baseline">
                  {["Driving", "Demand", "&"].map((w) => (
                    <span key={w} className="mr-3 inline-block last:mr-0">
                      {w}
                    </span>
                  ))}
                </span>
                <span className="flex flex-wrap items-center">
                   <span className="mr-3">Discovery</span>
                  <span className="relative inline-flex h-[0.75em] w-[3.5rem] shrink-0 items-center overflow-hidden rounded-lg bg-black/10 sm:w-[4rem] md:w-20 lg:w-24">
                    <Image
                      src={INLINE_IMG}
                      alt=""
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100px, 150px"
                    />
                  </span>
                </span>
              </h2>
            </RevealInView>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/about"
                className="group inline-flex h-12 items-center justify-center gap-x-2 overflow-hidden rounded-full bg-white px-8 text-base font-medium capitalize tracking-tight text-grey-900 ring-1 ring-grey-900/5 transition-[border-radius] duration-300 | pointer-fine:hover:rounded-xl"
              >
                <SplitTextButton>Our Story</SplitTextButton>
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/services"
                className="group inline-flex h-12 items-center justify-center gap-x-2 overflow-hidden rounded-full bg-transparent px-8 text-base font-medium capitalize tracking-tight text-grey-900"
              >
                <SplitTextButton>Our Services</SplitTextButton>
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
