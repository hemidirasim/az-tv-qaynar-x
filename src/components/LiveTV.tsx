
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50">
      {/* Video Player Container */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
          <div className="aspect-video relative bg-black rounded-t-3xl overflow-hidden">
            {!isPlaying ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
                <div className="text-center text-white">
                  <div className="mb-8">
                    <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20">
                      <Play className="h-16 w-16 text-white opacity-90 fill-current ml-2" />
                    </div>
                  </div>
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
                
                {/* Player Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 bg-red-600/90 backdrop-blur-md px-4 py-3 rounded-full border border-white/20">
                      <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                      <span className="text-white text-sm font-bold tracking-wide">CANLI</span>
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
        </div>
      </div>
    </div>
  );
};

export default LiveTV;
