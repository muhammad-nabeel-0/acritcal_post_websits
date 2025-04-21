import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAppWrite } from '../context/AppwriteContext';
import { assets } from '../assets/assets';


const Header = () => {
  const {userData,logoutFunction,account} = useAppWrite()
  useEffect(() => {
    const check = async () => {
      const user = await account.get();
      console.log("User prefs:", user.prefs); // Should show profileImage
    };
    check();
  }, []);
  
  return (
    <>
    <div className="w-full py-2.5 font-medium text-sm text-white text-center bg-gray-800">
    <p>Hello guys i am create a morden Artical Post Websits. Thanks You | Coming Soon.</p>
</div>
    <header className="bg-white px-[8%] py-2 shadow-md flex justify-between items-center">
      <Link to="/" className="text-2xl tracking-wider">
        <h1 className='text-gray-600 font-extrabold'>BLOOGE.</h1>
      </Link>

      <div className='flex items-center justify-center'>
        <nav className="space-x-3 hidden sm:block relative">
          <NavLink to="/" 
            className="hover:bg-gray-300 px-2 transition-all duration-200 rounded-lg py-1.5">Home</NavLink>

          <NavLink to="/all-post"
            className="hover:bg-gray-300 px-2 transition-all duration-200 rounded-lg py-1.5">Browse</NavLink>

          <NavLink to="/write"
            className="hover:bg-gray-300 px-2 transition-all duration-200 rounded-lg py-1.5">Write</NavLink>

          <NavLink to="/my-post"
            className="hover:bg-gray-300 px-2 transition-all duration-200 rounded-lg py-1.5">My Post</NavLink>

          {/* Categories Dropdown */}
          
        </nav>
        {userData ? (
          <div className='ml-5'>
            <div>
            <div className="relative group transition-all">
        <img className="h-14 w-14 rounded-full"
         src={userData?.prefs?.profileImage || assets.profile_icon}
            alt="userImage1"/>
            <div className=' absolute hidden group-hover:block transition-all  top-15 right-0 w-40  px-2 py-1 rounded bg-gray-200'>
              <ul>
                <Link to={"/profile"}><li className='hover:bg-gray-300 my-2 px-2 py-1 cursor-pointer'>My Profile</li></Link>
                <li onClick={logoutFunction} className='hover:bg-gray-300 my-2 px-2 py-1 cursor-pointer'>Logout</li>
              </ul>
            </div>
    </div>
            </div>
            <button className='bg-gray-300 px-3 hidden rounded-md py-1 text-base'>Logout</button>

          </div>
        ):(
           <div className='ml-2'>
           <Link to={"/login"}>
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
