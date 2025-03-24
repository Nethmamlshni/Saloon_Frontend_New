import React from "react";
import { FaChair, FaComments } from "react-icons/fa";
import { SiGroupon } from "react-icons/si";
import { motion } from "framer-motion";

const HomeimagePage: React.FC = () => {
    const HandleChangeBook = () => {
        window.location.href = "/booking";
    }
      // Define the animation variants
      const headerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
      };

      const buttonVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      };

    const HandleChangePrice = () => {
        window.location.href = "/pricelist";
    }
    const HandleChangeServices = () => {
        window.location.href = "/services";
    }
    const HandleChangeInfo = () => {
        window.location.href = "/workers";
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      {/* Logo & Welcome Message */}
      <div className="text-center">
      <motion.h1
        className="text-2xl font-light text-white"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.2 }} // Add delay for staggered effect
      >
        Welcome to
      </motion.h1>
      <motion.h2
        className="text-6xl italic font-bold text-white"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.4 }} // Different delay for the second heading
      >
        𝓢𝓪𝓵𝓸𝓷 <span className="text-gray-300">𝓨𝓪𝓹𝓪</span>
      </motion.h2>
    </div>

      {/* Buttons */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
      <motion.div
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.2 }} // Delay for the first button
      >
        <Button icon={<FaChair />} text="Appointment" onClick={() => HandleChangeBook()} />
      </motion.div>
      <motion.div
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.4 }} // Delay for the second button
      >
        <Button icon={<SiGroupon />} text="Our Price List" onClick={() => HandleChangePrice()} />
      </motion.div>
      <motion.div
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.6 }} // Delay for the third button
      >
        <Button icon={<FaChair />} text="Our Services" onClick={() => HandleChangeServices()} />
      </motion.div>
      <motion.div
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.8 }} // Delay for the fourth button
      >
        <Button icon={<FaComments />} text="Salon Information" onClick={() => HandleChangeInfo()} />
      </motion.div>
    </div>
    </div>
  );
};

interface ButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon, text, onClick }) => {
  return (
    <button 
    onClick={onClick}
    className="flex flex-col items-center justify-center p-3 border border-white rounded-lg shadow-md bg-black hover:bg-gray-800 transition duration-300 w-36">
      <div className="text-3xl text-white">{icon}</div>
      <span className="mt-2 font-medium text-white">{text}</span>
    </button>
  );
};

export default HomeimagePage;
