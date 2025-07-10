import React from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Crown } from 'lucide-react';
import Barcode from 'react-barcode';

const memberships = [
  {
    id: 'mem-1',
    business: 'Coffee & Co.',
    tier: 'Gold',
    points: 1250,
    color: '#ffd700',
    logo: 'https://placehold.co/100x100/E2E8F0/4A5568?text=C&C',
    barcode: 'CNC-0001-1250',
  },
  {
    id: 'mem-2',
    business: 'Fashion Forward',
    tier: 'VIP',
    points: 800,
    color: '#8b5cf6',
    logo: 'https://placehold.co/100x100/E2E8F0/4A5568?text=FF',
    barcode: 'FF-0002-800',
  },
  {
    id: 'mem-3',
    business: 'The Book Nook',
    tier: 'Silver',
    points: 450,
    color: '#c0c0c0',
    logo: 'https://placehold.co/100x100/E2E8F0/4A5568?text=BN',
    barcode: 'BN-0003-450',
  },
];

const MembershipsPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Memberships</h1>
      <div className="space-y-6">
        {memberships.map((membership) => (
          <Card key={membership.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <CardContent className="p-4 flex flex-col md:flex-row items-center md:items-start">
              <div className="flex items-center md:w-1/3">
                <img src={membership.logo} alt={membership.business} className="w-16 h-16 rounded-lg mr-4" />
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{membership.business}</h2>
                  <div className="flex items-center mt-1">
                    <Crown className="w-4 h-4 mr-1" style={{ color: membership.color }} />
                    <p className="text-sm font-semibold" style={{ color: membership.color }}>{membership.tier} Member</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{membership.points} points</p>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center mt-4 md:mt-0">
                <Barcode value={membership.barcode} width={1.5} height={50} fontSize={14} displayValue format="CODE128" background="#fff" lineColor="#222" />
                <p className="text-xs text-gray-400 mt-2">Show this at checkout</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MembershipsPage;
