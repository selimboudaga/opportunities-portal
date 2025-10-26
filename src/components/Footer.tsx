// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-500 text-white py-8 flex static bottom-0 w-full z-10">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} AIESEC Hadrumet. All rights reserved.</p>
        <p className="mt-2">Contact us: info@aiesechadrumet.com</p>
      </div>
    </footer>
  );
};

export default Footer;