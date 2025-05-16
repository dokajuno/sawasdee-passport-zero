
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PassportData } from '@/types/passport';
import { toast } from 'sonner';
import { CheckCircle2 } from 'lucide-react';

interface ZKProofSelectorProps {
  data: PassportData;
  onGenerateProof: (proofType: string, message: string) => void;
}

interface ProofType {
  id: string;
  title: string;
  description: string;
}

const proofTypes: ProofType[] = [
  {
    id: 'age',
    title: 'Proof of Age',
    description: 'Prove you\'re over 18 without revealing your age'
  },
  {
    id: 'country',
    title: 'Proof of Country',
    description: 'Prove the country listed on your passport'
  },
  {
    id: 'name',
    title: 'Proof of Name',
    description: 'Prove your first and last name'
  },
  {
    id: 'image',
    title: 'Proof of Image',
    description: 'Verify your identity without revealing your photo'
  },
];

const ZKProofSelector: React.FC<ZKProofSelectorProps> = ({ data, onGenerateProof }) => {
  const [selectedProof, setSelectedProof] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerateProof = () => {
    if (!selectedProof) return;
    
    setIsGenerating(true);
    toast.info("Generating zero-knowledge proof...");
    
    setTimeout(() => {
      // In a real app, we would generate an actual ZK proof here
      const proofMessages: Record<string, string> = {
        age: `{"pubSignal":["0x1a2b3c...","isOver18:true"],"proof":"0x7f8e9d..."}`,
        country: `{"pubSignal":["0x4d5e6f...","country:${data.nationality}"],"proof":"0x1a2b3c..."}`,
        name: `{"pubSignal":["0xa1b2c3...","nameVerified:true"],"proof":"0xd4e5f6..."}`,
        image: `{"pubSignal":["0x7a8b9c...","faceVerified:true"],"proof":"0x4d5e6f..."}`
      };
      
      const message = proofMessages[selectedProof];
      setIsGenerating(false);
      onGenerateProof(selectedProof, message);
    }, 2000);
  };
  
  return (
    <div className="glass-card">
      <h3 className="text-xl font-bold mb-4 glow-text">Generate Zero-Knowledge Proof</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Select information to prove without revealing your actual data
      </p>
      
      <div className="grid grid-cols-1 gap-3 mb-6">
        {proofTypes.map((type) => (
          <div 
            key={type.id}
            onClick={() => setSelectedProof(type.id)}
            className={`
              p-4 rounded-xl cursor-pointer transition-all
              ${selectedProof === type.id 
                ? 'glass border-primary glow' 
                : 'border border-border/40 hover:border-border/80'}
            `}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{type.title}</h4>
                <p className="text-xs text-muted-foreground">{type.description}</p>
              </div>
              {selectedProof === type.id && (
                <CheckCircle2 className="h-5 w-5 text-primary" />
              )}
            </div>
          </div>
        ))}
      </div>
      
      <Button
        onClick={handleGenerateProof}
        disabled={!selectedProof || isGenerating}
        className="w-full purple-gradient hover:opacity-90"
      >
        {isGenerating ? 'Generating...' : 'Generate Proof'}
      </Button>
    </div>
  );
};

export default ZKProofSelector;
