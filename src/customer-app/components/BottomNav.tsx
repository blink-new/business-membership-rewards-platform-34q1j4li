import React from 'react';
import { NavLink } from 'react-router-dom';
import { CreditCard, Gift, Wallet, User } from 'lucide-react';

const navItems = [
  { path: '/memberships', icon: CreditCard, label: 'Memberships' },
  { path: '/offers', icon: Gift, label: 'Offers' },
  { path: '/wallet', icon: Wallet, label: 'Wallet' },
  { path: '/profile', icon: User, label: 'Profile' },
];

const BottomNav: React.FC = () => {
  return (
    <div className="bg-white shadow-t-lg rounded-t-2xl">
      <nav className="flex justify-around items-center p-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-1/4 p-2 rounded-lg transition-colors ${
                isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'
              }`
            }
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default BottomNav;
