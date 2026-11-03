// Opportunities stack.
//
// Each programme is a full-viewport panel that is `position: sticky`. As you
// scroll, the panel you are on stays pinned and the next one rises up over it
// — the sections come to you, rather than you travelling down to them. This is
// native scroll: no wheel capture, so the page never traps you.
import { Fragment } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { programList } from "@/data/programs";

const COUNT = programList.length;

const Panel: React.FC<{ program: (typeof programList)[number]; index: number }> = ({
  program,
  index,
}) => {
  const number = (index + 1).toString().padStart(2, "0");
  // The first panel sits flush; the ones that rise over it get a lifted edge.
  const lifted = index > 0;

  return (
    <section
      className="sticky top-0 h-screen w-full overflow-hidden"
      style={{
        zIndex: index + 1,
        boxShadow: lifted ? "0 -32px 64px -12px rgba(0,0,0,.7)" : undefined,
      }}
      aria-label={program.title}
    >
      {/* A city photo, not the programme banner: the banners have the logo and
          wordmark baked in and collided with the heading below. One light
          scrim only — enough for the text to hold, not a second overlay. */}
      <div className="absolute inset-0">
        <img
          src={program.panelImage}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface/85 via-surface/45 to-transparent" />
      </div>

      {/* A hairline in the programme colour marks each new panel */}
      {lifted && (
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ backgroundColor: `${program.accent}80` }}
        />
      )}

      <div className="relative mx-auto flex h-full max-w-7xl items-center px-6">
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: 56 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-6 flex items-center gap-4">
            <img
              src={program.logo}
              alt=""
              className="size-16 object-contain drop-shadow-xl"
            />
            <span
              className="font-mono text-sm tracking-[0.3em]"
              style={{ color: program.accent }}
            >
              {number} / {COUNT.toString().padStart(2, "0")}
            </span>
          </div>

          <p
            className="mb-3 text-xs font-semibold tracking-[0.25em] uppercase"
            style={{ color: program.accent }}
          >
            {program.category}
          </p>

          <h3 className="mb-5 text-5xl font-bold text-white sm:text-6xl">
            {program.title}
          </h3>

          <p className="mb-9 text-lg leading-relaxed text-gray-300">
            {program.tagline}
          </p>

          <Link
            to={`/our-programs/${program.slug}`}
            className="inline-flex items-center gap-2 rounded-full border-2 px-7 py-3 font-semibold text-white transition-colors duration-300"
            style={{ borderColor: program.accent }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = program.accent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            See opportunities <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export function ProgramStack() {
  return (
    <div className="relative">
      {programList.map((program, i) => (
        <Fragment key={program.slug}>
          <Panel program={program} index={i} />
          {/* Hold: the panel is sticky, so this spacer keeps it parked on
              screen for another half viewport after it lands, before the next
              one starts rising over it. */}
          <div className="h-[55vh]" aria-hidden="true" />
        </Fragment>
      ))}
    </div>
  );
}

export default ProgramStack;
