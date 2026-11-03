// src/components/Navbar.tsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { programList } from "@/data/programs";
import heroMark from "@/assets/hero.png";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/our-country", label: "Our Country" },
  ...programList.map((program) => ({
    to: `/our-programs/${program.slug}`,
    label: program.title,
  })),
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="site-nav fixed inset-x-0 top-0 z-50 backdrop-blur-md">
      {/*
        The hero opens on off-white paper and turns dark as the camera passes
        through the word. Hero.tsx sets data-hero-paper on <html> while the
        paper is showing; everywhere else the bar is simply white on dark.
      */}
      <style>{`
        .site-nav { color: #ffffff; }
        .site-nav .site-nav-rule { background-color: rgba(255,255,255,.12); }
        html[data-hero-paper="true"] .site-nav { color: #070a12; }
        html[data-hero-paper="true"] .site-nav .site-nav-rule {
          background-color: rgba(7,10,18,.12);
        }
        /* The emblem is white artwork on transparent, so it would vanish
           against the hero's off-white paper. Invert it there. */
        .site-nav-mark { transition: filter .3s ease; }
        html[data-hero-paper="true"] .site-nav-mark { filter: invert(1); }
      `}</style>

      <div className="flex items-center justify-between px-6 py-4 lg:px-10">
        <NavLink to="/" className="flex items-center gap-2.5">
          <img src={heroMark} alt="" className="site-nav-mark size-12" />
          <span className="text-lg font-semibold tracking-wide">
            <span className="text-brand">AIESEC</span> Hadrumet
          </span>
        </NavLink>

        <ul className="hidden items-center gap-8 text-sm font-medium md:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `transition-opacity duration-200 hover:opacity-100 ${
                    isActive ? "opacity-100" : "opacity-65"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="site-nav-rule h-px w-full" />

      {/* Mobile menu — the old hamburger toggled state but rendered nothing. */}
      {open && (
        <ul className="flex flex-col gap-1 px-6 py-4 text-sm font-medium backdrop-blur-md md:hidden">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block py-2 transition-opacity duration-200 ${
                    isActive ? "opacity-100" : "opacity-65"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
