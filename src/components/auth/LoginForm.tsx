import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black p-8 rounded-xl shadow-lg"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-yellow-400">Welcome Back</h2>
            <p className="mt-2 text-gray-400">Sign in to continue your journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="flex justify-between items-center">
              <Link
                to="/forgot-password"
                className="text-yellow-400 hover:text-yellow-300 text-sm"
              >
                Forgot Password?
              </Link>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-yellow-300"
            >
              <LogIn className="h-5 w-5" />
              Sign In
            </motion.button>

            <p className="text-center text-white mt-4">
              Don't have an account?{' '}
              <Link to="/signup" className="text-yellow-400 hover:text-yellow-300">
                Sign up
              </Link>
            </p>
          </form>
        </motion.div>

        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba"
            alt="Background"
            className="object-cover w-full h-full opacity-20"
          />
        </div>
      </div>
    </div>
  );
}