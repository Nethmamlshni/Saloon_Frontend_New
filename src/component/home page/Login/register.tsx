import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

interface RegisterProps {
  onSuccess: () => void;
}

function Register({ onSuccess }: RegisterProps) {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    TPNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPassword = e.target.value;

    if (registerData.password !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      setError(null);
    }

    setRegisterData({ ...registerData, confirmPassword });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LOGIN_PATH}/api/users/register`,
        registerData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Registration Success:", response.data);
      alert("Registration successful. Please login.");
      onSuccess();
    } catch (error: any) {
      console.error("Registration Error:", error);
      setError(
        error.response?.data?.error || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center  sm:px-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
      >
        <h2 className="text-xl font-bold text-center text-gray-800 mb-2">
          Register
        </h2>

        {error && <p className="text-red-600 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="relative mb-2">
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600"
              value={registerData.username}
              onChange={handleChange}
              required
            />
            <span className="absolute left-3 top-3 text-gray-600">👤</span>
          </div>

          <div className="relative mb-2">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600"
              value={registerData.email}
              onChange={handleChange}
              required
            />
            <span className="absolute left-3 top-3 text-gray-600">📧</span>
          </div>

          <div className="relative mb-2">
            <input
              type="password"
              name="password"
              placeholder="Password (min 8 chars)"
              className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600"
              value={registerData.password}
              onChange={handleChange}
              required
              minLength={8}
            />
            <span className="absolute left-3 top-3 text-gray-600">🔒</span>
          </div>

          <div className="relative mb-2">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600"
              value={registerData.confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              minLength={8}
            />
            <span className="absolute left-3 top-3 text-gray-600">🔒</span>
          </div>

          <div className="relative mb-2">
            <input
              type="text"
              name="TPNumber"
              placeholder="TP Number"
              className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600"
              value={registerData.TPNumber}
              onChange={handleChange}
              required
            />
            <span className="absolute left-3 top-3 text-gray-600">📞</span>
          </div>

          <motion.button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default Register;
