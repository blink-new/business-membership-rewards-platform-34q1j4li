import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import MembershipsPage from './components/MembershipsPage';
import WalletPage from './components/WalletPage';
import ProfilePage from './components/ProfilePage';
import HomePage from './components/HomePage'; // Offers slider and activity

const CustomerApp: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="max-w-md mx-auto h-screen flex flex-col font-sans bg-gray-50">
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/memberships" replace />} />
            <Route path="/memberships" element={<MembershipsPage />} />
            <Route path="/offers" element={<HomePage />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
};

export default CustomerApp;
