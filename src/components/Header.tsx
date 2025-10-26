// src/components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="relative h-96 flex items-center justify-center">
      {/* Blurred background image as an absolutely-positioned element */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center filter blur-sm transform scale-105"
        style={{ backgroundImage: `url('/Sousse.jpeg')` }}
      />

      {/* Dark overlay to increase text contrast */}
      <div aria-hidden="true" className="absolute inset-0 bg-black[20%] bg-opacity-100" />

      <div className="relative z-20 text-center text-white p-8 rounded">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Sousse</h1>
        <p className="text-lg md:text-xl">Discover the Pearl of the Sahel</p>
      </div>
    </header>
  );
};

export default Header;