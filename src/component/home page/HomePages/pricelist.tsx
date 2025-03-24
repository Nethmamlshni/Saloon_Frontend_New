import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./navBar";
import axios from "axios";

interface Service {
  _id: string;
  name: string;
  price: number;
  image: string;
}

const PriceList = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_LOGIN_PATH}/api/price/prices`);
        setServices(response.data);
      } catch (err) {
        console.error("Failed to load services", err);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="w-full bg-black text-black pt-6 h-screen shadow-lg flex flex-col">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-black text-white p-6 rounded-lg shadow-lg mt-6"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="text-2xl mb-6 text-center mt-6 font-serif"
        >
          Price List
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service._id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.img
                src={service.image}
                alt={service.name}
                className="w-full h-40 object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
              <div className="p-4 text-center">
                <motion.h3
                  className="text-lg font-semibold font-serif"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  {service.name}
                </motion.h3>
                <motion.p
                  className="text-blue-400 font-serif"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  Rs. {service.price}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PriceList;
