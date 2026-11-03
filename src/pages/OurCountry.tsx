import React from "react";
import Navbar from "../components/Navbar";
import PortalCarousel, {
  type PortalCarouselImage,
} from "@/components/ui/portal-carousel";
import bizerte1 from "@/assets/bizerte1.webp";
import bizerte2 from "@/assets/bizerte2.webp";
import douz1 from "@/assets/douz1.webp";
import eljem1 from "@/assets/eljem1.webp";
import eljem3 from "@/assets/ElJem3.jpeg";
import sidibou3 from "@/assets/sidibou3.webp";
import sousse1 from "@/assets/sousse1.jpg";
import sousse2 from "@/assets/sousse2.jpg";
import sousse3 from "@/assets/sousse3.jpeg";
import sousse4 from "@/assets/sousse4.jpg";
import sousse5 from "@/assets/sousse5.jpg";
import sousse7 from "@/assets/sousse7.jpg";
import zaghouan2 from "@/assets/zaghouan2.webp";

const images: PortalCarouselImage[] = [
  {
    src: eljem3,
    title: "El Jem Amphitheatre",
    description:
      "Step into one of the best-preserved Roman arenas in the world.",
    alt: "The Roman amphitheatre at El Jem",
  },
  {
    src: sidibou3,
    title: "Sidi Bou Said",
    description: "Blue shutters, white walls and the sea below every corner.",
    alt: "Blue and white houses above the sea at Sidi Bou Said",
  },
  {
    src: sousse3,
    title: "Sousse Medina",
    description:
      "Wander through centuries-old alleyways by the sparkling sea.",
    alt: "The UNESCO-listed medina of Sousse",
  },
  {
    src: sousse2,
    title: "Ribat of Sousse",
    description: "Climb ancient walls for panoramic Mediterranean views.",
    alt: "The ribat fortress in Sousse",
  },
  {
    src: sousse7,
    title: "The Corniche",
    description: "Cycle, jog or simply sip coffee by the waves.",
    alt: "The seafront promenade at Sousse",
  },
  {
    src: sousse1,
    title: "Sousse Beach",
    description: "Powder-soft sand and turquoise water steps from the city.",
    alt: "Sand and sea at Sousse",
  },
  {
    src: sousse4,
    title: "The Port",
    description: "Fishing boats, ferries and the working edge of the city.",
    alt: "The port at Sousse",
  },
  {
    src: sousse5,
    title: "Sousse by Night",
    description:
      "Neon lights reflect off the harbour for an evening to remember.",
    alt: "The harbour at Sousse after dark",
  },
  {
    src: bizerte1,
    title: "Bizerte Harbour",
    description:
      "Vibrant waterfront houses reflecting Tunisia's Mediterranean charm.",
    alt: "Colourful houses along the old harbour at Bizerte",
  },
  {
    src: bizerte2,
    title: "Northern Coast",
    description: "Crystal-clear turquoise water meets pristine sandy beaches.",
    alt: "Turquoise water and sand on Tunisia's northern coast",
  },
  {
    src: douz1,
    title: "The Sahara at Douz",
    description:
      "Camel trekking across golden dunes as the sun drops behind them.",
    alt: "Camels crossing dunes near Douz at sunset",
  },
  {
    src: zaghouan2,
    title: "Zaghouan",
    description:
      "Centuries-old archaeological treasures framed by mountain and pine.",
    alt: "Roman ruins framed by hills at Zaghouan",
  },
  {
    src: eljem1,
    title: "Inside El Jem",
    description:
      "Tiered stone seating that once held thirty thousand spectators.",
    alt: "The tiered seating inside the El Jem amphitheatre",
  },
];

const OurCountryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface text-white">
      <Navbar />

      <PortalCarousel images={images} label="Next" thumbWidth={200} />
    </div>
  );
};

export default OurCountryPage;
