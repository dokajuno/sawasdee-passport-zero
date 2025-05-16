import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share2, ToggleLeft, ToggleRight } from 'lucide-react';
import ZKProofSelector from '@/components/ZKProofSelector';
import QRCodeModal from '@/components/QRCodeModal';
import { toast } from 'sonner';
import { PassportData } from '@/types/passport';
import samplePhoto from '../assets/sample-passport-photo.png';

const ZKProofs = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProofType, setSelectedProofType] = useState('');
  const [proofMessage, setProofMessage] = useState('');
  const [locationSharing, setLocationSharing] = useState(false);
  
  // In a real app, this would come from your state management
  const passportData: PassportData = {
    firstName: "Jane",
    lastName: "Doe",
    dateOfBirth: "1990-01-15",
    nationality: "Thailand",
    gender: "Female",
    passportNumber: "TH1234567",
    expiryDate: "2030-01-14",
    photo: samplePhoto
  };
  
  const handleGenerateProof = (proofType: string, message: string) => {
    if (!locationSharing) {
      toast.warning("Consider enabling location sharing for more secure proofs");
    }
    
    setSelectedProofType(proofType);
    setProofMessage(message);
    setModalOpen(true);
  };
  
  const toggleLocationSharing = () => {
    const newState = !locationSharing;
    setLocationSharing(newState);
    
    if (newState) {
      toast.success("Location sharing enabled");
      // In a real app, this would request location permissions
    } else {
      toast.info("Location sharing disabled");
    }
  };
  
  return (
    <div className="p-4 md:p-8 pb-20">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Link to="/identity">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold ml-2">Zero-Knowledge Proofs</h1>
        </div>
        <Button 
          variant="outline" 
          size="lg" 
          className={`flex items-center gap-2 ${locationSharing ? 'text-green-500 border-green-500' : 'text-red-500 border-red-500'}`}
          onClick={toggleLocationSharing}
        >
          <Share2 className="h-5 w-5" />
          {locationSharing ? (
            <>
              <span>Location On</span>
              <ToggleRight className="h-5 w-5 ml-2" />
            </>
          ) : (
            <>
              <span>Location Off</span>
              <ToggleLeft className="h-5 w-5 ml-2" />
            </>
          )}
        </Button>
      </header>
      
      <div className="space-y-8">
        <div className="mt-8">
          <ZKProofSelector 
            data={passportData} 
            onGenerateProof={handleGenerateProof}
          />
        </div>
      </div>
      
      {/* QR Code Modal */}
      <QRCodeModal 
        isOpen={modalOpen}
        proofType={selectedProofType}
        proofMessage={proofMessage}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default ZKProofs;
