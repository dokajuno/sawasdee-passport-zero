
import React, { useState } from 'react';
import { Nfc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { PassportData } from '@/types/passport';
import samplePhoto from '../assets/sample-passport-photo.png';

interface NFCReaderProps {
  onReadComplete: (data: PassportData) => void;
}

const NFCReader: React.FC<NFCReaderProps> = ({ onReadComplete }) => {
  const [isReading, setIsReading] = useState(false);
  
  const handleReadNFC = () => {
    setIsReading(true);
    
    // Simulate NFC reading process
    toast.info("Reading e-passport chip...");
    
    setTimeout(() => {
      // In a real app, we would read actual passport data here
      const sampleData: PassportData = {
        firstName: "Jane",
        lastName: "Doe",
        dateOfBirth: "1990-01-15",
        nationality: "Thailand",
        gender: "Female",
        passportNumber: "TH1234567",
        expiryDate: "2030-01-14",
        photo: samplePhoto
      };
      
      toast.success("Passport data successfully read!");
      setIsReading(false);
      onReadComplete(sampleData);
    }, 3000);
  };
  
  return (
    <div className="glass-card flex flex-col items-center justify-center py-10 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10"></div>
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative">
          <Nfc size={80} className="text-primary mb-4" />
          {isReading && (
            <div className="absolute inset-0 animate-ping rounded-full bg-primary/30"></div>
          )}
        </div>
        <h2 className="text-2xl font-bold mb-2">NFC Reader</h2>
        <p className="text-sm text-center text-muted-foreground mb-6">
          Place your e-passport on your phone to read data from the embedded chip
        </p>
        <div className="w-full max-w-sm flex justify-center">
          <Button 
            onClick={handleReadNFC} 
            disabled={isReading}
            className="purple-gradient px-8 py-6 hover:opacity-90 glow"
          >
            {isReading ? 'Reading...' : 'Start NFC Reading'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NFCReader;
