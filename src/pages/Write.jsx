import React, { useEffect, useRef, useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'
import { useAppWrite } from '../context/AppwriteContext';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import toast from 'react-hot-toast';

const Write = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const {addPost} = useAppWrite()
  const [author,setAuthor] = useState()
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const uploadPost = async (e)=>{
    e.preventDefault();
  if (!title || !content || !category || !image || !author) {
    toast.error("Please fill all fields.");
    return;
  }
  NProgress.start();
  setLoading(true);
  const res = await addPost({ title, category, content, image, author });
  console.log(res);
  NProgress.done();
  setLoading(false);

  if (res) {
    setTitle("");
    setCategory("");
    setImage(null);
    setAuthor("");
    setContent("");
    if (editorRef.current) editorRef.current.setContents("");
  }
};
useEffect(() => {
  NProgress.configure({ showSpinner: false })
  
}, []);

  return (
    <div className="max-w-7xl mx-auto my-10 p-6 bg-gray-100 rounded-3xl shadow-xl">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">📝 Create a New Article</h1>

      <div className="grid grid-cols-1  gap-10">
        {/* LEFT SIDE: TEXT EDITOR */}
        <div className="h-full">
          <label className="block text-lg font-semibold text-gray-700 mb-3">Article Content</label>
          <div className="border border-gray-300 rounded-2xl overflow-hidden shadow-sm">
            <SunEditor
              value={content}
              ref={editorRef}
              
              onChange={(value) => setContent(value)}
              
            />
          </div>
        </div>

        {/* RIGHT SIDE: FORM */}
        <div className="space-y-8">
          {/* TITLE */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">📝 Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Building a Blog in React"
              className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm bg-white"
            />
          </div>

          {/* HASHTAG / CATEGORY */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">🏷️ Hashtag / Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="#technology, #coding"
              className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none shadow-sm bg-white"
            />
          </div>
           {/* Author name */}
           <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">🏷️ Author name</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g NABEEL"
              className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none shadow-sm bg-white"
            />
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">🖼️ Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded shadow-sm cursor-pointer"
            />
          </div>
          {/* SUBMIT BUTTON */}
          <div onClick={uploadPost} className="pt-4">
          <button
            disabled={loading}
            className={`w-full bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-blue-700'} text-white font-bold text-lg py-3 rounded-2xl shadow-md transition duration-200`}>
            {loading ? "⏳ Publishing..." : "🚀 Publish Article"}
            </button> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
