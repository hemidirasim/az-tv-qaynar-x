
import { NewsResponse } from '@/types/news';
import { CategoryResponse } from '@/types/category';

const API_BASE_URL = 'https://aztv.az/az/mobile-app/api';

export const fetchCategories = async (): Promise<CategoryResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/all-categories`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Categories API raw response:', data);
    
    // API cavabının strukturunu düzgün parse et
    if (data.success && data.data) {
      // Əgər data.data birbaşa array-dursa
      if (Array.isArray(data.data)) {
        return {
          success: true,
          data: {
            categories: data.data.map((item: any) => ({
              id: item.id,
              name: item.name || item.title || 'Adı yoxdur',
              slug: item.slug || ''
            }))
          }
        };
      }
      // Əgər data.data.categories array-dursa
      else if (data.data.categories && Array.isArray(data.data.categories)) {
        return {
          success: true,
          data: {
            categories: data.data.categories.map((item: any) => ({
              id: item.id,
              name: item.name || item.title || 'Adı yoxdur',
              slug: item.slug || ''
            }))
          }
        };
      }
    }
    
    // Geri dönüş üçün boş cavab
    return {
      success: false,
      data: {
        categories: []
      }
    };
  } catch (error) {
    console.error('Kateqoriyaları yükləyərkən xəta:', error);
    throw error;
  }
};

export const fetchNewsByCategory = async (categoryId: number, page: number = 1, perPage: number = 40): Promise<NewsResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/news/category/${categoryId}/official?per_page=${perPage}&page=${page}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Category news API raw response:', data);
    
    // API cavabının strukturunu düzəlt
    if (data.success && data.data) {
      let newsData = [];
      
      // Müxtəlif strukturları yoxla
      if (data.data.news && Array.isArray(data.data.news.data)) {
        newsData = data.data.news.data;
      } else if (data.data.news && Array.isArray(data.data.news)) {
        newsData = data.data.news;
      } else if (Array.isArray(data.data)) {
        newsData = data.data;
      }
      
      const processedNews = newsData.map((item: any) => {
        // Şəkil URL-ini düzgün təyin et
        let imageUrl = '/placeholder.svg';
        
        if (item.image_url && item.image_url.trim() !== '') {
          if (item.image_url.startsWith('http://') || item.image_url.startsWith('https://')) {
            imageUrl = item.image_url;
          } else if (item.image_url.startsWith('/')) {
            imageUrl = `https://admin.aztv.az${item.image_url}`;
          } else {
            imageUrl = `https://admin.aztv.az/${item.image_url}`;
          }
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
        data: processedNews,
        current_page: data.data.news?.current_page || 1,
        per_page: data.data.news?.per_page || perPage,
        total: data.data.news?.total || processedNews.length,
        last_page: data.data.news?.last_page || 1,
        next_page_url: data.data.news?.next_page_url || null,
        prev_page_url: data.data.news?.prev_page_url || null
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
    console.error('Kateqoriya xəbərlərini yükləyərkən xəta:', error);
    throw error;
  }
};

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
        
        console.log('Orijinal şəkil URL-i:', item.image_url);
        
        if (item.image_url && item.image_url.trim() !== '') {
          // Əgər URL artıq tam path-dursa (http/https ilə başlayır)
          if (item.image_url.startsWith('http://') || item.image_url.startsWith('https://')) {
            imageUrl = item.image_url;
          } 
          // Əgər URL '/' ilə başlayırsa - admin.aztv.az əlavə et  
          else if (item.image_url.startsWith('/')) {
            imageUrl = `https://admin.aztv.az${item.image_url}`;
          }
          // Əks halda - admin.aztv.az/ əlavə et
          else {
            imageUrl = `https://admin.aztv.az/${item.image_url}`;
          }
          
          console.log('Düzəldilmiş şəkil URL-i:', imageUrl);
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
    
    // Format date as YYYY.MM.DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}.${month}.${day}`;
  }
};
