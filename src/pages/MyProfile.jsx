import React, { useEffect, useState } from 'react';
import { useAppWrite } from '../context/AppwriteContext';

const ProfilePage = () => {
  const { account, storge, appWriteBacketId,ID } = useAppWrite();
  const [name, setName] = useState('');
  const [preview, setPreview] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [user, setUser] = useState(null);

  // Log the storge object to check if it's defined
  console.log("Storge object:", storge);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await account.get();
      console.log("User prefs:", res.prefs); // Here it will show profileImage
      // Other code...
    };
    fetchUser();
  }, []);
  

  // Get current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await account.get();
        setUser(res);
        setName(res.name);
        if (res?.prefs?.imageUrl) {
          setPreview(res.prefs.imageUrl);
        }
      } catch (error) {
        console.error('User fetch error:', error);
      }
    };
    fetchUser();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    try {
      let imageUrl = preview;

      // If new image selected, upload it
      if (imageFile) {
        // Ensure storge is properly defined
        if (!storge) {
          console.error("Storage is not initialized.");
          return;
        }
        const upload = await storge.createFile(
          appWriteBacketId,
          ID.unique(),
          imageFile
        );
        imageUrl = storge.getFileView(appWriteBacketId, upload.$id).href;
      }

      // Update user name
      await account.updateName(name);

      // Save image to user prefs if there's a new image
      if (imageFile) {
        await account.updatePrefs({ imageUrl });
      }

      alert('Profile updated successfully');
    } catch (error) {
      console.error('Update error:', error);
      alert('Something went wrong. Please try again!');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md dark:bg-gray-900">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Update Profile</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300">Profile Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1"
        />
        {preview && (
          <img src={preview} alt="Preview" className="mt-4 h-32 w-32 object-cover rounded-full border" />
        )}
      </div>

      <button
        onClick={handleUpdate}
        className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition"
      >
        Save Changes
      </button>
    </div>
  );
};

export default ProfilePage;
