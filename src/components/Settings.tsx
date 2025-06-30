
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Smartphone, Globe, Bell } from 'lucide-react';

const Settings = () => {
  return (
    <div className="p-4 space-y-6">
      {/* App Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Tətbiq Haqqında
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="https://admin.aztv.az/userfiles/files/a.png" 
              alt="AzTV Logo" 
              className="h-16 w-auto"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
          </div>
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-lg">AzTV Mobil</h3>
            <p className="text-gray-600">Versiya 1.0.0</p>
            <p className="text-sm text-gray-500">
              Azərbaycanın Rəsmi Televiziyasının mobil tətbiqi
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Settings Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Tənzimləmələr
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-3">
              <Bell className="h-4 w-4 text-gray-500" />
              <span>Bildirişlər</span>
            </div>
            <Button variant="outline" size="sm">
              Aktiv
            </Button>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-gray-500" />
              <span>Dil</span>
            </div>
            <Button variant="outline" size="sm">
              Azərbaycanca
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card>
        <CardHeader>
          <CardTitle>Əlaqə</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-gray-600">
            Rəsmi veb-səhifə: aztv.az
          </p>
          <p className="text-sm text-gray-600">
            E-poçt: info@aztv.az
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
