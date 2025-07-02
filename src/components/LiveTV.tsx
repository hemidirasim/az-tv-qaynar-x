
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Volume2, VolumeX, Maximize, Minimize, Radio, Users, Wifi, Signal, MonitorPlay } from 'lucide-react';

const LiveTV = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    const iframe = document.getElementById('aztv-player') as HTMLIFrameElement;
    if (iframe && iframe.requestFullscreen) {
      iframe.requestFullscreen();
      setIsFullscreen(true);
    }
  };

  const handleMinimize = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Clean Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-3 bg-red-50 px-6 py-3 rounded-full mb-6">
              <div className="relative">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <Radio className="w-5 h-5 text-red-600" />
              <span className="text-red-700 font-semibold text-sm tracking-wide">CANLI YAYIM</span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              AzTV Birinci Kanal
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Azərbaycanın Rəsmi Televiziyası
            </p>
            
            {/* Live Stats */}
            <div className="flex items-center justify-center space-x-12 text-gray-500">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="font-medium">12,543 izləyici</span>
              </div>
              <div className="flex items-center space-x-2">
                <Signal className="w-5 h-5 text-green-500" />
                <span className="font-medium">HD Keyfiyyət</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wifi className="w-5 h-5 text-purple-500" />
                <span className="font-medium">Stabil Bağlantı</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Player Container */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
          <div className="aspect-video relative bg-black rounded-t-3xl overflow-hidden">
            {!isPlaying ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
                <div className="text-center text-white">
                  <div className="mb-8">
                    <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20">
                      <MonitorPlay className="h-16 w-16 text-white opacity-90" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Canlı Yayımı Başladın</h3>
                  <p className="text-gray-300 mb-10 text-lg max-w-md mx-auto leading-relaxed">
                    AzTV-ni yüksək keyfiyyətdə və stabil bağlantı ilə izləyin
                  </p>
                  <Button 
                    onClick={handlePlay}
                    size="lg"
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full px-16 py-6 text-xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-0"
                  >
                    <Play className="h-8 w-8 mr-4 fill-current" />
                    Yayımı Başlat
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <iframe 
                  id="aztv-player"
                  src="https://yodaplayer.yodacdn.net/aztvpop/index.php"
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; fullscreen"
                  title="AzTV Canlı Yayım"
                />
                
                {/* Modern Player Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-3 bg-red-600/90 backdrop-blur-md px-4 py-3 rounded-full border border-white/20">
                        <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                        <span className="text-white text-sm font-bold tracking-wide">CANLI</span>
                      </div>
                      <div className="text-white">
                        <p className="font-bold text-lg">AzTV Birinci Kanal</p>
                        <p className="text-sm text-white/80">HD Keyfiyyət • Canlı Yayım</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={toggleMute}
                        className="text-white hover:bg-white/20 backdrop-blur-md rounded-full w-12 h-12 p-0"
                      >
                        {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={isFullscreen ? handleMinimize : handleFullscreen}
                        className="text-white hover:bg-white/20 backdrop-blur-md rounded-full w-12 h-12 p-0"
                      >
                        {isFullscreen ? <Minimize className="h-6 w-6" /> : <Maximize className="h-6 w-6" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Info Section */}
          <div className="p-8 bg-gradient-to-r from-gray-50 to-white">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Signal className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">HD Keyfiyyət</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  1080p yüksək keyfiyyətli video və kristal təmizliyində səs
                </p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Radio className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">24/7 Yayım</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Daima aktiv canlı yayım və ən son xəbərlər
                </p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Wifi className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Stabil Bağlantı</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Kəsilməz və rahat izləmə təcrübəsi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTV;
