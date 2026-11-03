// Home hero: the Glyph Portal camera flies through a letter of "HADRUMET".
// The opening frame is off-white paper under a gradient grid, with the word
// cut out of it in the site's own dark navy, so scrolling through a letter
// lands straight in the dark page that follows.
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "motion/react";
import GlyphPortal from "./ui/glyph-portal";
import ImageMouseTrail from "./ui/image-mouse-trail";
import heroMark from "@/assets/hero.png";

const PAPER = "#f4f2ed";
const FIELD = "#070a12";
/** Progress past which the dark field dominates the screen. */
const DARK_AT = 0.5;
/** The portal only lets you pick a letter below p = 0.04; trail to just past it. */
const TRAIL_UNTIL = 0.06;

/** One element's slice of the camera travel, so entries land in sequence. */
function useEntry(progress: MotionValue<number>, from: number) {
  const to = from + 0.12;
  return {
    opacity: useTransform(progress, [from, to], [0, 1]),
    y: useTransform(progress, [from, to], [80, 0]),
    filter: useTransform(progress, [from, to], ["blur(14px)", "blur(0px)"]),
  };
}

const Hero: React.FC = () => {
  // The portal reports its camera progress each frame. Feeding it into a
  // MotionValue keeps the reveal tied to the scrollbar — each element has its
  // own slice of the travel, so they arrive one after another as you scroll
  // rather than all firing on a timer once a threshold is crossed.
  const progress = useMotionValue(0);
  const onPaper = useRef<boolean | null>(null);
  // The trail belongs to the opening frame only — the same window in which
  // the portal lets you pick a letter.
  const [trailing, setTrailing] = useState(true);
  const trailingRef = useRef(true);

  const first = useEntry(progress, 0.7);
  const second = useEntry(progress, 0.78);
  const third = useEntry(progress, 0.86);

  // Tell the navbar which background it is sitting on. Set up front rather
  // than waiting for the first progress callback, otherwise the bar paints
  // white on white paper for a frame. Cleared on unmount so every other page
  // gets the plain white-on-dark bar.
  useEffect(() => {
    document.documentElement.dataset.heroPaper = "true";
    onPaper.current = true;
    return () => {
      delete document.documentElement.dataset.heroPaper;
    };
  }, []);

  return (
    <>
      <style>{`
        .hero-portal { background-color: ${PAPER}; }
        /* The opening frame is just the word. */
        .hero-portal [data-gp-hint] { display: none !important; }
        /* Keep the skip link for keyboard users, but out of the composition. */
        .hero-portal [data-gp-enter] {
          position: absolute; width: 1px; height: 1px;
          overflow: hidden; clip-path: inset(50%); white-space: nowrap;
        }
        .hero-portal [data-gp-enter]:focus-visible {
          position: static; width: auto; height: auto;
          clip-path: none; white-space: normal;
        }
      `}</style>

      <GlyphPortal
        className="hero-portal"
        word="HADRUMET"
        fontWeight={900}
        scrollLength={4.4}
        onProgress={(p) => {
          progress.set(p);

          const paper = p < DARK_AT;
          if (onPaper.current !== paper) {
            onPaper.current = paper;
            document.documentElement.dataset.heroPaper = String(paper);
          }

          const trail = p < TRAIL_UNTIL;
          if (trailingRef.current !== trail) {
            trailingRef.current = trail;
            setTrailing(trail);
          }
        }}
        style={{
          "--gp-paper": PAPER,
          "--gp-ink": FIELD,
          "--gp-field": FIELD,
          "--gp-foreground": "#ffffff",
        }}
        // Flat field. Without this the component falls back to its own green
        // gradient, and any gradient here leaves a visible seam where the
        // pinned section meets the page background below.
        background={
          <div style={{ position: "absolute", inset: 0, background: FIELD }} />
        }
        front={<ImageMouseTrail active={trailing} />}
      >
        {/* Revealed once the camera has passed through the letter. */}
        <div className="mx-auto grid w-full max-w-5xl items-center gap-12 md:grid-cols-[1fr_minmax(0,280px)]">
          <div>
            <motion.p
              style={first}
              className="text-lg leading-relaxed text-gray-200 sm:text-xl"
            >
              AIESEC in Hadrumet stands as one of Tunisia's most vibrant local
              committees, known for developing leaders and creating meaningful
              opportunities for youth.
            </motion.p>

            <motion.p
              style={second}
              className="mt-6 text-lg leading-relaxed text-gray-200 sm:text-xl"
            >
              As the hosting LC of this conference, Hadrumet transforms the
              experience into a true stage of leadership, collaboration, and
              inspiration.
            </motion.p>
          </div>

          <motion.img
            style={third}
            src={heroMark}
            alt="AIESEC in Hadrumet emblem"
            className="mx-auto w-44 md:order-last md:mx-0 md:w-full"
          />
        </div>
      </GlyphPortal>
    </>
  );
};

export default Hero;
