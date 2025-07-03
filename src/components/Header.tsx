
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Menu, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { fetchCategories } from '@/utils/api';
import { Category } from '@/types/category';

interface HeaderProps {
  onCategorySelect?: (categoryId: number | null, categoryName: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onCategorySelect }) => {
  const navigate = useNavigate();
  
  const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000,
  });

  const categories = categoriesData?.data?.categories || [];

  const handleCategoryClick = (category: Category | null) => {
    console.log('Category clicked:', category);
    if (category) {
      navigate(`/category/${category.id}`);
    } else {
      navigate('/');
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img 
                src="https://admin.aztv.az/userfiles/files/a.png" 
                alt="AzTV Logo" 
                className="h-10 w-auto transition-transform hover:scale-110 duration-300 cursor-pointer"
                onClick={() => navigate('/')}
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-slate-800 cursor-pointer" onClick={() => navigate('/')}>
                AzTV
              </h1>
              <p className="text-xs text-slate-600 -mt-1 font-medium">Rəsmi Mobil Tətbiq</p>
            </div>
            <div className="block sm:hidden">
              <h1 className="text-xl font-bold text-slate-800 cursor-pointer" onClick={() => navigate('/')}>
                AzTV
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Menu className="w-4 h-4" />
                  <span className="text-sm font-medium hidden sm:block">Kateqoriyalar</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 bg-white shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
                {categoriesLoading && (
                  <DropdownMenuItem className="px-4 py-3 text-slate-500">
                    <span className="block w-full">Kateqoriyalar yüklənir...</span>
                  </DropdownMenuItem>
                )}
                {categoriesError && (
                  <DropdownMenuItem className="px-4 py-3 text-red-500">
                    <span className="block w-full">Kateqoriyalar yüklənə bilmədi</span>
                  </DropdownMenuItem>
                )}
                {categories.length > 0 && categories.map((category) => (
                  <DropdownMenuItem 
                    key={category.id}
                    className="cursor-pointer hover:bg-slate-50 focus:bg-slate-50 text-slate-700 font-medium px-4 py-3"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <span className="block w-full whitespace-normal break-words leading-relaxed">
                      {String(category.name)}
                    </span>
                  </DropdownMenuItem>
                ))}
                {!categoriesLoading && !categoriesError && categories.length === 0 && (
                  <DropdownMenuItem className="px-4 py-3 text-slate-500">
                    <span className="block w-full">Kateqoriya tapılmadı</span>
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
