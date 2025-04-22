import React, { useEffect, useState } from 'react';
import { useAppWrite } from '../context/AppwriteContext';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const UserProfilePage = () => {
  const { getUserInfo } = useAppWrite();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserInfo();
      setUser(data);
    };
    fetchUser();
  }, []);

  if (!user) return <div className="text-center py-20 text-gray-500 text-lg">Loading profile...</div>;

  return (
    <div className=" bg-gradient-to-br from-blue-50 to-white flex justify-center items-center px-4">
      <div className="w-full max-w-3xl p-8 bg-white rounded-3xl shadow-[0_10px_25px_rgba(0,0,0,0.05)] border border-gray-200">
        <div className="flex flex-col items-center gap-6">
          {/* Profile Image */}
          <div className="relative">
            <img
              src={user?.prefs?.profileImage || assets.profile_icon}
              alt="User Avatar"
              className="w-40 h-40 object-cover rounded-full border-4 border-blue-400 shadow-md"
            />
          </div>

          {/* Name and Email */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-500 text-sm mt-1">{user.email}</p>
            <p className="text-sm text-gray-400 mt-1">User ID: <span className="font-mono text-xs">{user.$id.slice(0, 10)}...</span></p>
          </div>

          {/* Optional Bio */}
          {user?.prefs?.bio && (
            <p className="text-center text-gray-600 italic max-w-md">{user.prefs.bio}</p>
          )}

          {/* Joined Date */}
          <p className="text-sm text-gray-500 mt-1">
            Joined: {new Date(user?.$createdAt).toLocaleDateString()}
          </p>

          {/* Button */}
          <Link to="/update-profile">
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-full font-medium shadow">
              ✏️ Edit Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
