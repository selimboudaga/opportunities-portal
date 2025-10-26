// src/components/TeachingPage.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { request, gql } from 'graphql-request';
import Navbar from './Navbar';
import Footer from './Footer';
import ImageCarousel from './ImageCarousel'; // Assuming this is your existing component

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

  // Fetch data from GraphQL
  useEffect(() => {
    const fetchOpportunities = async () => {
      const endpoint = 'https://gis-api.aiesec.org/graphql?access_token=J0EiRZx2Uwxgb265rDsyvrgOWemSc0bqlCOGQklFDYo';
      const variables = {
        startDate: '2025-01-01',
        endDate: '2026-12-31',
      };

      try {
        const data = await request(endpoint, GET_OPPORTUNITIES, variables);
        setProjects(data.opportunities.data || []);
      } catch (err) {
        setError('Failed to fetch opportunities');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  // Video carousel state
  const videos = [
    { id: 1, src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Teaching Sessions' },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % videos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [videos.length]);

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (error) return <div className="text-center py-16 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <header className="h-[80vh] bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage: `url('https://whereitallbegins.aiesec.org.eg/assets/images/iGV/mb_gte.png')`,
        }}
      >
        <div className="text-center bg-opacity-50 p-6 rounded">
          <h1 className="text-4xl md:text-5xl font-bold">Teaching Program</h1>
          <p className="text-lg md:text-xl mt-2">Empower Through Education</p>
        </div>
      </header>
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Watch Teaching in Action</h2>
          <div className="carousel relative">
            <AnimatePresence>
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  className={`carousel-item ${index === activeIndex ? 'active' : index === (activeIndex + 1) % videos.length ? 'next' : index === (activeIndex - 1 + videos.length) % videos.length ? 'prev' : ''}`}
                  initial={{ opacity: 0, zIndex: 0 }}
                  animate={{ opacity: index === activeIndex ? 1 : 0, zIndex: index === activeIndex ? 10 : 5 }}
                  exit={{ opacity: 0, zIndex: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <iframe
                    width="100%"
                    height="315"
                    src={video.src}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <p className="mt-4 text-gray-700">
            Discover the educational impact of our Teaching Program.
          </p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Places You Can Visit</h2>
          <ImageCarousel />
        </div>
      </section>
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-8">Our Projects</h1>
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg text-orange-600">{projects.length} Openings were found</p>
            <div className="flex items-center space-x-2">
              <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Filter</button>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Slots start date from: JJ/MM/AAAA"
                  className="bg-white text-black px-4 py-2 rounded border border-gray-300 focus:outline-none"
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">⏳</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-orange-500 text-white p-6 rounded-lg shadow-md border border-orange-600"
              >
                <h3 className="text-xl font-bold mb-2">{project.title || project.role}</h3>
                <p className="text-sm mb-1">
                  Duration: {project.opportunity_duration_type?.duration_type || project.duration}
                </p>
                <p className="text-sm mb-1">
                  Start Date: {new Date(project.created_at || project.startDate).toLocaleDateString()}
                </p>
                <p className="text-sm mb-1">
                  Salary: {project.specifics_info?.salary || project.salary}
                </p>
                <p className="text-sm mb-1">
                  Openings: {project.openings}
                </p>
                <p className="text-sm">
                  Location: {project.organisation?.name || project.location}
                </p>
                <a
                  href={`https://aiesec.org/opportunity/global-teacher/${project.id}`}
                  className="mt-4 inline-block text-orange-200 hover:text-yellow-300 underline"
                  target='_blank'
                >
                  See more
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TeachingPage;