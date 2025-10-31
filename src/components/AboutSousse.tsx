import { type FC, useRef } from "react";

import { useScroll, useTransform, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import sousse1 from "@/assets/sousse1.jpg";
import sousse2 from "@/assets/sousse2.jpg";
import sousse3 from "@/assets/sousse3.jpeg";
import sousse4 from "@/assets/sousse4.jpg";
import sousse5 from "@/assets/sousse5.jpg";
import sousse6 from "@/assets/sousse6.jpg";
import sousse7 from "@/assets/sousse7.jpg";

interface Props {
  classes?: string;
}

const ZoomParallax: FC<Props> = ({ classes }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale1 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale2 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale3 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      src: sousse3,
      scale: scale1,
      classes: "relative w-[25%] h-[25%]",
    },
    {
      src: sousse4,
      scale: scale2,
      classes: "relative top-[-30%] left-[5%] w-[35%] h-[30%]",
    },
    {
      src: sousse5,
      scale: scale3,
      classes: "relative top-[-29%] left-[-25%] w-[20%] h-[28%]",
    },
    {
      src: sousse1,
      scale: scale2,
      classes: "relative left-[27.5%] w-[25%] h-[25%]",
    },
    {
      src: sousse6,
      scale: scale3,
      classes: "relative left-[-27.5%] w-[25%] h-[25%]",
    },
    {
      src: sousse2,
      scale: scale4,
      classes: "relative top-[27.5%] left-[5%] w-[20%] h-[25%]",
    },
    {
      src: sousse7,
      scale: scale5,
      classes: "relative top-[22.5%] left-[25%] w-[15%] h-[15%]",
    },
  ];

  return (
    <section
      ref={container}
      className={cn("relative h-[200vh] w-full", classes)}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {pictures.map(({ src, scale, classes }, index) => {
          return (
            <motion.div
              key={index}
              style={{ scale }}
              className="absolute top-0 flex h-full w-full items-center justify-center"
            >
              <div className={`bg-zinc-200 dark:bg-zinc-800 ${classes}`}>
                <img
                  src={src}
                  className="w-full h-full object-cover"
                  alt="image of beautiful person"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="h-[100vh] leading-[0]"></div>
      <p>Continue your content here...</p>
    </section>
  );
};

export default ZoomParallax;
