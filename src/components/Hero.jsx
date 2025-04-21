import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-gray-50 py-16 px-[8%] text-center">
      {/* Headline */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
        Share your voice with the world 🌍
      </h1>

      {/* Description */}
      <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-8">
        BLOOGE is a modern platform to write, read, and discover amazing articles. Whether you're a creator or a curious reader — you're home.
      </p>

      {/* CTA Buttons */}
      <div className="flex justify-center gap-4 flex-wrap mb-6">
        <Link to="/write">
          <button className="bg-gray-800 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-700 transition">
            Start Writing ✍️
          </button>
        </Link>
        <Link to="/articles">
          <button className="border border-gray-800 text-gray-800 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition">
            Browse Articles 📚
          </button>
        </Link>
      </div>

      {/* Trending Tags */}
      <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600 mb-8">
        <span className="bg-white px-3 py-1 rounded-full border hover:bg-gray-100 cursor-pointer">#Tech</span>
        <span className="bg-white px-3 py-1 rounded-full border hover:bg-gray-100 cursor-pointer">#Lifestyle</span>
        <span className="bg-white px-3 py-1 rounded-full border hover:bg-gray-100 cursor-pointer">#Design</span>
        <span className="bg-white px-3 py-1 rounded-full border hover:bg-gray-100 cursor-pointer">#Startup</span>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search articles..."
          className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <button className="bg-gray-800 text-white px-4 rounded-r-md hover:bg-gray-700 transition">
          Search
        </button>
      </div>

      {/* Stats */}
      <div className="mt-10 flex justify-center gap-10 text-center text-gray-700 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold">10K+</h2>
          <p>Articles</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">2K+</h2>
          <p>Writers</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">50+</h2>
          <p>Topics</p>
        </div>
      </div>

      {/* Testimonial */}
      <div className="mt-10 italic text-gray-500 text-sm max-w-xl mx-auto">
        “BLOOGE gave me the freedom to express my ideas and reach thousands of readers. It’s a game-changer!”
      </div>
    </section>
  );
};

export default Hero;
