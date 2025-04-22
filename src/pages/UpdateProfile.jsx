import React, { useEffect, useState } from 'react';
import { useAppWrite } from '../context/AppwriteContext';
import { toast } from 'react-hot-toast';
import { assets } from '../assets/assets';

const UpdateProfile = () => {
  const { getUserInfo, updateProfile } = useAppWrite();
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserInfo();
      setUser(data);
      setName(data?.name || '');
      setPreview(data?.prefs?.profileImage || '');
    };
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    try {
      const updated = await updateProfile(name, imageFile);
      setUser(updated);
      setPreview(updated?.prefs?.profileImage || "");
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  if (!user) return <div className="text-center py-20">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Update Profile</h1>

        {/* Profile Image Preview */}
        <div className="flex justify-center mb-6">
          <label className="relative group cursor-pointer">
            <img
              src={preview || assets.profile_icon}
              alt="Preview"
              className="w-32 h-32 p-1 rounded-full object-cover border-4 border-blue-400 shadow-md"
            />
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImageFile(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition">
              Change
            </span>
          </label>
        </div>

        {/* Name Field */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email (Disabled) */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="text"
            value={user.email}
            disabled
            className="w-full p-3 border rounded-xl bg-gray-100 text-gray-500"
          />
        </div>

        {/* Update Button */}
        <button
          onClick={handleUpdate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
        >
          ✅ Save Changes
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;
