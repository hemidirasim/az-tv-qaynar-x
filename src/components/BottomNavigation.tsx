
import React from 'react';
import { Home, Tv, Info } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: 'home' | 'live' | 'settings';
  onTabChange: (tab: 'home' | 'live' | 'settings') => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home' as const, label: 'Xəbərlər', icon: Home },
    { id: 'live' as const, label: 'Canlı Yayım', icon: Tv },
    { id: 'settings' as const, label: 'Məlumat', icon: Info },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-2xl z-50">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex-1 flex flex-col items-center justify-center py-3 px-2 transition-all duration-300 ease-out relative ${
                  isActive 
                    ? 'text-purple-600 transform scale-105' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                } rounded-xl mx-1`}
              >
                <div className={`p-2 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-purple-100 shadow-lg' : ''
                }`}>
                  <Icon className={`h-5 w-5 transition-all duration-300 ${
                    isActive ? 'text-purple-600' : ''
                  }`} />
                </div>
                <span className={`text-xs font-medium mt-1 transition-all duration-300 ${
                  isActive ? 'text-purple-600 font-semibold' : ''
                }`}>
                  {tab.label}
                </span>
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300 shadow-md" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
