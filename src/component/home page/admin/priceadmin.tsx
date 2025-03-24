import { useEffect, useState } from "react";
import axios from "axios";
import Adminhomepage from "./adminHomepage";

interface PriceItem {
  _id: string;
  name: string;
  price: number;
  image: string;
}

function AdminPrice() {
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | string>(""); 
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentPriceId, setCurrentPriceId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_LOGIN_PATH}/api/price/prices`);
        setPrices(response.data);
      } catch (err) {
        setError("Failed to load price list.");
      }
    };
    fetchPrices();
  }, []);

  // Function to add a new price
  const addPrice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !image) {
      setError("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_LOGIN_PATH}/api/price/prices`, {
        name,
        price,
        image,
      });
      setPrices([...prices, response.data.newPrice]);
      setName("");
      setPrice("");
      setImage(""); 
    } catch (err) {
      setError("Failed to add price.");
    }
  };

  // Function to delete a price
  const deletePrice = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_LOGIN_PATH}/api/price/prices/${id}`);
      setPrices(prices.filter((item) => item._id !== id));
    } catch (err) {
      setError("Failed to delete price.");
    }
  };

  // Function to enable editing mode
  const enableEditMode = (item: PriceItem) => {
    setEditMode(true);
    setName(item.name);
    setPrice(item.price);
    setImage(item.image);
    setCurrentPriceId(item._id);
  };

  // Function to update a price
  const updatePrice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !image || !currentPriceId) {
      setError("All fields are required!");
      return;
    }

    try {
      const response = await axios.put(`${import.meta.env.VITE_LOGIN_PATH}/api/price/prices/${currentPriceId}`, {
        name,
        price,
        image,
      });
      setPrices(prices.map((item) => (item._id === currentPriceId ? response.data.updatedPrice : item)));
      resetForm();
    } catch (err) {
      setError("Failed to update price.");
    }
  };

  // Reset the form to default state
  const resetForm = () => {
    setEditMode(false);
    setName("");
    setPrice("");
    setImage("");
    setCurrentPriceId(null);
  };

  return (
    <>
      <Adminhomepage />
      <div className="min-h-screen bg-gray-100 font-serif p-6">
        {error && <p className="text-red-500">{error}</p>}

        {/* Add / Update Price Form */}
        <div className="form-container bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto mb-4">
          <h2 className="text-xl font-semibold mb-2 text-center">{editMode ? "Update Price" : "Add New Price"}</h2>
          <form onSubmit={editMode ? updatePrice : addPrice} className="space-y-4">
            <input
              type="text"
              placeholder="Service Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300  p-2 w-full rounded-lg"
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300  p-2 w-full rounded-lg"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="border border-gray-300  p-2 w-full rounded-lg"
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700 w-full"
            >
              {editMode ? "Update Price" : "Add Price"}
            </button>
            {editMode && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-4 py-2 rounded mt-2 w-full"
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* Price List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prices.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold mt-2">{item.name}</h2>
              <p className="text-gray-600">Rs. {item.price}</p>
              <button
                onClick={() => enableEditMode(item)}
                className="bg-green-500 text-white px-5 py-1 mt-2 mx-2 rounded hover:bg-green-700"
              >
                Edit
              </button>
              <button
                onClick={() => deletePrice(item._id)}
                className="bg-red-500 text-white px-3 py-1 mt-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AdminPrice;
