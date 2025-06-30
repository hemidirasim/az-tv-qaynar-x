
import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { NewsItem } from '@/types/news';
import { fetchNews } from '@/utils/api';
import NewsCard from './NewsCard';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw } from 'lucide-react';

interface NewsFeedProps {
  onNewsClick: (news: NewsItem) => void;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ onNewsClick }) => {
  const [page, setPage] = useState(1);
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ['news', page],
    queryFn: () => fetchNews(page),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    if (data?.data && Array.isArray(data.data)) {
      if (page === 1) {
        setAllNews(data.data);
      } else {
        setAllNews(prev => [...prev, ...data.data]);
      }
      
      setHasMore(data.current_page < data.last_page);
      setIsLoadingMore(false);
    }
  }, [data, page]);

  // Improved infinite scroll handler
  const handleScroll = useCallback(() => {
    // Check if we're near the bottom of the page (within 200px)
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    
    const scrolledToBottom = scrollTop + clientHeight >= scrollHeight - 200;
    
    console.log('Scroll check:', {
      scrollTop,
      scrollHeight,
      clientHeight,
      scrolledToBottom,
      hasMore,
      isLoading,
      isLoadingMore
    });
    
    if (scrolledToBottom && hasMore && !isLoading && !isLoadingMore) {
      console.log('Loading more news...');
      setIsLoadingMore(true);
      setPage(prev => prev + 1);
    }
  }, [hasMore, isLoading, isLoadingMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleRefresh = () => {
    setPage(1);
    setAllNews([]);
    setIsLoadingMore(false);
    refetch();
  };

  if (isLoading && page === 1) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Xəbərlər yüklənir...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Xəbərləri yükləyərkən xəta baş verdi</p>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Yenidən cəhd et
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pull to refresh indicator */}
      <div className="flex justify-center py-2">
        <Button 
          onClick={handleRefresh} 
          variant="ghost" 
          size="sm"
          disabled={isRefetching}
          className="text-primary"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
          Yenilə
        </Button>
      </div>

      {/* News Grid */}
      <div className="grid gap-6 px-4">
        {Array.isArray(allNews) && allNews.map((news, index) => (
          <div key={`${news.id}-${index}`} className="fade-in-up">
            <NewsCard 
              news={news} 
              onClick={() => onNewsClick(news)}
            />
          </div>
        ))}
      </div>

      {/* Loading indicator for infinite scroll */}
      {isLoadingMore && (
        <div className="flex justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <p className="ml-2 text-muted-foreground">Daha çox xəbər yüklənir...</p>
        </div>
      )}

      {!hasMore && Array.isArray(allNews) && allNews.length > 0 && (
        <div className="text-center py-6">
          <p className="text-muted-foreground text-sm">Bütün xəbərlər yükləndi</p>
        </div>
      )}

      {Array.isArray(allNews) && allNews.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Xəbər tapılmadı</p>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
