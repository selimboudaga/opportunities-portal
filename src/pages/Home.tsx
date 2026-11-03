import { motion, type Variants } from "motion/react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import ScrollChoreography from "@/components/ui/scroll-choreography";
import ExchangeCta from "@/components/ui/exchange-cta";
import sousse1 from "@/assets/sousse1.jpg";
import sousse3 from "@/assets/sousse3.jpeg";
import sousse4 from "@/assets/sousse4.jpg";
import sousse5 from "@/assets/sousse5.jpg";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Children reveal one after another as the block scrolls into view, and run
 * back out in reverse order on the way up — `staggerDirection: -1` on hidden
 * is what makes the exit read as a rewind rather than everything dropping at
 * once.
 */
const group: Variants = {
  hidden: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.05 } },
};

const rise: Variants = {
  hidden: {
    opacity: 0,
    y: 44,
    filter: "blur(10px)",
    transition: { duration: 0.5, ease: EASE },
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
};

const stats = [
  { value: "300+", label: "Sunny Days/Year", color: "#FF6467" },
  { value: "1.2M", label: "Annual Visitors", color: "#00B8DB" },
  { value: "3000", label: "Years of History", color: "#FF8904" },
];

const Home: React.FC = () => {
  return (
    <div className="bg-surface">
      <Navbar />

      <Hero />

      {/* Sousse, in pictures */}
      <ScrollChoreography
        className="mt-56"
        images={{
          topLeft: sousse1,
          topRight: sousse3,
          bottomLeft: sousse5,
          bottomRight: sousse4,
        }}
        alt={{
          topLeft: "The beach at Sousse",
          topRight: "The medina of Sousse",
          bottomLeft: "Sousse at night",
          bottomRight: "The port of Sousse",
        }}
      />

      <motion.div
        variants={group}
        initial="hidden"
        whileInView="show"
        // Reversible: replays in both directions rather than latching on
        // the first pass.
        viewport={{ once: false, amount: 0.25 }}
        className="mx-auto mt-36 max-w-4xl px-4 text-center"
      >
        <div className="space-y-12">
          <div className="space-y-4">
            <motion.h2
              variants={rise}
              className="bg-gradient-to-r from-[#00B8DB] via-[#FF6467] to-[#FF8904] bg-clip-text text-5xl font-semibold text-transparent"
            >
              Where History Meets Future
            </motion.h2>
            <motion.p
              variants={rise}
              className="text-2xl font-light text-gray-300"
            >
              The Mediterranean's Hidden Gem
            </motion.p>
          </div>

          <div className="space-y-8">
            <motion.p
              variants={rise}
              className="text-lg leading-relaxed text-gray-300"
            >
              Sousse, Tunisia's pearl of the Sahel, is a city where 3,000 years
              of history blend seamlessly with modern life. Our UNESCO-listed
              medina stands as a testament to centuries of rich cultural
              heritage, while our sun-kissed Mediterranean beaches offer the
              perfect backdrop for contemporary coastal living.
            </motion.p>

            <motion.p
              variants={rise}
              className="text-lg leading-relaxed text-gray-300"
            >
              As a thriving educational and economic hub, Sousse has emerged as
              a beacon for international talent. Here, ancient wisdom meets
              modern innovation, creating unique opportunities for cultural
              exchange and professional growth. Our city's warm hospitality and
              dynamic atmosphere make it an ideal destination for those seeking
              both personal and professional transformation.
            </motion.p>
          </div>

          <div className="pt-3">
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={rise}
                  className="text-center"
                >
                  <h4
                    className="mb-2 text-3xl font-normal"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </h4>
                  <p className="text-gray-300">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Closing: the line assembles as you scroll, then the CTAs arrive */}
      <div className="mt-56">
        <ExchangeCta />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
