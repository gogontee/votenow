import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from './HeroSection';
import TopCandidatesCarousel from './TopCandidatesCarousel';
import TopVotersCarousel from './TopVotersCarousel';
import AdminPostsFeed from './AdminPostsFeed';
import StatsSection from './StatsSection';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <TopCandidatesCarousel />
      <TopVotersCarousel />
      <AdminPostsFeed />
    </div>
  );
};

export default HomePage;