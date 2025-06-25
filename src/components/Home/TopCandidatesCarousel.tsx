import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Crown, Star } from 'lucide-react';

const TopCandidatesCarousel: React.FC = () => {
  // Mock data for top candidates
  const topCandidates = [
    {
      id: '1',
      name: 'Sarah Johnson',
      votes: 15420,
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      rank: 1,
    },
    {
      id: '2',
      name: 'Michael Chen',
      votes: 12350,
      image: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      rank: 2,
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      votes: 11200,
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      rank: 3,
    },
    {
      id: '4',
      name: 'David Thompson',
      votes: 9850,
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      rank: 4,
    },
    {
      id: '5',
      name: 'Lisa Anderson',
      votes: 8920,
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      rank: 5,
    },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Trophy className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Star className="h-6 w-6 text-orange-500" />;
      default:
        return <div className="w-6 h-6 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center font-bold">{rank}</div>;
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Top Candidates
          </h2>
          <p className="text-xl text-gray-600">
            Leading the competition with the most votes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {topCandidates.map((candidate, index) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 ${
                candidate.rank === 1 
                  ? 'border-yellow-300 shadow-yellow-200' 
                  : candidate.rank === 2 
                  ? 'border-gray-300 shadow-gray-200' 
                  : candidate.rank === 3 
                  ? 'border-orange-300 shadow-orange-200'
                  : 'border-gray-200'
              }`}
            >
              <div className="relative">
                <img
                  src={candidate.image}
                  alt={candidate.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  {getRankIcon(candidate.rank)}
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-sm font-bold text-gray-900">#{candidate.rank}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {candidate.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary-600">
                    {candidate.votes.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">votes</div>
                </div>
                <div className="mt-4">
                  <div className="bg-primary-100 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-1000"
                      style={{
                        width: `${(candidate.votes / topCandidates[0].votes) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
          >
            View All Candidates
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default TopCandidatesCarousel;