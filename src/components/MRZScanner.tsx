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
      <div className="relative z-10 flex flex-col items-center w-full max-w-md">
        {isScanning ? (
          <div className="w-full mb-6">
            <div className="relative aspect-[4/3] border-2 border-primary/70 rounded-lg overflow-hidden glass">
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={{ 
                  facingMode: "environment" // Use rear camera for MRZ scanning
                }}
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Scanning overlay */}
              <div className="absolute inset-0 bg-black/20"></div>
              
              {/* Scanning line animation */}
              <div className="absolute inset-x-0 h-0.5 bg-primary top-1/2 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
              
              {/* Corner markers */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-primary"></div>
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-primary"></div>
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-primary"></div>
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-primary"></div>
              
              {/* Small indicator inside camera view */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                <div className="bg-black/80 text-white text-xs py-1 px-3 rounded-full">
                  Position MRZ in frame
                </div>
              </div>
            </div>
            
            {/* Instructions - moved outside the camera view for better readability */}
            <div className="mt-3 bg-black/70 text-white text-xs py-3 px-4 rounded-lg leading-relaxed">
              <p className="font-medium mb-1">How to scan:</p>
              <ol className="list-decimal pl-4 space-y-1">
                <li>Position your passport with the MRZ (text and numbers at the bottom) clearly visible</li>
                <li>Ensure good lighting and keep your device steady</li>
                <li>Align the MRZ within the frame markers</li>
              </ol>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Camera size={40} className="text-primary" />
            </div>
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold">MRZ Scanner</h2>
              <p className="text-sm text-muted-foreground max-w-sm">
                Scan the Machine Readable Zone (MRZ) on your passport to verify if it's an e-passport
              </p>
            </div>
          </div>
        )}

        <div className="w-full flex justify-center mt-2">
          <Button 
            onClick={handleScan} 
            disabled={isScanning}
            className={`purple-gradient px-8 py-6 hover:opacity-90 glow ${isScanning ? 'w-full sm:w-auto' : 'w-full sm:w-2/3'}`}
          >
            {isScanning ? 'Scanning...' : 'Start Scanning'}
          </Button>
        </div>
        
        {isScanning && (
          <p className="text-xs text-center text-muted-foreground mt-3">
            Hold steady while scanning. This will take a few seconds.
          </p>
        )}
      </div>
    </div>
  );
};

export default MRZScanner;