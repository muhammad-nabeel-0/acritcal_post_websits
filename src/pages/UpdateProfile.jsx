import React, { useEffect, useState } from 'react'
import { useAppWrite } from '../context/AppwriteContext'

const UpdateProfile = () => {
  const { getUserInfo, updateUserName, uploadProfileImage } = useAppWrite()
  const [user, setUser] = useState(null)
  const [name, setName] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState("")


  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserInfo()
      setUser(data)
      setName(data?.name || "")
    }
    fetchUser()
  }, [])

  const handleUpdate = async () => {
    if (name.trim()) {
      const updated = await updateUserName(name)
      setUser(updated)
    }

    if (imageFile) {
      const url = await uploadProfileImage(imageFile)
      setUser((prev) => ({
        ...prev,
        prefs: { ...prev.prefs, profileImage: url },
      }))
    }
  }

  if (!user) return <div className="text-center py-20">Loading Profile...</div>

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">My Profile</h1>

      <div className="mb-6 text-center">
        <label >
        <img
         src={preview || user?.prefs?.profileImage || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto object-cover border"
        />
        <input
          type="file" hidden
          accept="image/*"
         onChange={(e)=>{
            const file = e.target.files[0]
            if(file){
                setImageFile(file)
                setPreview(URL.createObjectURL(file))
            }
         }}
          className="mt-4 text-sm text-gray-600 dark:text-gray-300"
        />
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">Email</label>
        <input
          type="text"
          value={user.email}
          disabled
          className="w-full p-2 rounded border bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded border bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
        />
      </div>

      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Update Profile
      </button>
    </div>
  )
}

export default UpdateProfile
