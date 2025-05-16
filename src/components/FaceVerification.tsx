import React, { useState, useRef, useEffect } from 'react';
import { Camera, CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Webcam from 'react-webcam';

interface FaceVerificationProps {
  onVerificationComplete: () => void;
}

const FaceVerification: React.FC<FaceVerificationProps> = ({ onVerificationComplete }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  
  const handleStartVerification = () => {
    setCameraOpen(true);
    toast.info("Opening front camera...");
    
    setTimeout(() => {
      setIsVerifying(true);
      toast.info("Scanning face...");
      
      setTimeout(() => {
        toast.success("Face verification successful!");
        setIsVerifying(false);
        setIsComplete(true);
        
        setTimeout(() => {
          setCameraOpen(false);
          onVerificationComplete();
        }, 1000);
      }, 3000);
    }, 1000);
  };
  
  const handleCloseCamera = () => {
    setCameraOpen(false);
    setIsVerifying(false);
  };
  
  return (
    <div className="glass-card flex flex-col items-center justify-center py-10 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10"></div>
      <div className="relative z-10 flex flex-col items-center w-full">
        {cameraOpen ? (
          <div className="relative w-full max-w-sm aspect-[3/4] mb-6 border-2 border-primary/70 rounded-lg overflow-hidden glass">
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                facingMode: "user", // Use front camera
                width: { ideal: 1280 },
                height: { ideal: 720 }
              }}
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Scanning overlay */}
            {isVerifying && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 border-4 border-dashed rounded-full border-primary animate-spin mb-4"></div>
                  <div className="text-white">Scanning face...</div>
                </div>
              </div>
            )}
            
            {/* Guide overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-2/3 h-2/3 border-2 border-white/40 rounded-full mx-auto mt-12 flex items-center justify-center">
                <div className="text-xs text-white/70">Position your face here</div>
              </div>
            </div>
            
            {/* Close button */}
            <button 
              className="absolute top-2 right-2 bg-black/40 rounded-full p-1"
              onClick={handleCloseCamera}
            >
              <X size={20} className="text-white" />
            </button>
          </div>
        ) : (
          <div className="relative mb-4">
            <Camera size={80} className="text-primary" />
            {isVerifying && (
              <div className="absolute inset-0 animate-ping rounded-full bg-primary/30"></div>
            )}
            {isComplete && (
              <div className="absolute right-0 bottom-0">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
            )}
          </div>
        )}
        <h2 className="text-2xl font-bold mb-2">Face Verification</h2>
        <p className="text-sm text-center text-muted-foreground mb-6">
          Make sure your face is clearly visible and look directly at the camera
        </p>
        <div className="w-full max-w-sm flex justify-center">
          <Button 
            onClick={handleStartVerification} 
            disabled={isVerifying || isComplete || cameraOpen}
            className="purple-gradient px-8 py-6 hover:opacity-90 glow"
          >
            {cameraOpen ? 'Scanning...' : isComplete ? 'Verified' : 'Start Face Verification'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FaceVerification;