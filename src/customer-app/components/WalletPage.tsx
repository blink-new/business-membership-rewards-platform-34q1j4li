import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Gift, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const WalletPage: React.FC = () => {
  const [balance, setBalance] = useState(150.75);
  const [isRedeemOpen, setIsRedeemOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [redeemCode, setRedeemCode] = useState('');
  const [transferEmail, setTransferEmail] = useState('');
  const [transferAmount, setTransferAmount] = useState(0);

  const handleRedeem = () => {
    if (redeemCode.trim() === '') {
      toast.error('Please enter a gift card code.');
      return;
    }
    // Mock redemption
    setBalance(balance + 50);
    setRedeemCode('');
    setIsRedeemOpen(false);
    toast.success('Gift card redeemed successfully!');
  };

  const handleTransfer = () => {
    if (transferEmail.trim() === '' || transferAmount <= 0) {
      toast.error('Please enter a valid email and amount.');
      return;
    }
    if (transferAmount > balance) {
      toast.error('Insufficient balance.');
      return;
    }
    // Mock transfer
    setBalance(balance - transferAmount);
    setTransferEmail('');
    setTransferAmount(0);
    setIsTransferOpen(false);
    toast.success('Funds transferred successfully!');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Wallet</h1>
      <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg">
        <CardContent className="p-6">
          <p className="text-sm opacity-80">Total Balance</p>
          <p className="text-4xl font-bold mt-2">${balance.toFixed(2)}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <Dialog open={isRedeemOpen} onOpenChange={setIsRedeemOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full bg-white py-6 flex-col h-auto">
              <Gift className="w-6 h-6 mb-2 text-green-500" />
              <span className="font-semibold">Redeem Card</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Redeem Gift Card</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="redeemCode">Gift Card Code</Label>
                <Input
                  id="redeemCode"
                  value={redeemCode}
                  onChange={(e) => setRedeemCode(e.target.value)}
                  placeholder="Enter your code"
                />
              </div>
              <Button onClick={handleRedeem} className="w-full">Redeem</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isTransferOpen} onOpenChange={setIsTransferOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full bg-white py-6 flex-col h-auto">
              <Send className="w-6 h-6 mb-2 text-blue-500" />
              <span className="font-semibold">Transfer</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Transfer Funds</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="transferEmail">Recipient's Email</Label>
                <Input
                  id="transferEmail"
                  type="email"
                  value={transferEmail}
                  onChange={(e) => setTransferEmail(e.target.value)}
                  placeholder="recipient@example.com"
                />
              </div>
              <div>
                <Label htmlFor="transferAmount">Amount</Label>
                <Input
                  id="transferAmount"
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                />
              </div>
              <Button onClick={handleTransfer} className="w-full">Transfer</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <h2 className="text-lg font-semibold text-gray-800 my-6">Transaction History</h2>
      <div className="space-y-3">
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">Received from Jane S.</p>
              <p className="text-xs text-gray-500">June 20, 2024</p>
            </div>
            <p className="font-bold text-green-500">+$25.00</p>
          </CardContent>
        </Card>
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">Sent to Mike J.</p>
              <p className="text-xs text-gray-500">June 18, 2024</p>
            </div>
            <p className="font-bold text-red-500">-$50.00</p>
          </CardContent>
        </Card>
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">Redeemed Gift Card</p>
              <p className="text-xs text-gray-500">June 15, 2024</p>
            </div>
            <p className="font-bold text-green-500">+$50.00</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WalletPage;
