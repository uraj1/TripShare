import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User } from 'lucide-react';

export function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { signup } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(email, password, name);
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
            <h2 className="text-3xl font-bold text-yellow-400">Create Account</h2>
            <p className="mt-2 text-gray-400">Join us on your travel journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <p className="text-center text-white mt-4">
              Already have an account?{' '}
              <Link to="/login" className="text-yellow-400 hover:text-yellow-300">
                Sign in
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