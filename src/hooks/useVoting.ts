import { create } from 'zustand';
import { Vote, Gift, GiftType } from '../types';
import { useAuth } from './useAuth';
import toast from 'react-hot-toast';

interface VotingStore {
  votes: Vote[];
  votePrice: number;
  gifts: Gift[];
  addVote: (candidateId: string, type: 'money' | 'gift', giftType?: GiftType) => Promise<void>;
  getVotesForCandidate: (candidateId: string) => Vote[];
  getTotalVotesForCandidate: (candidateId: string) => number;
}

export const useVoting = create<VotingStore>((set, get) => ({
  votes: [],
  votePrice: 200, // ₦200 per vote

  gifts: [
    { type: 'star', name: 'Star', voteValue: 300, price: 1000, icon: '⭐', color: '#FFD700' },
    { type: 'crown', name: 'Crown', voteValue: 5000, price: 15000, icon: '👑', color: '#FFD700' },
    { type: 'gold', name: 'Gold', voteValue: 2000, price: 6000, icon: '🥇', color: '#FFD700' },
    { type: 'silver', name: 'Silver', voteValue: 700, price: 2000, icon: '🥈', color: '#C0C0C0' },
    { type: 'love', name: 'Love', voteValue: 3000, price: 9000, icon: '💖', color: '#FF69B4' },
    { type: 'diamond', name: 'Diamond', voteValue: 4000, price: 12000, icon: '💎', color: '#00CED1' },
  ],

  addVote: async (candidateId: string, type: 'money' | 'gift', giftType?: GiftType) => {
    const { user, updateUser } = useAuth.getState();
    if (!user) {
      toast.error('Please login to vote');
      return;
    }

    const { votes, votePrice, gifts } = get();
    let cost = 0;
    let voteValue = 1;

    if (type === 'money') {
      cost = votePrice;
      voteValue = 1;
    } else if (type === 'gift' && giftType) {
      const gift = gifts.find(g => g.type === giftType);
      if (gift) {
        cost = gift.price;
        voteValue = gift.voteValue;
      }
    }

    if (user.walletBalance < cost) {
      toast.error('Insufficient wallet balance');
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const newVote: Vote = {
        id: Math.random().toString(36).substr(2, 9),
        voterId: user.id,
        candidateId,
        amount: cost,
        type,
        giftType,
        timestamp: new Date(),
      };

      set({ votes: [...votes, newVote] });
      
      // Update user wallet balance
      updateUser({ 
        walletBalance: user.walletBalance - cost,
        totalVotesGiven: (user.totalVotesGiven || 0) + voteValue,
      });

      if (type === 'gift') {
        toast.success(`${gifts.find(g => g.type === giftType)?.name} gift sent successfully! 🎁`);
      } else {
        toast.success('Vote cast successfully! 🗳️');
      }
    } catch (error) {
      toast.error('Failed to cast vote. Please try again.');
    }
  },

  getVotesForCandidate: (candidateId: string) => {
    return get().votes.filter(vote => vote.candidateId === candidateId);
  },

  getTotalVotesForCandidate: (candidateId: string) => {
    const candidateVotes = get().getVotesForCandidate(candidateId);
    const { gifts } = get();
    
    return candidateVotes.reduce((total, vote) => {
      if (vote.type === 'money') {
        return total + 1;
      } else if (vote.type === 'gift' && vote.giftType) {
        const gift = gifts.find(g => g.type === vote.giftType);
        return total + (gift?.voteValue || 0);
      }
      return total;
    }, 0);
  },
}));