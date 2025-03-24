import  { useEffect } from "react";
import { motion } from "framer-motion";
import Adminhomepage from "./adminHomepage"; 

function Adminhomepages() {
  useEffect(() => {
    // You can add any additional effect or logic here.
    console.log("Admin homepage loaded!");
  }, []);

  return (
    <div>
        <Adminhomepage />
    <div className="min-h-screen font-serif bg-white text-black flex flex-col items-center justify-center">
      {/* Animated container for the homepage */}
      <motion.div
        className="flex flex-col items-center justify-center text-center space-y-6 p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-mono font-bold text-black animate__animated animate__fadeIn">Welcome Admin Dashboard</h1>
        <p className="text-xl text-gray-300">Manage all the services, prices, and more!</p>
        
        {/* Admin Homepage Section */}
        <div className="mt-8">
          
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="mt-16 text-center py-4 text-gray-400">
      <p className="mt-6 text-gray-400">&copy; 2025 Saloon Yapa. All rights reserved.</p>
      </footer>
    </div>
    </div>
  );
}

export default Adminhomepages;
