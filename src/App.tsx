// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OurCountryPage from './pages/OurCountry';
import TalentPage from './components/TalentPage';
import TeachingPage from './components/TeachingPage';
import VolunteerPage from './components/VolunteerPage';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Placeholder routes for other pages */}
        <Route path="/our-country" element={<OurCountryPage />} />
        <Route path="/our-programs/Talent" element={<TalentPage />} />
        <Route path="/our-programs/Volunteer" element={<VolunteerPage />} />
        <Route path="/our-programs/Teaching" element={<TeachingPage />} />
      </Routes>
    </Router>
  );
};

export default App;