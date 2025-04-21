import React from 'react';

const companyLogos = [
  '/logos/google.png',
  '/logos/amazon.png',
  '/logos/meta.png',
  '/logos/microsoft.png',
  '/logos/netflix.png',
  '/logos/airbnb.png',
];

const CompanyLogos = () => {
  return (
    <section className="bg-white py-10 px-[8%] overflow-hidden">
      <h2 className="text-center text-gray-700 text-xl font-semibold mb-6">
        Trusted by teams worldwide 🌐
      </h2>

      <div className="relative w-full">
        <div className="flex animate-slide gap-12">
          {companyLogos.concat(companyLogos).map((logo, idx) => (
            <img
              key={idx}
              src={logo}
              alt="Company Logo"
              className="h-10 grayscale opacity-70 hover:opacity-100 transition duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyLogos;
