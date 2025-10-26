import Navbar from '../components/Navbar';
import Header from '../components/Header';
import AboutSousse from '../components/AboutSousse';
import AnimatedScrollSection from '../components/AnimationScrollSection';
import ProgramsSection from '../components/ProgramSection';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <AboutSousse />
      <AnimatedScrollSection />
      <ProgramsSection />
      <Footer />
    </div>
  );
};

export default Home;