// src/components/Navbar.tsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav
      className="w-full text-white p-4 fixed top-0 z-10"
      style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.05))' }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <img src="/Logo.png" alt="Logo" className="h-8 inline-block mr-2" />
          AIESEC Sousse
        </h1>
        <ul className="flex space-x-6 items-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-yellow-400' : 'hover:text-yellow-400'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/our-country"
              className={({ isActive }) =>
                isActive ? 'text-yellow-400' : 'hover:text-yellow-400'
              }
            >
              Our Country
            </NavLink>
          </li>
          <li className="relative">
            <button
              onClick={toggleDropdown}
              className="focus:outline-none hover:text-yellow-400"
            >
              Our Programs
              <svg
                className={`w-4 h-4 inline-block ml-1 transition-transform ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <ul className="absolute top-full left-0 mt-2 w-40 bg-transparent-500 bg-opacity-90 rounded-md shadow-lg py-2 z-20">
                <li>
                  <NavLink
                    to="/our-programs/talent"
                    className={({ isActive }) =>
                      isActive
                        ? 'block px-4 py-2 text-yellow-400'
                        : 'block px-4 py-2 hover:text-yellow-400'
                    }
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Talent
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/our-programs/volunteer"
                    className={({ isActive }) =>
                      isActive
                        ? 'block px-4 py-2 text-yellow-400'
                        : 'block px-4 py-2 hover:text-yellow-400'
                    }
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Volunteer
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/our-programs/teaching"
                    className={({ isActive }) =>
                      isActive
                        ? 'block px-4 py-2 text-yellow-400'
                        : 'block px-4 py-2 hover:text-yellow-400'
                    }
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Teaching
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;