// Scroll Choreography — from 21st.dev (@componentry/scroll-choreography).
//
// Rewritten for smoothness. The published version animated `width` and
// `height` between CSS unit strings and ran everything through a spring:
// every frame re-ran layout, and the spring overshot the string
// interpolation, which is what made it judder and tear mid-sequence.
//
// This version measures the viewport once per resize, works entirely in
// pixels, and only ever touches `transform` and `opacity` — both of which the
// compositor can handle without layout. The hero frame grows by `scale`
// rather than by resizing, and positions map straight off scroll progress
// with no spring, so nothing can overshoot its target.
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollChoreographyProps {
  className?: string;
  images: {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
  };
  /** Alt text per slot, so the photos are not announced as "Top Left". */
  alt?: {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
  };
}

/** Frame size and spacing, as fractions of viewport width. */
const FRAME_W = 0.38;
const FRAME_H = 0.17;
const GUTTER = 0.02;

export function ScrollChoreography({
  className,
  images,
  alt,
}: ScrollChoreographyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const measure = () =>
      setView({ w: window.innerWidth, h: window.innerHeight });
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameW = view.w * FRAME_W;
  const frameH = view.w * FRAME_H;
  // Equal gutter in both directions, in px.
  const dx = (frameW + view.w * GUTTER) / 2;
  const dy = (frameH + view.w * GUTTER) / 2;
  // Enough to cover the viewport from the frame's resting size.
  const heroScale = view.w
    ? Math.max(view.w / frameW, view.h / frameH) * 1.02
    : 1;

  const keys = [0, 0.3, 0.35, 0.65, 1];

  // Phase 1 (0–0.3): diagonal swap. Phase 2 (0.35–0.65): gather to centre.
  const tlX = useTransform(scrollYProgress, keys, [-dx, -dx, -dx, 0, 0]);
  const tlY = useTransform(scrollYProgress, keys, [-dy, dy, dy, 0, 0]);
  const brX = useTransform(scrollYProgress, keys, [dx, dx, dx, 0, 0]);
  const brY = useTransform(scrollYProgress, keys, [dy, -dy, -dy, 0, 0]);
  const blX = useTransform(scrollYProgress, keys, [-dx, -dx, -dx, 0, 0]);
  const blY = useTransform(scrollYProgress, keys, [dy, dy, dy, 0, 0]);
  const trX = useTransform(scrollYProgress, keys, [dx, dx, dx, 0, 0]);
  const trY = useTransform(scrollYProgress, keys, [-dy, -dy, -dy, 0, 0]);

  // Phase 3 (0.7–0.95): the hero frame scales up to fill the screen.
  const heroZoom = useTransform(
    scrollYProgress,
    [0.65, 0.7, 0.95, 1],
    [1, 1, heroScale, heroScale]
  );
  const underOpacity = useTransform(scrollYProgress, [0.74, 0.84], [1, 0]);

  const frameStyle = {
    width: frameW || undefined,
    height: frameH || undefined,
  };

  const base =
    "absolute left-1/2 top-1/2 -ml-[19vw] -mt-[8.5vw] overflow-hidden bg-muted shadow-2xl will-change-transform";

  return (
    <div
      ref={containerRef}
      className={cn("relative h-[300vh] w-full", className)}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{ x: tlX, y: tlY, opacity: underOpacity, ...frameStyle }}
          className={cn(base, "z-10")}
        >
          <img
            src={images.topLeft}
            alt={alt?.topLeft ?? ""}
            className="h-full w-full object-cover"
          />
        </motion.div>

        <motion.div
          style={{ x: brX, y: brY, opacity: underOpacity, ...frameStyle }}
          className={cn(base, "z-20")}
        >
          <img
            src={images.bottomRight}
            alt={alt?.bottomRight ?? ""}
            className="h-full w-full object-cover"
          />
        </motion.div>

        <motion.div
          style={{ x: blX, y: blY, opacity: underOpacity, ...frameStyle }}
          className={cn(base, "z-30")}
        >
          <img
            src={images.bottomLeft}
            alt={alt?.bottomLeft ?? ""}
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Hero frame: grows by transform, never by layout. */}
        <motion.div
          style={{ x: trX, y: trY, scale: heroZoom, ...frameStyle }}
          className={cn(base, "z-40 origin-center")}
        >
          <img
            src={images.topRight}
            alt={alt?.topRight ?? ""}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default ScrollChoreography;
