import React from 'react';
import { CalendarIcon, UserIcon } from '@heroicons/react/24/outline'; // Example icons from Heroicons
import { useNavigate } from 'react-router-dom';

const ArticleCard = ({id, postTitle, postImage, content, author, uploadDate, category }) => {
    const navigate = useNavigate()

    const handleClick = () => {
      navigate(`/article/${id}`)
      
    }
  return (
    <div onClick={handleClick} className="bg-gradient-to-br from-gray-100 to-white rounded-xl cursor-pointer shadow-lg overflow-hidden hover:shadow-2xl transition-all p-4 border   duration-300">
      {postImage && (
        <div className="relative">
          <img
            src={postImage}
            alt={postTitle}
            className="w-full h-64 object-cover rounded-t-xl"
          />
          <div className="absolute top-4 right-4 bg-indigo-500 text-white text-sm font-semibold py-1 px-2 rounded-md shadow-md uppercase">
            {category}
          </div>
        </div>
      )}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{postTitle}</h2>
        <div
          className="text-gray-700 mb-4 line-clamp-5"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <UserIcon className="h-5 w-5 mr-2" />
            <span>{author}</span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2" />
            <span>{uploadDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;