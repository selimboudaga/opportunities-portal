// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OurCountryPage from './pages/OurCountry';
import Program from './pages/Program';
import NotFound from './pages/NotFound';


const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/our-country" element={<OurCountryPage />} />
          {/* talent | volunteer | teaching — see src/data/programs.tsx */}
          <Route path="/our-programs/:slug" element={<Program />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
