
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Menu, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchCategories } from '@/utils/api';
import { Category } from '@/types/category';

interface HeaderProps {
  onCategorySelect?: (categoryId: number | null, categoryName: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onCategorySelect }) => {
  const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  console.log('Categories data:', categoriesData);
  console.log('Categories loading:', categoriesLoading);
  console.log('Categories error:', categoriesError);

  const categories = categoriesData?.data?.categories || [];

  const handleCategoryClick = (category: Category | null) => {
    console.log('Category clicked:', category);
    if (onCategorySelect) {
      onCategorySelect(category?.id || null, category?.name || 'Bütün Xəbərlər');
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img 
                src="https://admin.aztv.az/userfiles/files/a.png" 
                alt="AzTV Logo" 
                className="h-10 w-auto transition-transform hover:scale-110 duration-300"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-slate-800">
                AzTV
              </h1>
              <p className="text-xs text-slate-600 -mt-1 font-medium">Rəsmi Mobil Tətbiq</p>
            </div>
            <div className="block sm:hidden">
              <h1 className="text-xl font-bold text-slate-800">
                AzTV
              </h1>
            </div>
          </div>
          
          <div className="flex items-center">
            {/* Menu Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors duration-200">
                <Menu className="w-4 h-4 text-slate-700" />
                <span className="text-sm font-medium text-slate-700 hidden sm:block">Kateqoriyalar</span>
                <ChevronDown className="w-4 h-4 text-slate-700" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 sm:w-80 bg-white shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
                <DropdownMenuItem 
                  key="all"
                  className="cursor-pointer hover:bg-slate-50 focus:bg-slate-50 text-slate-700 font-medium px-3 py-2"
                  onClick={() => handleCategoryClick(null)}
                >
                  Bütün Xəbərlər
                </DropdownMenuItem>
                {categoriesLoading && (
                  <DropdownMenuItem className="px-3 py-2 text-slate-500">
                    Kateqoriyalar yüklənir...
                  </DropdownMenuItem>
                )}
                {categoriesError && (
                  <DropdownMenuItem className="px-3 py-2 text-red-500">
                    Kateqoriyalar yüklənə bilmədi
                  </DropdownMenuItem>
                )}
                {categories.length > 0 && categories.map((category) => (
                  <DropdownMenuItem 
                    key={category.id}
                    className="cursor-pointer hover:bg-slate-50 focus:bg-slate-50 text-slate-700 font-medium px-3 py-2 whitespace-normal"
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category.name}
                  </DropdownMenuItem>
                ))}
                {!categoriesLoading && !categoriesError && categories.length === 0 && (
                  <DropdownMenuItem className="px-3 py-2 text-slate-500">
                    Kateqoriya tapılmadı
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
