import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { X, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

interface BillItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const BillingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { customer } = location.state || {};

  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [redeemPoints, setRedeemPoints] = useState(0);

  const loyaltySettings = {
    pointsPerDollar: 1,
    pointsToCurrencyValue: 100, // 100 points = $1
    minRedeemPoints: 500
  };

  useEffect(() => {
    if (!customer) {
      navigate('/customers');
    }
  }, [customer, navigate]);

  const handleAddItem = () => {
    if (newItemName.trim() && newItemPrice) {
      const newItem: BillItem = {
        id: Date.now(),
        name: newItemName,
        price: parseFloat(newItemPrice),
        quantity: 1,
      };
      setBillItems([...billItems, newItem]);
      setNewItemName('');
      setNewItemPrice('');
    }
  };

  const handleRemoveItem = (id: number) => {
    setBillItems(billItems.filter(item => item.id !== id));
  };

  const subtotal = billItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const redeemableValue = Math.floor(customer?.points / loyaltySettings.pointsToCurrencyValue);
  const discount = Math.min(redeemPoints / loyaltySettings.pointsToCurrencyValue, subtotal);
  const total = subtotal - discount;
  const pointsEarned = Math.floor(total * loyaltySettings.pointsPerDollar);

  const handleProcessPayment = () => {
    // This would typically involve a payment gateway integration
    toast.success('Payment processed successfully!');
    // Update customer points
    const updatedPoints = customer.points - redeemPoints + pointsEarned;
    // Here you would update the customer data in your backend
    console.log(`Updated points for ${customer.firstName}: ${updatedPoints}`);
    navigate('/customers');
  };

  if (!customer) {
    return null; // or a loading spinner
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Billing</h1>
        <p className="text-gray-600 mt-2">Create a new bill for {customer.firstName} {customer.lastName}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Billing Items */}
        <Card>
          <CardHeader>
            <CardTitle>Bill Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {billItems.map(item => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t flex space-x-2">
              <Input
                placeholder="Item Name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Price"
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(e.target.value)}
              />
              <Button onClick={handleAddItem}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary & Redemption */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Discount (from points)</p>
                <p className="text-green-600">-${discount.toFixed(2)}</p>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
            </div>

            <div className="mt-6">
              <Label>Redeem Points</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Input
                  type="number"
                  value={redeemPoints}
                  onChange={(e) => setRedeemPoints(Math.min(parseInt(e.target.value) || 0, customer.points))}
                  max={customer.points}
                  min="0"
                />
                <Button onClick={() => setRedeemPoints(customer.points)}>Max</Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Available points: {customer.points} (worth ${redeemableValue.toFixed(2)})
              </p>
            </div>

            <div className="mt-6 text-center p-4 bg-blue-50 rounded-lg">
              <p className="font-semibold">Points to be earned: <span className="text-blue-600">{pointsEarned}</span></p>
            </div>

            <Button onClick={handleProcessPayment} className="w-full mt-6">
              Process Payment
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BillingPage;
