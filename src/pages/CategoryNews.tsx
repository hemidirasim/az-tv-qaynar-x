
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchCategories, fetchNewsByCategory } from '@/utils/api';
import NewsCard from '@/components/NewsCard';
import { NewsItem } from '@/types/news';

const CategoryNews = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  
  const categoryIdNum = categoryId ? parseInt(categoryId) : null;

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000,
  });

  const { data: newsData, isLoading, error, refetch } = useQuery({
    queryKey: ['categoryNews', categoryIdNum],
    queryFn: () => {
      console.log('Fetching category news for ID:', categoryIdNum);
      if (categoryIdNum) {
        return fetchNewsByCategory(categoryIdNum);
      }
      throw new Error('Category ID is required');
    },
    enabled: !!categoryIdNum,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: 1000,
  });

  const categories = categoriesData?.data?.categories || [];
  const currentCategory = categories.find(cat => cat.id === categoryIdNum);
  const categoryName = currentCategory?.name || 'Kateqoriya';

  const handleNewsClick = (news: NewsItem) => {
    console.log('News clicked:', news);
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleRetry = () => {
    console.log('Retrying category news fetch...');
    refetch();
  };

  if (isLoading) {
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

  const news = newsData?.data || [];

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
            <p className="text-sm text-gray-600">{news.length} xəbər</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {news.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Bu kateqoriyada xəbər yoxdur</p>
            <p className="text-sm text-gray-500">Kateqoriya ID: {categoryIdNum}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {news.map((newsItem, index) => (
              <NewsCard 
                key={`${newsItem.id}-${index}`}
                news={newsItem}
                onClick={() => handleNewsClick(newsItem)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryNews;
