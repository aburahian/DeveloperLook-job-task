"use client";

import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  children: string;
  className?: string;
  reverse?: boolean;
};

/** Matches site pattern: duplicated label stack with vertical slide on hover (pointer-fine). */
export function SplitTextButton({
  children,
  className,
  reverse = true,
}: Props) {
  return (
    <span
      className={cn(
        "relative inline-flex overflow-hidden capitalize tracking-tight",
        reverse && "flex-row-reverse",
        className,
      )}
    >
      <span className="pointer-fine:group-hover:-translate-y-6 flex items-center gap-x-2 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none">
        <span>{children}</span>
        <ArrowUpRight className="mt-0.5 size-3 shrink-0" aria-hidden />
      </span>
      <span className="pointer-fine:group-hover:translate-y-0 absolute left-0 top-0 flex translate-y-6 items-center gap-x-2 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:hidden">
        <span>{children}</span>
        <ArrowUpRight className="mt-0.5 size-3 shrink-0" aria-hidden />
      </span>
    </span>
  );
}
