
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QRCode } from 'qrcode.react';

interface QRCodeModalProps {
  isOpen: boolean;
  proofType: string;
  proofMessage: string;
  onClose: () => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, proofType, proofMessage, onClose }) => {
  if (!isOpen) return null;
  
  const proofTitles: Record<string, string> = {
    age: 'Proof of Age',
    country: 'Proof of Country',
    name: 'Proof of Name',
    image: 'Proof of Image'
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="glass-card z-10 w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{proofTitles[proofType]}</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="bg-white p-4 rounded-lg mb-4">
          <QRCode 
            value={proofMessage} 
            size={200} 
            level="H" 
            includeMargin={true} 
            renderAs="svg" 
            className="w-full h-auto"
          />
        </div>
        
        <div className="text-sm text-muted-foreground mb-4">
          Scan this QR code to verify the zero-knowledge proof. This proves your information without revealing sensitive data.
        </div>
        
        <div className="text-xs bg-muted/30 p-3 rounded-lg overflow-x-auto">
          <pre>{proofMessage}</pre>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;
