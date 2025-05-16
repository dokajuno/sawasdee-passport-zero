
import React from 'react';
import { Home, Scan, User, Settings, Lock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const BottomNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Scan, label: 'Scan', path: '/scan' },
    { icon: User, label: 'Identity', path: '/identity' },
    { icon: Lock, label: 'ZK Proofs', path: '/zkproofs' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border">
      <div className="flex items-center justify-around py-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex flex-col items-center justify-center w-1/5 ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <item.icon size={22} className={isActive ? 'glow-text' : ''} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
