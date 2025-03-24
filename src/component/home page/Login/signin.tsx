import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface SigninProps {
  onSuccess: () => void; // Callback function on successful login
}

function Signin({ onSuccess }: SigninProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Email validation function
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_LOGIN_PATH}/api/users/login`, {
        email,
        password,
      });

      console.log("Login successful:", response.data);
      alert("Login successful. Welcome!");

      localStorage.setItem("token", response.data.token);
      if (email === "dasunpramuditha2003@gmail.com") {
        navigate("/adminhome");
    } else {
        onSuccess();
        setTimeout(() => navigate("/"), 100);
    }
} catch (error) {
    if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Login failed. Try again.");
    } else {
        setError("An unknown error occurred. Please try again.");
    }
}
};

  return (
    <motion.div
      className="flex items-center justify-center  "
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
        <h2 className="text-xl font-bold text-center text-gray-800 mb-1">
          Login Form
        </h2>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="relative mb-2">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="absolute left-3 top-3 text-gray-600">📧</span>
          </div>

          <div className="relative mb-2">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="absolute left-3 top-3 text-gray-600">🔒</span>
          </div>

          <div className="flex justify-between items-center mb-4">
            <a
              href="#"
              className="text-gray-700 hover:underline"
              onClick={(e) => {
                e.preventDefault();
                navigate("/forgot-password");
              }}
            >
              Forgot password?
            </a>
          </div>

          <motion.button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default Signin;
