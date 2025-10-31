// src/components/VolunteerPage.tsx
import React, { useState, useEffect } from "react";
import { request, gql } from "graphql-request";
import Navbar from "./Navbar";
import Footer from "./Footer";
import p1 from "@/assets/p1.png";
import gv from "@/assets/gv.png";

// GraphQL query
const GET_OPPORTUNITIES = gql`
  query getOpportunities($startDate: String!, $endDate: String!) {
    opportunities(
      filters: { created: { from: $startDate, to: $endDate }, programmes: 9 }
      per_page: 1000
    ) {
      data {
        id
        title
        organisation {
          name
        }
        status
        applicants_count
        openings
        backgrounds {
          id
          constant_name
        }
        created_at
        programmes {
          short_name_display
        }
        opportunity_duration_type {
          id
          duration_type
        }
        logistics_info {
          accommodation_provided
          accommodation_covered
          transportation_provided
          transportation_covered
          food_provided
          food_covered
          computer_provided
          no_of_meals
        }
        project_fee
        work_hours
        specifics_info {
          salary
        }
      }
    }
  }
`;

const VolunteerPage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  // Filter projects by search term
  const filteredProjects = projects.filter((project) =>
    (project.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetch data from GraphQL
  useEffect(() => {
    const fetchOpportunities = async () => {
      const endpoint =
        "https://gis-api.aiesec.org/graphql?access_token=J0EiRZx2Uwxgb265rDsyvrgOWemSc0bqlCOGQklFDYo";
      const variables = {
        startDate: "2025-01-01",
        endDate: "2026-12-31",
      };

      try {
        const data = await request(endpoint, GET_OPPORTUNITIES, variables);
        setProjects(data.opportunities.data || []);
      } catch (err) {
        setError("Failed to fetch opportunities");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  // Video carousel state

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (error)
    return <div className="text-center py-16 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-[#0f0f0f]">
        <img src={p1} alt="" />
      </div>

      <div className="mt-32 flex flex-col items-center justify-center px-6">
        <div className="relative">
          <img
            src={gv}
            alt="Global Talent Logo"
            className="size-32 relative z-10 drop-shadow-2xl "
          />
        </div>

        <div className="mt-8 max-w-2xl">
          <h2 className="text-3xl font-bold text-center mb-6  text-[#F85A40]">
            Incoming Global Volunteer
          </h2>

          <p className="text-gray-300 text-center text-lg leading-relaxed">
            <span className="text-white font-semibold">Global Volunteer</span>{" "}
            is an inspiring international program that empowers young people
            aged 18–30 to make a tangible difference in the world. Through
            volunteering abroad, you’ll contribute to meaningful
            <span className="text-blue-400 font-medium">
              {" "}
              social impact projects
            </span>
            , gain valuable
            <span className="text-[#ffc845] font-medium">
              {" "}
              cross-cultural experiences
            </span>
            , and develop essential
            <span className="text-[#00c16e] font-medium">
              {" "}
              leadership skills
            </span>{" "}
            that shape both your personal and professional growth. It’s more
            than just a volunteer journey — it’s a transformative adventure that
            helps build a better, more connected world.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-6 py-3 hover:bg-white/10 transition-all">
              <p className="text-blue-400 font-semibold text-sm">Ages 18-30</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-6 py-3 hover:bg-white/10 transition-all">
              <p className="text-[#ffc845] font-semibold text-sm">
                Cross-Cultural Impact

              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-6 py-3 hover:bg-white/10 transition-all">
              <p className="text-[#00c16e] font-semibold text-sm">
                Global Experience
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-14 py-20 px-6">
        {/* Cards Section */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className=" border-2 border-[#F85A40]  rounded-2xl p-8 ">
            <h3 className="text-3xl font-bold text-[#F85A40] mb-5">
              Cross Cultural Experience
            </h3>
            <p className="text-white text-base leading-relaxed">
              Imagine yourself exploring a new culture, meet like-minded people,
              and expand your network across the world while making an impact.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#F85A40] rounded-2xl p-8">
            <h3 className="text-3xl font-bold text-white mb-5">
              Grow Beyond Limits
            </h3>
            <p className="text-white text-base leading-relaxed">
              Push your boundaries! Live somewhere new, tackle real challenges,
              and grow your leadership and personal skills in ways you never
              expected.
            </p>
          </div>

          {/* Card 3 */}

          <div className=" border-2 border-[#F85A40]  rounded-2xl p-8 ">
            <h3 className="text-3xl font-bold text-[#F85A40] mb-5">
              Make a Real Difference
            </h3>
            <p className="text-white text-base leading-relaxed">
              Each Global Volunteer project supports the Sustainable Development
              Goals—join the generation making real change where it matters.
            </p>
          </div>
        </div>
      </div>

      {/* Opportunities Section */}
      <section className="py-20 mt-24 text-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#F85A40] mb-4">
              Explore Our Opportunities
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
             Discover meaningful volunteer opportunities in Sousse and make a real impact through AIESEC’s Global Volunteer program.
            </p>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
            <p className="text-[#F85A40] text-3xl font-bold">
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
                className="bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F85A40] transition-all"
              />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.slice(0, visibleCount).map((project) => (
              <div
                key={project.id}
                className="border border-[#F85A40]/40 rounded-2xl p-6 hover:bg-[#F85A40]/10 transition-all duration-300"
              >
                {/* Header */}
                <h3 className="text-xl font-bold text-[#F85A40] mb-3">
                  {project.title || project.role}
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
                    {project.opportunity_duration_type?.duration_type ||
                      project.duration}
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
                    href={`https://aiesec.org/opportunity/global-volunteer/${project.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-[#F85A40] text-[#F85A40] px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#F85A40] hover:text-white transition-all duration-300"
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
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="border border-[#F85A40] text-[#F85A40] px-6 py-3 rounded-xl font-medium hover:bg-[#F85A40] hover:text-white transition-all duration-300"
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

export default VolunteerPage;
