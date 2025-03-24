import React, { useEffect, useState } from "react";
import axios from "axios";
import "animate.css";
import Navbar from "./navBar";

interface Service {
  _id: string;
  title: string;
  description: string;
  image: string;
}

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch services from the API when the component is mounted
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_LOGIN_PATH}/api/servises/service`);
        
        setServices(response.data);
      } catch (err) {
        setError("Failed to load services.");
      }
    };
    fetchServices();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6 mt-15">
        <h1 className="text-4xl font-serif text-center animate__animated animate__fadeInDown mb-8">Our Services</h1>
        
        {/* Display error if there is any */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInUp"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-52 object-cover rounded-lg mb-4 hover:opacity-80 transition-opacity duration-300"
              />
              <h3 className="text-2xl font-serif font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-300 font-serif">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
