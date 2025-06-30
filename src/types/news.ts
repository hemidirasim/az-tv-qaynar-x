
export interface NewsItem {
  id: number;
  title: string;
  content: string;
  summary: string;
  image: string;
  date: string;
  created_at: string;
  slug: string;
  category?: string;
}

export interface NewsResponse {
  data: NewsItem[];
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}
