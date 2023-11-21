import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-300 mt-4 mx-5">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center py-3 px-8">
          <h1 className="text-4xl font-bold text-blue-950 hover:text-gray-400">
            FILEWUHA
          </h1>
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/"
              className="text-blue-950 font-bold py-4 px-8 text-lg hover:text-gray-400"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className="text-blue-950 font-bold py-4 px-8 text-lg hover:text-gray-400"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-blue-950 font-bold py-4 px-8 text-lg hover:text-gray-400"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-blue-950 font-bold py-4 px-8 text-lg hover:text-gray-400"
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
