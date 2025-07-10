import React from 'react';
import { Search, Bell } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';

const offers = [
  {
    id: 1,
    business: 'Coffee & Co.',
    title: 'Happy Hour Special',
    description: 'Buy 2 get 1 free on all beverages',
    logo: 'https://placehold.co/100x100/E2E8F0/4A5568?text=C&C'
  },
  {
    id: 2,
    business: 'Fashion Forward',
    title: 'New Season Sale',
    description: '30% off winter collection',
    logo: 'https://placehold.co/100x100/E2E8F0/4A5568?text=FF'
  },
  {
    id: 3,
    business: 'Coffee & Co.',
    title: 'Weekend Warrior',
    description: '25% off all pastries on weekends',
    logo: 'https://placehold.co/100x100/E2E8F0/4A5568?text=C&C'
  },
];

const HomePage: React.FC = () => {
  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hi, Alex!</h1>
          <p className="text-gray-500">Welcome back</p>
        </div>
        <div className="flex items-center space-x-4">
          <Search className="w-6 h-6 text-gray-500" />
          <Bell className="w-6 h-6 text-gray-500" />
        </div>
      </header>

      <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Offers</h2>
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {offers.map((offer) => (
          <Card key={offer.id} className="min-w-[280px] flex-shrink-0 bg-white rounded-xl shadow-md overflow-hidden">
            <CardContent className="p-4 flex">
              <img src={offer.logo} alt={offer.business} className="w-16 h-16 rounded-lg mr-4" />
              <div>
                <p className="text-sm font-semibold text-gray-600">{offer.business}</p>
                <h3 className="text-md font-bold text-gray-900">{offer.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{offer.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-lg font-semibold text-gray-800 my-4">Recent Activity</h2>
      <div className="space-y-3">
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <p className="font-bold text-blue-600">C&C</p>
            </div>
            <div>
              <p className="text-sm font-medium">You earned 15 points at <span className="font-bold">Coffee & Co.</span></p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
              <p className="font-bold text-purple-600">FF</p>
            </div>
            <div>
              <p className="text-sm font-medium">You redeemed a 20% off coupon at <span className="font-bold">Fashion Forward</span></p>
              <p className="text-xs text-gray-500">Yesterday</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
