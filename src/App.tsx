import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout/Layout';
import HomePage from './components/Home/HomePage';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import CandidatesPage from './components/Candidates/CandidatesPage';
import LeaderboardPage from './components/Leaderboard/LeaderboardPage';
import ProfilePage from './components/Profile/ProfilePage';
import WalletPage from './components/Wallet/WalletPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#374151',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            },
          }}
        />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="candidates" element={<CandidatesPage />} />
            <Route path="leaderboard" element={<LeaderboardPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="wallet" element={<WalletPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;