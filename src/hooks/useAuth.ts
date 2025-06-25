import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthState } from '../types';

interface AuthStore extends AuthState {
  login: (email: string, password: string, role: 'voter' | 'candidate') => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loading: false,

      login: async (email: string, password: string, role: 'voter' | 'candidate') => {
        set({ loading: true });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const mockUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            username: email.split('@')[0],
            fullName: 'Demo User',
            role,
            walletBalance: role === 'voter' ? 5000 : 0,
            totalVotesGiven: 0,
            totalVotesReceived: 0,
            followers: [],
            following: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          set({ user: mockUser, isAuthenticated: true, loading: false });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      register: async (userData: Partial<User>) => {
        set({ loading: true });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            email: userData.email!,
            username: userData.username!,
            fullName: userData.fullName!,
            role: userData.role!,
            bio: userData.bio,
            profilePicture: userData.profilePicture,
            walletBalance: userData.role === 'voter' ? 1000 : 0,
            totalVotesGiven: 0,
            totalVotesReceived: 0,
            followers: [],
            following: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          set({ user: newUser, isAuthenticated: true, loading: false });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateUser: (userData: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...userData, updatedAt: new Date() } });
        }
      },

      followUser: (userId: string) => {
        const { user } = get();
        if (user && !user.following.includes(userId)) {
          set({
            user: {
              ...user,
              following: [...user.following, userId],
              updatedAt: new Date(),
            },
          });
        }
      },

      unfollowUser: (userId: string) => {
        const { user } = get();
        if (user) {
          set({
            user: {
              ...user,
              following: user.following.filter(id => id !== userId),
              updatedAt: new Date(),
            },
          });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);