
import { NewsResponse } from '@/types/news';

const API_BASE_URL = 'https://aztv.az/az/mobile-app/api';

export const fetchNews = async (page: number = 1, perPage: number = 11): Promise<NewsResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/all-news?per_page=${perPage}&page=${page}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API cavabı:', data);
    
    // API cavabının strukturunu düzəlt
    if (data.success && data.data && data.data.news) {
      const newsData = data.data.news.data.map((item: any) => {
        // Şəkil URL-ini düzgün təyin et
        let imageUrl = '/placeholder.svg';
        if (item.image_url) {
          // URL-də encoding varsa decode et
          const decodedUrl = decodeURIComponent(item.image_url);
          
          // Əgər URL artıq tam yoldursa, olduğu kimi saxla
          if (decodedUrl.startsWith('http')) {
            imageUrl = decodedUrl;
          } else {
            // Əks halda aztv.az domenini əlavə et
            imageUrl = `https://aztv.az/${decodedUrl}`;
          }
          
          console.log('Şəkil URL-i:', imageUrl);
        }
        
        // Başlıq, məzmun və alt başlığı düzgün parse et
        const parseField = (field: any) => {
          if (!field) return '';
          if (typeof field === 'string') return field;
          if (field.az) {
            if (typeof field.az === 'string') return field.az;
            if (field.az.value && field.az.value !== '[Max depth of 5 reached]') {
              return field.az.value;
            }
          }
          return '';
        };

        return {
          id: item.id,
          title: parseField(item.title) || 'Başlıq yoxdur',
          content: parseField(item.content) || '',
          summary: parseField(item.sub_title) || '',
          image: imageUrl,
          date: item.created_at,
          created_at: item.created_at,
          slug: item.slug || '',
          category: ''
        };
      });

      return {
        data: newsData,
        current_page: data.data.news.current_page || 1,
        per_page: data.data.news.per_page || perPage,
        total: data.data.news.total || newsData.length,
        last_page: data.data.news.last_page || 1,
        next_page_url: data.data.news.next_page_url,
        prev_page_url: data.data.news.prev_page_url
      };
    }
    
    // Geri dönüş üçün boş cavab
    return {
      data: [],
      current_page: 1,
      per_page: perPage,
      total: 0,
      last_page: 1,
      next_page_url: null,
      prev_page_url: null
    };
  } catch (error) {
    console.error('Xəbərləri yükləyərkən xəta:', error);
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
