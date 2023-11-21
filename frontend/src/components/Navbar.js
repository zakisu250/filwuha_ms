import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-gray-500 p-4 py-4 px-3">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center py-4 px-8 text-black hover:text-gray-400"
        >
          <h1 className="text-2xl font-bold">FILEWUHA</h1>
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="py-4 px-8 text-black hover:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className="py-4 px-8 text-black hover:text-gray-400"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="py-4 px-8 text-black hover:text-gray-400"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="py-4 px-8 text-black hover:text-gray-400"
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
