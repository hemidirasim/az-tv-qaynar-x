
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Volume2, VolumeX, Maximize, Radio } from 'lucide-react';

const LiveTV = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

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
    }
  };

  return (
    <div className="space-y-6">
      {/* Live TV Header */}
      <div className="px-4 py-6 bg-gradient-to-r from-primary to-accent text-white rounded-xl mx-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse-slow"></div>
                <span className="text-sm font-bold">CANLI YAYIM</span>
              </div>
              <Radio className="h-4 w-4" />
            </div>
            <h2 className="text-2xl font-bold">AzTV Birinci Kanal</h2>
            <p className="text-white/80 text-sm">Azərbaycanın Rəsmi Televiziyası</p>
          </div>
        </div>
      </div>

      {/* Video Player Container */}
      <div className="px-4">
        <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
          <div className="aspect-video relative">
            {!isPlaying ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                <div className="text-center text-white">
                  <div className="mb-4">
                    <img 
                      src="https://admin.aztv.az/userfiles/files/a.png" 
                      alt="AzTV" 
                      className="h-16 w-auto mx-auto opacity-80"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Canlı Yayım</h3>
                  <p className="text-gray-300 mb-6 text-sm">AzTV-ni canlı izləyin</p>
                  <Button 
                    onClick={handlePlay}
                    size="lg"
                    className="bg-white text-black hover:bg-gray-100 rounded-full px-8"
                  >
                    <Play className="h-5 w-5 mr-2 fill-current" />
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
                
                {/* Player Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1 bg-red-600 px-2 py-1 rounded-full">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse-slow"></div>
                        <span className="text-white text-xs font-bold">CANLI</span>
                      </div>
                      <span className="text-white text-sm font-medium">AzTV</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={toggleMute}
                        className="text-white hover:bg-white/20"
                      >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={handleFullscreen}
                        className="text-white hover:bg-white/20"
                      >
                        <Maximize className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Program Info */}
      <div className="mx-4 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-lg mb-3">Proqram Cədvəli</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <div>
              <p className="font-medium">Xəbərlər</p>
              <p className="text-sm text-gray-600">Günün əsas hadisələri</p>
            </div>
            <span className="text-sm font-medium text-primary">20:00</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <div>
              <p className="font-medium">Sənədli Film</p>
              <p className="text-sm text-gray-600">Azərbaycan tarixi</p>
            </div>
            <span className="text-sm font-medium text-gray-500">21:00</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <div>
              <p className="font-medium">Mədəni Proqram</p>
              <p className="text-sm text-gray-600">Milli mədəniyyət</p>
            </div>
            <span className="text-sm font-medium text-gray-500">22:00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTV;
