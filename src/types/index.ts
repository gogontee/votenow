// User types
export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  role: 'voter' | 'candidate' | 'admin';
  profilePicture?: string;
  bio?: string;
  walletBalance: number;
  totalVotesGiven?: number;
  totalVotesReceived?: number;
  followers: string[];
  following: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Vote types
export interface Vote {
  id: string;
  voterId: string;
  candidateId: string;
  amount: number;
  type: 'money' | 'gift';
  giftType?: GiftType;
  timestamp: Date;
}

// Gift types
export type GiftType = 'star' | 'crown' | 'gold' | 'silver' | 'love' | 'diamond';

export interface Gift {
  type: GiftType;
  name: string;
  voteValue: number;
  price: number;
  icon: string;
  color: string;
}

// Post types
export interface Post {
  id: string;
  title: string;
  content: string;
  image?: string;
  authorId: string;
  likes: string[];
  comments: Comment[];
  shares: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  createdAt: Date;
}

// Transaction types
export interface Transaction {
  id: string;
  userId: string;
  type: 'deposit' | 'vote' | 'gift' | 'refund';
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  reference?: string;
  createdAt: Date;
}

// Auth types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}