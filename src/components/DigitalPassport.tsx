
import React from 'react';
import { PassportData } from '@/types/passport';
import { Shield } from 'lucide-react';

interface DigitalPassportProps {
  data: PassportData;
}

const DigitalPassport: React.FC<DigitalPassportProps> = ({ data }) => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="glass-card relative overflow-hidden border border-white/20">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-passport-pattern"></div>
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-primary mr-2" />
            <h3 className="font-bold text-lg glow-text">Digital Passport</h3>
          </div>
          <div className="text-xs text-muted-foreground px-2 py-1 glass rounded-full">
            Secured with zkSawasdee
          </div>
        </div>
        
        {/* Photo and Details */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Photo */}
          <div className="relative w-full md:w-1/3 aspect-[3/4] rounded-lg overflow-hidden border border-white/20 glow">
            <img 
              src={data.photo} 
              alt="Passport photo" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-2">
              <div className="text-xs text-center font-medium">{data.nationality}</div>
            </div>
          </div>
          
          {/* Details */}
          <div className="flex-1 space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Full Name</label>
              <div className="font-medium">{`${data.firstName} ${data.lastName}`}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Date of Birth</label>
                <div className="font-medium">{new Date(data.dateOfBirth).toLocaleDateString()}</div>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Gender</label>
                <div className="font-medium">{data.gender}</div>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">ID Number</label>
                <div className="font-medium">{data.passportNumber}</div>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Expiry Date</label>
                <div className="font-medium">{new Date(data.expiryDate).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -z-10 top-4 left-4 right-4 bottom-4 bg-purple-500/10 rounded-2xl blur-xl"></div>
    </div>
  );
};

export default DigitalPassport;
