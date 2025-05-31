
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useToast } from '../../hooks/use-toast';

const CollectorDashboard = () => {
  const [scanData, setScanData] = useState({
    qrCode: '',
    userEmail: ''
  });

  const [recentScans, setRecentScans] = useState([
    {
      id: '1',
      plasticType: 'PET Bottle',
      user: 'user1@ecopoint.com',
      points: 10,
      timestamp: new Date().toLocaleString()
    },
    {
      id: '2',
      plasticType: 'HDPE Container',
      user: 'user@ecopoint.com',
      points: 15,
      timestamp: new Date(Date.now() - 300000).toLocaleString()
    }
  ]);

  const { toast } = useToast();

  const mockPlasticTypes = {
    'QR_PET_001': { name: 'PET Bottle', points: 10 },
    'QR_HDPE_002': { name: 'HDPE Container', points: 15 }
  };

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    
    const plasticInfo = mockPlasticTypes[scanData.qrCode as keyof typeof mockPlasticTypes];
    
    if (!plasticInfo) {
      toast({
        title: "Invalid QR Code",
        description: "This QR code is not recognized",
        variant: "destructive",
      });
      return;
    }

    if (!scanData.userEmail) {
      toast({
        title: "User Required",
        description: "Please specify a user email",
        variant: "destructive",
      });
      return;
    }

    const newScan = {
      id: Date.now().toString(),
      plasticType: plasticInfo.name,
      user: scanData.userEmail,
      points: plasticInfo.points,
      timestamp: new Date().toLocaleString()
    };

    setRecentScans([newScan, ...recentScans]);
    setScanData({ qrCode: '', userEmail: '' });
    
    toast({
      title: "Scan successful!",
      description: `${plasticInfo.points} points added to ${scanData.userEmail}`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Collector Dashboard</h1>
        <p className="text-gray-600">Scan plastic items and assign points to users</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* QR Scanner */}
        <Card>
          <CardHeader>
            <CardTitle>Scan Plastic Item</CardTitle>
            <CardDescription>
              Scan QR code and assign points to user
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleScan} className="space-y-4">
              <div>
                <Label htmlFor="qrCode">QR Code</Label>
                <Select 
                  value={scanData.qrCode}
                  onValueChange={(value) => setScanData({...scanData, qrCode: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select or scan QR code" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="QR_PET_001">QR_PET_001 (PET Bottle - 10 pts)</SelectItem>
                    <SelectItem value="QR_HDPE_002">QR_HDPE_002 (HDPE Container - 15 pts)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="userEmail">User Email</Label>
                <Input
                  id="userEmail"
                  type="email"
                  value={scanData.userEmail}
                  onChange={(e) => setScanData({...scanData, userEmail: e.target.value})}
                  placeholder="Enter user email"
                  required
                />
              </div>

              <Button type="submit" className="w-full eco-gradient text-white">
                Process Scan
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Quick Users:</h4>
              <div className="text-sm text-blue-700 space-y-1">
                <button 
                  type="button"
                  className="block hover:underline"
                  onClick={() => setScanData({...scanData, userEmail: 'user@ecopoint.com'})}
                >
                  user@ecopoint.com
                </button>
                <button 
                  type="button"
                  className="block hover:underline"
                  onClick={() => setScanData({...scanData, userEmail: 'user1@ecopoint.com'})}
                >
                  user1@ecopoint.com
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Scans */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Scans</CardTitle>
            <CardDescription>
              Recently processed plastic returns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentScans.map((scan) => (
                <div key={scan.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{scan.plasticType}</h3>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                      +{scan.points} pts
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">User: {scan.user}</p>
                  <p className="text-gray-500 text-xs">{scan.timestamp}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {recentScans.length}
            </div>
            <p className="text-gray-600">Scans Today</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {recentScans.reduce((sum, scan) => sum + scan.points, 0)}
            </div>
            <p className="text-gray-600">Points Distributed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {new Set(recentScans.map(scan => scan.user)).size}
            </div>
            <p className="text-gray-600">Unique Users</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CollectorDashboard;
