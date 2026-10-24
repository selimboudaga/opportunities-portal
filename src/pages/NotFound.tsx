import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow flex flex-col items-center justify-center px-6 text-center">
        <p className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00B8DB] via-[#FF6467] to-[#FF8904]">
          404
        </p>
        <h1 className="mt-6 text-3xl font-bold text-white">Page not found</h1>
        <p className="mt-4 text-gray-400 max-w-md">
          The page you’re looking for doesn’t exist or has moved. Let’s get you
          back to discovering opportunities in Sousse.
        </p>

        <Link
          to="/"
          className="mt-10 inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-full font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
