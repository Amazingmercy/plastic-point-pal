import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { PlasticType } from '../../types';
import { useToast } from '../../hooks/use-toast';

const AdminDashboard = () => {
  const [plasticTypes, setPlasticTypes] = useState<PlasticType[]>([
    {
      id: '1',
      name: 'PET Bottle',
      description: 'Plastic bottles for beverages',
      pointValue: 10,
      qrCode: 'QR_PET_001',
      createdBy: 'admin',
      createdAt: new Date(),
    },
    {
      id: '2',
      name: 'HDPE Container',
      description: 'High-density polyethylene containers',
      pointValue: 15,
      qrCode: 'QR_HDPE_002',
      createdBy: 'admin',
      createdAt: new Date(),
    }
  ]);

  const [newPlastic, setNewPlastic] = useState({
    name: '',
    description: '',
    pointValue: 0
  });

  const { toast } = useToast();

  const handleCreatePlastic = (e: React.FormEvent) => {
    e.preventDefault();
    
    const plasticType: PlasticType = {
      id: Date.now().toString(),
      ...newPlastic,
      qrCode: `QR_${newPlastic.name.toUpperCase().replace(/\s+/g, '_')}_${Date.now()}`,
      createdBy: 'admin',
      createdAt: new Date(),
    };

    setPlasticTypes([...plasticTypes, plasticType]);
    setNewPlastic({ name: '', description: '', pointValue: 0 });
    
    toast({
      title: "Plastic type created",
      description: `${plasticType.name} has been added with QR code: ${plasticType.qrCode}`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Manage plastic types and QR codes</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Create New Plastic Type */}
        <Card>
          <CardHeader>
            <CardTitle>Create New Plastic Type</CardTitle>
            <CardDescription>
              Add a new plastic type with point value and generate QR code
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreatePlastic} className="space-y-4">
              <div>
                <Label htmlFor="name">Plastic Name</Label>
                <Input
                  id="name"
                  value={newPlastic.name}
                  onChange={(e) => setNewPlastic({...newPlastic, name: e.target.value})}
                  placeholder="e.g., PET Bottle"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newPlastic.description}
                  onChange={(e) => setNewPlastic({...newPlastic, description: e.target.value})}
                  placeholder="Describe the plastic type"
                />
              </div>

              <div>
                <Label htmlFor="pointValue">Point Value</Label>
                <Input
                  id="pointValue"
                  type="number"
                  value={newPlastic.pointValue}
                  onChange={(e) => setNewPlastic({...newPlastic, pointValue: parseInt(e.target.value)})}
                  placeholder="Points earned per item"
                  min="1"
                  required
                />
              </div>

              <Button type="submit" className="w-full eco-gradient text-white">
                Create Plastic Type & Generate QR
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Existing Plastic Types */}
        <Card>
          <CardHeader>
            <CardTitle>Existing Plastic Types</CardTitle>
            <CardDescription>
              All plastic types with their QR codes and point values
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {plasticTypes.map((plastic) => (
                <div key={plastic.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{plastic.name}</h3>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                      {plastic.pointValue} pts
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{plastic.description}</p>
                  <div className="bg-gray-100 p-2 rounded">
                    <code className="text-sm">QR: {plastic.qrCode}</code>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-6 mt-8">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {plasticTypes.length}
            </div>
            <p className="text-gray-600">Plastic Types</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">156</div>
            <p className="text-gray-600">Total Scans</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">42</div>
            <p className="text-gray-600">Active Users</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600">8</div>
            <p className="text-gray-600">Collectors</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
