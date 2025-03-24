import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../HomePages/navBar";

const Feedback = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rate: 0,
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not authenticated");
          return;
        }
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userId = decodedToken.userId;

        const { data } = await axios.get(
          `${import.meta.env.VITE_LOGIN_PATH}/api/users/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(data);
        setFormData((prevData) => ({
          ...prevData,
          email: data.email,
        }));
      } catch (error: any) {
        setError(error.response?.data?.message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRating = (rate: number) => {
    if (rate >= 0 && rate <= 5) {
      setFormData({ ...formData, rate });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_LOGIN_PATH}/api/feedbacks/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setResponseMessage("Thank you for your feedback!");
        setFormData({ name: "", email: user?.email, message: "", rate: 0 });
        alert("Feedback submitted successfully!");
        navigate("/profile");
      } else {
        const errorData = await response.json();
        setResponseMessage(errorData.error || "Failed to submit feedback.");
      }
    } catch (error) {
      setResponseMessage("Error submitting feedback. Please try again.");
    }
  };

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <motion.section
        id="feedback"
        className="p-6 rounded-lg shadow-lg m-auto bg-black text-white max-w-md border"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mt-25 items-center justify-center font-serif">
          <h2 className="text-2xl font-semibold mb-6 text-center">Feedback Form</h2>
          <motion.form className="space-y-4" onSubmit={handleSubmit}>
            <p className="text-center text-lg mb-4">
              Please let us know how we can improve our service. Your feedback is important to us!
            </p>
            <div>
              <label htmlFor="name" className="text-sm font-semibold">Name:</label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border border-gray-400 rounded-md bg-gray-100 text-black"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-semibold">Email:</label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-400 rounded-md bg-gray-100 text-black"
                value={formData.email}
                readOnly
              />
            </div>
            {/* Rating Section */}
            <div className="flex justify-center mt-4">
              {[1, 2, 3, 4, 5].map((rate) => (
                <button
                  key={rate}
                  className={`text-2xl ${rate <= formData.rate ? "text-yellow-400" : "text-white"}`}
                  onClick={() => handleRating(rate)}
                >
                  {rate <= formData.rate ? "★" : "☆"}
                </button>
              ))}
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-semibold">Message:</label>
              <textarea
                id="message"
                className="w-full p-2 border border-gray-400 rounded-md bg-gray-100 text-black"
                placeholder="Enter Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <motion.button type="submit" className="w-full bg-white text-black p-3 rounded-md mt-4 hover:bg-gray-800">
              Submit
            </motion.button>
          </motion.form>
          {responseMessage && <p className="text-center mt-4 text-lg">{responseMessage}</p>}
        </div>
      </motion.section>
    </div>
  );
};

export default Feedback;
