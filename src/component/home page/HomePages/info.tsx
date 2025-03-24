import { useEffect, useState } from "react";
import axios from "axios";
import "animate.css";
import Navbar from "./navBar";

interface Worker {
  _id: string;
  name: string;
  position: string;
  image: string;
  description: string;
  credentials: string;
  rating: number;
  animationClass: string;
}

const WorkersPage: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_LOGIN_PATH}/api/information/team`);
        setWorkers(response.data);
      } catch (err) {
        setError("Failed to load workers. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, []);

  // Function to render star ratings
  const renderStars = (rating: number) => {
    return (
      <div className="text-yellow-400">
        {"⭐".repeat(rating)}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 font-serif mt-15">
      <Navbar />
      <h2 className="text-3xl font-bold text-center mb-10 animate__animated animate__fadeInDown">
        Meet Our Experts
      </h2>

      {loading ? (
        <p className="text-gray-400 text-center">Loading workers...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-20">
          {workers.map((worker) => (
            <div
              key={worker._id}
              className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 animate__animated ${worker.animationClass}`}
            >
              <img src={worker.image} alt={worker.name} className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">{worker.name}</h3>
                <h4 className="text-gray-400 mb-4">{worker.position}</h4>
                <p className="text-gray-300 text-sm mb-4">{worker.description}</p>
                <p className="text-gray-500 text-xs mb-4">{worker.credentials}</p>
                {renderStars(worker.rating)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkersPage;
