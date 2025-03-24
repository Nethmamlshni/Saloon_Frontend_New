import { useEffect, useState } from "react";
import axios from "axios";
import Adminhomepage from "./adminHomepage";
interface Booking {
  _id: string;
  customerName: string;
  phone: string;
  date: string;
  time: string;
  note: string;
  type: string;
}

function Adminbooking() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_LOGIN_PATH}/api/bookings/booking`);
           console.log(response.data);
          // Filter out confirmed bookings
          const filteredBookings = response.data.filter((booking: Booking) => booking.type !== "confirm");
      
          // Update state with only non-confirmed bookings
          setBookings(filteredBookings);
          
        } catch (err) {
          setError("Failed to load bookings. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      
    fetchBookings();
  }, []);

  const confirmBooking = async (_id: string) => {
    try {
        // Make a request to confirm the booking (API call to update the booking type)
        const response = await axios.put(`${import.meta.env.VITE_LOGIN_PATH}/api/bookings/booking/confirm/${_id}`);
    
        // Once confirmed, update the local state to reflect the booking with type = 'confirm'
        setBookings(bookings.map((booking) => 
          booking._id === _id ? { ...booking, type: "confirm" } : booking
        ));
    
      } catch (err) {
        setError("Failed to confirm booking. Please try again.");
      }
    };
  return (
    <div className="min-h-screen bg-gray-100  font-serif">
        <Adminhomepage />
      {loading ? (
        <p className="text-gray-600">Loading bookings...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-950 text-white">
              <tr>
                <th className="p-2 border">CustomerName</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Time</th>
                <th className="p-2 border">Note</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="text-center border-t">
                  <td className="p-2 border">{booking.customerName}</td>
                  <td className="p-2 border">{booking.phone}</td>
                  <td className="p-2 border">{new Date(booking.date).toLocaleDateString()}</td>
                  <td className="p-2 border">{booking.time}</td>
                  <td className="p-2 border">{booking.note}</td>
                  <td className="p-2 border">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded"
                      onClick={() => confirmBooking(booking._id)}
                    >
                      Confirm
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

export default Adminbooking;
