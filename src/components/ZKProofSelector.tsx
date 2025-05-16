import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PassportData } from '@/types/passport';
import { toast } from 'sonner';
import { CheckCircle2 } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";

interface ZKProofSelectorProps {
  data: PassportData;
  onGenerateProof: (proofType: string, message: string) => void;
}

interface ProofType {
  id: string;
  description: string;
}

const proofTypes: ProofType[] = [
  {
    id: 'age',
    description: 'Prove you\'re over 18 without revealing your age'
  },
  {
    id: 'country',
    description: 'Prove the country listed on your passport'
  },
  {
    id: 'name',
    description: 'Prove your first and last name'
  },
  {
    id: 'image',
    description: 'Verify your identity without revealing your photo'
  },
];

const ZKProofSelector: React.FC<ZKProofSelectorProps> = ({ data, onGenerateProof }) => {
  const [selectedProofs, setSelectedProofs] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleToggleProof = (proofId: string) => {
    setSelectedProofs(prev => 
      prev.includes(proofId) 
        ? prev.filter(id => id !== proofId) 
        : [...prev, proofId]
    );
  };
  
  const handleGenerateProof = () => {
    if (selectedProofs.length === 0) {
      toast.error("Please select at least one proof type");
      return;
    }
    
    setIsGenerating(true);
    toast.info("Generating zero-knowledge proof...");
    
    setTimeout(() => {
      // In a real app, we would generate an actual ZK proof here
      const proofData = {
        proofs: selectedProofs.map(id => {
          switch (id) {
            case 'age':
              return { type: 'age', value: 'isOver18:true' };
            case 'country':
              return { type: 'country', value: `country:${data.nationality}` };
            case 'name':
              return { type: 'name', value: 'nameVerified:true' };
            case 'image':
              return { type: 'image', value: 'faceVerified:true' };
            default:
              return null;
          }
        }).filter(Boolean)
      };
      
      const proofMessage = JSON.stringify({
        pubSignal: ["0x7f8e9d..."],
        proofs: proofData.proofs,
        proof: "0x4d5e6f..."
      });
      
      setIsGenerating(false);
      
      // Using the first selected proof as the primary type
      onGenerateProof(selectedProofs.join(','), proofMessage);
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
            onClick={() => handleToggleProof(type.id)}
            className={`
              p-4 rounded-xl cursor-pointer transition-all
              ${selectedProofs.includes(type.id) 
                ? 'glass border-primary glow' 
                : 'border border-border/40 hover:border-border/80'}
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox 
                  checked={selectedProofs.includes(type.id)} 
                  onCheckedChange={() => {}}
                  className="mr-3"
                />
                <div>
                  <h4 className="font-medium">{type.id}</h4>
                  <p className="text-xs text-muted-foreground">{type.description}</p>
                </div>
              </div>
              {selectedProofs.includes(type.id) && (
                <CheckCircle2 className="h-5 w-5 text-primary" />
              )}
            </div>
          </div>
        ))}
      </div>
      
      <Button
        onClick={handleGenerateProof}
        disabled={selectedProofs.length === 0 || isGenerating}
        className="w-full purple-gradient hover:opacity-90"
      >
        {isGenerating ? 'Generating...' : `Generate ${selectedProofs.length > 0 ? selectedProofs.length : ''} Proof${selectedProofs.length !== 1 ? 's' : ''}`}
      </Button>
    </div>
  );
};

export default ZKProofSelector;
