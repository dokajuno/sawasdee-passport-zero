
import React, { useState } from 'react';
import DigitalPassport from '@/components/DigitalPassport';
import { PassportData } from '@/types/passport';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, ArrowRight } from 'lucide-react';
import samplePhoto from '../assets/sample-passport-photo.png';

const Identity = () => {
  const [identities, setIdentities] = useState<PassportData[]>([
    {
      firstName: "Jane",
      lastName: "Doe",
      dateOfBirth: "1990-01-15",
      nationality: "Thailand",
      gender: "Female",
      passportNumber: "TH1234567",
      expiryDate: "2030-01-14",
      photo: samplePhoto
    }
  ]);
  
  const [selectedIdentity, setSelectedIdentity] = useState<number>(0);
  const navigate = useNavigate();
  
  const handleAddIdentity = () => {
    // In a real app, this would navigate back to scan flow
    navigate("/scan");
  };
  
  const handleGenerateProofs = () => {
    navigate("/zkproofs");
  };
  
  return (
    <div className="p-4 md:p-8 pb-20">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Digital Identity</h1>
        <Button 
          variant="outline" 
          size="icon"
          onClick={handleAddIdentity}
          className="rounded-full"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </header>
      
      <div className="space-y-8">
        {/* Identity selector (if more than one) */}
        {identities.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {identities.map((identity, index) => (
              <button
                key={identity.passportNumber}
                onClick={() => setSelectedIdentity(index)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm ${
                  index === selectedIdentity
                    ? 'bg-primary/20 border border-primary text-primary'
                    : 'bg-muted border border-transparent'
                }`}
              >
                {identity.firstName} {identity.lastName}
              </button>
            ))}
          </div>
        )}
        
        {/* Display the selected passport */}
        <DigitalPassport data={identities[selectedIdentity]} />
        
        {/* Generate Proofs Button */}
        <Button 
          className="w-full purple-gradient py-6 hover:opacity-90 glow mt-8" 
          onClick={handleGenerateProofs}
        >
          Generate Zero-Knowledge Proofs <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Identity;
