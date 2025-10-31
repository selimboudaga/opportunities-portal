import Navbar from "../components/Navbar";
import Header from "../components/Header";
import AboutSousse from "../components/AboutSousse";
import Footer from "../components/Footer";
import ScrollVelocity from "@/components/AnimationScrollSection";
import { ProgramsSection } from "@/components/ProgramSection";

const Home: React.FC = () => {
  return (
    <div style={{ backgroundColor: "#060010" }}>
      <Navbar />
      <div className="relative h-screen flex items-center pt-20 pb-12">
        <div className="absolute inset-0 z-0">
          <Header
            colorStops={["#FF6467", "#00B8DB", "#FF8904"]}
            blend={0.42}
            amplitude={0.8}
            speed={0.5}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-4">
              <span className="inline-block px-4 py-1 bg-blue-500 text-white text-sm font-medium rounded-full mb-4">
                AIESEC in Hadrumet
              </span>
            </div>
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
              Discover Global Opportunities
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                in the Heart of Tunisia
              </span>
            </h1>
            <p className="text-gray-300 text-xl mb-8 max-w-3xl mx-auto">
              Experience transformative journeys through Global Talent, Global
              Volunteer, and Global Teaching opportunities in the beautiful city
              of Sousse
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-full font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 cursor-pointer ">
                Explore Opportunities
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
                About Sousse
              </button>
            </div>
            <div className="mt-8 flex gap-8 justify-center">
              <div className="text-center">
                <h3 className="text-[#00B8DB] font-bold text-xl">
                  Global Talent
                </h3>
                <p className="text-gray-300 text-sm">
                  Professional Internships
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-[#FF6467] font-bold text-xl">
                  Global Volunteer
                </h3>
                <p className="text-gray-300 text-sm">Social Impact Projects</p>
              </div>
              <div className="text-center">
                <h3 className="text-[#FF8904] font-bold text-xl">
                  Global Teacher
                </h3>
                <p className="text-gray-300 text-sm">Educational Experiences</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 text-center">
        <div className="mb-14 space-y-4">
          <h2 className="text-4xl font-normal text-white">
            About to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6467] to-[#FF8904]">
              Sousse
            </span>
          </h2>
        </div>
        <AboutSousse />

        <div className="max-w-4xl mx-auto mt-36 px-4 text-center">
          <div className="space-y-12">
            {/* Main Title */}
            <div className="space-y-4">
              <h2 className="text-5xl font-semibold bg-gradient-to-r from-[#00B8DB] via-[#FF6467] to-[#FF8904] text-transparent bg-clip-text">
                Where History Meets Future
              </h2>
              <p className="text-2xl text-gray-300 font-light">
                The Mediterranean's Hidden Gem
              </p>
            </div>

            {/* Description Paragraphs */}
            <div className="space-y-8">
              <p className="text-gray-300 text-lg leading-relaxed">
                Sousse, Tunisia's pearl of the Sahel, is a city where 3,000
                years of history blend seamlessly with modern life. Our
                UNESCO-listed medina stands as a testament to centuries of rich
                cultural heritage, while our sun-kissed Mediterranean beaches
                offer the perfect backdrop for contemporary coastal living.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                As a thriving educational and economic hub, Sousse has emerged
                as a beacon for international talent. Here, ancient wisdom meets
                modern innovation, creating unique opportunities for cultural
                exchange and professional growth. Our city's warm hospitality
                and dynamic atmosphere make it an ideal destination for those
                seeking both personal and professional transformation.
              </p>
            </div>

            {/* Stats Section */}
            <div className="pt-3">
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center ">
                  <h4 className="text-3xl font-normal text-[#FF6467] mb-2">
                    300+
                  </h4>
                  <p className="text-gray-300">Sunny Days/Year</p>
                </div>
                <div className="text-center ">
                  <h4 className="text-3xl font-normal text-[#00B8DB] mb-2">
                    1.2M
                  </h4>
                  <p className="text-gray-300">Annual Visitors</p>
                </div>
                <div className="text-center ">
                  <h4 className="text-3xl font-normal text-[#FF8904] mb-2">
                    3000
                  </h4>
                  <p className="text-gray-300">Years of History</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" my-60">
        <ScrollVelocity
          texts={[
            "Sousse", // Latin
            "سوسة", // Arabic
            "Σούς", // Greek-ish transliteration
            "スース", // Japanese Katakana (sūsu)
            "苏斯", // Chinese simplified (approx.)
            "सूसे", // Devanagari (Hindi)
            "சூஸ்",
            "سوسه",  // Tamil approximation
            "Susa", // Latin variant
          ]}
          velocity={100}
          className="custom-scroll-text"
        />
      </div>
      <div className="">
        <ProgramsSection />
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;
