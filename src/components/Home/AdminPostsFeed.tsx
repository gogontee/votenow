import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Calendar,
  User,
  TrendingUp
} from 'lucide-react';

const AdminPostsFeed: React.FC = () => {
  // Mock admin posts data
  const [posts] = useState([
    {
      id: '1',
      title: 'Voting Competition Extended!',
      content: 'Due to overwhelming response, we are extending the voting period by one week. Keep supporting your favorite candidates! 🗳️',
      image: 'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      author: 'VoteHub Admin',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      likes: 127,
      comments: 23,
      shares: 45,
      liked: false,
    },
    {
      id: '2',
      title: 'New Gift Options Available',
      content: 'We\'ve added exciting new gift options including Diamond and Crown gifts. Show your support in style! 💎👑',
      image: 'https://images.pexels.com/photos/1367276/pexels-photo-1367276.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      author: 'VoteHub Admin',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      likes: 89,
      comments: 12,
      shares: 28,
      liked: true,
    },
    {
      id: '3',
      title: 'Weekly Leaderboard Update',
      content: 'Check out this week\'s top performers! The competition is heating up with some amazing candidates leading the way. 🏆',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      author: 'VoteHub Admin',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      likes: 156,
      comments: 34,
      shares: 67,
      liked: false,
    },
  ]);

  const [likedPosts, setLikedPosts] = useState<string[]>(['2']);

  const handleLike = (postId: string) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleShare = (postId: string) => {
    // Implement share functionality
    navigator.share?.({
      title: 'VoteHub Post',
      text: 'Check out this post from VoteHub!',
      url: window.location.href,
    }).catch(() => {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
    });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest Updates
          </h2>
          <p className="text-xl text-gray-600">
            Stay informed with the latest news and announcements
          </p>
        </motion.div>

        <div className="space-y-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              {post.image && (
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full p-2 mr-3">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{post.author}</h4>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDistanceToNow(post.createdAt, { addSuffix: true })}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Trending
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {post.content}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-6">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-2 transition-colors ${
                        likedPosts.includes(post.id)
                          ? 'text-red-500'
                          : 'text-gray-500 hover:text-red-500'
                      }`}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          likedPosts.includes(post.id) ? 'fill-current' : ''
                        }`}
                      />
                      <span className="text-sm font-medium">
                        {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                      </span>
                    </motion.button>

                    <button className="flex items-center space-x-2 text-gray-500 hover:text-primary-600 transition-colors">
                      <MessageCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">{post.comments}</span>
                    </button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleShare(post.id)}
                      className="flex items-center space-x-2 text-gray-500 hover:text-secondary-600 transition-colors"
                    >
                      <Share2 className="h-5 w-5" />
                      <span className="text-sm font-medium">{post.shares}</span>
                    </motion.button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200"
                  >
                    Read More
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-primary-600 border border-primary-200 px-8 py-3 rounded-xl font-semibold hover:bg-primary-50 transition-all duration-200"
          >
            View All Posts
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default AdminPostsFeed;