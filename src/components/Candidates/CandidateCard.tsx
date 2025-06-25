import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, User, Vote } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  bio: string;
  image: string;
  totalVotes: number;
  category: string;
}

interface CandidateCardProps {
  candidate: Candidate;
  maxVotes: number;
  viewMode: 'grid' | 'list';
  onVote: () => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  maxVotes,
  viewMode,
  onVote,
}) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Vote for ${candidate.name}`,
        text: `Support ${candidate.name} on VoteHub!`,
        url: window.location.href,
      }).catch(() => {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(window.location.href);
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
      >
        <div className="flex items-center p-6 space-x-6">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              src={candidate.image}
              alt={candidate.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-2xl font-bold text-gray-900 truncate">
                {candidate.name}
              </h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                {candidate.category}
              </span>
            </div>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {candidate.bio}
            </p>
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-primary-600">
                {candidate.totalVotes.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">votes</div>
              <div className="flex-1 max-w-xs">
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-1000"
                    style={{
                      width: `${maxVotes > 0 ? (candidate.totalVotes / maxVotes) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex-shrink-0 flex flex-col space-y-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onVote}
              className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
            >
              <Vote className="h-5 w-5" />
              <span>Vote</span>
            </motion.button>
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Heart className="h-5 w-5 text-gray-600" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleShare}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Share2 className="h-5 w-5 text-gray-600" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
    >
      {/* Profile Image */}
      <div className="relative">
        <img
          src={candidate.image}
          alt={candidate.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-sm font-bold text-primary-600">
            {candidate.totalVotes.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-2">
          <h3 className="text-xl font-bold text-gray-900 truncate">
            {candidate.name}
          </h3>
        </div>

        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 mb-3">
          {candidate.category}
        </span>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {candidate.bio}
        </p>

        {/* Vote Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Votes</span>
            <span className="text-sm font-semibold text-primary-600">
              {candidate.totalVotes.toLocaleString()}
            </span>
          </div>
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-1000"
              style={{
                width: `${maxVotes > 0 ? (candidate.totalVotes / maxVotes) * 100 : 0}%`,
              }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Heart className="h-4 w-4 text-gray-600" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Share2 className="h-4 w-4 text-gray-600" />
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onVote}
            className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
          >
            <Vote className="h-4 w-4" />
            <span>Vote</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CandidateCard;