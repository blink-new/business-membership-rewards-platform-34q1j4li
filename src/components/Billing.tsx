import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import toast from 'react-hot-toast';

// Mock business settings
const businessSettings = {
  discountPercentage: 10, // e.g. Gold tier
  pointsPerDollar: 1,
  minRedeemPoints: 100,
  pointToCurrency: 0.05, // 1 point = $0.05
};

const Billing: React.FC = () => {
  const [customerId, setCustomerId] = useState('');
  const [amount, setAmount] = useState(0);
  const [points, setPoints] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [redeemPoints, setRedeemPoints] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [showRedeem, setShowRedeem] = useState(false);

  const handleCalculate = () => {
    // Calculate discount
    const discountValue = (amount * businessSettings.discountPercentage) / 100;
    // Points earned
    const earned = Math.floor(amount * businessSettings.pointsPerDollar);
    setPoints(earned);
    setDiscount(discountValue);
    setShowRedeem(earned >= businessSettings.minRedeemPoints);
    setFinalTotal(amount - discountValue);
  };

  const handleRedeem = () => {
    // Only allow redeem if enough points
    if (redeemPoints < businessSettings.minRedeemPoints) {
      toast.error(`Minimum redeemable points: ${businessSettings.minRedeemPoints}`);
      return;
    }
    const redeemValue = redeemPoints * businessSettings.pointToCurrency;
    setFinalTotal((amount - discount) - redeemValue);
    toast.success(`Redeemed ${redeemPoints} points for $${redeemValue.toFixed(2)}`);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Billing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="customerId">Customer Membership ID / Barcode</Label>
            <Input
              id="customerId"
              value={customerId}
              onChange={e => setCustomerId(e.target.value)}
              placeholder="Scan or enter membership barcode"
            />
          </div>
          <div>
            <Label htmlFor="amount">Purchase Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              placeholder="0.00"
            />
          </div>
          <Button className="w-full" onClick={handleCalculate}>Calculate</Button>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Membership Discount</span>
              <span className="font-semibold">-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Points Earned</span>
              <span className="font-semibold">+{points}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">${(amount - discount).toFixed(2)}</span>
            </div>
            {showRedeem && (
              <div className="pt-2">
                <Label htmlFor="redeemPoints">Redeem Points</Label>
                <Input
                  id="redeemPoints"
                  type="number"
                  value={redeemPoints}
                  onChange={e => setRedeemPoints(Number(e.target.value))}
                  min={businessSettings.minRedeemPoints}
                  max={points}
                  placeholder={`Min ${businessSettings.minRedeemPoints}`}
                />
                <Button className="mt-2 w-full" onClick={handleRedeem}>Redeem</Button>
              </div>
            )}
            <div className="flex justify-between text-lg mt-4">
              <span>Total</span>
              <span className="font-bold">${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;
