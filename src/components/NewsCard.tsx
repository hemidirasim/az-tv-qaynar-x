
import React from 'react';
import { NewsItem } from '@/types/news';
import { formatDate } from '@/utils/api';

interface NewsCardProps {
  news: NewsItem;
  onClick: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, onClick }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/placeholder.svg';
  };

  return (
    <div 
      className="news-card bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={news.image} 
          alt={news.title}
          className="w-full h-48 object-cover"
          onError={handleImageError}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <span className="text-white text-sm font-medium">
            {formatDate(news.date || news.created_at)}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 leading-tight">
          {news.title}
        </h3>
        {news.summary && (
          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
            {news.summary}
          </p>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
