import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, Gift, Star, Crown, Heart } from 'lucide-react';
import { useVoting } from '../../hooks/useVoting';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

interface VotingModalProps {
  candidateId: string;
  candidateName: string;
  onClose: () => void;
}

const VotingModal: React.FC<VotingModalProps> = ({
  candidateId,
  candidateName,
  onClose,
}) => {
  const [votingType, setVotingType] = useState<'money' | 'gift'>('money');
  const [selectedGift, setSelectedGift] = useState<string>('');
  const [voteCount, setVoteCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const { addVote, votePrice, gifts } = useVoting();
  const { user } = useAuth();

  const handleVote = async () => {
    if (!user) {
      toast.error('Please login to vote');
      return;
    }

    setLoading(true);
    try {
      if (votingType === 'money') {
        for (let i = 0; i < voteCount; i++) {
          await addVote(candidateId, 'money');
        }
      } else if (votingType === 'gift' && selectedGift) {
        await addVote(candidateId, 'gift', selectedGift as any);
      }
      onClose();
    } catch (error) {
      // Error handling is done in the addVote function
    } finally {
      setLoading(false);
    }
  };

  const getTotalCost = () => {
    if (votingType === 'money') {
      return votePrice * voteCount;
    } else if (votingType === 'gift' && selectedGift) {
      const gift = gifts.find(g => g.type === selectedGift);
      return gift?.price || 0;
    }
    return 0;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getGiftIcon = (type: string) => {
    switch (type) {
      case 'star':
        return '⭐';
      case 'crown':
        return '👑';
      case 'gold':
        return '🥇';
      case 'silver':
        return '🥈';
      case 'love':
        return '💖';
      case 'diamond':
        return '💎';
      default:
        return '🎁';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              Vote for {candidateName}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Voting Type Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Choose voting method:</label>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setVotingType('money')}
                  className={`flex items-center justify-center p-4 border-2 rounded-xl transition-all ${
                    votingType === 'money'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Wallet className="h-5 w-5 mr-2" />
                  <span className="font-medium">Money Vote</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setVotingType('gift')}
                  className={`flex items-center justify-center p-4 border-2 rounded-xl transition-all ${
                    votingType === 'gift'
                      ? 'border-secondary-500 bg-secondary-50 text-secondary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Gift className="h-5 w-5 mr-2" />
                  <span className="font-medium">Gift Vote</span>
                </motion.button>
              </div>
            </div>

            {/* Money Vote Options */}
            {votingType === 'money' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of votes
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={voteCount}
                    onChange={(e) => setVoteCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="bg-primary-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-primary-700">Cost per vote:</span>
                    <span className="font-semibold text-primary-800">{formatCurrency(votePrice)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-primary-700">Total cost:</span>
                    <span className="font-bold text-primary-800">{formatCurrency(getTotalCost())}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Gift Vote Options */}
            {votingType === 'gift' && (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Choose a gift:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {gifts.map((gift) => (
                    <motion.button
                      key={gift.type}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedGift(gift.type)}
                      className={`p-4 border-2 rounded-xl transition-all ${
                        selectedGift === gift.type
                          ? 'border-secondary-500 bg-secondary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">{getGiftIcon(gift.type)}</div>
                        <div className="font-semibold text-gray-900">{gift.name}</div>
                        <div className="text-sm text-gray-600">{formatCurrency(gift.price)}</div>
                        <div className="text-xs text-secondary-600 mt-1">
                          {gift.voteValue.toLocaleString()} votes
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
                {selectedGift && (
                  <div className="bg-secondary-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-secondary-700">Selected gift:</span>
                      <span className="font-semibold text-secondary-800">
                        {gifts.find(g => g.type === selectedGift)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-secondary-700">Total cost:</span>
                      <span className="font-bold text-secondary-800">{formatCurrency(getTotalCost())}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Wallet Balance */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Your wallet balance:</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(user?.walletBalance || 0)}
                </span>
              </div>
              {getTotalCost() > (user?.walletBalance || 0) && (
                <div className="mt-2 text-sm text-red-600">
                  Insufficient balance. Please fund your wallet.
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleVote}
                disabled={
                  loading ||
                  getTotalCost() > (user?.walletBalance || 0) ||
                  (votingType === 'gift' && !selectedGift)
                }
                className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-3 rounded-lg font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? 'Processing...' : `Vote (${formatCurrency(getTotalCost())})`}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default VotingModal;