import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { useToast } from "../../hooks/use-toast";

const CollectorDashboard = () => {
  const [weight, setWeight] = useState(0); // start with 0 kg

  const [scanData, setScanData] = useState({
    userEmail: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const randomWeight = +(Math.random() * 2).toFixed(2); // 0.00 - 2.00 kg
      setWeight(randomWeight);
    }, 10000); // update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const [recentScans, setRecentScans] = useState([
    {
      id: "1",
      plasticType: "PET Bottle",
      user: "user1@ecopoint.com",
      points: 10,
      timestamp: new Date().toLocaleString(),
    },
    {
      id: "2",
      plasticType: "HDPE Container",
      user: "user@ecopoint.com",
      points: 15,
      timestamp: new Date(Date.now() - 300000).toLocaleString(),
    },
  ]);

  const { toast } = useToast();

  const mockPlasticTypes = {
    QR_PET_001: { name: "PET Bottle", points: 10 },
    QR_HDPE_002: { name: "HDPE Container", points: 15 },
  };

  const handleWeight = (e: React.FormEvent) => {
    e.preventDefault();

    if (!scanData.userEmail) {
      toast({
        title: "User Required",
        description: "Please enter a user email",
        variant: "destructive",
      });
      return;
    }

    // Points system: 1 kg = 10 points
    const pointsPerKg = 10;
    const totalPoints = Math.round(weight * pointsPerKg);

    const newEntry = {
      id: Date.now().toString(),
      plasticType: "Weighed Plastic", // or you can replace with actual material input later
      user: scanData.userEmail,
      points: totalPoints,
      timestamp: new Date().toLocaleString(),
    };

    setRecentScans([newEntry, ...recentScans]);
    setScanData({ userEmail: "" });

    toast({
      title: "Weight submitted!",
      description: `${totalPoints} points assigned to ${newEntry.user}`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Collector Dashboard
        </h1>
        <p className="text-gray-600">
          Weigh plastic items and assign points to users
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* QR Scanner */}
        <Card>
          <CardHeader>
            <CardTitle>Weigh Plastic Item</CardTitle>
            <CardDescription>
              Weigh plastic items and assign points to user
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleWeight} className="space-y-4">
              <div>
                <Label htmlFor="qrCode">Weight</Label>
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Plastic Weight</CardTitle>
                    <CardDescription>
                      Live reading from smart scale (kg)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-6xl font-bold text-green-700">
                        {weight.toFixed(2)} kg
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Label htmlFor="userEmail">User Email</Label>
                <Input
                  id="userEmail"
                  type="email"
                  value={scanData.userEmail}
                  onChange={(e) =>
                    setScanData({ ...scanData, userEmail: e.target.value })
                  }
                  placeholder="Enter user email"
                  required
                />
              </div>

              <Button type="submit" className="w-full eco-gradient text-white">
                Process Weight
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Quick Users:</h4>
              <div className="text-sm text-blue-700 space-y-1">
                <button
                  type="button"
                  className="block hover:underline"
                  onClick={() =>
                    setScanData({ ...scanData, userEmail: "user@ecopoint.com" })
                  }
                >
                  user@ecopoint.com
                </button>
                <button
                  type="button"
                  className="block hover:underline"
                  onClick={() =>
                    setScanData({
                      ...scanData,
                      userEmail: "user1@ecopoint.com",
                    })
                  }
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
            <CardTitle>Recent Weighings</CardTitle>
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
                  <p className="text-gray-600 text-sm mb-1">
                    User: {scan.user}
                  </p>
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
            <p className="text-gray-600"> Weighings Today</p>
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
              {new Set(recentScans.map((scan) => scan.user)).size}
            </div>
            <p className="text-gray-600">Unique Users</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CollectorDashboard;
