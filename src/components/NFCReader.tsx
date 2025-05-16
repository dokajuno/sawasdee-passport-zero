
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
  const [progress, setProgress] = useState(0);
  
  const handleReadNFC = () => {
    setIsReading(true);
    setProgress(0);
    
    // Simulate NFC reading process
    toast.info("Reading e-passport chip...");
    
    // Simulate progress - faster now (200ms interval instead of 300ms)
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20; // Increased increment from 10 to 20
      });
    }, 200);
    
    // Reduced time from 3000ms to 1500ms
    setTimeout(() => {
      // In a real app, we would read actual passport data here
      const sampleData: PassportData = {
        firstName: "Ploypitcha",
        lastName: "Boontavipitak",
        dateOfBirth: "1990-06-29",
        nationality: "Thailand",
        gender: "Female",
        passportNumber: "AB114346",
        expiryDate: "2033-03-29",
        photo: samplePhoto
      };
      
      toast.success("Passport data successfully read!");
      setIsReading(false);
      onReadComplete(sampleData);
      clearInterval(interval);
    }, 1500);
  };
  
  return (
    <div className="glass-card flex flex-col items-center justify-center py-10 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10"></div>
      <div className="relative z-10 flex flex-col items-center">
        {isReading ? (
          <div className="mb-4 relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-primary/30"></div>
            <div className="relative w-32 h-32 flex items-center justify-center bg-primary/10 rounded-full border border-primary/50">
              <Nfc size={64} className="text-primary" />
            </div>
            
            {/* Progress indicator */}
            <div className="absolute -bottom-2 left-0 right-0 flex justify-center">
              <div className="bg-background/80 backdrop-blur-sm text-xs py-1 px-3 rounded-full">
                {progress}% Complete
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <Nfc size={80} className="text-primary" />
          </div>
        )}
        
        <h2 className="text-2xl font-bold mb-2">NFC Reader</h2>
        <p className="text-sm text-center text-muted-foreground mb-6">
          {isReading 
            ? "Hold your e-passport against your device's NFC reader" 
            : "Place your e-passport on your phone to read data from the embedded chip"}
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
