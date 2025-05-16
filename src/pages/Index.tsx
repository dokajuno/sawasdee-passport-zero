
import React, { useState } from 'react';
import Logo from '@/components/Logo';
import MRZScanner from '@/components/MRZScanner';
import NFCReader from '@/components/NFCReader';
import DigitalPassport from '@/components/DigitalPassport';
import ZKProofSelector from '@/components/ZKProofSelector';
import QRCodeModal from '@/components/QRCodeModal';
import { PassportData } from '@/types/passport';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [step, setStep] = useState<'mrz' | 'nfc' | 'passport'>('mrz');
  const [passportData, setPassportData] = useState<PassportData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProofType, setSelectedProofType] = useState('');
  const [proofMessage, setProofMessage] = useState('');

  const handleMRZScanComplete = (isEPassport: boolean) => {
    if (isEPassport) {
      setStep('nfc');
    }
  };

  const handleNFCReadComplete = (data: PassportData) => {
    setPassportData(data);
    setStep('passport');
  };

  const handleGenerateProof = (proofType: string, message: string) => {
    setSelectedProofType(proofType);
    setProofMessage(message);
    setModalOpen(true);
  };

  const resetProcess = () => {
    setStep('mrz');
    setPassportData(null);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <Logo />
        {step === 'passport' && (
          <Button variant="outline" onClick={resetProcess} className="text-sm">
            Scan New Passport
          </Button>
        )}
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto">
        {step === 'mrz' && (
          <MRZScanner onScanComplete={handleMRZScanComplete} />
        )}

        {step === 'nfc' && (
          <NFCReader onReadComplete={handleNFCReadComplete} />
        )}

        {step === 'passport' && passportData && (
          <div className="space-y-8">
            <DigitalPassport data={passportData} />
            
            <div className="mt-8">
              <ZKProofSelector 
                data={passportData} 
                onGenerateProof={handleGenerateProof}
              />
            </div>
          </div>
        )}
      </main>
      
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

export default Index;
