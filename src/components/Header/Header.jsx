import React from 'react';
import { Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

// Navbar Component
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);

  return (
    <nav className='bg-gray-900 shadow-lg border-b border-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex items-center'>
            <Link to='/' className='text-2xl font-bold text-blue-400'>
              <Logo />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className='hidden md:flex items-center space-x-8'>
            <Link to='/' className='text-gray-300 hover:text-blue-400'>
              Home
            </Link>
            <Link to='/explore' className='text-gray-300 hover:text-blue-400'>
              Explore
            </Link>
            {authStatus && (
              <Link to={'/create-blog'}>
                <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'>
                  DashBoard
                </button>
              </Link>
            )}
            {authStatus && (
              <button>
                <LogoutBtn />
              </button>
            )}
            {!authStatus && (
              <Link
                className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'
                to={'/login'}
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden flex items-center'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='text-gray-300'
            >
              <svg
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16m-7 6h7'
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className='md:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              <Link
                to='/'
                className='block px-3 py-2 text-gray-300 hover:text-blue-400'
              >
                Home
              </Link>
              <Link
                to='/explore'
                className='block px-3 pb-5 py-2 text-gray-300 hover:text-blue-400'
              >
                Explore
              </Link>
              {!authStatus && (
                <Link
                  to={'/Login'}
                  className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'
                >
                  Login
                </Link>
              )}
              {authStatus && (
                <button className='bg-blue-600 text-white px-4 mr-5 py-2 rounded-lg hover:bg-blue-700'>
                  Write Post
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
