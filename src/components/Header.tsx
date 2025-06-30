
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img 
                src="https://admin.aztv.az/userfiles/files/a.png" 
                alt="AzTV Logo" 
                className="h-10 w-auto transition-transform hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold aztv-text-gradient">AzTV</h1>
              <p className="text-xs text-muted-foreground -mt-1">Rəsmi Mobil Tətbiq</p>
            </div>
            <div className="block sm:hidden">
              <h1 className="text-xl font-bold aztv-text-gradient">AzTV</h1>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-red-50 to-red-100 px-3 py-2 rounded-full border border-red-200 shadow-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-red-700 tracking-wide">CANLI</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
