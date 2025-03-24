import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../HomePages/navBar';

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<{ username: string; email: string; TPNumber: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [updatedUser, setUpdatedUser] = useState<{ username: string; email: string; TPNumber: string }>({
    username: '',
    email: '',
    TPNumber: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('User not authenticated');
          return;
        }
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken.userId;
        const response = await axios.get(`${import.meta.env.VITE_LOGIN_PATH}/api/users/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
        setUpdatedUser(response.data);
      } catch (error: any) {
        setError(error.response?.data?.message || 'Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not authenticated');
        return;
      }
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userId = decodedToken.userId;
      const response = await axios.put(
        `${import.meta.env.VITE_LOGIN_PATH}/api/users/user/${userId}`,
        updatedUser,
        { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }
      );
      setUser(response.data.user);
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to update user data');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;
  if (error) return <div className="text-white text-center mt-10">{error}</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-black font-serif">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h1 className="text-2xl font-bold text-center mb-4">User Profile</h1>
        {user && !editing ? (
          <div>
            {/*display default profile photo */}
            <img
              src="https://img.freepik.com/free-vector/young-boy-vector-illustration_1308-175902.jpg?t=st=1742284049~exp=1742287649~hmac=3b16b4c60d1b94195ac1f7520ca6e79d1521eff30b3195dc770fd1134533d87c&w=1060"
              alt="Default Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <p className="mb-2"><strong>Username:</strong> {user.username}</p>
            <p className="mb-2"><strong>Email:</strong> {user.email}</p>
            <p className="mb-4"><strong>TP Number:</strong> {user.TPNumber}</p>
            <p className="mb-4 text-center underline cursor-pointer " onClick={() => navigate('/feedback')}> Add your valuable feedback to our website</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setEditing(true)}
              className="w-full bg-black text-white hover:bg-gray-300 font-semibold py-2 rounded-lg transition duration-200"
            >
              Edit Profile
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="w-full mt-2 bg-gray-700 text-white hover:bg-gray-600 font-semibold py-2 rounded-lg transition duration-200"
            >
              Logout
            </motion.button>
          </div>
        ) : (
          <div>
            <input
              type="text"
              name="username"
              value={updatedUser.username}
              onChange={handleChange}
              className="w-full mb-2 p-2 rounded bg-white text-black border-1"
              placeholder="Username"
            />
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleChange}
              className="w-full mb-2 p-2 rounded bg-white text-black border-1"
              placeholder="Email"
            />
            <input
              type="text"
              name="TPNumber"
              value={updatedUser.TPNumber}
              onChange={handleChange}
              className="w-full mb-4 p-2 rounded bg-white text-black border-1"
              placeholder="Telephone Number"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUpdateProfile}
              className="w-full bg-black text-white hover:bg-gray-300 font-semibold py-2 rounded-lg transition duration-200 mb-2"
            >
              Save Changes
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setEditing(false)}
              className="w-full bg-gray-700 text-white hover:bg-gray-600 font-semibold py-2 rounded-lg transition duration-200"
            >
              Cancel
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default UserProfile;
