
import React, { useState } from 'react';
import MRZScanner from '@/components/MRZScanner';
import NFCReader from '@/components/NFCReader';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import FaceVerification from '@/components/FaceVerification';
import { PassportData } from '@/types/passport';

enum ScanStep {
  MRZ,
  NFC,
  FACE
}

const Scan = () => {
  const [currentStep, setCurrentStep] = useState<ScanStep>(ScanStep.MRZ);
  const [scannedData, setScannedData] = useState<PassportData | null>(null);
  const navigate = useNavigate();
  
  const handleMRZScanComplete = (isEPassport: boolean) => {
    if (isEPassport) {
      setCurrentStep(ScanStep.NFC);
    } else {
      toast.error("Not a valid e-passport. Please try again.");
    }
  };

  const handleNFCReadComplete = (data: PassportData) => {
    setScannedData(data);
    setCurrentStep(ScanStep.FACE);
  };
  
  const handleFaceVerificationComplete = () => {
    // Navigate to identity page with the scanned data
    toast.success("Identity verification complete!");
    
    // In a real app, we would store this data securely or pass it through a state manager
    navigate("/identity");
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
          </h1>
        </div>
        <div className="flex space-x-1">
          {[0, 1, 2].map((step) => (
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
    </div>
  );
};

export default Scan;
