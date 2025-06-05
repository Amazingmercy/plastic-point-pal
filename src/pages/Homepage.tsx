import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Homepage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      icon: "♻️",
      title: "Weigh & Earn",
      description:
        "Return plastic items and earn points instantly through Weighing",
    },
    {
      icon: "🎁",
      title: "Redeem Rewards",
      description:
        "Exchange your points for cash via bank transfer or Solana wallet",
    },
    {
      icon: "🌍",
      title: "Save the Planet",
      description:
        "Contribute to environmental sustainability while earning rewards",
    },
  ];

  const steps = [
    {
      step: "1",
      title: "Register",
      description: "Create your free Ecopoint account",
    },
    {
      step: "2",
      title: "Collect Plastics",
      description: "Gather plastic items for recycling",
    },
    {
      step: "3",
      title: "Visit Collector",
      description: "Find a certified collector to weigh your items",
    },
    {
      step: "4",
      title: "Earn Points",
      description: "Points are automatically added to your account",
    },
    {
      step: "5",
      title: "Redeem Rewards",
      description: "Exchange points for real money",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="eco-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Turn Plastic Waste into Rewards
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Join the sustainable revolution. Earn points for recycling plastic
            and redeem real rewards.
          </p>
          {!user && (
            <div className="space-x-4">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100"
                onClick={() => navigate("/register")}
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-green-600 hover:bg-white hover:text-green-400"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Ecopoint?
            </h2>
            <p className="text-xl text-gray-600">
              Simple, rewarding, and environmentally friendly
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="eco-card border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to start earning rewards for recycling
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 eco-gradient rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who are already earning rewards while
            protecting our planet.
          </p>
          {!user && (
            <Button
              size="lg"
              className="eco-gradient text-white"
              onClick={() => navigate("/register")}
            >
              Start Earning Today
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
