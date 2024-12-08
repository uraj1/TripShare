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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full mx-auto bg-black p-8 rounded-xl shadow-lg mt-20"
    >
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">Reset Password</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-yellow-400 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-900 text-white border border-yellow-400 rounded-lg p-3"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 flex items-center justify-center gap-2"
          >
            <Mail className="h-5 w-5" />
            Send Reset Link
          </button>

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
            className="text-yellow-400 hover:text-yellow-300"
          >
            Return to Login
          </Link>
        </div>
      )}
    </motion.div>
  );
}