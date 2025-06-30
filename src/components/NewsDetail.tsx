
import React from 'react';
import { NewsItem } from '@/types/news';
import { Button } from '@/components/ui/button';
import { X, Calendar, ArrowLeft } from 'lucide-react';
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
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
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
