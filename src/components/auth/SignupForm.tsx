import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, ArrowRight } from 'lucide-react';

export function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { signup } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(email, password, name);
  };

  const handleGoogleSignUp = () => {
    // Logic for Google sign-up goes here
    alert('Google Sign-Up clicked!');
  };

  return (
    <div className="min-h-screen flex items-center justify-between bg-black py-12 px-4 sm:px-6 lg:px-8">
      {/* Left Side */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:flex flex-col justify-center items-start text-yellow-400 w-1/2 px-8"
      >
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Join Us and <span className="text-white">Discover</span> the World
        </h1>
        <p className="text-lg mb-8 text-gray-400">
          A seamless experience awaits. Sign up now and unlock endless possibilities.
        </p>
        <motion.div
          whileHover={{ x: 10 }}
          className="flex items-center gap-3 text-yellow-400 hover:text-yellow-300 text-lg cursor-pointer"
        >
          <Link to="/login">Already have an account?</Link>
          <ArrowRight />
        </motion.div>
      </motion.div>

      {/* Right Side */}
      <div className="flex items-center mt-12 justify-center w-full lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black p-8 rounded-xl shadow-lg w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-yellow-400">Create Account</h2>
            <p className="mt-2 text-gray-400">Join us on your journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-yellow-400 mb-2">Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-900 text-white border border-yellow-400 rounded-lg p-3 pl-10"
                  required
                />
                <User className="absolute left-3 top-3.5 h-5 w-5 text-yellow-400" />
              </div>
            </div>

            <div>
              <label className="block text-yellow-400 mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-900 text-white border border-yellow-400 rounded-lg p-3 pl-10"
                  required
                />
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-yellow-400" />
              </div>
            </div>

            <div>
              <label className="block text-yellow-400 mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-900 text-white border border-yellow-400 rounded-lg p-3 pl-10"
                  required
                />
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-yellow-400" />
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-yellow-300"
            >
              <UserPlus className="h-5 w-5" />
              Create Account
            </motion.button>
          </form>

          {/* Sign Up with Google */}
          <div className="mt-6">
            <button
              onClick={handleGoogleSignUp}
              className="w-full flex items-center justify-center gap-2 bg-gray-800 text-yellow-400 px-6 py-3 rounded-lg font-semibold hover:bg-gray-700"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google"
                className="h-5 w-5"
              />
              Sign up with Google
            </button>
          </div>

          <p className="text-center text-white mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-yellow-400 hover:text-yellow-300">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
