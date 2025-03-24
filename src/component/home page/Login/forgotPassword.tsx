import { useState } from "react";
import axios from "axios";
import Navbar from "../HomePages/navBar";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [TPNumber, setTPNumber] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_LOGIN_PATH}/api/users/forgot-password`, { email, TPNumber }, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Failed to send reset email.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a] p-4">
      <Navbar />
      <div className="relative p-6 bg-white shadow-lg rounded-lg max-w-md w-full text-center font-serif">
        {/* Key Icon at the Top */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black p-4 rounded-full shadow-lg">
          <span role="img" aria-label="key" className="text-white text-2xl">🔑</span>
        </div>

        <h2 className="text-2xl font-bold text-black mt-6 mb-4">Forgot Password</h2>

        {message && <p className="text-red-500 mb-3">{message}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-70 p-3 border border-black rounded mb-3 focus:outline-none focus:ring-2 focus:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Enter your phone number"
            className="w-70 p-3 border border-black rounded mb-3 focus:outline-none focus:ring-2 focus:ring-black"
            value={TPNumber}
            onChange={(e) => setTPNumber(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-70 bg-black text-white p-3 rounded hover:bg-gray-800 transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
