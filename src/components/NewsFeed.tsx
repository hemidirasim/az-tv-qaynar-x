import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { NewsItem } from '@/types/news';
import { fetchNews, fetchNewsByCategory, fetchCategories } from '@/utils/api';
import NewsCard from './NewsCard';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw } from 'lucide-react';

interface NewsFeedProps {
  onNewsClick: (news: NewsItem) => void;
  selectedCategoryId?: number | null;
  categoryName?: string;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ onNewsClick, selectedCategoryId, categoryName }) => {
  const [page, setPage] = useState(1);
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Get categories to find the slug
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000,
  });

  const categories = categoriesData?.data?.categories || [];
  const currentCategory = categories.find(cat => cat.id === selectedCategoryId);
  const categorySlug = currentCategory?.slug || '';

  // Reset when category changes
  useEffect(() => {
    console.log('Category changed to:', selectedCategoryId, categoryName);
    setPage(1);
    setAllNews([]);
    setHasMore(true);
    setIsLoadingMore(false);
  }, [selectedCategoryId]);

  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ['news', selectedCategoryId, page, categorySlug],
    queryFn: () => {
      console.log('Fetching news - Category ID:', selectedCategoryId, 'Slug:', categorySlug, 'Page:', page);
      if (selectedCategoryId && selectedCategoryId !== null) {
        return fetchNewsByCategory(selectedCategoryId, page, 40, categorySlug);
      } else {
        return fetchNews(page);
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    console.log('API response received:', data);
    if (data?.data && Array.isArray(data.data)) {
      console.log('Processing news data:', data.data.length, 'items');
      if (page === 1) {
        setAllNews(data.data);
      } else {
        setAllNews(prev => [...prev, ...data.data]);
      }
      
      setHasMore(data.current_page < data.last_page);
      setIsLoadingMore(false);
    } else {
      console.log('No valid news data received');
      if (page === 1) {
        setAllNews([]);
      }
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
    console.log('Refreshing news feed');
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
      {/* Category title */}
      {categoryName && (
        <div className="px-4 pt-4">
          <h2 className="text-xl font-bold text-slate-800">{String(categoryName)}</h2>
          <p className="text-sm text-slate-600">
            {selectedCategoryId ? `Kateqoriya ID: ${selectedCategoryId}` : 'Bütün xəbərlər'}
          </p>
        </div>
      )}

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
          {selectedCategoryId && (
            <p className="text-sm text-slate-500 mt-2">Bu kateqoriyada xəbər yoxdur</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
