
import React from 'react';
import { NewsItem } from '@/types/news';
import { formatDate } from '@/utils/api';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { X, Share2, ArrowLeft } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NewsDetailProps {
  news: NewsItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const NewsDetail: React.FC<NewsDetailProps> = ({ news, isOpen, onClose }) => {
  if (!news) return null;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: news.title,
          text: news.summary,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback for desktop
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/placeholder.svg';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b bg-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Paylaş
            </Button>
          </div>
        </DialogHeader>
        
        <ScrollArea className="flex-1">
          <div className="p-0">
            {/* Hero Image */}
            <div className="relative w-full h-64 md:h-80">
              <img 
                src={news.image} 
                alt={news.title}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <span className="text-white text-sm font-medium">
                  {formatDate(news.date || news.created_at)}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {news.title}
              </h1>
              
              {news.summary && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-gray-700 font-medium leading-relaxed">
                    {news.summary}
                  </p>
                </div>
              )}

              <div className="prose prose-lg max-w-none">
                <div 
                  className="text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: news.content || 'Xəbər məzmunu yüklənir...' 
                  }}
                />
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default NewsDetail;
