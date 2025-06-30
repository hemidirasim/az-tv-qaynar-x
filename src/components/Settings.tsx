
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Globe, Mail, Phone, MapPin, Calendar } from 'lucide-react';

const Settings = () => {
  return (
    <div className="p-4 space-y-6 bg-gradient-to-br from-slate-50 to-purple-50 min-h-screen">
      {/* App Info */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-purple-50">
        <CardHeader className="text-center pb-2">
          <div className="flex items-center justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full shadow-lg">
              <img 
                src="https://admin.aztv.az/userfiles/files/a.png" 
                alt="AzTV Logo" 
                className="h-16 w-auto"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>
          </div>
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Info className="h-6 w-6 text-purple-600" />
            AzTV Mobil
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-3">
          <div className="space-y-2">
            <p className="text-lg font-semibold text-gray-800">Versiya 1.0.0</p>
            <p className="text-gray-600 leading-relaxed">
              Azərbaycanın Rəsmi Televiziyasının mobil tətbiqi
            </p>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              <Calendar className="h-4 w-4" />
              2024
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About AzTV */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-blue-800">
            <Globe className="h-5 w-5" />
            AzTV Haqqında
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Azərbaycan Televiziyası - ölkənin ən böyük və etibarlı xəbər mənbəyi. 1956-cı ildən fəaliyyət göstərən televiziya kanalı ölkədə və dünyada baş verən hadisələr haqqında operativ və obyektiv məlumat verir.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-xl">
              <h4 className="font-semibold text-blue-800 mb-2">Missiyamız</h4>
              <p className="text-sm text-gray-700">
                Cəmiyyəti düzgün məlumatlandırmaq və milli dəyərləri qorumaq
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl">
              <h4 className="font-semibold text-purple-800 mb-2">Vizyonumuz</h4>
              <p className="text-sm text-gray-700">
                Regionun aparıcı media qurumu olmaq
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-green-800">
            <Phone className="h-5 w-5" />
            Əlaqə Məlumatları
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Globe className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-800">Rəsmi veb-səhifə</p>
                <p className="text-sm text-green-600">www.aztv.az</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Mail className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-800">E-poçt</p>
                <p className="text-sm text-blue-600">info@aztv.az</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <MapPin className="h-5 w-5 text-purple-600" />
              <div>
                <p className="font-medium text-gray-800">Ünvan</p>
                <p className="text-sm text-purple-600">Bakı, M.Hadi küçəsi 1</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
