"use client";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useHeaderChrome } from "@/contexts/HeaderChromeContext";
import { cn } from "@/lib/cn";

export function CustomCursors() {
  const {
    cursorActive,
    setCursorActive,
    cursorIcon,
    setCursorIcon,
    buttonCursorActive,
    setButtonCursorActive,
    buttonCursorText,
  } = useHeaderChrome();

  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isAtEdge, setIsAtEdge] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = target.closest("a, button, [data-cursor]");
      setIsHoveringLink(!!isLink);
    };

    const handleMouseOut = () => {
      setIsHoveringLink(false);
    };

    const handleMouseLeaveWindow = () => {
      setIsHoveringLink(false);
      setIsAtEdge(true);
    };

    const handleScroll = () => {
      const el = document.elementFromPoint(lastPos.current.x, lastPos.current.y);
      if (el) {
        const isInteractive = el.closest("a, button, [data-cursor]");
        setIsHoveringLink(!!isInteractive);
        
        if (!isInteractive && (cursorActive || buttonCursorActive)) {
          setCursorActive(false);
          setCursorIcon(false);
          setButtonCursorActive(false);
        }
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("mouseleave", handleMouseLeaveWindow);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mouseleave", handleMouseLeaveWindow);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [cursorActive, buttonCursorActive, setCursorActive, setCursorIcon, setButtonCursorActive]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: PointerEvent) => {
      lastPos.current = { x: e.clientX, y: e.clientY };
      
      const threshold = 5;
      const atEdge = e.clientX < threshold || 
                     e.clientX > window.innerWidth - threshold || 
                     e.clientY < threshold || 
                     e.clientY > window.innerHeight - threshold;
      setIsAtEdge(atEdge);

      [mainRef, btnRef].forEach((r) => {
        const el = r.current;
        if (!el) return;
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        el.style.left = `${e.clientX - w / 2}px`;
        el.style.top = `${e.clientY - h / 2}px`;
      });
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    const shouldHide = (cursorActive || buttonCursorActive || isHoveringLink) && !isAtEdge;
    if (shouldHide) {
      document.documentElement.classList.add("hide-cursor");
      document.body.classList.add("hide-cursor");
    } else {
      document.documentElement.classList.remove("hide-cursor");
      document.body.classList.remove("hide-cursor");
    }
    return () => {
      document.documentElement.classList.remove("hide-cursor");
      document.body.classList.remove("hide-cursor");
    };
  }, [cursorActive, buttonCursorActive, isHoveringLink, isAtEdge]);

  const isActive = (cursorActive || buttonCursorActive || isHoveringLink) && !isAtEdge;

  return (
    <>
      <motion.div
        ref={mainRef}
        className={cn(
          "pointer-events-none fixed z-50 hidden items-center justify-center overflow-hidden rounded-full bg-mint text-grey-900 | pointer-fine:flex",
          cursorActive && cursorIcon ? "size-24 lg:size-32 lg:text-4xl" : "size-4"
        )}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isActive && !buttonCursorActive ? 1 : 0,
          opacity: isActive && !buttonCursorActive ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      >
        <AnimatePresence>
          {cursorActive && cursorIcon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <ArrowUpRight className="size-6 lg:size-8" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        ref={btnRef}
        className="pointer-events-none fixed z-50 hidden | pointer-fine:flex"
        animate={{ scale: buttonCursorActive ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      >
        <div className="group inline-flex shrink-0 items-center justify-center gap-x-2 overflow-hidden rounded-3xl border border-transparent bg-mint px-6 py-3 capitalize tracking-tight text-grey-900 transition-[border-radius] duration-300 | pointer-fine:hover:rounded-xl flex-row-reverse">
          <SplitTextButtonInner text={buttonCursorText || ""} />
        </div>
      </motion.div>
    </>
  );
}

function SplitTextButtonInner({ text }: { text: string }) {
  if (!text) return null;
  return (
    <span className="relative inline-flex overflow-hidden capitalize tracking-tight flex-row-reverse">
      <span className="pointer-fine:group-hover:-translate-y-6 flex items-center gap-x-2 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
        <span>{text}</span>
        <ArrowUpRight className="mt-0.5 size-3 shrink-0" aria-hidden />
      </span>
      <span className="pointer-fine:group-hover:translate-y-0 absolute left-0 top-0 flex translate-y-6 items-center gap-x-2 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
        <span>{text}</span>
        <ArrowUpRight className="mt-0.5 size-3 shrink-0" aria-hidden />
      </span>
    </span>
  );
}
