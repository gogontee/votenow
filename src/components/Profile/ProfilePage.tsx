import React from 'react';
import { motion } from 'framer-motion';
import { User, Edit, Settings, Trophy, Heart, Users } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your profile</h2>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
            My Profile
          </h1>
          <p className="text-xl text-gray-600">
            Manage your account and view your activity
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 h-32"></div>
          <div className="relative px-6 pb-6">
            <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6 -mt-16">
              {/* Profile Picture */}
              <div className="relative">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.fullName}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <User className="h-16 w-16 text-white" />
                  </div>
                )}
                <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow">
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {user.fullName}
                </h2>
                <p className="text-gray-600 mb-2">@{user.username}</p>
                <div className="flex items-center justify-center md:justify-start space-x-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    user.role === 'candidate' 
                      ? 'bg-secondary-100 text-secondary-800'
                      : 'bg-primary-100 text-primary-800'
                  }`}>
                    {user.role === 'candidate' ? '👑 Candidate' : '🗳️ Voter'}
                  </span>
                  <span className="text-sm text-gray-500">
                    Joined {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                >
                  Edit Profile
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  <Settings className="h-4 w-4" />
                </motion.button>
              </div>
            </div>

            {/* Bio */}
            {user.bio && (
              <div className="mt-6">
                <p className="text-gray-700 text-center md:text-left">
                  {user.bio}
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6 text-center"
          >
            <div className="bg-gradient-to-r from-accent-500 to-accent-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {user.totalVotesGiven || 0}
            </div>
            <div className="text-gray-600">Votes Given</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6 text-center"
          >
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {user.totalVotesReceived || 0}
            </div>
            <div className="text-gray-600">Votes Received</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6 text-center"
          >
            <div className="bg-gradient-to-r from-green-500 to-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {user.followers.length}
            </div>
            <div className="text-gray-600">Followers</div>
          </motion.div>
        </div>

        {/* Wallet Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Wallet</h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {formatCurrency(user.walletBalance)}
              </div>
              <div className="text-gray-600">Current Balance</div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
            >
              Fund Wallet
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;