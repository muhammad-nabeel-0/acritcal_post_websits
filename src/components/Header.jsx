import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAppWrite } from '../context/AppwriteContext';
import { assets } from '../assets/assets';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';

const Header = () => {
  const { userData, logoutFunction, account } = useAppWrite();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const check = async () => {
      if (account) {
        try {
          const user = await account.get();
          console.log("User prefs:", user.prefs); // Should show profileImage
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    check();
  }, [account]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="w-full py-2.5 font-medium text-sm text-white text-center bg-gray-800">
        <p>Hello guys i am create a morden Artical Post Websits. Thanks You | Coming Soon.</p>
      </div>
      <header className="bg-white px-[5%] sm:px-[8%] py-2 shadow-md flex justify-between items-center relative">
        <Link to="/" className="text-2xl tracking-wider">
          <h1 className='text-gray-600 font-extrabold'>BLOOGE.</h1>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="sm:hidden text-gray-600 focus:outline-none"
        >
          {isMobileMenuOpen ? <AiOutlineClose size={24} /> : <GiHamburgerMenu size={24} />}
        </button>

        <div className={`sm:flex items-center sm:justify-end absolute sm:relative top-full left-0 w-full bg-white shadow-md sm:shadow-none z-10 ${isMobileMenuOpen ? 'flex flex-col py-4 items-center' : 'hidden'}`}> {/* Centered on mobile */}
          <nav className="space-y-2 sm:space-x-3 sm:space-y-0 sm:block relative w-full sm:w-auto text-center sm:text-left"> {/* Centered text on mobile */}
            <NavLink to="/"
              className="block sm:inline-block hover:bg-gray-300 px-2 transition-all duration-200 rounded-lg py-1.5 text-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>

            <NavLink to="/all-post"
              className="block sm:inline-block hover:bg-gray-300 px-2 transition-all duration-200 rounded-lg py-1.5 text-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}>Browse</NavLink>

            <NavLink to="/write"
              className="block sm:inline-block hover:bg-gray-300 px-2 transition-all duration-200 rounded-lg py-1.5 text-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}>Write</NavLink>

            <NavLink to="/my-post"
              className="block sm:inline-block hover:bg-gray-300 px-2 transition-all duration-200 rounded-lg py-1.5 text-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}>My Post</NavLink>

            {/* Categories Dropdown (You can add mobile styling here if needed) */}
          </nav>

          {userData ? (
            <div className='ml-0 mt-4 sm:mt-0 sm:ml-5 w-full sm:w-auto flex justify-center sm:block'> {/* Centered on mobile */}
              <div>
                <div className="relative group transition-all">
                  <img className="h-10 w-10 sm:h-14 sm:w-14 object-cover rounded-full"
                    src={userData?.prefs?.profileImage || assets.profile_icon}
                    alt="userImage1" />
                  <div className='absolute hidden group-hover:block transition-all top-12 sm:top-15 right-0 w-40 px-2 py-1 rounded bg-gray-200'>
                    <ul>
                      <Link to={"/profile"} onClick={() => setIsMobileMenuOpen(false)}><li className='hover:bg-gray-300 my-2 px-2 py-1 cursor-pointer'>My Profile</li></Link>
                      <li onClick={() => { logoutFunction(); setIsMobileMenuOpen(false); }} className='hover:bg-gray-300 my-2 px-2 py-1 cursor-pointer'>Logout</li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* <button className='bg-gray-300 px-3 hidden rounded-md py-1 text-base'>Logout</button> */}
            </div>
          ) : (
            <div className='ml-0 mt-4 sm:mt-0 sm:ml-2 w-full sm:w-auto flex justify-center'> {/* Centered on mobile */}
              <Link to={"/login"} onClick={() => setIsMobileMenuOpen(false)}>
                <button className='bg-gray-300 px-3 rounded-md py-1 text-base'>Login</button>
              </Link>
            </div>
          )}

        </div>
      </header>
    </>
  );
};

export default Header;