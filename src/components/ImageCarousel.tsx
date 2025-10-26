import React from 'react';
const ImageCarousel: React.FC = () => {
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop',
      alt: 'Coastal View',
      caption: 'Coastal Views',
    },
    {
      src: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=2070&auto=format&fit=crop',
      alt: 'Historic Medina',
      caption: 'Historic Medina',
    },
    {
      src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop',
      alt: 'Cultural Event',
      caption: 'Cultural Events',
    },

    {
      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop',
      alt: 'Beach Sunset',
      caption: 'Beach Sunset',
    }

  ];

  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 4000);
    return () => clearInterval(id);
  }, []);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative overflow-hidden rounded-lg shadow-md">
        {images.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt}
            className={`w-full h-80 object-cover transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
            loading="lazy"
          />
        ))}

        {/* caption */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
          {images[index].caption}
        </div>

        {/* controls */}
        <button onClick={prev} aria-label="Previous" className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full">
          ‹
        </button>
        <button onClick={next} aria-label="Next" className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full">
          ›
        </button>
      </div>

      {/* indicators */}
      <div className="flex justify-center gap-2 mt-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-8 rounded-full ${i === index ? 'bg-[#004aad]' : 'bg-gray-300'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;