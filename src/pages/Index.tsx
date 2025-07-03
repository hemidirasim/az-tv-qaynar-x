
import React, { useState } from 'react';
import { NewsItem } from '@/types/news';
import Header from '@/components/Header';
import NewsFeed from '@/components/NewsFeed';
import NewsDetail from '@/components/NewsDetail';
import LiveTV from '@/components/LiveTV';
import Settings from '@/components/Settings';
import BottomNavigation from '@/components/BottomNavigation';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'live' | 'settings'>('home');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isNewsDetailOpen, setIsNewsDetailOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [categoryName, setCategoryName] = useState<string>('Bütün Xəbərlər');

  const handleNewsClick = (news: NewsItem) => {
    setSelectedNews(news);
    setIsNewsDetailOpen(true);
  };

  const handleCloseNewsDetail = () => {
    setIsNewsDetailOpen(false);
    setSelectedNews(null);
  };

  const handleCategorySelect = (categoryId: number | null, name: string) => {
    setSelectedCategoryId(categoryId);
    setCategoryName(name);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <NewsFeed 
            onNewsClick={handleNewsClick} 
            selectedCategoryId={selectedCategoryId}
            categoryName={categoryName}
          />
        );
      case 'live':
        return <LiveTV />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <NewsFeed 
            onNewsClick={handleNewsClick} 
            selectedCategoryId={selectedCategoryId}
            categoryName={categoryName}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCategorySelect={handleCategorySelect} />
      
      <main className="pb-20">
        {renderContent()}
      </main>

      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      <NewsDetail 
        news={selectedNews}
        isOpen={isNewsDetailOpen}
        onClose={handleCloseNewsDetail}
      />
    </div>
  );
};

export default Index;
