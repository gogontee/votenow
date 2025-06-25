import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Crown, Star, Medal, Award, TrendingUp } from 'lucide-react';
import { useVoting } from '../../hooks/useVoting';

const LeaderboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'candidates' | 'voters'>('candidates');
  const { getTotalVotesForCandidate } = useVoting();

  // Mock candidates data
  const candidates = [
    {
      id: '1',
      name: 'Sarah Johnson',
      bio: 'Passionate about community development and environmental sustainability.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      totalVotes: 15420,
      category: 'Community Leader',
    },
    {
      id: '2',
      name: 'Michael Chen',
      bio: 'Tech entrepreneur with a vision for digital transformation.',
      image: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      totalVotes: 12350,
      category: 'Technology',
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      bio: 'Dedicated educator working to improve access to quality education.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      totalVotes: 11200,
      category: 'Education',
    },
    {
      id: '4',
      name: 'David Thompson',
      bio: 'Healthcare professional committed to improving medical services.',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      totalVotes: 9850,
      category: 'Healthcare',
    },
    {
      id: '5',
      name: 'Lisa Anderson',
      bio: 'Small business owner advocating for economic development.',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      totalVotes: 8920,
      category: 'Business',
    },
  ];

  // Mock voters data
  const voters = [
    {
      id: '1',
      name: 'Alex Morgan',
      totalVotes: 1250,
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      badge: 'Super Voter',
    },
    {
      id: '2',
      name: 'Jessica Parker',
      totalVotes: 980,
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      badge: 'Active Voter',
    },
    {
      id: '3',
      name: 'Robert Kim',
      totalVotes: 875,
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      badge: 'Dedicated Voter',
    },
    {
      id: '4',
      name: 'Maria González',
      totalVotes: 720,
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      badge: 'Regular Voter',
    },
    {
      id: '5',
      name: 'James Wilson',
      totalVotes: 650,
      image: 'https://images.pexels.com/photos/1552058/pexels-photo-1552058.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      badge: 'Engaged Voter',
    },
  ];

  const sortedCandidates = useMemo(() => {
    return [...candidates]
      .map(candidate => ({
        ...candidate,
        totalVotes: getTotalVotesForCandidate(candidate.id) || candidate.totalVotes,
      }))
      .sort((a, b) => b.totalVotes - a.totalVotes);
  }, [candidates, getTotalVotesForCandidate]);

  const sortedVoters = useMemo(() => {
    return [...voters].sort((a, b) => b.totalVotes - a.totalVotes);
  }, [voters]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Trophy className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-orange-500" />;
      default:
        return <Award className="h-6 w-6 text-primary-500" />;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-yellow-600';
      case 2:
        return 'from-gray-400 to-gray-600';
      case 3:
        return 'from-orange-400 to-orange-600';
      default:
        return 'from-primary-400 to-primary-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
            Leaderboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Celebrating our top performers and most active community members
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-2 flex space-x-2">
            <button
              onClick={() => setActiveTab('candidates')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === 'candidates'
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Top Candidates
            </button>
            <button
              onClick={() => setActiveTab('voters')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === 'voters'
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Top Voters
            </button>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'candidates' ? (
            <div className="space-y-6">
              {sortedCandidates.map((candidate, index) => (
                <motion.div
                  key={candidate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 ${
                    index === 0
                      ? 'border-yellow-300 shadow-yellow-200'
                      : index === 1
                      ? 'border-gray-300 shadow-gray-200'
                      : index === 2
                      ? 'border-orange-300 shadow-orange-200'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-6">
                      {/* Rank */}
                      <div className="flex-shrink-0">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${getRankBadgeColor(index + 1)} flex items-center justify-center`}>
                          <span className="text-2xl font-bold text-white">#{index + 1}</span>
                        </div>
                      </div>

                      {/* Profile Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={candidate.image}
                          alt={candidate.name}
                          className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-2xl font-bold text-gray-900 truncate">
                            {candidate.name}
                          </h3>
                          {getRankIcon(index + 1)}
                        </div>
                        <p className="text-gray-600 mb-2 line-clamp-2">
                          {candidate.bio}
                        </p>
                        <div className="flex items-center space-x-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                            {candidate.category}
                          </span>
                          <div className="flex items-center text-gray-500">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            <span className="text-sm">Trending</span>
                          </div>
                        </div>
                      </div>

                      {/* Votes */}
                      <div className="flex-shrink-0 text-right">
                        <div className="text-3xl font-bold text-primary-600 mb-1">
                          {candidate.totalVotes.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">votes</div>
                        <div className="mt-2 w-32">
                          <div className="bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-1000"
                              style={{
                                width: `${(candidate.totalVotes / sortedCandidates[0].totalVotes) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedVoters.map((voter, index) => (
                <motion.div
                  key={voter.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 ${
                    index === 0
                      ? 'border-yellow-300 shadow-yellow-200'
                      : index === 1
                      ? 'border-gray-300 shadow-gray-200'
                      : index === 2
                      ? 'border-orange-300 shadow-orange-200'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="p-6 text-center">
                    <div className="relative mb-4">
                      <img
                        src={voter.image}
                        alt={voter.name}
                        className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
                      />
                      <div className={`absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-r ${getRankBadgeColor(index + 1)} flex items-center justify-center`}>
                        <span className="text-sm font-bold text-white">#{index + 1}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {voter.name}
                    </h3>

                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getRankBadgeColor(index + 1)} text-white mb-4`}>
                      {voter.badge}
                    </div>

                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-600 mb-1">
                        {voter.totalVotes}
                      </div>
                      <div className="text-sm text-gray-500">votes cast</div>
                    </div>

                    <div className="mt-4">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-1000"
                          style={{
                            width: `${(voter.totalVotes / sortedVoters[0].totalVotes) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default LeaderboardPage;