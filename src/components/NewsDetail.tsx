import React, { useState } from 'react';
import { NewsItem } from '@/types/news';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { X, Calendar, ArrowLeft, Share2 } from 'lucide-react';
import { formatDate } from '@/utils/api';

interface NewsDetailProps {
  news: NewsItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const NewsDetail: React.FC<NewsDetailProps> = ({ news, isOpen, onClose }) => {
  if (!isOpen || !news) return null;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/placeholder.svg';
  };

  // Use actual AZTV website URL structure
  const shareUrl = `https://aztv.az/az/news/${news.id}/${news.slug}`;
  const shareText = `${news.title} - ${news.summary}`;

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    window.open(url, '_blank');
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    // You could add a toast notification here
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Geri
        </Button>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
                Paylaş
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white">
              <DropdownMenuItem onClick={handleWhatsAppShare} className="flex items-center gap-2 cursor-pointer">
                <div className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">W</span>
                </div>
                WhatsApp
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleFacebookShare} className="flex items-center gap-2 cursor-pointer">
                <div className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">f</span>
                </div>
                Facebook
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleTwitterShare} className="flex items-center gap-2 cursor-pointer">
                <div className="w-4 h-4 bg-blue-400 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">X</span>
                </div>
                X 
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopyLink} className="flex items-center gap-2 cursor-pointer">
                <div className="w-4 h-4 bg-gray-600 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs">🔗</span>
                </div>
                Linki kopyala
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <div className="relative">
          <img 
            src={news.image} 
            alt={news.title}
            className="w-full h-64 object-cover rounded-lg"
            onError={handleImageError}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(news.date || news.created_at)}</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 leading-tight">
            {news.title}
          </h1>

          {news.summary && (
            <p className="text-lg text-gray-700 leading-relaxed">
              {news.summary}
            </p>
          )}

          <div className="prose prose-gray max-w-none">
            <div dangerouslySetInnerHTML={{ __html: news.content }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
