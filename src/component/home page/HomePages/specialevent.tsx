import { motion } from "framer-motion";
import { useState } from "react";

const EventPage = () => {
  const images = [
    "https://img.freepik.com/free-photo/close-up-wet-hair-receiving-haircut_23-2148256885.jpg?w=1480",
    "https://img.freepik.com/free-photo/hairstylist-looking-client-mirror_23-2148242870.jpg?w=1480",
    "https://img.freepik.com/free-photo/man-checking-phone-while-getting-haircut_23-2148242784.jpg?w=826",
    "https://img.freepik.com/free-photo/customer-getting-wash-after-haircut_23-2148256876.jpg?w=1480",
    "https://img.freepik.com/free-photo/close-up-hairstylist-cutting-customer-hair_23-2148256892.jpg?w=1480",
    "https://img.freepik.com/free-photo/beautician-holding-ear-haircut_23-2148256898.jpg?w=1480",
    "https://img.freepik.com/free-photo/hairdresser-trimming-customer-hair_23-2148256894.jpg?w=1480",
    "https://img.freepik.com/free-photo/close-up-man-getting-haircut-with-trimmer_23-2148256902.jpg?w=826",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="p-6"
    >
      <motion.h1
        className="text-2xl font-bold text-center text-[#080808] mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Gallery Events
      </motion.h1>

      {/* Smaller Gallery Container */}
      <motion.div
        id="gallery"
        className="relative w-full max-w-2xl mx-auto"
        data-carousel="slide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
          <motion.div
            key={currentIndex}
            className="absolute block w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src={images[currentIndex]}
              alt={`Carousel Image ${currentIndex + 1}`}
              className="w-full h-auto rounded-lg"
            />
          </motion.div>
        </div>

        {/* Controls */}
        <button
          type="button"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30 p-2 rounded-full bg-gray-700 text-white hover:bg-gray-900"
          onClick={handlePrev}
        >
          ❮
        </button>

        <button
          type="button"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30 p-2 rounded-full bg-gray-700 text-white hover:bg-gray-900"
          onClick={handleNext}
        >
          ❯
        </button>
      </motion.div>

      <motion.p
        className="text-lg text-center text-[#050505] mt-6 max-w-xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        Because you deserve to shine wherever you go! At Saloon Yapa, we are here to make you look good and feel good.
      </motion.p>
    </motion.div>
  );
};

export default EventPage;
