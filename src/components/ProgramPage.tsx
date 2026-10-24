// src/components/ProgramPage.tsx
// Shared layout for the three exchange programme pages. The accent colour is
// passed down as a `--program-accent` custom property so the Tailwind classes
// below stay static while the colour varies per programme.
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import type { Program } from "@/data/programs";
import { fetchOpportunities, type Opportunity } from "@/lib/gis";

const PAGE_SIZE = 6;

interface ProgramPageProps {
  program: Program;
}

const ProgramPage: React.FC<ProgramPageProps> = ({ program }) => {
  const [projects, setProjects] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Filter projects by search term
  const filteredProjects = projects.filter((project) =>
    (project.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetch data from GraphQL
  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);
    setProjects([]);
    setSearchTerm("");
    setVisibleCount(PAGE_SIZE);

    fetchOpportunities(program.programmeId)
      .then((opportunities) => {
        if (!cancelled) setProjects(opportunities);
      })
      .catch((err) => {
        if (cancelled) return;
        setError("Failed to fetch opportunities");
        console.error(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [program.programmeId]);

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (error)
    return <div className="text-center py-16 text-red-500">{error}</div>;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ "--program-accent": program.accent } as React.CSSProperties}
    >
      <Navbar />
      <div className="bg-[#0f0f0f]">
        <img src={program.banner} alt="" />
      </div>

      <div className="mt-32 flex flex-col items-center justify-center px-6">
        <div className="relative">
          <img
            src={program.logo}
            alt={`${program.title} logo`}
            className="size-32 relative z-10 drop-shadow-2xl"
          />
        </div>

        <div className="mt-8 max-w-2xl">
          <h2 className="text-3xl font-bold text-center mb-6 text-[var(--program-accent)]">
            {program.heading}
          </h2>

          <p className="text-gray-300 text-center text-lg leading-relaxed">
            {program.intro}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {program.badges.map((badge) => (
              <div
                key={badge.label}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-6 py-3 hover:bg-white/10 transition-all"
              >
                <p className={`${badge.color} font-semibold text-sm`}>
                  {badge.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="w-full mt-14 py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {program.cards.map((card, index) => {
            const filled = index === 1;

            return (
              <div
                key={index}
                className={
                  filled
                    ? "bg-[var(--program-accent)] rounded-2xl p-8"
                    : "border-2 border-[var(--program-accent)] rounded-2xl p-8"
                }
              >
                <h3
                  className={`text-3xl font-bold mb-5 ${
                    filled ? "text-white" : "text-[var(--program-accent)]"
                  }`}
                >
                  {card.title}
                </h3>
                <p className="text-white text-base leading-relaxed">
                  {card.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Opportunities Section */}
      <section className="py-20 mt-24 text-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-[var(--program-accent)]">
              Explore Our Opportunities
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {program.opportunitiesBlurb}
            </p>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
            <p className="text-3xl font-bold text-[var(--program-accent)]">
              {projects.length}{" "}
              <span className="text-white font-medium">
                Opportunities Available
              </span>
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                placeholder="Search by opportunity name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--program-accent)] transition-all"
              />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.slice(0, visibleCount).map((project) => (
              <div
                key={project.id}
                className="border border-[var(--program-accent)]/40 rounded-2xl p-6 hover:bg-[var(--program-accent)]/10 transition-all duration-300"
              >
                {/* Header */}
                <h3 className="text-xl font-bold mb-3 text-[var(--program-accent)]">
                  {project.title}
                </h3>

                {/* Info */}
                <div className="space-y-1 text-sm text-gray-300">
                  <p>
                    <span className="font-semibold text-white">
                      Organisation:
                    </span>{" "}
                    {project.organisation?.name || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Duration:</span>{" "}
                    {project.opportunity_duration_type?.duration_type}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Created:</span>{" "}
                    {new Date(project.created_at).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Openings:</span>{" "}
                    {project.openings}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Salary:</span>{" "}
                    {project.specifics_info?.salary
                      ? `$${project.specifics_info.salary}`
                      : "Not specified"}
                  </p>
                </div>

                {/* Button */}
                <div className="mt-5">
                  <a
                    href={`https://aiesec.org/opportunity/${program.opportunitySlug}/${project.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-[var(--program-accent)] text-[var(--program-accent)] px-4 py-2 rounded-xl text-sm font-medium hover:bg-[var(--program-accent)] hover:text-white transition-all duration-300"
                  >
                    View Details →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredProjects.length && (
            <div className="text-center mt-10">
              <button
                onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                className="border border-[var(--program-accent)] text-[var(--program-accent)] px-6 py-3 rounded-xl font-medium hover:bg-[var(--program-accent)] hover:text-white transition-all duration-300"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProgramPage;
