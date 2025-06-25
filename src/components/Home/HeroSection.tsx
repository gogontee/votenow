import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Users, Vote, Gift } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const HeroSection: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 bg-accent-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow" />
          <div className="absolute top-0 right-4 w-96 h-96 bg-secondary-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow animation-delay-4000" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Vote for the
                <span className="block bg-gradient-to-r from-accent-300 to-accent-100 bg-clip-text text-transparent">
                  Future
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
                Join the most transparent and engaging contest voting platform. 
                Support your favorite candidates with votes and gifts.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                {isAuthenticated ? (
                  <>
                    <Link to="/candidates">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-200"
                      >
                        View Candidates
                      </motion.button>
                    </Link>
                    {user?.role === 'voter' && (
                      <Link to="/wallet">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all duration-200"
                        >
                          Fund Wallet
                        </motion.button>
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <Link to="/register">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-200"
                      >
                        Get Started
                      </motion.button>
                    </Link>
                    <Link to="/login">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all duration-200"
                      >
                        Sign In
                      </motion.button>
                    </Link>
                  </>
                )}
              </div>

              {/* Feature Icons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-3 inline-block">
                    <Trophy className="h-8 w-8" />
                  </div>
                  <p className="text-sm font-medium">Contests</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-3 inline-block">
                    <Vote className="h-8 w-8" />
                  </div>
                  <p className="text-sm font-medium">Voting</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-3 inline-block">
                    <Gift className="h-8 w-8" />
                  </div>
                  <p className="text-sm font-medium">Gifts</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-3 inline-block">
                    <Users className="h-8 w-8" />
                  </div>
                  <p className="text-sm font-medium">Community</p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Advertisement Area */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            >
              <h3 className="text-xl font-semibold mb-4 text-center">
                Sponsored Content
              </h3>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <div className="w-16 h-16 bg-accent-400 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">Premium Voting</h4>
                  <p className="text-sm text-gray-200">
                    Unlock exclusive voting features and special gifts
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <div className="w-16 h-16 bg-secondary-400 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Gift className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">Gift Packages</h4>
                  <p className="text-sm text-gray-200">
                    Send special gifts to show your support
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;