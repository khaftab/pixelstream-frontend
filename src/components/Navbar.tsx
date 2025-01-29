"use client";
import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-950 opacity-80 backdrop-blur-lg shadow-md fixed w-full top-0 z-50 border-b border-gray-800">
      <div className="container max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-100">
          {/* <span className="text-purple-700">Transcode</span>Pro */}
          <span>PixelStream</span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-8 font-sans text-blue-50">
          <a
            href="#"
            className="flex select-none items-center rounded-full px-4 py-1.5 opacity-100 hover:bg-white/15 hover:text-white"
          >
            Home
          </a>
          <a
            href="#"
            className="flex select-none items-center rounded-full px-4 py-1.5 opacity-100 hover:bg-white/15 hover:text-white"
          >
            Signin
          </a>
          <a
            href="#"
            className="flex select-none items-center rounded-full px-4 py-1.5 opacity-100 hover:bg-white/15 hover:text-white"
          >
            Signup
          </a>
          <button className="bg-gradient-to-r from-emerald-400 to-yellow-300 text-black text-md py-2 px-4 rounded-lg hover:opacity-90 transition-all duration-300 font-medium">
            Dashboard
          </button>
          {/* <a href="#" className="text-blue-100 hover:text-white transition duration-300 font-sans">
            Contact
          </a> */}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-blue-100 focus:outline-none" onClick={toggleMenu}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Links */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} bg-white shadow-lg`}>
        <a
          href="#"
          className="block px-6 py-2 text-blue-100 hover:bg-purple-50 hover:text-white transition duration-300"
        >
          Home
        </a>
        <a
          href="#"
          className="block px-6 py-2 text-blue-100 hover:bg-purple-50 hover:text-white transition duration-300"
        >
          Features
        </a>
        <a
          href="#"
          className="block px-6 py-2 text-blue-100 hover:bg-purple-50 hover:text-white transition duration-300"
        >
          Pricing
        </a>
        <a
          href="#"
          className="block px-6 py-2 text-blue-100 hover:bg-purple-50 hover:text-white transition duration-300"
        >
          Contact
        </a>
      </div>
    </header>
  );
};

export default Navbar;
