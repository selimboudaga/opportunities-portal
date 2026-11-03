// Image mouse trail — from 21st.dev's image-mousetrail component.
//
// The motion logic is the published one, unchanged: step only once the
// pointer has travelled further than innerWidth / 20, light the lead image at
// the cursor, retire the one five places behind it, and drop each back to
// inactive after a second.
//
// Changes needed to run here:
//  • typed, rather than `@ts-nocheck`, and no "use client" (Next.js only)
//  • images come from this project's assets instead of a constants file
//  • it listens on `window` rather than using onMouseMove, because it is
//    rendered inside the hero's `pointer-events: none` overlay where React
//    pointer handlers never fire. Coordinates are still taken relative to its
//    own box, and it ignores the pointer when outside.
import { createRef, useEffect, useRef } from "react";

import bizerte1 from "@/assets/bizerte1.webp";
import bizerte2 from "@/assets/bizerte2.webp";
import douz1 from "@/assets/douz1.webp";
import eljem3 from "@/assets/ElJem3.jpeg";
import sidibou3 from "@/assets/sidibou3.webp";
import sousse1 from "@/assets/sousse1.jpg";
import sousse3 from "@/assets/sousse3.jpeg";
import sousse4 from "@/assets/sousse4.jpg";
import sousse5 from "@/assets/sousse5.jpg";
import sousse7 from "@/assets/sousse7.jpg";
import zaghouan2 from "@/assets/zaghouan2.webp";

const IMAGES = [
  sousse3, sidibou3, sousse7, eljem3, sousse1, douz1,
  sousse5, bizerte1, sousse4, zaghouan2, bizerte2,
];

/** How many images trail behind the leader before being retired. */
const TRAIL = 5;

export function ImageMouseTrail({
  className = "",
  active = true,
}: {
  className?: string;
  /** Only trail while the opening frame is up. */
  active?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const refs = useRef(IMAGES.map(() => createRef<HTMLImageElement>()));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!active) {
      refs.current.forEach((ref) => {
        if (ref.current) ref.current.dataset.status = "inactive";
      });
      return;
    }

    let globalIndex = 0;
    let last = { x: 0, y: 0 };
    const timers = new Set<number>();

    const activate = (image: HTMLImageElement, x: number, y: number) => {
      const rect = container.getBoundingClientRect();
      image.style.left = `${x - rect.left}px`;
      image.style.top = `${y - rect.top}px`;
      image.style.zIndex = String((globalIndex % IMAGES.length) + 1);
      image.dataset.status = "active";

      // Held longer than the 900ms transition, so an image finishes arriving
      // before it starts leaving.
      const id = window.setTimeout(() => {
        image.dataset.status = "inactive";
        timers.delete(id);
      }, 1400);
      timers.add(id);

      last = { x, y };
    };

    const handleOnMove = (x: number, y: number) => {
      if (Math.hypot(x - last.x, y - last.y) <= window.innerWidth / 20) return;

      const lead = refs.current[globalIndex % refs.current.length].current;
      // The original indexed with a raw negative modulo, which silently
      // skipped the retire step for the first few moves.
      const tailIndex =
        (((globalIndex - TRAIL) % refs.current.length) + refs.current.length) %
        refs.current.length;
      const tail = refs.current[tailIndex]?.current;

      if (lead) activate(lead, x, y);
      if (tail) tail.dataset.status = "inactive";

      globalIndex++;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = container.getBoundingClientRect();
      if (event.clientY < rect.top || event.clientY > rect.bottom) return;
      handleOnMove(event.clientX, event.clientY);
    };

    window.addEventListener("pointermove", onPointerMove);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      timers.forEach((id) => clearTimeout(id));
    };
  }, [active]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {IMAGES.map((src, index) => (
        <img
          key={src}
          data-index={index}
          data-status="inactive"
          src={src}
          alt=""
          // Transition only transform and opacity. `transition-all` also
          // animated left/top, so each image slid across from wherever it was
          // last used instead of appearing at the cursor — that was the
          // judder. The curve is an expo-out, as in the original.
          className="absolute h-72 w-60 -translate-x-1/2 -translate-y-1/2 scale-0 object-cover opacity-0 shadow-2xl transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform data-[status=active]:scale-100 data-[status=active]:opacity-100"
          ref={refs.current[index]}
        />
      ))}
    </div>
  );
}

export default ImageMouseTrail;
