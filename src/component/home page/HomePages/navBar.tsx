import { FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import Register from "../Login/register";
import Signin from "../Login/signin";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state
  const navigate = useNavigate(); // For navigation

  // Check if the user is authenticated by looking for a token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);
  
  
  const handleProfilePage = () => {
    navigate("/profile");
  };

  return (
    <>
      {/* Navbar */}
      <motion.nav 
  className="p-4 flex  justify-between items-center text-white  bg-black fixed top-0 left-0 w-full z-50 shadow-lg"  
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <h1 className="text-2xl font-bold text-black"></h1> 

  <div className="flex space-x-6 ">
    {isAuthenticated ? (
      <div className="flex items-center space-x-4">
         <p className="font-bold  font-serif text-white mr-6 mt-5 cursor-pointer hover:underline" onClick={() => navigate("/")}>Home </p>
        <span 
        className="text-3xl text-white cursor-pointer hover:text-gray-600 transition mr-6 mt-5"
        onClick={() => handleProfilePage()}
        >
          <FaUser />
        </span>
       
        
      </div>
    ) : (
      <div className="flex items-center space-x-4">
         <p className="font-bold  font-serif text-white mr-6 mt-5 cursor-pointer hover:underline" onClick={() => navigate("/")}>Home </p>
      <span 
        className="text-3xl text-white cursor-pointer hover:text-gray-600 transition  mr-6 mt-5"
        onClick={() => setIsLoginOpen(true)}
      >
        <FaUser />
      </span>
      </div>
    )}
  </div>

</motion.nav>


      {/* Login & Register Modal */}
      {isLoginOpen && !isAuthenticated && (
  <motion.div 
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={() => setIsLoginOpen(false)}
  >
    <motion.div 
      className="bg-black p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 flex flex-col sm:flex-row"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()} 
    >
      {/* Register Form */}
      <div className="m-auto sm:w-1/2  sm:border-b-0 sm:border-r">
        <Register onSuccess={() => setIsLoginOpen(false)} />
      </div>
      
      {/* Login Form */}
      <div className=" sm:w-1/2 p-4 m-auto">
        <Signin onSuccess={() => setIsLoginOpen(false)} />
      </div>
    </motion.div>
  </motion.div>
)}

    </>
  );
}

export default Navbar;
