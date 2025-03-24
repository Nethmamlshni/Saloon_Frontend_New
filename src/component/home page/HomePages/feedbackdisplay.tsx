import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const DisplayFeedback = () => {
  const [feedbackData, setFeedbackData] = useState<any[]>([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_LOGIN_PATH}/api/feedbacks/feedback`); 
        setFeedbackData(response.data); // Assuming the response is an array of feedback
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <motion.section
      id="feedback"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false }}
    >
      <motion.div
        className="flex space-x-8 overflow-x-auto py-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Loop through the feedback data */}
        {feedbackData.map((feedback, index) => (
          <motion.div
            key={index}
            className="bg-black text-white rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex-none w-80 pb-0 p-4 border border-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: index * 0.3 }} // Staggered animation for each feedback
          >
            <div className="flex items-center space-x-4">
              
              <div>
                <h4 className="font-semibold text-lg">{feedback.name}</h4>
                <p className="text-white text-sm">{new Date(feedback.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <p className="text-lg mt-4">{feedback.message}</p>
            <div className="flex items-center mt-2">
              {/* Display rating stars */}
              {[...Array(feedback.rate)].map((_, starIndex) => (
                <svg
                  key={starIndex}
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 15.27l4.95 2.61-1.26-5.27L18 7.74l-5.39-.47L10 2 7.39 7.27 2 7.74l3.31 4.87-1.26 5.27L10 15.27z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default DisplayFeedback;
