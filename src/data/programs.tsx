// src/data/programs.tsx
// Per-programme content for the three exchange pages. Everything that differs
// between Global Volunteer / Talent / Teacher lives here; the shared layout is
// in components/ProgramPage.tsx.
import type { ReactNode } from "react";
import p1 from "@/assets/p1.webp";
import p2 from "@/assets/p2.webp";
import p3 from "@/assets/p3.webp";
import gv from "@/assets/gv.png";
import gta from "@/assets/gta.png";
import gte from "@/assets/gte.png";

export interface Program {
  /** Route segment under /our-programs/ and the key used to look this up. */
  slug: string;
  /** `programmes` filter value in the GIS opportunities query. */
  programmeId: number;
  /** Path segment on aiesec.org/opportunity/<slug>/<id>. */
  opportunitySlug: string;
  title: string;
  heading: string;
  /** Brand colour, used for borders, headings and the filled card. */
  accent: string;
  banner: string;
  logo: string;
  intro: ReactNode;
  badges: { label: string; color: string }[];
  /** Three feature cards; the middle one renders filled with the accent. */
  cards: { title: ReactNode; text: string }[];
  opportunitiesBlurb: ReactNode;
}

const volunteer: Program = {
  slug: "volunteer",
  programmeId: 7,
  opportunitySlug: "global-volunteer",
  title: "Global Volunteer",
  heading: "Incoming Global Volunteer",
  accent: "#F85A40",
  banner: p1,
  logo: gv,
  intro: (
    <>
      <span className="text-white font-semibold">Global Volunteer</span> is an
      inspiring international program that empowers young people aged 18–30 to
      make a tangible difference in the world. Through volunteering abroad,
      you’ll contribute to meaningful
      <span className="text-blue-400 font-medium"> social impact projects</span>,
      gain valuable
      <span className="text-[#ffc845] font-medium">
        {" "}
        cross-cultural experiences
      </span>
      , and develop essential
      <span className="text-[#00c16e] font-medium"> leadership skills</span> that
      shape both your personal and professional growth. It’s more than just a
      volunteer journey — it’s a transformative adventure that helps build a
      better, more connected world.
    </>
  ),
  badges: [
    { label: "Ages 18-30", color: "text-blue-400" },
    { label: "Cross-Cultural Impact", color: "text-[#ffc845]" },
    { label: "Global Experience", color: "text-[#00c16e]" },
  ],
  cards: [
    {
      title: "Cross Cultural Experience",
      text: "Imagine yourself exploring a new culture, meet like-minded people, and expand your network across the world while making an impact.",
    },
    {
      title: "Grow Beyond Limits",
      text: "Push your boundaries! Live somewhere new, tackle real challenges, and grow your leadership and personal skills in ways you never expected.",
    },
    {
      title: "Make a Real Difference",
      text: "Each Global Volunteer project supports the Sustainable Development Goals—join the generation making real change where it matters.",
    },
  ],
  opportunitiesBlurb:
    "Discover meaningful volunteer opportunities in Sousse and make a real impact through AIESEC’s Global Volunteer program.",
};

const talent: Program = {
  slug: "talent",
  programmeId: 8,
  opportunitySlug: "global-talent",
  title: "Global Talent",
  heading: "Incoming Global Talent",
  accent: "#0CB9C1",
  banner: p2,
  logo: gta,
  intro: (
    <>
      <span className="text-white font-semibold">Global Talent</span> is a
      transformative internship experience designed for ambitious young
      professionals aged 18-30. We connect emerging talent with world-class
      opportunities, fostering
      <span className="text-blue-400 font-medium"> career development</span>,
      <span className="text-purple-400 font-medium">
        {" "}
        cross-cultural collaboration
      </span>
      , and
      <span className="text-pink-400 font-medium"> global networking</span> in
      today's interconnected business landscape.
    </>
  ),
  badges: [
    { label: "Ages 18-30", color: "text-blue-400" },
    { label: "Global Network", color: "text-purple-400" },
    { label: "Career Growth", color: "text-pink-400" },
  ],
  cards: [
    {
      title: (
        <>
          Global
          <br />
          Opportunity
        </>
      ),
      text: "Expand your horizon by developing your career in a global setting. Work in a whole new environment and culture, while adapting to a local life in another country.",
    },
    {
      title: (
        <>
          Develop
          <br />
          Yourself
        </>
      ),
      text: "Grow and develop develop your leadership competencies and personal skills by going through practical experiences and learning-by-doing.",
    },
    {
      title: (
        <>
          Global
          <br />
          Opportunity
        </>
      ),
      text: "Launch yourself into a challenging role that allows you to gain a professional edge with our partners who are dedicated to provide an enriching experience.",
    },
  ],
  opportunitiesBlurb:
    "Find exciting professional experiences in Sousse and take your career to the next level with AIESEC’s Global Talent program.",
};

const teaching: Program = {
  slug: "teaching",
  programmeId: 9,
  opportunitySlug: "global-teacher",
  title: "Global Teacher",
  heading: "Incoming Global Teacher",
  accent: "#F48924",
  banner: p3,
  logo: gte,
  intro: (
    <>
      <span className="text-white font-semibold">Global Volunteer</span> Global
      Teacher is an empowering international program that connects passionate
      young educators aged 18–30 with teaching opportunities abroad. Through this
      experience, you’ll inspire students, share knowledge across cultures, and
      contribute to shaping future generations. Beyond the classroom, you’ll gain
      invaluable
      <span className="text-blue-400 font-medium">
        {" "}
        cross-cultural understanding
      </span>
      ,
      <span className="text-[#ffc845] font-medium">
        {" "}
        professional teaching experience
      </span>
      , and
      <span className="text-[#F85A40] font-medium"> personal growth</span> . It’s
      more than just a teaching role
    </>
  ),
  badges: [
    { label: "Ages 18-30", color: "text-blue-400" },
    { label: "Personal & Proffessional Growth", color: "text-[#ffc845]" },
    { label: "Teaching Experience", color: "text-[#F85A40]" },
  ],
  cards: [
    {
      title: "Global Opportunity",
      text: "Expand your horizon by developing your career in a global setting. Work in a whole new environment and culture, while adapting to a local life in another country.",
    },
    {
      title: "Develop Yourself",
      text: "Grow and develop develop your leadership competencies and personal skills by going through practical experiences and learning-by-doing.",
    },
    {
      title: "Boost your career",
      text: "Launch yourself into a challenging role that allows you to gain a professional edge with our partners who are dedicated to provide an enriching experience.",
    },
  ],
  opportunitiesBlurb:
    "Discover meaningful Teaching opportunities in Sousse and make a real impact through AIESEC’s Global Teacher program.",
};

export const programs: Record<string, Program> = {
  [volunteer.slug]: volunteer,
  [talent.slug]: talent,
  [teaching.slug]: teaching,
};

/** Looks up a programme by route segment, ignoring case. */
export const findProgram = (slug: string | undefined): Program | undefined =>
  slug ? programs[slug.toLowerCase()] : undefined;
