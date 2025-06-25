import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard,
  History,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const WalletPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [fundAmount, setFundAmount] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock transaction history
  const transactions = [
    {
      id: '1',
      type: 'deposit',
      amount: 5000,
      description: 'Wallet funding via Paystack',
      status: 'completed',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: '2',
      type: 'vote',
      amount: -200,
      description: 'Vote for Sarah Johnson',
      status: 'completed',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    },
    {
      id: '3',
      type: 'gift',
      amount: -1000,
      description: 'Star gift to Michael Chen',
      status: 'completed',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    },
    {
      id: '4',
      type: 'deposit',
      amount: 2000,
      description: 'Wallet funding via Paystack',
      status: 'completed',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleFundWallet = async () => {
    if (!fundAmount || parseFloat(fundAmount) <= 0) {
      return;
    }

    setLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const amount = parseFloat(fundAmount);
      updateUser({ 
        walletBalance: (user?.walletBalance || 0) + amount 
      });
      
      setFundAmount('');
      // In a real app, you would integrate with Paystack here
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="h-5 w-5 text-green-600" />;
      case 'vote':
      case 'gift':
        return <ArrowUpRight className="h-5 w-5 text-red-600" />;
      default:
        return <History className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'text-green-600';
      case 'vote':
      case 'gift':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your wallet</h2>
        </div>
      </div>
    );
  }

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
            My Wallet
          </h1>
          <p className="text-xl text-gray-600">
            Manage your funds and view transaction history
          </p>
        </motion.div>

        {/* Wallet Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl shadow-lg p-8 text-white mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Wallet className="h-8 w-8" />
                <h2 className="text-2xl font-bold">Wallet Balance</h2>
              </div>
              <div className="text-4xl font-bold mb-2">
                {formatCurrency(user.walletBalance)}
              </div>
              <div className="text-primary-100">
                Available for voting and gifts
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mb-4">
                <TrendingUp className="h-8 w-8" />
              </div>
              <div className="text-sm text-primary-100">
                Total spent: {formatCurrency(3400)}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fund Wallet Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Plus className="h-6 w-6 mr-2 text-primary-600" />
            Fund Wallet
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (NGN)
              </label>
              <input
                type="number"
                value={fundAmount}
                onChange={(e) => setFundAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex items-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFundWallet}
                disabled={loading || !fundAmount || parseFloat(fundAmount) <= 0}
                className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <CreditCard className="h-5 w-5" />
                <span>{loading ? 'Processing...' : 'Fund with Paystack'}</span>
              </motion.button>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {[1000, 2000, 5000, 10000].map((amount) => (
              <button
                key={amount}
                onClick={() => setFundAmount(amount.toString())}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
              >
                {formatCurrency(amount)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Transaction History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <History className="h-6 w-6 mr-2 text-primary-600" />
              Transaction History
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-100 rounded-full p-2">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {transaction.description}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(transaction.date)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${getTransactionColor(transaction.type)}`}>
                      {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                    </div>
                    <div className="text-sm text-gray-500 capitalize">
                      {transaction.status}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WalletPage;