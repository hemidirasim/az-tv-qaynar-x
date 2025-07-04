import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchCategories, fetchNewsByCategory } from '@/utils/api';
import NewsCard from '@/components/NewsCard';
import NewsDetail from '@/components/NewsDetail';
import { NewsItem } from '@/types/news';

const CategoryNews = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  
  const categoryIdNum = categoryId ? parseInt(categoryId) : null;
  const [page, setPage] = useState(1);
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isNewsDetailOpen, setIsNewsDetailOpen] = useState(false);

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000,
  });

  const categories = categoriesData?.data?.categories || [];
  const currentCategory = categories.find(cat => cat.id === categoryIdNum);
  const categoryName = currentCategory?.name || 'Kateqoriya';
  const categorySlug = currentCategory?.slug || '';

  const { data: newsData, isLoading, error, refetch } = useQuery({
    queryKey: ['categoryNews', categoryIdNum, categorySlug, page],
    queryFn: () => {
      console.log('Fetching category news for ID:', categoryIdNum, 'Slug:', categorySlug, 'Page:', page);
      if (categoryIdNum) {
        return fetchNewsByCategory(categoryIdNum, page, 40, categorySlug);
      }
      throw new Error('Category ID is required');
    },
    enabled: !!categoryIdNum,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: 1000,
  });

  useEffect(() => {
    console.log('API response received:', newsData);
    if (newsData?.data && Array.isArray(newsData.data)) {
      console.log('Processing news data:', newsData.data.length, 'items');
      if (page === 1) {
        setAllNews(newsData.data);
      } else {
        setAllNews(prev => [...prev, ...newsData.data]);
      }
      
      setHasMore(newsData.current_page < newsData.last_page);
      setIsLoadingMore(false);
    } else {
      console.log('No valid news data received');
      if (page === 1) {
        setAllNews([]);
      }
      setIsLoadingMore(false);
    }
  }, [newsData, page]);

  useEffect(() => {
    console.log('Category changed to:', categoryIdNum, categoryName);
    setPage(1);
    setAllNews([]);
    setHasMore(true);
    setIsLoadingMore(false);
  }, [categoryIdNum]);

  const handleScroll = useCallback(() => {
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

  const handleNewsClick = (news: NewsItem) => {
    console.log('News clicked:', news);
    setSelectedNews(news);
    setIsNewsDetailOpen(true);
  };

  const handleCloseNewsDetail = () => {
    setIsNewsDetailOpen(false);
    setSelectedNews(null);
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleRetry = () => {
    console.log('Retrying category news fetch...');
    setPage(1);
    setAllNews([]);
    setIsLoadingMore(false);
    refetch();
  };

  if (isLoading && page === 1) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-0 z-50 bg-white border-b px-4 py-3">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold">Yüklənir...</h1>
          </div>
        </div>
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Xəbərlər yüklənir...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    console.error('Category news error:', error);
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-0 z-50 bg-white border-b px-4 py-3">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold">Xəta</h1>
          </div>
        </div>
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Xəbərləri yükləyərkən xəta baş verdi</p>
            <p className="text-sm text-gray-500 mb-4">Kateqoriya ID: {categoryIdNum}</p>
            <div className="space-y-2">
              <Button onClick={handleRetry} className="mr-2">
                Yenidən cəhd et
              </Button>
              <Button variant="outline" onClick={handleBack}>
                Geri qayıt
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b px-4 py-3">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">{categoryName}</h1>
            <p className="text-sm text-gray-600">{allNews.length} xəbər</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {allNews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Bu kateqoriyada xəbər yoxdur</p>
            <p className="text-sm text-gray-500">Kateqoriya ID: {categoryIdNum}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {allNews.map((newsItem, index) => (
              <NewsCard 
                key={`${newsItem.id}-${index}`}
                news={newsItem}
                onClick={() => handleNewsClick(newsItem)}
              />
            ))}
          </div>
        )}

        {/* Loading indicator for infinite scroll */}
        {isLoadingMore && (
          <div className="flex justify-center py-6">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="ml-2 text-gray-600">Daha çox xəbər yüklənir...</p>
          </div>
        )}

        {!hasMore && allNews.length > 0 && (
          <div className="text-center py-6">
            <p className="text-gray-500 text-sm">Bütün xəbərlər yükləndi</p>
          </div>
        )}
      </div>

      {/* News Detail Modal */}
      <NewsDetail 
        news={selectedNews}
        isOpen={isNewsDetailOpen}
        onClose={handleCloseNewsDetail}
      />
    </div>
  );
};

export default CategoryNews;
