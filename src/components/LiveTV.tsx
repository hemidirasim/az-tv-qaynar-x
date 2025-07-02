
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Volume2, VolumeX, Maximize, Minimize, Users, Clock } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-red-500/90 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-pulse">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <span className="text-sm font-bold tracking-wide">CANLI YAYIM</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              AzTV
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-2">Azərbaycanın Milli Televiziyası</p>
            <p className="text-blue-200">HD keyfiyyətdə canlı yayım</p>
          </div>
        </div>
      </div>

      {/* Video Player Section */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Player Header */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>CANLI</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="h-4 w-4" />
                  <span className="text-sm font-medium">1,247 izləyici</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">{new Date().toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Video Player */}
          <div className="aspect-video relative bg-black">
            {!isPlaying ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
                <div className="text-center text-white">
                  <div className="mb-8">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/10 shadow-2xl">
                      <Play className="h-16 w-16 text-white opacity-90 fill-current ml-2" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Canlı Yayımı İzləyin</h3>
                  <p className="text-gray-300 mb-8 max-w-md mx-auto">
                    AzTV-nin canlı yayımını HD keyfiyyətdə izləmək üçün aşağıdakı düyməyə basın
                  </p>
                  <Button 
                    onClick={handlePlay}
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-12 py-6 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-0"
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
                
                {/* Player Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2 bg-red-500/90 backdrop-blur-md px-3 py-2 rounded-full border border-white/20">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-white text-sm font-bold tracking-wide">CANLI</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-full border border-white/20">
                        <Users className="h-4 w-4 text-white" />
                        <span className="text-white text-sm font-medium">1,247</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={toggleMute}
                        className="text-white hover:bg-white/20 backdrop-blur-md rounded-full w-10 h-10 p-0 border border-white/20"
                      >
                        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={isFullscreen ? handleMinimize : handleFullscreen}
                        className="text-white hover:bg-white/20 backdrop-blur-md rounded-full w-10 h-10 p-0 border border-white/20"
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

        {/* Information Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">İzləyicilər</h3>
            </div>
            <p className="text-3xl font-bold text-blue-600 mb-2">1,247</p>
            <p className="text-gray-600 text-sm">Hazırda canlı izləyən</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Yayım Müddəti</h3>
            </div>
            <p className="text-3xl font-bold text-green-600 mb-2">24/7</p>
            <p className="text-gray-600 text-sm">Fasiləsiz yayım</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Play className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Keyfiyyət</h3>
            </div>
            <p className="text-3xl font-bold text-purple-600 mb-2">HD</p>
            <p className="text-gray-600 text-sm">Yüksək keyfiyyət</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTV;
