import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faTwitter, faGithub, faLinkedin, faYoutube, faMedium, faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { BiMoon } from 'react-icons/bi';

import { library } from '@fortawesome/fontawesome-svg-core'; // Import the library

library.add(faDiscord, faTwitter, faGithub, faLinkedin, faYoutube, faMedium, faTiktok, faInstagram); // Add the icons to the library

function Footer() {
  return (
    <footer className=" px-[8%] py-6">
      <div className="container mx-auto border-t flex-col md:flex-row gap-3 px-4 flex items-center justify-between">
        {/* Social Icons */}
        <div className="flex space-x-2  mt-3">
          <a href="#" className="hover:-translate-y-2  transition-all">
            <FontAwesomeIcon icon={faDiscord} className="text-xl  text-gray-500 hover:text-gray-700 transition-all   " />
          </a>
          <a href="#" className="hover:-translate-y-2  transition-all">
            <FontAwesomeIcon icon={faTwitter} className="text-xl border-l-2 px-2 border-gray-300 text-gray-500 hover:text-gray-700 transition-all   " />
          </a>
          <a href="#" className="hover:-translate-y-2  transition-all">
            <FontAwesomeIcon icon={faGithub} className="text-xl border-l-2 px-2 border-gray-300 text-gray-500 hover:text-gray-700 transition-all   " />
          </a>
          <a href="#" className="hover:-translate-y-2  transition-all">
            <FontAwesomeIcon icon={faLinkedin} className="text-xl border-l-2 px-2 border-gray-300 text-gray-500 hover:text-gray-700 transition-all   " />
          </a>
          <a href="#" className="hover:-translate-y-2  transition-all">
            <FontAwesomeIcon icon={faYoutube} className="text-xl border-l-2 px-2 border-gray-300 text-gray-500 hover:text-gray-700 transition-all   " />
          </a>
          <a href="#" className="hover:-translate-y-2  transition-all">
            <FontAwesomeIcon icon={faMedium} className="text-xl border-l-2 px-2 border-gray-300 text-gray-500 hover:text-gray-700 transition-all   " />
          </a>
          <a href="#" className="hover:-translate-y-2  transition-all">
            <FontAwesomeIcon icon={faTiktok} className="text-xl border-l-2 px-2 border-gray-300 text-gray-500 hover:text-gray-700 transition-all   " />
          </a>
          <a href="#" className="hover:-translate-y-2  transition-all">
            <FontAwesomeIcon icon={faInstagram} className="text-xl border-l-2 px-2 border-gray-300 text-gray-500 hover:text-gray-700 transition-all " />
          </a>
        </div>

        {/* Theme Toggle and Links */}
        <div className="flex items-center space-x-6">
        
          <a href="#" className="">Support</a>
          <a href="#" className="">Status</a>
          <span className="text-gray-500 border-l-2 px-2 border-gray-300 ">Copyright © 2025 Blooge.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;