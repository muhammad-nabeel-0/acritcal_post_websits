import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppWrite } from '../context/AppwriteContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { loginAccount } = useAppWrite();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const res =   await loginAccount(email, password);
    if(res){
      setEmail('');
      setPassword('');
      navigate('/');
    }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className='relative w-full   flex items-center justify-center'>
      <div className='w-full max-w-md bg-white/90 backdrop-blur-lg border rounded-3xl p-8 shadow-2xl'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold text-gray-800'>Login</h1>
          <p className='text-lg text-gray-600 mt-2'>Access your account easily.</p>
        </div>

        {/* Error Message */}
        {error && <p className='text-red-500 text-center mt-2'>{error}</p>}

        <form onSubmit={handleSubmit} className='mt-6'>
          <div>
            <label className='block text-xl text-gray-700 mb-2'>Email</label>
            <input
              className='w-full mt-2 p-4 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all duration-300 shadow-sm'
              type='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='youremail@example.com'
            />
          </div>

          <div className='mt-6'>
            <label className='block text-xl text-gray-700 mb-2'>Password</label>
            <div className='relative'>
              <input
                className='w-full mt-2 p-4 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all duration-300 shadow-sm'
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Your password'
              />
              <button
                type='button'
                className='absolute right-4 top-[55%] transform -translate-y-1/2 text-teal-600 font-semibold'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className='mt-4 flex items-center justify-between text-gray-600'>
            <NavLink to='/forgot-password' className='hover:underline text-sm'>
              Forgot password?
            </NavLink>
            <label className='text-sm flex items-center'>
              <input type='checkbox' className='mr-2' />
              Remember me
            </label>
          </div>

          <button
            type='submit'
            className='w-full mt-6 py-3 rounded-full text-white bg-gradient-to-r from-teal-600 to-pink-600 hover:from-pink-600 hover:to-teal-600 transition-all duration-300'
          >
            Login
          </button>
        </form>

        <p className='text-center text-sm mt-6 text-gray-600'>
          Don’t have an account?{' '}
          <Link to='/signup'>
            <span className='underline cursor-pointer text-teal-600 hover:text-teal-700'>Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
