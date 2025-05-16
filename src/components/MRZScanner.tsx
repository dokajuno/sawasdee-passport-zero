
import React, { useState } from 'react';
import { QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface MRZScannerProps {
  onScanComplete: (isEPassport: boolean) => void;
}

const MRZScanner: React.FC<MRZScannerProps> = ({ onScanComplete }) => {
  const [isScanning, setIsScanning] = useState(false);
  
  const handleScan = () => {
    setIsScanning(true);
    
    // Simulate scanning process
    toast.info("Scanning passport MRZ...");
    
    setTimeout(() => {
      // In a real app, we would verify if it's an e-passport here
      const isEPassport = true;
      toast.success("E-passport detected!");
      setIsScanning(false);
      onScanComplete(isEPassport);
    }, 3000);
  };
  
  return (
    <div className="glass-card flex flex-col items-center justify-center py-10 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10"></div>
      <div className="relative z-10 flex flex-col items-center">
        <QrCode size={80} className="text-primary mb-4" />
        <h2 className="text-2xl font-bold mb-2">MRZ Scanner</h2>
        <p className="text-sm text-center text-muted-foreground mb-6">
          Scan the Machine Readable Zone (MRZ) on your passport to verify if it's an e-passport
        </p>
        <div className="w-full max-w-sm flex justify-center">
          <Button 
            onClick={handleScan} 
            disabled={isScanning}
            className="purple-gradient px-8 py-6 hover:opacity-90 glow"
          >
            {isScanning ? 'Scanning...' : 'Start Scanning'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MRZScanner;
