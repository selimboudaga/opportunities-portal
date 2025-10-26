// src/components/AnimatedScrollSection.tsx
import React from 'react';

const AnimatedScrollSection: React.FC = () => {
  // A list of renditions/transliterations of "Sousse" across various scripts
  const translations = [
    'Sousse', // Latin
    'سوسة', // Arabic
    'سوسه', // alternative Arabic spelling
    'Σούς', // Greek-ish transliteration
    'スース', // Japanese Katakana (sūsu)
    '苏斯', // Chinese simplified (approx.)
    'सूसे', // Devanagari (Hindi)
    'சூஸ்', // Tamil approximation
    'Susa', // Latin variant
  ];

  // prepare a long repeated string by duplicating the translations so the marquee loops smoothly
  const repeated = [...translations, ...translations, ...translations];

  return (
    <section className="py-8 text-yellow-200">
      {/* Inline styles for marquee animation to avoid changing Tailwind config */}
      <style>{`
        .marquee-wrapper { overflow: hidden; }
        .marquee { display: inline-flex; white-space: nowrap; align-items: center; gap: 3rem; }
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .marquee-animate { animation: marquee-left 28s linear infinite; }
        .marquee-animate-reverse { animation: marquee-right 28s linear infinite; }
        .marquee-item { font-weight: 700; font-size: 2.25rem; /* text-3xl */ }
        @media (min-width: 768px) {
          .marquee-item { font-size: 3rem; /* md:text-5xl-ish */ }
        }
      `}</style>

      <div className="container mx-auto px-4">
        <h2 className="sr-only">Sousse in many languages</h2>

        <div className="marquee-wrapper">
          {/* The marquee element contains the repeated list twice; animation shifts -50% so the second half follows seamlessly */}
          <div className="marquee marquee-animate" aria-hidden="true" role="presentation">
            {repeated.map((t, i) => (
              <span key={`m1-${i}`} className="marquee-item text-blue-400 opacity-95">
                {t}
              </span>
            ))}
            {/* duplicate again to ensure smooth continuous loop */}
            {repeated.map((t, i) => (
              <span key={`m2-${i}`} className="marquee-item text-blue-400 opacity-95">
                {t}
              </span>
            ))}
          </div>
          <div className="marquee marquee-animate-reverse" aria-hidden="true" role="presentation">
            {repeated.map((t, i) => (
              <span key={`m1-${i}`} className="marquee-item text-blue-400 opacity-95">
                {t}
              </span>
            ))}
            {/* duplicate again to ensure smooth continuous loop */}
            {repeated.map((t, i) => (
              <span key={`m2-${i}`} className="marquee-item text-blue-400 opacity-95">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedScrollSection;