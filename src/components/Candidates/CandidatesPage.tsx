import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List } from 'lucide-react';
import CandidateCard from './CandidateCard';
import VotingModal from './VotingModal';
import { useVoting } from '../../hooks/useVoting';

const CandidatesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'votes' | 'name' | 'recent'>('votes');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const { getTotalVotesForCandidate } = useVoting();

  // Mock candidates data
  const candidates = [
    {
      id: '1',
      name: 'Sarah Johnson',
      bio: 'Passionate about community development and environmental sustainability. Bringing fresh ideas to create positive change.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      totalVotes: 15420,
      category: 'Community Leader',
    },
    {
      id: '2',
      name: 'Michael Simon',
      bio: 'Tech entrepreneur with a vision for digital transformation and innovation in public services.',
      image: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      totalVotes: 12350,
      category: 'Technology',
    },
    {
      id: '3',
      name: 'Emily Rojars',
      bio: 'Dedicated educator working to improve access to quality education for all children in our community.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      totalVotes: 11200,
      category: 'Education',
    },
    {
      id: '4',
      name: 'Sarah Ella',
      bio: 'Passionate about community development and environmental sustainability. Bringing fresh ideas to create positive change.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      totalVotes: 15420,
      category: 'Community Leader',
    },
    {
      id: '5',
      name: 'Sarah John',
      bio: 'Passionate about community development and environmental sustainability. Bringing fresh ideas to create positive change.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      totalVotes: 15420,
      category: 'Community Leader',
    },
    {
      id: '6',
      name: 'David Thompson',
      bio: 'Healthcare professional committed to improving medical services and accessibility for everyone.',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      totalVotes: 9850,
      category: 'Healthcare',
    },
    {
      id: '7',
      name: 'Felicity Inde',
      bio: 'Small business owner advocating for economic development and support for local entrepreneurs.',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      totalVotes: 8920,
      category: 'Business',
    },
    {
      id: '8',
      name: 'James Wilson',
      bio: 'Environmental scientist focused on sustainable development and climate change solutions.',
      image: 'https://images.pexels.com/photos/1552058/pexels-photo-1552058.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      totalVotes: 7650,
      category: 'Environment',
    },
    {
      id: '9',
      name: 'Amanda Foster',
      bio: 'Social worker dedicated to community welfare and support for underprivileged families.',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      totalVotes: 6890,
      category: 'Social Work',
    },
    {
      id: '1',
      name: 'Robert Kim',
      bio: 'Legal professional working to ensure justice and legal support for all community members.',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      totalVotes: 6120,
      category: 'Legal',
    },
  ];

  const filteredAndSortedCandidates = useMemo(() => {
    let filtered = candidates.filter(candidate =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case 'votes':
        filtered.sort((a, b) => (getTotalVotesForCandidate(b.id) || b.totalVotes) - (getTotalVotesForCandidate(a.id) || a.totalVotes));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'recent':
        // Sort by recent (mock implementation)
        filtered.reverse();
        break;
    }

    return filtered;
  }, [candidates, searchTerm, sortBy, getTotalVotesForCandidate]);

  const maxVotes = Math.max(...candidates.map(c => getTotalVotesForCandidate(c.id) || c.totalVotes));

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
            Meet the Candidates
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing candidates and cast your votes to support your favorites
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search candidates by name, bio, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'votes' | 'name' | 'recent')}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              >
                <option value="votes">Most Votes</option>
                <option value="name">Name A-Z</option>
                <option value="recent">Recently Added</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            Showing {filteredAndSortedCandidates.length} of {candidates.length} candidates
          </p>
        </motion.div>

        {/* Candidates Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
          }`}
        >
          {filteredAndSortedCandidates.map((candidate, index) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <CandidateCard
                candidate={{
                  ...candidate,
                  totalVotes: getTotalVotesForCandidate(candidate.id) || candidate.totalVotes,
                }}
                maxVotes={maxVotes}
                viewMode={viewMode}
                onVote={() => setSelectedCandidate(candidate.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredAndSortedCandidates.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No candidates found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or filters
            </p>
          </motion.div>
        )}

        {/* Voting Modal */}
        {selectedCandidate && (
          <VotingModal
            candidateId={selectedCandidate}
            candidateName={candidates.find(c => c.id === selectedCandidate)?.name || ''}
            onClose={() => setSelectedCandidate(null)}
          />
        )}
      </div>
    </div>
  );
};

export default CandidatesPage;