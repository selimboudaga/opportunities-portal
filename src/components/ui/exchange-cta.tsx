// Closing section: the line assembles word by word as you scroll, then the
// two calls to action arrive under it. Native scroll throughout — the section
// pins while it plays and releases normally once it is done.
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Link } from "react-router-dom";

const WORDS = ["Your", "exchange", "starts", "in", "Sousse"];

/** Words land between these two points, evenly divided. */
const FROM = 0.1;
const TO = 0.62;

function Word({
  word,
  index,
  total,
  progress,
  accent,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  accent?: boolean;
}) {
  const span = (TO - FROM) / total;
  const start = FROM + index * span;
  const end = start + span * 1.6;

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [44, 0]);
  const blur = useTransform(progress, [start, end], ["blur(12px)", "blur(0px)"]);

  return (
    <motion.span
      style={{ opacity, y, filter: blur }}
      className={
        accent
          ? "inline-block bg-gradient-to-r from-[#00B8DB] via-[#FF6467] to-[#FF8904] bg-clip-text text-transparent"
          : "inline-block"
      }
    >
      {word}
    </motion.span>
  );
}

export function ExchangeCta() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const leadOpacity = useTransform(scrollYProgress, [0.6, 0.72], [0, 1]);
  const leadY = useTransform(scrollYProgress, [0.6, 0.72], [26, 0]);

  const ctaOpacity = useTransform(scrollYProgress, [0.74, 0.88], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.74, 0.88], [28, 0]);

  return (
    <div ref={containerRef} className="relative h-[240vh] w-full">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="flex flex-wrap justify-center gap-x-[0.3em] gap-y-2 text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            {WORDS.map((word, i) => (
              <Word
                key={word}
                word={word}
                index={i}
                total={WORDS.length}
                progress={scrollYProgress}
                accent={i === WORDS.length - 1}
              />
            ))}
          </h2>

          <motion.p
            style={{ opacity: leadOpacity, y: leadY }}
            className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-gray-300 sm:text-lg"
          >
            Three thousand years of history on a Mediterranean coastline, and a
            committee of students ready to host you.
            <br className="hidden sm:block" /> Pick a programme, or get to know
            the country first.
          </motion.p>

          <motion.div
            style={{ opacity: ctaOpacity, y: ctaY }}
            className="mt-12 flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/our-country"
              className="rounded-xl bg-brand px-8 py-3.5 font-semibold text-white transition-transform duration-300 hover:scale-[1.03] hover:bg-[#0268c9]"
            >
              Our Country
            </Link>
            <Link
              to="/our-programs/volunteer"
              className="rounded-xl border-2 border-white/25 px-8 py-3.5 font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-surface"
            >
              Our Programmes
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ExchangeCta;
