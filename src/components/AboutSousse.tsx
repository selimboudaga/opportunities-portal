// src/components/AboutSousse.tsx
import React from 'react';

const AboutSousse: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">About Sousse</h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src="/AboutSousse.jpeg"
              alt="Sousse"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <p className="text-lg text-gray-700">
              Sousse, known as the "Pearl of the Sahel," is a vibrant coastal city in Tunisia. Famous for its
              historic medina, stunning beaches, and rich cultural heritage, Sousse offers a perfect blend of
              history and modernity. Explore the ancient Ribat, stroll through the bustling souks, or relax by
              the Mediterranean Sea.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSousse;