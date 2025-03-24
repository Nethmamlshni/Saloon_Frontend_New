import { useEffect, useState } from "react";
import axios from "axios";
import Adminhomepage from "./adminHomepage";

interface TeamMember {
  _id: string;
  name: string;
  position: string;
  image: string;
  description: string;
  credentials: string;
  rating: number;
  animationClass: string;
}

function AdminInformation() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    image: "",
    description: "",
    credentials: "",
    rating: "",
    animationClass: "animate__fadeInRight",
  });

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_LOGIN_PATH}/api/information/team`);
        setTeam(response.data);
      } catch (err) {
        setError("Failed to load team members. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // **Add or Update a Team Member**
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        // **Update Existing Team Member**
        const response = await axios.put(`${import.meta.env.VITE_LOGIN_PATH}/api/information/team/${editingId}`, formData);
        setTeam(team.map((member) => (member._id === editingId ? response.data : member)));
        setEditingId(null);
      } else {
        // **Add New Team Member**
        const response = await axios.post(`${import.meta.env.VITE_LOGIN_PATH}/api/information/team`, formData);
        setTeam([...team, response.data]);
      }
      setFormData({
        name: "",
        position: "",
        image: "",
        description: "",
        credentials: "",
        rating: "",
        animationClass: "animate__fadeInRight",
      });
    } catch (err) {
      setError("Failed to save team member. Please try again.");
    }
  };

  // **Edit a Team Member**
  const handleEdit = (member: TeamMember) => {
    setEditingId(member._id);
    setFormData({
      name: member.name,
      position: member.position,
      image: member.image,
      description: member.description,
      credentials: member.credentials,
      rating: member.rating.toString(),
      animationClass: member.animationClass,
    });
  };

  // **Delete a Team Member**
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_LOGIN_PATH}/api/information/team/${id}`);
      setTeam(team.filter((member) => member._id !== id));
    } catch (err) {
      setError("Failed to delete team member. Please try again.");
    }
  };

  return (
    <>
      <Adminhomepage />
      <div className="min-h-screen bg-gray-100 font-serif p-6">
        {/* Form to Add/Edit Member */}
        <div className="form-container bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto mb-4">
          <h2 className="text-xl font-semibold mb-2 text-center">{editingId ? "Edit Team Member" : "Add Team Member"}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="p-2 border rounded-lg border-gray-300 " required />
            <input type="text" name="position" placeholder="Position" value={formData.position} onChange={handleChange} className="p-2 border rounded-lg border-gray-300 " required />
            <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} className="p-2 border rounded-lg border-gray-300 " required />
            <input type="text" name="credentials" placeholder="Credentials" value={formData.credentials} onChange={handleChange} className="p-2 border rounded-lg border-gray-300 " required />
            <input type="number" name="rating" placeholder="Rating (1-5)" value={formData.rating} onChange={handleChange} className="p-2 border rounded-lg border-gray-300 " required />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="p-2 border rounded-lg border-gray-300 " required />
            <button type="submit" className="bg-black text-white px-4 py-2 cursor-pointer rounded hover:bg-gray-800 col-span-1 md:col-span-2">
              {editingId ? "Update Member" : "Add Member"}
            </button>
          </form>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading team members...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member._id} className="bg-white p-4 rounded-lg shadow-lg">
                <img src={member.image} alt={member.name} className="w-full h-48 object-cover rounded-md" />
                <h2 className="text-xl font-semibold mt-2">{member.name}</h2>
                <p className="text-gray-600">{member.position}</p>
                <p className="text-sm text-gray-500 mt-1">{member.description}</p>
                <p className="text-sm text-gray-500 mt-1"><strong>Credentials:</strong> {member.credentials}</p>
                <p className="text-sm text-yellow-500 mt-1">⭐ {member.rating}/5</p>
                
                {/* Edit and Delete Buttons */}
                <div className="flex space-x-2 mt-2">
                  <button onClick={() => handleEdit(member)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(member._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default AdminInformation;
