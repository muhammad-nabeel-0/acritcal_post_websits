import React from 'react';

const testimonials = [
  {
    name: 'Sarah Malik',
    role: 'Content Creator',
    feedback:
      'Blooge has completely transformed the way I write. The experience is seamless and super intuitive!',
  },
  {
    name: 'Ali Raza',
    role: 'Tech Blogger',
    feedback:
      'I love how simple yet powerful this platform is. Writing and publishing articles is a breeze!',
  },
  {
    name: 'Ayesha Noor',
    role: 'Freelance Writer',
    feedback:
      'Finally found a clean, distraction-free writing space. Plus the analytics are 🔥.',
  },
  {
    name: 'Hamza Tariq',
    role: 'SEO Specialist',
    feedback:
      'Great platform for content strategy and planning. The UI is top-notch!',
  },
];

const Testimonials = () => {
  const loopedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className=" py-14 overflow-hidden px-[8%]">
      <h2 className="text-2xl font-bold text-gray-700 mb-8 text-center">
        What Writers Are Saying 💬
      </h2>

      <div className="relative w-full">
        <div className="flex animate-slide gap-6">
          {loopedTestimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md min-w-[300px] max-w-sm p-5 border border-gray-200"
            >
              <p className="text-gray-700 italic mb-4">“{item.feedback}”</p>
              <h4 className="text-gray-900 font-semibold">{item.name}</h4>
              <span className="text-gray-500 text-sm">{item.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
