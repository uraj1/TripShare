import { useState } from 'react';
import { Plane, Menu, X, Home, Phone, LogIn, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../auth/AuthContext';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Home', to: '/', icon: Home, isRoute: true },
    { label: 'Contact', to: 'contact', icon: Phone, isRoute: false },
  ];

  const handleNavigation = (item: { to: string; isRoute: boolean }) => {
    if (item.isRoute) {
      navigate(item.to);
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-sm py-4 px-6 z-50 border-b border-yellow-400/20"
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Plane className="text-yellow-400 h-8 w-8" />
          <span className="text-yellow-400 text-2xl font-bold">TripWise</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.to}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.isRoute ? (
                  <Link
                    to={item.to}
                    className="text-yellow-400 hover:text-yellow-300 flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ) : (
                  <ScrollLink
                    to={item.to}
                    smooth={true}
                    duration={500}
                    className="text-yellow-400 hover:text-yellow-300 cursor-pointer flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </ScrollLink>
                )}
              </motion.div>
            );
          })}
          {user ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 flex items-center gap-2"
            >
              <LogIn className="h-4 w-4" />
              Logout
            </motion.button>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/login" 
                  className="text-yellow-400 hover:text-yellow-300 flex items-center gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/signup" 
                  className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 flex items-center gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </Link>
              </motion.div>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="md:hidden text-yellow-400"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween' }}
              className="fixed top-16 right-0 w-64 bg-black/95 backdrop-blur-sm p-6 h-screen md:hidden"
            >
              <nav className="flex flex-col space-y-4">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.to}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleNavigation(item)}
                      className="text-yellow-400 hover:text-yellow-300 flex items-center gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </motion.button>
                  );
                })}
                {user ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-yellow-400 hover:text-yellow-300 flex items-center gap-2"
                  >
                    <LogIn className="h-4 w-4" />
                    Logout
                  </motion.button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-yellow-400 hover:text-yellow-300 flex items-center gap-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LogIn className="h-4 w-4" />
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="text-yellow-400 hover:text-yellow-300 flex items-center gap-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserPlus className="h-4 w-4" />
                      Sign Up
                    </Link>
                  </>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
