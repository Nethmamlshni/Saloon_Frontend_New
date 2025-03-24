import React, { useState } from "react";
import axios from "axios";
import Navbar from "./navBar";

interface BookingProps {
  onSuccess?: () => void;
}

function Booking({ onSuccess }: BookingProps) {
  const [bookingData, setBookingData] = useState({
    customerName: "",
    phone: "",
    date: "",
    time: "",
    note: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    console.log("Sending booking data:", bookingData);
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LOGIN_PATH}/api/bookings/booking`,
        bookingData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      alert("Booking Submitted Successfully!");

      setBookingData({
        customerName: "",
        phone: "",
        date: "",
        time: "",
        note: "",
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      console.error("Booking Error:", err);
      setError(err.response?.data?.error || "Failed to submit booking. Please try again.");
      alert("Failed to submit booking. Please log in first.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-6 bg-black">
      <Navbar />
      <div className="bg-black bg-opacity-75 text-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center font-serif">Book an Appointment</h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center font-serif">
          <input
            type="text"
            name="customerName"
            placeholder="Your Name"
            className="p-3 m-2 border border-gray-500 rounded-lg w-full bg-white text-black"
            value={bookingData.customerName}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="p-3 m-2 border border-gray-500 rounded-lg w-full bg-white text-black"
            value={bookingData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            className="p-3 m-2 border border-gray-500 rounded-lg w-full bg-white text-black "
            value={bookingData.date}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="time"
            className="p-3 m-2 border border-gray-500 rounded-lg w-full bg-white text-black"
            value={bookingData.time}
            onChange={handleChange}
            required
          />
          <textarea
            name="note"
            placeholder="Additional Notes"
            className="p-3 m-2 border border-gray-500 rounded-lg w-full bg-white text-black"
            value={bookingData.note}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-white text-black font-bold p-3 m-2 rounded-lg w-full hover:bg-gray-600 transition border border-white"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Book Now"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </div>
    </div>
  );
}

export default Booking;
