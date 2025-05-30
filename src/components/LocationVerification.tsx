
import React, { useState } from 'react';
import { MapPin, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface LocationVerificationProps {
  onVerificationComplete: () => void;
}

const LocationVerification: React.FC<LocationVerificationProps> = ({ onVerificationComplete }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const handleStartVerification = () => {
    setIsVerifying(true);
    
    // Simulate location verification process
    toast.info("Verifying location...");
    
    setTimeout(() => {
      toast.success("Location verified successfully!");
      setIsVerifying(false);
      setIsComplete(true);
      
      setTimeout(() => {
        onVerificationComplete();
      }, 1000);
    }, 3000);
  };
  
  return (
    <div className="glass-card flex flex-col items-center justify-center py-10 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10"></div>
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-4">
          <MapPin size={80} className="text-primary" />
          {isVerifying && (
            <div className="absolute inset-0 animate-ping rounded-full bg-primary/30"></div>
          )}
          {isComplete && (
            <div className="absolute right-0 bottom-0">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          )}
        </div>
        <h2 className="text-2xl font-bold mb-2">Location Verification</h2>
        <p className="text-sm text-center text-muted-foreground mb-6">
          Your current location will be verified for identity assurance
        </p>
        <div className="w-full max-w-sm flex justify-center">
          <Button 
            onClick={handleStartVerification} 
            disabled={isVerifying || isComplete}
            className="purple-gradient px-8 py-6 hover:opacity-90 glow"
          >
            {isVerifying ? 'Verifying...' : isComplete ? 'Verified' : 'Share Location'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationVerification;
