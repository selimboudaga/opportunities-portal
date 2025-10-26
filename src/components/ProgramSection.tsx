// src/components/ProgramsSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProgramsSection: React.FC = () => {
  const programs = [
    {
      key: 'volunteer',
      title: 'Global Volunteer',
      desc: 'Join local projects and make a direct impact in Sousse communities. Short-term and long-term placements available.',
      bgClass: 'bg-red-400',
      textClass: 'text-white',
      btnClass: 'bg-white',
      btnTextClass: 'text-black',
      path:"/our-programs/volunteer",
    },
    {
      key: 'talent',
      title: 'Global Talent',
      desc: 'Connect with international companies and showcase your skills on meaningful projects and remote assignments.',
      bgClass: 'bg-cyan-500',
      textClass: 'text-white',
      btnClass: 'bg-white',
      btnTextClass: 'text-black',
      path:"/outour-programs/talent",
    },
    {
      key: 'teacher',
      title: 'Global Teacher',
      desc: 'Teach English and other subjects — support local schools and adult education through structured classes and workshops.',
      bgClass: 'bg-orange-400',
      textClass: 'text-black',
      btnClass: 'bg-black',
      btnTextClass: 'text-white',
      path:"/our-programs/teacher",
    },
  ];

  return (
    <section className="py-16 bg-gray-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Programs</h2>
        <p className="text-lg text-gray-700 text-center mb-12">
          Join our programs to explore Sousse’s culture, history and make a positive impact — find the right
          opportunity for you below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((p) => (
            <article
              key={p.key}
              className={`rounded-lg shadow-md p-6 flex flex-col ${p.bgClass} ${p.textClass}`}
            >
              <div className="flex items-center mb-4">
                {/* decorative white circle badge for contrast */}
                <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-white text-black font-bold mr-4">
                  {p.title
                    .split(' ')
                    .map((s) => s[0])
                    .slice(0, 2)
                    .join('')}
                </span>
                <h3 className="text-xl font-semibold">{p.title}</h3>
              </div>

              <p className={`${p.textClass === 'text-white' ? 'text-white/90' : 'text-black/85'} flex-1`}>{p.desc}</p>

              <div className="mt-6">
                <Link
                  to={p.path}
                  className={`inline-block px-4 py-2 ${p.btnClass} ${p.btnTextClass} font-semibold rounded hover:opacity-90`}
                  aria-label={`Learn more about ${p.title}`}
                >
                  Learn more
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;