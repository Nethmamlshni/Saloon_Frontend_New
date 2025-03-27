import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../HomePages/navBar";

function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!token) {
      setMessage("Invalid or missing reset token.");
      return;
    }

    if (newPassword.length < 7) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LOGIN_PATH}/api/users/reset-password`,
        { token, newPassword },
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "An unexpected error occurred.");
    }
  };

  const homePage = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#090808] p-4 ">
      <Navbar />
      <div className="relative p-6 bg-white shadow-lg rounded-lg max-w-md w-full text-center font-serif">
        {/* Key Icon at the Top */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black p-4 rounded-full shadow-lg">
          <span role="img" aria-label="key" className="text-white text-2xl">🔑</span>
        </div>

        <h2 className="text-2xl font-bold  text-black mt-6 mb-4">Reset Password</h2>

        {message && <p className="text-black mb-3">{message}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            className="w-70 p-3 border border-black rounded mb-3 focus:outline-none focus:ring-2 focus:ring-black"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-70 bg-black text-white p-3 rounded hover:bg-gray-800 transition"
          >
            Reset Password
          </button>

          <p className="text-black cursor-pointer underline mt-3" onClick={homePage}>
            Back to Home
          </p>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
