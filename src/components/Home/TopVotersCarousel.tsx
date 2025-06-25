import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Award } from 'lucide-react';

const TopVotersCarousel: React.FC = () => {
  // Mock data for top voters
  const topVoters = [
    {
      id: '1',
      name: 'Alex Morgan',
      totalVotes: 1250,
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      message: 'Supporting democracy one vote at a time! 🗳️',
      badge: 'Super Voter',
    },
    {
      id: '2',
      name: 'Jessica Parker',
      totalVotes: 980,
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      message: 'Every vote counts! Let your voice be heard! 💪',
      badge: 'Active Voter',
    },
    {
      id: '3',
      name: 'Robert Kim',
      totalVotes: 875,
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      message: 'Proud to participate in this amazing platform! ⭐',
      badge: 'Dedicated Voter',
    },
    {
      id: '4',
      name: 'Maria González',
      totalVotes: 720,
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      message: 'Making a difference through voting! 🌟',
      badge: 'Regular Voter',
    },
    {
      id: '5',
      name: 'James Wilson',
      totalVotes: 650,
      image: 'https://images.pexels.com/photos/1552058/pexels-photo-1552058.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      message: 'Voting is my civic duty and passion! 🔥',
      badge: 'Engaged Voter',
    },
  ];

  const getBadgeColor = (index: number) => {
    const colors = [
      'from-yellow-400 to-yellow-500',
      'from-gray-400 to-gray-500',
      'from-orange-400 to-orange-500',
      'from-blue-400 to-blue-500',
      'from-green-400 to-green-500',
    ];
    return colors[index] || 'from-primary-400 to-primary-500';
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Top Voters
          </h2>
          <p className="text-xl text-gray-600">
            Celebrating our most active community members
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {topVoters.map((voter, index) => (
            <motion.div
              key={voter.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative p-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <img
                      src={voter.image}
                      alt={voter.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className={`absolute -bottom-2 -right-2 bg-gradient-to-r ${getBadgeColor(index)} rounded-full p-2`}>
                      {index === 0 ? (
                        <Award className="h-4 w-4 text-white" />
                      ) : index === 1 ? (
                        <Star className="h-4 w-4 text-white" />
                      ) : (
                        <Heart className="h-4 w-4 text-white" />
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-1 text-center">
                    {voter.name}
                  </h3>

                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getBadgeColor(index)} text-white mb-3`}>
                    {voter.badge}
                  </div>

                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-primary-600">
                      {voter.totalVotes}
                    </div>
                    <div className="text-sm text-gray-500">votes cast</div>
                  </div>

                  <div className="bg-gray-100 rounded-lg p-3 text-center">
                    <p className="text-sm text-gray-700 italic">
                      "{voter.message}"
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join Our Voting Community
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Be part of something bigger. Cast your votes, support your favorite candidates, 
              and help shape the future. Every vote matters!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
            >
              Start Voting Today
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TopVotersCarousel;