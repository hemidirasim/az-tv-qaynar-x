
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Maximize, Minimize, Users, Clock } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pb-20">
      {/* Hero Section - Mobile First */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-3 py-6 sm:px-4 sm:py-8 md:px-6 md:py-12">
          <div className="text-center">
            <div className="inline-flex items-center space-x-1.5 sm:space-x-2 bg-red-500/90 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full mb-3 sm:mb-4 md:mb-6 animate-pulse">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-white rounded-full"></div>
              <span className="text-xs sm:text-sm font-bold tracking-wide">CANLI YAYIM</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-1 sm:mb-2 md:mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              AzTV
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 mb-0.5 sm:mb-1 md:mb-2">Azərbaycanın Milli Televiziyası</p>
            <p className="text-xs sm:text-sm md:text-base text-blue-200">HD keyfiyyətdə canlı yayım</p>
          </div>
        </div>
      </div>

      {/* Video Player Section - Mobile First */}
      <div className="px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-8">
        <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Player Header - Mobile First */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-2 py-1.5 sm:px-3 sm:py-2 md:px-6 md:py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
                <div className="flex items-center space-x-1 bg-red-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-semibold">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full animate-pulse"></div>
                  <span>CANLI</span>
                </div>
                <div className="hidden xs:flex items-center space-x-1 text-gray-600">
                  <Users className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  <span className="text-xs font-medium">1,247</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  <span className="text-xs font-medium">{new Date().toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Video Player - Mobile First */}
          <div className="aspect-video relative bg-black">
            {!isPlaying ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
                <div className="text-center text-white px-3 sm:px-4">
                  <div className="mb-3 sm:mb-4 md:mb-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 backdrop-blur-sm border border-white/10 shadow-2xl">
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-4">Canlı Yayımı İzləyin</h3>
                  <p className="text-gray-300 mb-4 sm:mb-6 md:mb-8 text-sm md:text-base max-w-xs sm:max-w-md mx-auto leading-relaxed">
                    AzTV-nin canlı yayımını HD keyfiyyətdə izləmək üçün aşağıdakı düyməyə basın
                  </p>
                  <Button 
                    onClick={handlePlay}
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-6 text-sm sm:text-base md:text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-0"
                  >
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
                
                {/* Player Controls - Mobile First */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2 sm:p-3 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
                      <div className="flex items-center space-x-1 bg-red-500/90 backdrop-blur-md px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-2 rounded-full border border-white/20">
                        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-white text-xs font-bold tracking-wide">CANLI</span>
                      </div>
                      <div className="hidden xs:flex items-center space-x-1 bg-white/10 backdrop-blur-md px-2 py-1 rounded-full border border-white/20">
                        <Users className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
                        <span className="text-white text-xs font-medium">1,247</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={toggleMute}
                        className="text-white hover:bg-white/20 backdrop-blur-md rounded-full w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 p-0 border border-white/20"
                      >
                        {isMuted ? <VolumeX className="h-3 w-3 sm:h-4 sm:w-4" /> : <Volume2 className="h-3 w-3 sm:h-4 sm:w-4" />}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={isFullscreen ? handleMinimize : handleFullscreen}
                        className="text-white hover:bg-white/20 backdrop-blur-md rounded-full w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 p-0 border border-white/20"
                      >
                        {isFullscreen ? <Minimize className="h-3 w-3 sm:h-4 sm:w-4" /> : <Maximize className="h-3 w-3 sm:h-4 sm:w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Information Cards - Mobile Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 mt-4 sm:mt-6 md:mt-8">
          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row items-center sm:space-x-2 mb-2 sm:mb-3 md:mb-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex items-center justify-center mb-1 sm:mb-0">
                <Users className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-blue-600" />
              </div>
              <h3 className="text-xs sm:text-sm md:text-lg font-bold text-gray-800 text-center sm:text-left">İzləyicilər</h3>
            </div>
            <p className="text-lg sm:text-xl md:text-3xl font-bold text-blue-600 mb-0.5 sm:mb-1 md:mb-2 text-center">1,247</p>
            <p className="text-gray-600 text-xs md:text-sm text-center sm:text-left">Hazırda canlı izləyən</p>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row items-center sm:space-x-2 mb-2 sm:mb-3 md:mb-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-green-100 rounded-full flex items-center justify-center mb-1 sm:mb-0">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-green-600" />
              </div>
              <h3 className="text-xs sm:text-sm md:text-lg font-bold text-gray-800 text-center sm:text-left">Yayım Müddəti</h3>
            </div>
            <p className="text-lg sm:text-xl md:text-3xl font-bold text-green-600 mb-0.5 sm:mb-1 md:mb-2 text-center">24/7</p>
            <p className="text-gray-600 text-xs md:text-sm text-center sm:text-left">Fasiləsiz yayım</p>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row items-center sm:space-x-2 mb-2 sm:mb-3 md:mb-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-purple-100 rounded-full flex items-center justify-center mb-1 sm:mb-0">
              </div>
              <h3 className="text-xs sm:text-sm md:text-lg font-bold text-gray-800 text-center sm:text-left">Keyfiyyət</h3>
            </div>
            <p className="text-lg sm:text-xl md:text-3xl font-bold text-purple-600 mb-0.5 sm:mb-1 md:mb-2 text-center">HD</p>
            <p className="text-gray-600 text-xs md:text-sm text-center sm:text-left">Yüksək keyfiyyət</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTV;
