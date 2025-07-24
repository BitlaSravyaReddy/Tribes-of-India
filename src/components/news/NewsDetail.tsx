import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { News } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { dynamicNews, staticNews } from '../mockData';

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Combine dynamic and static news, removing duplicates
  const allNews = React.useMemo(() => {
    const newsMap = new Map<string, News>();
    
    // Add dynamic news first
    dynamicNews.forEach(item => {
      const key = `${item.title}-${item.category}`;
      if (!newsMap.has(key)) {
        newsMap.set(key, item);
      }
    });
    
    // Add static news if not duplicate
    staticNews.forEach(item => {
      const key = `${item.title}-${item.category}`;
      if (!newsMap.has(key)) {
        newsMap.set(key, item);
      }
    });
    
    return Array.from(newsMap.values());
  }, [dynamicNews, staticNews]);

  // Get unique categories
  const categories = Array.from(new Set(allNews.map(item => item.category)));

  useEffect(() => {
    const fetchNews = () => {
      setLoading(true);
      try {
        const foundNews = allNews.find(item => item.id === id);
        if (foundNews) {
          setNews(foundNews);
          setError(null);
        } else {
          setError('News article not found');
        }
      } catch (err) {
        setError('Failed to load news article');
        console.error('Error loading news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id, allNews]);

  // Search suggestions with debounce and letter prompting
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.length > 0) {
        const searchLower = searchTerm.toLowerCase();
        const filteredSuggestions = allNews
          .filter(item => {
            const titleLower = item.title.toLowerCase();
            const descLower = item.description.toLowerCase();
            const contentLower = item.content.toLowerCase();
            
            // Check if search term matches any word in title/description/content
            const words = searchLower.split(' ');
            return words.every(word => 
              titleLower.includes(word) || 
              descLower.includes(word) || 
              contentLower.includes(word)
            );
          })
          .map(item => item.title)
          .slice(0, 5);
        setSuggestions(filteredSuggestions);
      } else {
        setSuggestions([]);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [searchTerm, allNews]);

  const handleCategoryClick = (category: string) => {
    navigate(`/category/${category.toLowerCase()}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
        {error || 'News article not found'}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap gap-2">
          <div className="flex-1 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search news... (Type letters to get suggestions)"
                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchTerm('')}
                >
                  ✕
                </button>
              )}
            </div>
            {suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0"
                    onClick={() => {
                      setSearchTerm(suggestion);
                      setSuggestions([]);
                    }}
                  >
                    <div className="font-medium text-gray-900">{suggestion}</div>
                    <div className="text-sm text-gray-500">
                      {allNews.find(item => item.title === suggestion)?.source}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <select
            className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <article className="bg-white rounded-xl shadow-lg overflow-hidden">
        {news.imageUrl && (
          <div className="relative h-96 overflow-hidden">
            <img
              src={news.imageUrl}
              alt={news.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
              {news.category}
            </div>
          </div>
        )}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {news.title}
          </h1>
          <div className="flex items-center text-gray-500 mb-6">
            <span className="mr-4">{news.source}</span>
            <span>{formatDistanceToNow(new Date(news.publishedAt), { addSuffix: true })}</span>
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              {news.description}
            </p>
            <div className="text-gray-700 whitespace-pre-line">
              {news.content}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => handleCategoryClick(news.category)}
              className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
            >
              ← Back to {news.category} News
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsDetail; 