
import React, { useState } from 'react';
import DigitalPassport from '@/components/DigitalPassport';
import { PassportData } from '@/types/passport';
import ZKProofSelector from '@/components/ZKProofSelector';
import QRCodeModal from '@/components/QRCodeModal';
import samplePhoto from '../assets/sample-passport-photo.png';

const Identity = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProofType, setSelectedProofType] = useState('');
  const [proofMessage, setProofMessage] = useState('');
  
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
    setSelectedProofType(proofType);
    setProofMessage(message);
    setModalOpen(true);
  };
  
  return (
    <div className="p-4 md:p-8 pb-20">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Digital Identity</h1>
      </header>
      
      <div className="space-y-8">
        <DigitalPassport data={passportData} />
        
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

export default Identity;
