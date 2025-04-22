import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppWrite } from '../context/AppwriteContext';
import { FaCloudUploadAlt, FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';

const Signup = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
 const [showPassword, setShowPassword] = useState(false);
  const { createAccount } = useAppWrite();
  const [imageFile, setImageFile] = useState(null);
   const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    setImageFile(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await createAccount({email, password, name, imageFile})
    
    console.log("Uploading this file:", imageFile);
    setEmail("");
    setImageFile(null);
    setName("");
    setPassword("");
    navigate("/");
    console.log(res);
  };

  return (
    <div className=' flex  justify-center items-center p-4'>
      <div className='bg-white shadow-xl rounded-3xl overflow-hidden max-w-2xl w-full flex md:flex-row flex-col-reverse'>
        {/* Improved Image Side */}
        <div className='relative hidden w-full md:w-1/2 bg-fuchsia-500 p-8 md:flex items-center justify-center'>
          
          <div className='text-center text-white'>
            <h2 className='text-3xl font-bold mb-4'>Unlock Your Potential</h2>
            <p className='text-lg mb-6'>Join our community and experience the difference.</p>
            <ul className='list-disc pl-6 text-left'>
              <li className='mb-2'>Connect with like-minded individuals.</li>
              <li className='mb-2'>Discover new opportunities.</li>
              <li>Expand your horizons.</li>
            </ul>
            {/* Optional: Add social icons here */}
            <div className='mt-6 flex justify-center gap-4'>
              <FaFacebook className='text-2xl cursor-pointer' />
              <FaTwitter className='text-2xl cursor-pointer' />
              <FaGoogle className='text-2xl cursor-pointer' />
            </div>
          </div>
        </div>

        {/* Form Side (No changes here for now) */}
        <div className='w-full md:w-1/2 p-8'>
          <div className='text-center mb-6'>
            <h1 className='text-3xl font-semibold text-gray-800'>Create Account</h1>
            <p className='text-sm text-gray-500 mt-2'>Let's get you started.</p>
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>Profile Picture (Optional)
            <div  className='border-dashed  border-2 border-gray-400 rounded-md p-4 text-center cursor-pointer'>
              {preview ? (
                <img src={preview} alt="Preview" className='w-24 h-24 rounded-full mx-auto object-cover' />
              ) : (
                <>
                  <FaCloudUploadAlt   className='mx-auto text-2xl text-gray-500 mb-2' />
                  <p className='text-sm text-gray-500'>Click to upload</p>
                </>
              )}
              <input type="file" className="hidden" onChange={handleFileChange} />
            </div>
            </label>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4'>
            {/* Form fields remain the same */}
            <div>
              <label htmlFor="name" className='block text-gray-700 text-sm font-bold mb-2'>Name</label>
              <input
                id="name"
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type="text"
                required
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
              <input
                id="email"
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type="email"
                required
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
              <input
                id="password"
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='flex items-center justify-between'>
              <label onClick={() => setShowPassword(!showPassword)} className='text-sm text-gray-600'>
                <input className='mr-2 leading-tight' type="checkbox" />
                Show password
              </label>
            </div>
            <button
              type='submit'
              className='w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2.5 rounded-lg focus:outline-none focus:shadow-outline'
            >
              Sign Up
            </button>
          </form>
          <p className='text-center text-sm text-gray-500 mt-4'>
            Already have an account?{' '}
            <Link to="/login" className='text-fuchsia-600 hover:underline'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;