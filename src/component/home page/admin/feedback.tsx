import { useEffect, useState } from "react";
import axios from "axios";
import Adminhomepage from "./adminHomepage";

interface Feedback {
  _id: string;
  name: string;
  message: string;
  createdAt: string;
}

function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_LOGIN_PATH}/api/feedbacks/feedback`
        );
        setFeedbacks(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load feedbacks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  // Function to handle feedback deletion
  const deleteFeedback = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_LOGIN_PATH}/api/feedbacks/feedback/${id}`);
      setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback._id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete feedback. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-serif">
      <Adminhomepage />
      {loading && <p className="text-gray-600 text-center mt-4">Loading feedbacks...</p>}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4 mt-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-2 border">Customer Name</th>
                <th className="p-2 border">Feedback</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback) => (
                <tr key={feedback._id} className="text-center border-t">
                  <td className="p-2 border">{feedback.name}</td>
                  <td className="p-2 border">{feedback.message}</td>
                  <td className="p-2 border">{new Date(feedback.createdAt).toLocaleDateString()}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => deleteFeedback(feedback._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminFeedback;
