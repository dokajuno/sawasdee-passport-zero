
import React from 'react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      title: 'Zero Knowledge Proofs',
      description: 'Verify information without revealing sensitive data'
    },
    {
      title: 'E-Passport Verification',
      description: 'Scan and verify electronic passport data securely'
    },
    {
      title: 'Secure Identity',
      description: 'Keep your identity safe with cryptographic technology'
    },
    {
      title: 'Privacy Control',
      description: 'Choose what information to share and with whom'
    }
  ];
  
  return (
    <div className="p-4 md:p-8 pb-20">
      {/* Header */}
      <header className="flex justify-center items-center mb-8">
        <Logo />
      </header>

      {/* Hero Section */}
      <div className="glass-card mb-8">
        <h1 className="text-3xl font-bold mb-4 glow-text">Secure Digital Identity</h1>
        <p className="text-muted-foreground mb-6">
          zkSawasdee uses zero-knowledge proofs to protect your identity while proving what matters.
        </p>
        <Link to="/scan">
          <Button className="purple-gradient w-full py-6 hover:opacity-90 glow">
            Start Scanning <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="glass p-4 rounded-xl">
            <h3 className="font-bold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="glass-card mb-20">
        <h2 className="text-xl font-bold mb-4">How it Works</h2>
        <ol className="space-y-4">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full purple-gradient flex items-center justify-center">1</span>
            <div>
              <h3 className="font-medium">Scan your e-passport</h3>
              <p className="text-sm text-muted-foreground">Scan the MRZ and use NFC to read your e-passport data</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full purple-gradient flex items-center justify-center">2</span>
            <div>
              <h3 className="font-medium">Verify your identity</h3>
              <p className="text-sm text-muted-foreground">Complete face recognition and location verification</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full purple-gradient flex items-center justify-center">3</span>
            <div>
              <h3 className="font-medium">Generate proofs</h3>
              <p className="text-sm text-muted-foreground">Create zero-knowledge proofs to share specific data</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Home;
