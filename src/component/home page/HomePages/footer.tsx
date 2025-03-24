import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaBehance } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <div className="bg-black text-white p-6 flex flex-col items-center mt-6 rounded-t-lg">
      <h2 className="text-3xl font-bold mb-4 ">𝓢𝓪𝓵𝓸𝓷  𝓨𝓪𝓹𝓪</h2>
      <p className="text-center max-w-lg">
        At Saloon Yapa, we pride ourselves on providing top-notch beauty and wellness services to our valued customers.
        Our experienced staff ensures that you receive the highest quality treatments in a relaxed and welcoming environment.
      </p>

      <div className="flex space-x-4 mt-4">
        <a href="#" className="text-white text-2xl hover:text-gray-400">
          <FaFacebookF />
        </a>
        <a href="#" className="text-white text-2xl hover:text-gray-400">
          <FaTwitter />
        </a>
        <a href="#" className="text-white text-2xl hover:text-gray-400">
          <FaInstagram />
        </a>
        <a href="#" className="text-white text-2xl hover:text-gray-400">
          <FaLinkedinIn />
        </a>
        <a href="#" className="text-white text-2xl hover:text-gray-400">
          <FaBehance />
        </a>
      </div>

      <p className="mt-6 text-gray-400">&copy; 2025 Saloon Yapa. All rights reserved.</p>
    </div>
  );
};

export default Footer;