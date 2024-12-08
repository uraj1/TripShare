import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetPassword(email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-xl shadow-lg max-w-md w-full border border-yellow-400 bg-black"
      >
        <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6">
          Reset Password
        </h2>
        {!submitted ? (
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

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-yellow-300"
            >
              <Mail className="h-5 w-5" />
              Send Reset Link
            </motion.button>

            <p className="text-center text-white">
              Remember your password?{' '}
              <Link to="/login" className="text-yellow-400 hover:text-yellow-300">
                Login
              </Link>
            </p>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-white mb-4">
              Password reset instructions have been sent to your email.
            </p>
            <Link
              to="/login"
              className="text-yellow-400 hover:text-yellow-300 text-lg font-semibold"
            >
              Return to Login
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
