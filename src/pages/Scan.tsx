
import React, { useState } from 'react';
import MRZScanner from '@/components/MRZScanner';
import NFCReader from '@/components/NFCReader';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import FaceVerification from '@/components/FaceVerification';
import LocationVerification from '@/components/LocationVerification';

enum ScanStep {
  MRZ,
  NFC,
  FACE,
  LOCATION
}

const Scan = () => {
  const [currentStep, setCurrentStep] = useState<ScanStep>(ScanStep.MRZ);
  
  const handleMRZScanComplete = (isEPassport: boolean) => {
    if (isEPassport) {
      setCurrentStep(ScanStep.NFC);
    } else {
      toast.error("Not a valid e-passport. Please try again.");
    }
  };

  const handleNFCReadComplete = (data: any) => {
    setCurrentStep(ScanStep.FACE);
  };
  
  const handleFaceVerificationComplete = () => {
    setCurrentStep(ScanStep.LOCATION);
  };
  
  const handleLocationVerificationComplete = () => {
    // Navigate to identity page
    window.location.href = "/identity";
  };
  
  return (
    <div className="min-h-screen p-4 md:p-8 pb-20">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold ml-2">
            {currentStep === ScanStep.MRZ && "Scan Passport"}
            {currentStep === ScanStep.NFC && "Read e-Passport Chip"}
            {currentStep === ScanStep.FACE && "Face Verification"}
            {currentStep === ScanStep.LOCATION && "Location Verification"}
          </h1>
        </div>
        <div className="flex space-x-1">
          {[0, 1, 2, 3].map((step) => (
            <div
              key={step}
              className={`h-1 rounded-full ${
                step === currentStep 
                  ? "w-8 bg-primary glow" 
                  : step < currentStep 
                    ? "w-6 bg-primary/60" 
                    : "w-6 bg-muted"
              }`}
            />
          ))}
        </div>
      </header>

      {currentStep === ScanStep.MRZ && (
        <MRZScanner onScanComplete={handleMRZScanComplete} />
      )}

      {currentStep === ScanStep.NFC && (
        <NFCReader onReadComplete={handleNFCReadComplete} />
      )}
      
      {currentStep === ScanStep.FACE && (
        <FaceVerification onVerificationComplete={handleFaceVerificationComplete} />
      )}
      
      {currentStep === ScanStep.LOCATION && (
        <LocationVerification onVerificationComplete={handleLocationVerificationComplete} />
      )}
    </div>
  );
};

export default Scan;
