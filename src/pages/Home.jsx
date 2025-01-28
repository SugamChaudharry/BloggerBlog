import { PenLine, BookOpen, TrendingUp, Clock } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Home() {
  const userStatus = useSelector((state) => state.auth.status);
  return (
    <div className='min-h-screen bg-gray-900'>
      {/* Hero Section */}
      <div className='bg-gradient-to-b from-gray-800 to-gray-900'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
          <div className='text-center'>
            <h1 className='text-5xl font-bold text-gray-100 mb-4'>
              Share Your Story with the World
            </h1>
            <p className='text-xl text-gray-300 mb-8'>
              Create, read, and connect with writers and readers from around the
              globe
            </p>
            <div className='space-x-4'>
              <Link
                to={'/create-blog'}
                className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg inline-flex items-center'
              >
                <PenLine className='mr-2 h-5 w-5' />
                Start Writing
              </Link>
              <Link
                to={'/explore'}
                className='bg-gray-800 hover:bg-gray-700 text-gray-200 px-6 py-3 rounded-lg text-lg inline-flex items-center border border-gray-700'
              >
                <BookOpen className='mr-2 h-5 w-5' />
                Explore Blogs
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='bg-gray-800 p-8 rounded-xl border border-gray-700'>
            <PenLine className='h-8 w-8 text-blue-400 mb-4' />
            <h3 className='text-xl font-semibold mb-2 text-gray-100'>Create</h3>
            <p className='text-gray-400'>
              Write and publish your stories with our easy-to-use editor
            </p>
          </div>
          <div className='bg-gray-800 p-8 rounded-xl border border-gray-700'>
            <TrendingUp className='h-8 w-8 text-blue-400 mb-4' />
            <h3 className='text-xl font-semibold mb-2 text-gray-100'>
              Connect
            </h3>
            <p className='text-gray-400'>
              Build your audience and connect with other writers
            </p>
          </div>
          <div className='bg-gray-800 p-8 rounded-xl border border-gray-700'>
            <BookOpen className='h-8 w-8 text-blue-400 mb-4' />
            <h3 className='text-xl font-semibold mb-2 text-gray-100'>Grow</h3>
            <p className='text-gray-400'>
              Track your progress and improve your writing
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='bg-gradient-to-b from-gray-800 to-gray-900 border-t border-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center'>
          <h2 className='text-3xl font-bold text-gray-100 mb-4'>
            Ready to Start Writing?
          </h2>
          <p className='text-xl text-gray-300 mb-8'>
            Join our community of writers and readers today
          </p>

          {userStatus ? (
            <button className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg'>
              create blog
            </button>
          ) : (
            <Link
              to={'/signup'}
              className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg'
            >
              Create Your Account
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
