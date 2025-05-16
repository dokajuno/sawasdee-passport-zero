
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 purple-gradient rounded-full glow"></div>
        <div className="absolute inset-1 bg-background rounded-full flex items-center justify-center">
          <span className="text-primary font-bold text-lg">zk</span>
        </div>
      </div>
      <div className="font-bold text-xl text-white glow-text">
        zkSawasdee
      </div>
    </div>
  );
};

export default Logo;
