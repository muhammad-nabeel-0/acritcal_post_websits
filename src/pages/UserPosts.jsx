import React, { useEffect, useState } from "react";
import { useAppWrite } from "../context/AppwriteContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Query } from "appwrite";

const UserPosts = () => {
  const { db, appWriteDataBaseId, appWriteCollectionId, account } = useAppWrite();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const user = await account.get();
        const userId = user.$id;
        console.log(userId);
        

        // Fetch posts created by the logged-in user
        const res = await db.listDocuments(appWriteDataBaseId, appWriteCollectionId, [
          Query.equal("userID", [userId]), // Filter posts by the logged-in user
        ]);

        setPosts(res.documents);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    fetchUserPosts();
  }, []);

  // Handle post update
  const handleUpdate = (id) => {
    navigate(`/update-post/${id}`);
  };

  // Handle post deletion
  const handleDelete = async (id) => {
    try {
      await db.deleteDocument(appWriteDataBaseId, appWriteCollectionId, id);
      setPosts(posts.filter(post => post.$id !== id)); // Remove the deleted post from the state
      toast.success("Post deleted successfully!");
    } catch (error) {
      toast.error("Error deleting post");
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
  <h1 className="text-4xl tracking-tight  font-extrabold text-center text-gray-900 ">
    Your Posts
  </h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {posts.length > 0 ? (
      posts.map((post) => (
        <div
          key={post.$id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={post.postImage}
              alt={post.postTitle}
              className="w-full h-full object-cover transition-transform duration-300 transform scale-100 hover:scale-105"
            />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2">
              {post.postTitle}
            </h2>
            <div className="flex justify-end mt-6 gap-2">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 dark:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => handleUpdate(post.$id)}
              >
                Update
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 dark:bg-red-600 dark:hover:bg-red-700"
                onClick={() => handleDelete(post.$id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="col-span-full text-center py-8 text-gray-600 dark:text-gray-400">
        No posts found.
      </div>
    )}
  </div>
</div>
  );
};

export default UserPosts;
