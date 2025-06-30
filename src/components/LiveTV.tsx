
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Volume2, VolumeX, Maximize, Minimize, Radio, Users, Clock } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-600 via-red-500 to-pink-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-6 py-12 text-center text-white">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <Radio className="w-4 h-4" />
              <span className="text-sm font-bold">CANLI YAYIM</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            AzTV Birinci Kanal
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Azərbaycanın Rəsmi Televiziyası
          </p>
          
          {/* Live Stats */}
          <div className="flex items-center justify-center space-x-8 text-white/80">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">12,543 izləyici</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">HD Keyfiyyət</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Player */}
      <div className="px-4 -mt-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="aspect-video relative bg-black">
              {!isPlaying ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black">
                  <div className="text-center text-white">
                    <div className="mb-8">
                      <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                        <img 
                          src="https://admin.aztv.az/userfiles/files/a.png" 
                          alt="AzTV" 
                          className="h-12 w-auto opacity-90"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder.svg';
                          }}
                        />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Canlı Yayımı Başladın</h3>
                    <p className="text-gray-300 mb-8 text-lg">AzTV-ni yüksək keyfiyyətdə izləyin</p>
                    <Button 
                      onClick={handlePlay}
                      size="lg"
                      className="bg-red-600 hover:bg-red-700 text-white rounded-full px-12 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Play className="h-6 w-6 mr-3 fill-current" />
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
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 bg-red-600/90 backdrop-blur-sm px-3 py-2 rounded-full">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          <span className="text-white text-sm font-bold">CANLI</span>
                        </div>
                        <div className="text-white">
                          <p className="font-semibold">AzTV Birinci Kanal</p>
                          <p className="text-sm text-white/80">HD Keyfiyyət</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={toggleMute}
                          className="text-white hover:bg-white/20 backdrop-blur-sm rounded-full"
                        >
                          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={isFullscreen ? handleMinimize : handleFullscreen}
                          className="text-white hover:bg-white/20 backdrop-blur-sm rounded-full"
                        >
                          {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modern Info Cards */}
      <div className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Quality Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Radio className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">HD Keyfiyyət</h3>
                  <p className="text-sm text-gray-600">1080p canlı yayım</p>
                </div>
              </div>
              <p className="text-gray-700">Yüksək keyfiyyətli video və səs ilə ən yaxşı izləmə təcrübəsi.</p>
            </div>

            {/* Live Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Canlı Yayım</h3>
                  <p className="text-sm text-gray-600">24/7 yayım</p>
                </div>
              </div>
              <p className="text-gray-700">Azərbaycanın ən mühüm hadisələrini canlı izləyin.</p>
            </div>

            {/* Official Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Rəsmi Kanal</h3>
                  <p className="text-sm text-gray-600">AzTV təqdim edir</p>
                </div>
              </div>
              <p className="text-gray-700">Azərbaycanın rəsmi televiziya kanalının mobil tətbiqi.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTV;
