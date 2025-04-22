import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppWrite } from "../context/AppwriteContext";
import { toast } from "react-hot-toast";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const UpdatePost = () => {
  const { id } = useParams();
  const { db, appWriteDataBaseId, appWriteCollectionId } = useAppWrite();
  const [post, setPost] = useState(null);
  const [newContent, setNewContent] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await db.getDocument(appWriteDataBaseId, appWriteCollectionId, id);
        setPost(res);
        setNewContent(res.content);
        setNewTitle(res.postTitle);
      } catch (error) {
        toast.error("Error fetching post");
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await db.updateDocument(appWriteDataBaseId, appWriteCollectionId, id, {
        postTitle: newTitle,
        content: newContent,
      });
      toast.success("Post updated successfully!");
      navigate(`/article/${id}`);
    } catch (error) {
      toast.error("Error updating post");
      console.error("Error updating post:", error);
    }
  };

  if (!post) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Update Your Post</h1>

      <div className="mb-6">
        <label className="block text-lg font-medium mb-2" htmlFor="postTitle">
          Post Title
        </label>
        <input
          type="text"
          id="postTitle"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg "
        />
      </div>

      <div className="mb-6">
        <label className="block text-lg font-medium mb-2" htmlFor="postContent">
          Post Content
        </label>
        <SunEditor
          setContents={newContent}
          onChange={setNewContent}
          height="300px"
        />
      </div>

      <button
        onClick={handleUpdate}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
      >
        Update Post
      </button>
    </div>
  );
};

export default UpdatePost;
