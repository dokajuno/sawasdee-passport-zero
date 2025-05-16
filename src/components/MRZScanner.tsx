import React, { useState, useRef } from 'react';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Webcam from 'react-webcam';

interface MRZScannerProps {
  onScanComplete: (isEPassport: boolean) => void;
}

const MRZScanner: React.FC<MRZScannerProps> = ({ onScanComplete }) => {
  const [isScanning, setIsScanning] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const handleScan = () => {
    setIsScanning(true);
    toast.info("Scanning passport MRZ...");

    // Automatically proceed to the next step after 5 seconds
    setTimeout(() => {
      const isEPassport = true; // Simulated result
      toast.success("E-passport detected!");
      setIsScanning(false);
      onScanComplete(isEPassport);
    }, 5000);
  };

  return (
    <div className="glass-card flex flex-col items-center justify-center py-10 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10"></div>
      <div className="relative z-10 flex flex-col items-center">
        {isScanning ? (
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{ 
              facingMode: "environment" // Use rear camera for MRZ scanning
            }}
            className="relative w-full max-w-xs aspect-[4/3] mb-6 border-2 border-primary/70 rounded-lg overflow-hidden glass"
          >
            {({ getScreenshot }) => (
              <>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-x-0 h-0.5 bg-primary top-1/2 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
                <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-primary"></div>
                <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-primary"></div>
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-primary"></div>
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-primary"></div>
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <div className="bg-black/60 text-white text-xs py-1 px-2 rounded-full inline-block">
                    Position MRZ in frame
                  </div>
                </div>
              </>
            )}
          </Webcam>
        ) : (
          <Camera size={80} className="text-primary mb-4" />
        )}

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