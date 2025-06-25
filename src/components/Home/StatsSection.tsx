import React from 'react';
import { motion } from 'framer-motion';
import { Users, Vote, Trophy, Gift } from 'lucide-react';

const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: Users,
      value: '10,247',
      label: 'Active Users',
      color: 'from-primary-500 to-primary-600',
    },
    {
      icon: Vote,
      value: '45,832',
      label: 'Votes Cast',
      color: 'from-secondary-500 to-secondary-600',
    },
    {
      icon: Trophy,
      value: '127',
      label: 'Candidates',
      color: 'from-accent-500 to-accent-600',
    },
    {
      icon: Gift,
      value: '3,456',
      label: 'Gifts Sent',
      color: 'from-pink-500 to-pink-600',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Platform Statistics
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of users who are already making their voices heard
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`bg-gradient-to-r ${stat.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;