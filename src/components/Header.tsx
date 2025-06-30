
import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-xl sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img 
                src="https://admin.aztv.az/userfiles/files/a.png" 
                alt="AzTV Logo" 
                className="h-10 w-auto transition-transform hover:scale-110 duration-300"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                AzTV
              </h1>
              <p className="text-xs text-purple-200 -mt-1 font-medium">Rəsmi Mobil Tətbiq</p>
            </div>
            <div className="block sm:hidden">
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                AzTV
              </h1>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-600 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-white tracking-wider">CANLI</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
