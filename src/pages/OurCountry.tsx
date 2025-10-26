// src/components/OurCountryPage.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './customStyles.css'

const OurCountryPage: React.FC = () => {
  // Video carousel state
  // Only one video per page/product — keeps the section focused
  const videos = [
    { id: 1, src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'Tunisia Landscapes' }, // Replace with real video ID
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % videos.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [videos.length]);

  return (
    <div className="flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <header className="h-[80vh] bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=2070&auto=format&fit=crop')`, // Replace with a Tunisia landscape image
        }}
      >
        <div className="text-center bg-opacity-50 p-6 rounded">
          <h1 className="text-4xl md:text-5xl font-bold">Explore Tunisia</h1>
          <p className="text-lg md:text-xl mt-2">A Journey Through History and Culture</p>
        </div>
      </header>

      {/* Video Carousel Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Watch Tunisia Come Alive</h2>
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
            Discover Tunisia’s beauty through stunning videos showcasing its landscapes, cities, and traditions.
          </p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Moments Across Tunisia</h2>
          <div className="image-gallery">
            {/* Image 1 */}
            <div className="div1 relative overflow-hidden rounded-lg shadow-md">
              <img
                src="https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=2070&auto=format&fit=crop"
                alt="Group at Landmark"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <p className="absolute bottom-2 left-2 text-white bg-black bg-opacity-60 p-1 rounded">Landmark Visit</p>
            </div>
            {/* Image 2 */}
            <div className="div2 relative overflow-hidden rounded-lg shadow-md">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop"
                alt="Beach Scene"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <p className="absolute bottom-2 left-2 text-white bg-black bg-opacity-60 p-1 rounded">Beach Fun</p>
            </div>
            {/* Image 3 */}
            <div className="div3 relative overflow-hidden rounded-lg shadow-md">
              <img
                src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop"
                alt="Group Event"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <p className="absolute bottom-2 left-2 text-white bg-black bg-opacity-60 p-1 rounded">Cultural Event</p>
            </div>
                        {/* Image 6 */}
            <div className="div4 relative overflow-hidden rounded-lg shadow-md">
              <img
                src="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2070&auto=format&fit=crop"
                alt="Market Scene"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <p className="absolute bottom-2 left-2 text-white bg-black bg-opacity-60 p-1 rounded">Market Day</p>
            </div>
            {/* Image 5 */}
            <div className="div5 relative overflow-hidden rounded-lg shadow-md">
              <img
                src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop"
                alt="City Street"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <p className="absolute bottom-2 left-2 text-white bg-black bg-opacity-60 p-1 rounded">City Life</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default OurCountryPage;