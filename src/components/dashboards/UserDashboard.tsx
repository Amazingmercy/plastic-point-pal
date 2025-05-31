
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/use-toast';

const UserDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [rewardSettings, setRewardSettings] = useState({
    bankAccount: '',
    bankName: '',
    accountName: '',
    solanaWallet: user?.walletAddress || ''
  });

  const [transactions] = useState([
    {
      id: '1',
      type: 'earned',
      description: 'PET Bottle recycled',
      points: 10,
      date: new Date().toLocaleDateString()
    },
    {
      id: '2',
      type: 'earned',
      description: 'HDPE Container recycled',
      points: 15,
      date: new Date(Date.now() - 86400000).toLocaleDateString()
    },
    {
      id: '3',
      type: 'redeemed',
      description: 'Bank transfer',
      points: -50,
      date: new Date(Date.now() - 172800000).toLocaleDateString()
    }
  ]);

  const handleRedemption = (method: 'bank' | 'solana') => {
    if (user && user.points < 100) {
      toast({
        title: "Insufficient points",
        description: "You need at least 100 points to redeem rewards",
        variant: "destructive",
      });
      return;
    }

    const destination = method === 'bank' 
      ? `${rewardSettings.bankName} - ${rewardSettings.bankAccount}`
      : rewardSettings.solanaWallet;

    if (!destination) {
      toast({
        title: "Missing information",
        description: `Please set up your ${method === 'bank' ? 'bank details' : 'Solana wallet'} first`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Redemption submitted",
      description: `Your reward redemption via ${method} has been submitted for processing`,
    });
  };

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.username}!</h1>
        <p className="text-gray-600">Track your recycling progress and redeem rewards</p>
      </div>

      {/* Points Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="eco-card">
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {user.points}
            </div>
            <p className="text-gray-600">Total Points</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {transactions.filter(t => t.type === 'earned').length}
            </div>
            <p className="text-gray-600">Items Recycled</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              ${(user.points * 0.01).toFixed(2)}
            </div>
            <p className="text-gray-600">Earned Value</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activity" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="redeem">Redeem Rewards</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your recycling and redemption history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-600">{transaction.date}</p>
                    </div>
                    <Badge 
                      variant={transaction.type === 'earned' ? 'default' : 'secondary'}
                      className={transaction.type === 'earned' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                    >
                      {transaction.points > 0 ? '+' : ''}{transaction.points} pts
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="redeem">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Bank Transfer</CardTitle>
                <CardDescription>
                  Redeem points directly to your bank account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Rate:</strong> 100 points = $1.00
                  </p>
                  <p className="text-sm text-green-700">
                    Minimum: 100 points
                  </p>
                </div>
                <Button 
                  className="w-full"
                  onClick={() => handleRedemption('bank')}
                  disabled={user.points < 100}
                >
                  Redeem via Bank Transfer
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Solana Wallet</CardTitle>
                <CardDescription>
                  Receive USDC directly to your Solana wallet
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-800">
                    <strong>Rate:</strong> 100 points = 1 USDC
                  </p>
                  <p className="text-sm text-purple-700">
                    Minimum: 100 points
                  </p>
                </div>
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => handleRedemption('solana')}
                  disabled={user.points < 100 || !rewardSettings.solanaWallet}
                >
                  Redeem to Solana
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Reward Settings</CardTitle>
              <CardDescription>
                Set up your payment methods for reward redemption
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Bank Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="accountName">Account Name</Label>
                    <Input
                      id="accountName"
                      value={rewardSettings.accountName}
                      onChange={(e) => setRewardSettings({...rewardSettings, accountName: e.target.value})}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      value={rewardSettings.bankName}
                      onChange={(e) => setRewardSettings({...rewardSettings, bankName: e.target.value})}
                      placeholder="e.g., Chase Bank"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bankAccount">Account Number</Label>
                  <Input
                    id="bankAccount"
                    value={rewardSettings.bankAccount}
                    onChange={(e) => setRewardSettings({...rewardSettings, bankAccount: e.target.value})}
                    placeholder="Your account number"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Solana Wallet</h3>
                <div>
                  <Label htmlFor="solanaWallet">Wallet Address</Label>
                  <Input
                    id="solanaWallet"
                    value={rewardSettings.solanaWallet}
                    onChange={(e) => setRewardSettings({...rewardSettings, solanaWallet: e.target.value})}
                    placeholder="Your Solana wallet address"
                  />
                </div>
              </div>

              <Button className="eco-gradient text-white">
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
