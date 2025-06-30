
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Bell, Moon, Globe, Info, Mail, Shield } from 'lucide-react';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoplay, setAutoplay] = useState(true);

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Tənzimləmələr</h1>
        <p className="text-gray-600">Tətbiq parametrlərini idarə edin</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-4 px-4">
        {/* Notifications */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bell className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Bildirişlər</h3>
                <p className="text-sm text-gray-600">Xəbər bildirişləri</p>
              </div>
            </div>
            <Switch 
              checked={notifications} 
              onCheckedChange={setNotifications}
            />
          </div>
        </Card>

        {/* Dark Mode */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Moon className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium">Qaranlıq Rejim</h3>
                <p className="text-sm text-gray-600">Gözlərinizi qoruyun</p>
              </div>
            </div>
            <Switch 
              checked={darkMode} 
              onCheckedChange={setDarkMode}
            />
          </div>
        </Card>

        {/* Auto-play */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Globe className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-medium">Avtomatik Oynatma</h3>
                <p className="text-sm text-gray-600">Videoları avtomatik oynat</p>
              </div>
            </div>
            <Switch 
              checked={autoplay} 
              onCheckedChange={setAutoplay}
            />
          </div>
        </Card>
      </div>

      {/* App Info */}
      <div className="space-y-4 px-4">
        <h2 className="text-lg font-semibold text-gray-900">Məlumat</h2>
        
        <Card className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src="https://admin.aztv.az/userfiles/files/a.png" 
              alt="AzTV" 
              className="h-12 w-12 rounded-lg"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
            <div>
              <h3 className="font-bold text-lg">AzTV</h3>
              <p className="text-sm text-gray-600">Rəsmi Mobil Tətbiq</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-start">
              <Info className="h-4 w-4 mr-3" />
              Tətbiq haqqında
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-3" />
              Məxfilik siyasəti
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Mail className="h-4 w-4 mr-3" />
              Bizimlə əlaqə
            </Button>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              Versiya 1.0.0 • © 2024 AzTV
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
