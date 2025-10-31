/* eslint-disable @typescript-eslint/no-explicit-any */
import gv from "@/assets/gv.png";
import gta from "@/assets/gta.png";
import gte from "@/assets/gte.png";

export function ProgramsSection() {
  const data = [
    {
      bg: "#F85A40",
      logo: gv,
      title: "Global Volunteer",
      desc: "Develop your leadership through a volunteering project contributing to the Sustainable Development Goals.",
      link: "/our-programs/volunteer",
    },
    {
      bg: "#0CB9C1",
      logo: gta,
      title: "Global Talent",
      desc: "Develop your leadership while boosting your career prospects with an international internship in your field",
      link: "/our-programs/talent",
    },
    {
      bg: "/our-programs/teaching",
      logo: gte,
      title: "Global Teaching",
      desc: "Develop your leadership while boosting your career prospects with an opportunity to work as a teacher abroad.",
      link: "#",
    },
  ];

  return (
    <section className="py-20 px-6 grid gap-10 md:grid-cols-3 max-w-6xl mx-auto">
      {data.map((c) => (
        <GlassCard key={c.title} {...c} />
      ))}
    </section>
  );
}

type GlassCardProps = {
  bg: string;
  logo: string;
  title: string;
  desc: string;
  link: string;
};

const GlassCard = ({ bg, logo, title, desc, link }: GlassCardProps) => {
  return (
    <div
      className="group border-2 relative w-full h-[450px] rounded-3xl p-8 flex flex-col items-center text-center bg-black hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] transition-all duration-300"
      style={{ borderColor: bg }}
    >
      {/* Logo */}
      <div
        className="size-[90px] -mt-[65px] rounded-full grid place-items-center shadow-xl transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: "black" }}
      >
        <img src={logo} alt={title} className="size-[70px] object-contain" />
      </div>

      {/* Content */}
      <div className="flex-grow mt-6">
        <h3 style={{color:bg}} className="text-3xl font-bold mb-6">{title}</h3>
        <p className="text-white text-base leading-relaxed px-2">
          {desc}
        </p>
      </div>

      {/* Button */}
      <a
        href={link}
        className="inline-block mt-6 px-6 py-2.5 text-sm font-semibold text-white border rounded-full border-white/30 bg-white/10 backdrop-blur-md hover:bg-white hover:text-black transition-all duration-300"
      >
        See more →
      </a>

      {/* Subtle glow effect */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `0 0 40px ${bg}33`,
        }}
      ></div>
    </div>
  );
};
