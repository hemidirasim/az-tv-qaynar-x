
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <img 
            src="https://admin.aztv.az/userfiles/files/a.png" 
            alt="AzTV Logo" 
            className="h-8 w-auto"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
          <div>
            <h1 className="text-xl font-bold aztv-text-gradient">AzTV</h1>
            <p className="text-xs text-muted-foreground">Rəsmi Mobil Tətbiq</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-red-50 px-2 py-1 rounded-full">
            <div className="w-2 h-2 bg-red-500 rounded-full live-indicator"></div>
            <span className="text-xs font-medium text-red-600">CANLI</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
