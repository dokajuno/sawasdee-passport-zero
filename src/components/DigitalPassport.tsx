import React from 'react';
import { PassportData } from '@/types/passport';
import { Shield } from 'lucide-react';

interface DigitalPassportProps {
  data: PassportData;
}

const DigitalPassport: React.FC<DigitalPassportProps> = ({ data }) => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="glass-card relative overflow-hidden border border-white/20 p-6 bg-gradient-to-br from-purple-900/80 to-indigo-900/80">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-passport-pattern"></div>
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Shield className="h-7 w-7 text-purple-300 mr-2" />
            <h3 className="font-bold text-xl text-white">Digital Passport</h3>
          </div>
          <div className="text-xs text-white/80 px-3 py-1.5 bg-white/10 rounded-full backdrop-blur-sm">
            Secured with zkSawasdee
          </div>
        </div>
        
        {/* Photo and Details */}
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Photo */}
          <div className="relative w-full sm:w-1/3 aspect-[3/4] rounded-xl overflow-hidden border border-white/20 shadow-lg mx-auto sm:mx-0" style={{ maxWidth: '180px' }}>
            <img 
              src={data.photo} 
              alt="Passport photo" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-900/90 to-transparent p-2">
              <div className="text-sm text-center font-medium text-white">{data.nationality}</div>
            </div>
          </div>
          
          {/* Details */}
          <div className="flex-1 space-y-6 text-white">
            <div className="space-y-1">
              <label className="text-sm text-purple-200/80">Full Name</label>
              <div className="font-medium text-xl">{`${data.firstName} ${data.lastName}`}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div className="space-y-1">
                <label className="text-sm text-purple-200/80">Date of Birth</label>
                <div className="font-medium text-lg">{new Date(data.dateOfBirth).toLocaleDateString('en-US', { 
                  month: 'numeric', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}</div>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm text-purple-200/80">Gender</label>
                <div className="font-medium text-lg">{data.gender}</div>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm text-purple-200/80">ID Number</label>
                <div className="font-medium text-lg">{data.passportNumber}</div>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm text-purple-200/80">Expiry Date</label>
                <div className="font-medium text-lg">{new Date(data.expiryDate).toLocaleDateString('en-US', { 
                  month: 'numeric', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -z-10 top-4 left-4 right-4 bottom-4 bg-purple-500/20 rounded-2xl blur-xl"></div>
    </div>
  );
};

export default DigitalPassport;