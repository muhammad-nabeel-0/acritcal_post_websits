import React from 'react';
import { Link } from 'react-router-dom';

const dummyArticles = [
  {
    id: 1,
    title: 'How to Stay Consistent While Writing Daily',
    author: 'John Doe',
    date: 'April 18, 2025',
    excerpt: 'Consistency builds habits. Discover tips to write daily without burnout...',
  },
  {
    id: 2,
    title: 'The Rise of AI in Creative Content',
    author: 'Sarah Smith',
    date: 'April 17, 2025',
    excerpt: 'AI is changing the way we create. But what does it mean for human creativity?',
  },
  {
    id: 3,
    title: 'Designing the Perfect Blog Experience',
    author: 'Ali Khan',
    date: 'April 16, 2025',
    excerpt: 'Your blog’s UX matters. Let’s design something readers will love.',
  },
  {
    id: 4,
    title: '5 Habits of Highly Successful Writers',
    author: 'Fatima Noor',
    date: 'April 15, 2025',
    excerpt: 'From morning routines to creative breaks — explore what top writers do daily.',
  },
];

const FeaturedArticles = () => {
  return (
    <section className="py-16 px-[8%] bg-white">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Featured Articles
      </h2>

      <div className="space-y-6">
        {dummyArticles.map((article, index) => (
          <div
            key={article.id}
            className="bg-gray-50 p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transform hover:scale-[1.01] transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              {article.title}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              By {article.author} · {article.date}
            </p>
            <p className="text-gray-600 mb-4">{article.excerpt}</p>
            <Link
              to={`/article/${article.id}`}
              className="text-sm font-medium text-gray-800 hover:underline"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedArticles;
