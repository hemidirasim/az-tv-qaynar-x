
import { NewsResponse } from '@/types/news';

const API_BASE_URL = 'https://aztv.az/az/mobile-app/api';

export const fetchNews = async (page: number = 1, perPage: number = 11): Promise<NewsResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/all-news?per_page=${perPage}&page=${page}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('News API Response:', data);
    
    return data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    return diffInMinutes <= 1 ? 'İndi' : `${diffInMinutes} dəqiqə əvvəl`;
  } else if (diffInHours < 24) {
    return `${diffInHours} saat əvvəl`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Dünən';
    if (diffInDays < 7) return `${diffInDays} gün əvvəl`;
    
    return date.toLocaleDateString('az-AZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
};
