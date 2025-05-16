
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Shield, Lock, Eye, Bell, Trash2, LogOut } from 'lucide-react';

const Settings = () => {
  return (
    <div className="p-4 md:p-8 pb-20">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Settings</h1>
      </header>
      
      <div className="space-y-6">
        <div className="glass-card">
          <h2 className="text-lg font-medium mb-4">Privacy Controls</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-primary mr-3" />
                <span>Enhanced Privacy Mode</span>
              </div>
              <Switch />
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Eye className="h-5 w-5 text-primary mr-3" />
                <span>Hide Identity Details</span>
              </div>
              <Switch />
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Lock className="h-5 w-5 text-primary mr-3" />
                <span>Use Biometric Lock</span>
              </div>
              <Switch />
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Bell className="h-5 w-5 text-primary mr-3" />
                <span>Proof Request Notifications</span>
              </div>
              <Switch />
            </div>
          </div>
        </div>
        
        <div className="glass-card">
          <h2 className="text-lg font-medium mb-4">Account</h2>
          
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <Trash2 className="h-4 w-4 mr-2 text-destructive" />
              Delete Identity Data
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
