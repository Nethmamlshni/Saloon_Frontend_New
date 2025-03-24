import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Import menu icons

function Adminhomepage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className=" bg-gray-100 font-serif">
      {/* Navbar */}
      <nav className="bg-black text-white p-6">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-xl font-bold">Admin Panel</h1>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 ">
            <li>
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/adminbooking" className="hover:text-gray-300">
                Booking
              </Link>
            </li>
            <li>
              <Link to="/adminfeedback" className="hover:text-gray-300">
                Feedback
              </Link>
            </li>
            <li>
              <Link to="/admininfor" className="hover:text-gray-300">
                Information
              </Link>
            </li>
            <li>
              <Link to="/adminpricelist" className="hover:text-gray-300">
                Price List
              </Link>
            </li>
            <li>
              <Link to="/adminservices" className="hover:text-gray-300">
                Services
              </Link>
            </li>
            
          </ul>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <ul className="md:hidden   flex flex-col items-center  py-4 space-y-4">
            <li>
              <Link
                to="/"
                className=" hover:text-gray-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/adminbooking"
                className=" hover:text-gray-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Booking
              </Link>
            </li>
            <li>
              <Link
                to="/adminfeedback"
                className=" hover:text-gray-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Feedback
              </Link>
            </li>
            <li>
              <Link
                to="/admininfor"
                className=" hover:text-gray-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Information
              </Link>
            </li>
            <li>
              <Link
                to="/adminpricelist"
                className=" hover:text-gray-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Price List
              </Link>
            </li>
            <li>
              <Link
                to="/adminservices"
                className=" hover:text-gray-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
}

export default Adminhomepage;
