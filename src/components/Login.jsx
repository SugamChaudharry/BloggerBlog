import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const Input = React.forwardRef(({ className, label, error, ...props }, ref) => (
  <input
    ref={ref}
    className={`w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 
    placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    transition-all duration-200 ${className}`}
    {...props}
  />
));

const Login = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const login = async (data) => {
    setError('');
    setIsLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4'>
      <div className='max-w-6xl w-full mx-auto flex flex-col lg:flex-row items-center lg:items-stretch gap-12 lg:gap-20'>
        {/* Left side content */}
        <div className='flex-1 text-center lg:text-left space-y-6 max-w-xl'>
          <h1 className='text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'>
            Welcome Back!
          </h1>
          <p className='text-lg text-gray-300'>
            Log in to connect with a community of passionate writers and
            readers. Share your stories, discover new perspectives.
          </p>
          <div className='pt-4'>
            <p className='text-gray-400'>
              Don't have an account?{' '}
              <Link
                to='/signup'
                className='font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200 underline-offset-4 hover:underline'
              >
                Sign Up <ArrowRight className='inline w-4 h-4' />
              </Link>
            </p>
          </div>
        </div>

        {/* Right side form */}
        <div className='w-full max-w-md'>
          <div className='bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-700'>
            {error && (
              <div className='mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg'>
                <p className='text-red-200'>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(login)} className='space-y-6'>
              <div className='space-y-4'>
                <div className='relative'>
                  <Mail className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
                  <Input
                    className='pl-10'
                    placeholder='Enter your email'
                    type='email'
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        message: 'Please enter a valid email address',
                      },
                    })}
                  />
                  {errors.email && (
                    <p className='mt-1 text-sm text-red-400'>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
                  <Input
                    className='pl-10'
                    type='password'
                    placeholder='Enter your password'
                    {...register('password', {
                      required: 'Password is required',
                    })}
                  />
                  {errors.password && (
                    <p className='mt-1 text-sm text-red-400'>
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type='submit'
                disabled={isLoading}
                className='w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium 
                hover:bg-blue-400 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 
                disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isLoading ? (
                  <span className='flex items-center justify-center gap-2'>
                    <span className='w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin'></span>
                    Logging in...
                  </span>
                ) : (
                  'Login'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
