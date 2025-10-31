// src/components/Navbar.tsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="fixed top-2 left-0 w-full z-50 ">
      <div className="max-w-7xl bg-transparent backdrop-blur-md   rounded-full border border-white/20 mx-auto pl-1.5 pr-6 py-1.5 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/Logo.png" alt="Logo" className=" size-11 rounded-full" />
          <span className="text-white text-xl font-semibold tracking-wide">
             <span className=" text-[#037EF3]">AIESEC</span>  Hadrumet
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 items-center text-white">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative transition-colors ${
                  isActive
                    ? "text-[#037EF3] after:w-full"
                    : "hover:text-[#037EF3"
                } after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-[#037EF3] after:w-0 hover:after:w-full after:transition-all after:duration-300`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/our-country"
              className={({ isActive }) =>
                `relative transition-colors ${
                  isActive
                    ? "text-[#037EF3] after:w-full"
                    : "hover:text-[#037EF3]"
                } after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-[#037EF3] after:w-0 hover:after:w-full after:transition-all after:duration-300`
              }
            >
              Our Country
            </NavLink>
          </li>

          {/* Dropdown */}
          <li className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-1 hover:text-[#037EF3] transition-colors"
            >
              <span>Our Programs</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <ul className="absolute top-10 left-0 w-48 bg-black/60 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg py-2 text-sm">
                <li>
                  <NavLink
                    to="/our-programs/talent"
                    className={({ isActive }) =>
                      `block px-4 py-2 transition-colors ${
                        isActive
                          ? "text-[#037EF3]"
                          : "text-white hover:text-[#037EF3]"
                      }`
                    }
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Global Talent
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/our-programs/volunteer"
                    className={({ isActive }) =>
                      `block px-4 py-2 transition-colors ${
                        isActive
                          ? "text-[#037EF3]"
                          : "text-white hover:text-[#037EF3]"
                      }`
                    }
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Global Volunteer
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/our-programs/teaching"
                    className={({ isActive }) =>
                      `block px-4 py-2 transition-colors ${
                        isActive
                          ? "text-[#037EF3]"
                          : "text-white hover:text-[#037EF3]"
                      }`
                    }
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Global Teacher
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      
    </nav>
  );
};

export default Navbar;
