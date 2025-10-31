import React from "react";
import Navbar from "../components/Navbar";
import "./customStyles.css";
import InfiniteMenu from "@/components/InfiniteMenu";
import bizerte1      from '@/assets/bizerte1.webp';
import bizerte2      from '@/assets/bizerte2.webp';
import douz1         from '@/assets/douz1.webp';
import eljem1        from '@/assets/eljem1.webp';
import eljem3        from '@/assets/eljem3.jpeg';
import sidibou3      from '@/assets/sidibou3.webp';
import sousse1       from '@/assets/sousse1.jpg';
import sousse2       from '@/assets/sousse2.jpg';
import sousse3       from '@/assets/sousse3.jpeg';
import sousse4       from '@/assets/sousse4.jpg';
import sousse5       from '@/assets/sousse5.jpg';
import sousse7       from "@/assets/sousse7.jpg";
import zaghouan2     from '@/assets/zaghouan2.webp';

const OurCountryPage: React.FC = () => {
  const items = [
  {
    image: eljem3, 
    link: 'https://google.com/',
    title: 'El-Jem Colosseum',
    description: 'Step into one of the best-preserved Roman arenas in the world.',
  },
  {
    image: sidibou3,
    link: 'https://google.com/',
    title: 'Sousse Medina',
    description: 'Wander through centuries-old alleyways by the sparkling sea.',
  },
  {
    image: sousse2,
    link: 'https://google.com/',
    title: 'Ribat of Sousse',
    description: 'Climb ancient walls for panoramic Mediterranean views.',
  },
  {
    image: sousse3,
    link: 'https://google.com/',
    title: 'Sousse Medina',
    description: 'Golden-hour magic over the marina.',
  },
  {
    image: sousse7,
    link: 'https://google.com/',
    title: 'Local Beaches',
    description: 'Cycle, jog or simply sip coffee by the waves.',
  },
  {
    image: sousse1,
    link: 'https://google.com/',
    title: 'Beach Vibes',
    description: 'Powder-soft sand and turquoise water steps from the city.',
  },
  {
    image: sousse4,
    link: 'https://google.com/',
    title: 'Local Port',
    description: 'Cycle, jog or simply sip coffee by the waves.',
  },
  {
    image: sousse5,
    link: 'https://google.com/',
    title: 'Night-time Sousse',
    description: 'Neon lights reflect off the harbour for an evening to remember.',
  },
  {
    image: bizerte1, // Image 1 - Colorful harbor
    link: 'https://google.com/',
    title: 'Colorful Marina',
    description: 'Vibrant waterfront houses reflecting Tunisia\'s Mediterranean charm.',
  },
  {
    image: bizerte2, // Image 2 - Beach aerial
    link: 'https://google.com/',
    title: 'Paradise Coastline',
    description: 'Crystal-clear turquoise waters meet pristine sandy beaches.',
  },
  {
    image: douz1, // Image 3 - Desert camels
    link: 'https://google.com/',
    title: 'Sahara Desert Adventure',
    description: 'Experience the magic of camel trekking across golden dunes at sunset.',
  },
  {
    image: zaghouan2, // Image 4 - Ancient ruins
    link: 'https://google.com/',
    title: 'Ancient Roman Ruins',
    description: 'Discover centuries-old archaeological treasures framed by nature.',
  },
   {
    image: eljem1, // Image 4 - Ancient ruins
    link: 'https://google.com/',
    title: 'Eljem',
    description: 'Discover the ancient Roman amphitheater, a UNESCO World Heritage site.',
  },
];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Navbar */}
      <Navbar />

      {/* Fullscreen Infinite Menu */}
      <div className=" overflow-hidden h-screen w-screen">
        <div className=" absolute inset-0  w-full h-full">
        <InfiniteMenu items={items} />
      </div>
      </div>
      

      
    </div>
  );
};

export default OurCountryPage;
