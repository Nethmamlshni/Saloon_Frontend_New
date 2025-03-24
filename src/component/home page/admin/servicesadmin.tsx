import React, { useEffect, useState } from "react";
import axios from "axios";
import Adminhomepage from "./adminHomepage";

interface Service {
  _id: string;
  title: string;
  description: string;
  image: string;
}

function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Fetch services on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_LOGIN_PATH}/api/servises/service`);
        setServices(response.data);
      } catch (err) {
        setError("Failed to load services.");
      }
    };
    fetchServices();
  }, []);

  // Add a new service
  const addService = async () => {
    if (!title || !description || !image) {
      setError("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_LOGIN_PATH}/api/servises/service`, {
        title,
        description,
        image,
      });
      setServices([...services, response.data]);
      setTitle("");
      setDescription("");
      setImage("");
      setError("");
    } catch (err) {
      setError("Failed to add service.");
    }
  };

  // Update an existing service
  const updateService = async () => {
    if (!editingService) return;
    if (!title || !description || !image) {
      setError("All fields are required!");
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_LOGIN_PATH}/api/servises/service/${editingService._id}`,
        { title, description, image }
      );
      setServices(
        services.map((service) =>
          service._id === editingService._id ? response.data : service
        )
      );
      setEditingService(null);
      setTitle("");
      setDescription("");
      setImage("");
      setError("");
    } catch (err) {
      setError("Failed to update service.");
    }
  };

  // Delete a service
  const deleteService = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_LOGIN_PATH}/api/servises/service/${id}`);
      setServices(services.filter((service) => service._id !== id));
    } catch (err) {
      setError("Failed to delete service.");
    }
  };

  return (
    <div className="admin-container font-serif bg-gray-100 min-h-screen">
      <Adminhomepage />
      <div className="p-6">
        {/* Error message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Form to add or update service */}
        <div className="form-container bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-center">Sevices</h2>
          <div className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Service Title"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Service Description"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image URL"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <button
              onClick={editingService ? updateService : addService}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-700"
            >
              {editingService ? "Update Service" : "Add Service"}
            </button>
          </div>
        </div>

        {/* List of services */}
        <div className="services-list mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service._id} className="service-card bg-white p-4 rounded-lg shadow-lg hover:shadow-xl">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-40 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-gray-600 mt-2">{service.description}</p>
              <div className="mt-4 text-center">
                <button
                  onClick={() => deleteService(service._id)}
                  className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setEditingService(service);
                    setTitle(service.title);
                    setDescription(service.description);
                    setImage(service.image);
                  }}
                  className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-700 ml-4"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminServices;
