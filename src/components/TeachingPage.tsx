/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/TeachingPage.tsx
import React, { useState, useEffect } from "react";
import { request, gql } from "graphql-request";
import Navbar from "./Navbar";
import Footer from "./Footer";
import p3 from "@/assets/p3.png";
import gte from "@/assets/gte.png";

// GraphQL query
const GET_OPPORTUNITIES = gql`
  query getOpportunities($startDate: String!, $endDate: String!) {
    opportunities(
      filters: { created: { from: $startDate, to: $endDate }, programmes: 10 }
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

const TeachingPage: React.FC = () => {
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

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (error)
    return <div className="text-center py-16 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-[#0f0f0f]">
        <img src={p3} alt="" />
      </div>

      <div className="mt-32 flex flex-col items-center justify-center px-6">
        <div className="relative">
          <img
            src={gte}
            alt="Global Talent Logo"
            className="size-32 relative z-10 drop-shadow-2xl "
          />
        </div>

        <div className="mt-8 max-w-2xl">
          <h2 className="text-3xl font-bold text-center mb-6  text-[#F48924]">
            Incoming Global Teacher
          </h2>

          <p className="text-gray-300 text-center text-lg leading-relaxed">
            <span className="text-white font-semibold">Global Volunteer</span>{" "}
            Global Teacher is an empowering international program that connects passionate young educators aged 18–30 with teaching opportunities abroad. Through this experience, you’ll inspire students, share knowledge across cultures, and contribute to shaping future generations. Beyond the classroom, you’ll gain invaluable 
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
            <span className="text-[#F85A40] font-medium">
              {" "}
              personal growth
            </span>{" "}
            . It’s more than just a teaching role 
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-6 py-3 hover:bg-white/10 transition-all">
              <p className="text-blue-400 font-semibold text-sm">Ages 18-30</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-6 py-3 hover:bg-white/10 transition-all">
              <p className="text-[#ffc845] font-semibold text-sm">
                Personal & Proffessional Growth
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-6 py-3 hover:bg-white/10 transition-all">
              <p className="text-[#F85A40] font-semibold text-sm">
                Teaching Experience
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-14 py-20 px-6">
        {/* Cards Section */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className=" border-2 border-[#F48924]  rounded-2xl p-8 ">
            <h3 className="text-3xl font-bold text-[#F48924] mb-5">
              Global Opportunity
            </h3>
            <p className="text-white text-base leading-relaxed">
              Expand your horizon by developing your career in a global setting. Work in a whole new environment and culture, while adapting to a local life in another country.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#F48924] rounded-2xl p-8">
            <h3 className="text-3xl font-bold text-white mb-5">
              Develop Yourself
            </h3>
            <p className="text-white text-base leading-relaxed">
              Grow and develop develop your leadership competencies and personal skills by going through practical experiences and learning-by-doing.
            </p>
          </div>

          {/* Card 3 */}

          <div className=" border-2 border-[#F48924]  rounded-2xl p-8 ">
            <h3 className="text-3xl font-bold text-[#F48924] mb-5">
              Boost your career
            </h3>
            <p className="text-white text-base leading-relaxed">
              Launch yourself into a challenging role that allows you to gain a professional edge with our partners who are dedicated to provide an enriching experience.
            </p>
          </div>
        </div>
      </div>

      {/* Opportunities Section */}
      <section className="py-20 mt-24 text-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#F48924] mb-4">
              Explore Our Opportunities
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover meaningful Teaching opportunities in Sousse and make a
              real impact through AIESEC’s Global Teacher program.
            </p>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
            <p className="text-[#F48924] text-3xl font-bold">
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
                className="bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F48924] transition-all"
              />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.slice(0, visibleCount).map((project) => (
              <div
                key={project.id}
                className="border border-[#F48924]/40 rounded-2xl p-6 hover:bg-[#F48924]/10 transition-all duration-300"
              >
                {/* Header */}
                <h3 className="text-xl font-bold text-[#F48924] mb-3">
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
                    href={`https://aiesec.org/opportunity/global-teacher/${project.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-[#F48924] text-[#F48924] px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#F48924] hover:text-white transition-all duration-300"
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
                className="border border-[#F48924] text-[#F48924] px-6 py-3 rounded-xl font-medium hover:bg-[#F48924] hover:text-white transition-all duration-300"
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

export default TeachingPage;
