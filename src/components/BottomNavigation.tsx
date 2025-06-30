
import React from 'react';
import { Home, Tv, Settings } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: 'home' | 'live' | 'settings';
  onTabChange: (tab: 'home' | 'live' | 'settings') => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home' as const, label: 'Xəbərlər', icon: Home },
    { id: 'live' as const, label: 'Canlı Yayım', icon: Tv },
    { id: 'settings' as const, label: 'Tənzimləmələr', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg z-50 safe-area-bottom">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex-1 flex flex-col items-center justify-center py-3 px-2 transition-all duration-200 ease-in-out relative ${
                  isActive 
                    ? 'text-primary scale-105' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                } rounded-lg mx-1`}
              >
                <Icon className={`h-5 w-5 mb-1 transition-colors ${isActive ? 'text-primary' : ''}`} />
                <span className={`text-xs font-medium transition-colors ${isActive ? 'text-primary' : ''}`}>
                  {tab.label}
                </span>
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary rounded-full transition-all duration-300" />
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
