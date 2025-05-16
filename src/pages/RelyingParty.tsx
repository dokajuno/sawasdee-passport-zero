import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Search, X } from 'lucide-react';
import QRCode from 'react-qr-code';
import Logo from '@/components/Logo';

// More comprehensive country list
const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", 
  "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", 
  "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", 
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", 
  "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", 
  "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", 
  "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", 
  "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", 
  "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", 
  "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", 
  "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", 
  "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", 
  "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", 
  "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", 
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", 
  "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", 
  "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", 
  "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", 
  "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", 
  "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", 
  "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

// Personal information options
const personalInfoOptions = [
  { id: "issuing-state", label: "Disclose Issuing State" },
  { id: "name", label: "Disclose Name" },
  { id: "nationality", label: "Disclose Nationality" },
  { id: "dob", label: "Disclose Date of Birth" },
  { id: "passport-number", label: "Disclose Passport Number" },
  { id: "gender", label: "Disclose Gender" },
  { id: "expiry-date", label: "Disclose Expiry Date" }
];

const RelyingParty = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [excludedCountries, setExcludedCountries] = useState<string[]>([]);
  const [minAge, setMinAge] = useState(10);
  const [ofacCheck, setOfacCheck] = useState(true);
  const [personalInfo, setPersonalInfo] = useState<Record<string, boolean>>({
    "issuing-state": true,
    "name": true,
    "nationality": true,
    "dob": true,
    "passport-number": true,
    "gender": true,
    "expiry-date": true
  });
  const [qrGenerated, setQrGenerated] = useState(false);
  const [userId, setUserId] = useState("");

  // Generate a random user ID on component mount
  useEffect(() => {
    const randomId = Math.random().toString(36).substring(2, 15);
    setUserId(`b63d619f${randomId.substring(0, 8)}`);
  }, []);

  const togglePersonalInfo = (id: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleCountry = (country: string) => {
    setExcludedCountries(prev =>
      prev.includes(country)
        ? prev.filter(c => c !== country)
        : [...prev, country]
    );
  };

  const selectAllCountries = () => {
    setExcludedCountries([...countries]);
  };

  const clearAllCountries = () => {
    setExcludedCountries([]);
  };

  const filteredCountries = countries.filter(country =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateQRCode = () => {
    setQrGenerated(true);
  };

  const resetQRCode = () => {
    setQrGenerated(false);
  };

  // Create QR code data
  const qrData = {
    userId: userId,
    personalInfo: Object.entries(personalInfo)
      .filter(([_, value]) => value)
      .map(([key]) => key),
    minAge: minAge,
    ofacCheck: ofacCheck,
    excludedCountries: excludedCountries
  };

  return (
    <div className="p-4 md:p-8 pb-20">
      {/* Header */}
      <header className="flex justify-center items-center mb-8">
        <Logo />
      </header>

      <h1 className="text-2xl font-bold mb-6 text-center glow-text">Relying Party - Verification Request</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* QR Code Section */}
        <div className="w-full md:w-2/5">
          <div className="glass-card flex flex-col items-center justify-center">
            {qrGenerated ? (
              <>
                <div className="mb-6 w-64 h-64 bg-white p-4 rounded-lg flex items-center justify-center overflow-hidden">
                  <QRCode
                    value={JSON.stringify(qrData)}
                    size={240}
                    level="H"
                  />
                </div>
                <p className="text-center text-sm text-muted-foreground mb-4">
                  User ID: {userId.substring(0, 8)}...
                </p>
                <Button 
                  variant="outline" 
                  onClick={resetQRCode}
                  className="w-full"
                >
                  Reset
                </Button>
              </>
            ) : (
              <>
                <div className="w-64 h-64 border-2 border-dashed border-primary/30 rounded-lg flex items-center justify-center mb-6">
                  <p className="text-muted-foreground text-center px-4">
                    QR code will appear here after generating
                  </p>
                </div>
                <Button 
                  onClick={generateQRCode} 
                  className="purple-gradient w-full py-6 hover:opacity-90 glow"
                >
                  Generate QR Code
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Verification Options Section */}
        <div className="w-full md:w-3/5">
          <div className="glass-card">
            <h2 className="text-xl font-bold mb-4 glow-text">Verification Options</h2>
            
            {/* Personal Information */}
            <div className="mb-8">
              <h3 className="font-medium mb-3">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {personalInfoOptions.map(option => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={personalInfo[option.id]}
                      onCheckedChange={() => togglePersonalInfo(option.id)}
                    />
                    <Label htmlFor={option.id} className="text-sm">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Rules */}
            <div>
              <h3 className="font-medium mb-3">Verification Rules</h3>
              
              {/* Minimum Age */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="min-age" className="text-sm">
                    Minimum Age: {minAge}
                  </Label>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={minAge}
                  onChange={(e) => setMinAge(parseInt(e.target.value))}
                  className="w-full accent-primary"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Set to 0 to disable age requirement
                </p>
              </div>
              
              {/* OFAC Check */}
              <div className="flex items-center space-x-2 mb-6">
                <Checkbox
                  id="ofac-check"
                  checked={ofacCheck}
                  onCheckedChange={() => setOfacCheck(!ofacCheck)}
                />
                <Label htmlFor="ofac-check" className="text-sm">
                  Enable OFAC Check
                </Label>
              </div>
              
              {/* Excluded Countries */}
              <div>
                <Button 
                  onClick={() => setModalOpen(true)} 
                  variant="outline"
                  className="w-full mb-2"
                >
                  Configure Excluded Countries
                </Button>
                {excludedCountries.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {excludedCountries.length} {excludedCountries.length === 1 ? 'country' : 'countries'} excluded
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Countries Selection Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="glass">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold glow-text">Configure Excluded Countries</DialogTitle>
          </DialogHeader>
          
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search countries..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 bg-background/50 border-primary/20"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <div className="border border-primary/20 rounded-md bg-background/50">
            <div className="p-2 border-b border-primary/20 flex justify-between items-center">
              <span className="text-sm">
                {excludedCountries.length} of {countries.length} selected
              </span>
              <div className="space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={selectAllCountries}
                  className="text-xs h-7"
                >
                  Select All
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearAllCountries}
                  className="text-xs h-7"
                >
                  Clear All
                </Button>
              </div>
            </div>
            
            <div className="max-h-[300px] overflow-y-auto p-1">
              {filteredCountries.length > 0 ? (
                filteredCountries.map(country => (
                  <div 
                    key={country} 
                    className="flex items-center space-x-2 p-2 hover:bg-primary/5 rounded-md"
                  >
                    <Checkbox
                      id={`country-${country}`}
                      checked={excludedCountries.includes(country)}
                      onCheckedChange={() => toggleCountry(country)}
                    />
                    <Label 
                      htmlFor={`country-${country}`}
                      className="text-sm flex-grow cursor-pointer"
                    >
                      {country}
                    </Label>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  No countries match your search
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button 
              variant="outline" 
              onClick={() => setSearchTerm('')}
              disabled={!searchTerm}
            >
              Clear Search
            </Button>
            <Button 
              onClick={() => setModalOpen(false)}
              className="purple-gradient hover:opacity-90"
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RelyingParty;