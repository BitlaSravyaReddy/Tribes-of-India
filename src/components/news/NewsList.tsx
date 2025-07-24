// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import { News } from '../types';
// import { formatDistanceToNow } from 'date-fns';
// import { dynamicNews, staticNews, refreshNews } from '../mockData';

// interface NewsListProps {
//   category?: string;
// }

// const REFRESH_INTERVAL = 5 * 60 * 1000; // Refresh every 5 minutes
// const ITEMS_PER_PAGE = 12; // Increased items per page

// const NewsList: React.FC<NewsListProps> = () => {
//   const { category } = useParams<{ category: string }>();
//   const navigate = useNavigate();
//   const [dynamicNewsItems, setDynamicNewsItems] = useState<News[]>(dynamicNews);
//   const [staticNewsItems, setStaticNewsItems] = useState<News[]>(staticNews);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [selectedSource, setSelectedSource] = useState<string | null>(null);
//   const [suggestions, setSuggestions] = useState<string[]>([]);
//   const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
//   const [displayedNews, setDisplayedNews] = useState<News[]>([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const observer = useRef<IntersectionObserver>();

//   // Combine dynamic and static news, removing duplicates
//   const allNews = React.useMemo(() => {
//     const newsMap = new Map<string, News>();
    
//     // Add dynamic news first
//     dynamicNewsItems.forEach(item => {
//       const key = `${item.title}-${item.category}`;
//       if (!newsMap.has(key)) {
//         newsMap.set(key, item);
//       }
//     });
    
//     // Add static news if not duplicate
//     staticNewsItems.forEach(item => {
//       const key = `${item.title}-${item.category}`;
//       if (!newsMap.has(key)) {
//         newsMap.set(key, item);
//       }
//     });
    
//     return Array.from(newsMap.values());
//   }, [dynamicNewsItems, staticNewsItems]);

//   // Get unique categories and sources
//   const categories = Array.from(new Set(allNews.map(item => item.category)));
//   const sources = Array.from(new Set(allNews.map(item => item.source)));

//   const loadNews = useCallback(() => {
//     setLoading(true);
//     try {
//       // Get fresh news data
//       const freshNews = refreshNews();
//       setDynamicNewsItems(freshNews.dynamic);
//       setStaticNewsItems(freshNews.static);
//       setError(null);
//       setLastUpdated(new Date());
//       setPage(1);
//       setDisplayedNews([...freshNews.dynamic, ...freshNews.static].slice(0, ITEMS_PER_PAGE));
//       setHasMore([...freshNews.dynamic, ...freshNews.static].length > ITEMS_PER_PAGE);
//     } catch (err) {
//       setError('Failed to load news. Please try again later.');
//       console.error('Error loading news:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Initial load and category change
//   useEffect(() => {
//     loadNews();
//   }, [loadNews, category]);

//   // Periodic refresh
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       loadNews();
//     }, REFRESH_INTERVAL);

//     return () => clearInterval(intervalId);
//   }, [loadNews]);

//   // Search suggestions with debounce and letter prompting
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (searchTerm.length > 0) {
//         const searchLower = searchTerm.toLowerCase();
//         const filteredSuggestions = allNews
//           .filter(item => {
//             const titleLower = item.title.toLowerCase();
//             const descLower = item.description.toLowerCase();
//             const contentLower = item.content.toLowerCase();
            
//             // Check if search term matches any word in title/description/content
//             const words = searchLower.split(' ');
//             return words.every(word => 
//               titleLower.includes(word) || 
//               descLower.includes(word) || 
//               contentLower.includes(word)
//             );
//           })
//           .map(item => item.title)
//           .slice(0, 5);
//         setSuggestions(filteredSuggestions);
//       } else {
//         setSuggestions([]);
//       }
//     }, 300); // 300ms debounce

//     return () => clearTimeout(timer);
//   }, [searchTerm, allNews]);

//   // Filter news based on search and filters
//   const filteredNews = allNews.filter(item => {
//     const searchLower = searchTerm.toLowerCase();
//     const matchesSearch = searchTerm === '' || 
//       item.title.toLowerCase().includes(searchLower) ||
//       item.description.toLowerCase().includes(searchLower) ||
//       item.content.toLowerCase().includes(searchLower);
//     const matchesCategory = !selectedCategory || item.category === selectedCategory;
//     const matchesSource = !selectedSource || item.source === selectedSource;
//     return matchesSearch && matchesCategory && matchesSource;
//   });

//   // Update displayed news when filters change
//   useEffect(() => {
//     setPage(1);
//     setDisplayedNews(filteredNews.slice(0, ITEMS_PER_PAGE));
//     setHasMore(filteredNews.length > ITEMS_PER_PAGE);
//   }, [filteredNews, searchTerm, selectedCategory, selectedSource]);

//   // Infinite scroll observer
//   const lastNewsElementRef = useCallback((node: HTMLDivElement) => {
//     if (loading) return;
//     if (observer.current) observer.current.disconnect();
//     observer.current = new IntersectionObserver(entries => {
//       if (entries[0].isIntersecting && hasMore) {
//         setPage(prevPage => {
//           const nextPage = prevPage + 1;
//           const newItems = filteredNews.slice(
//             prevPage * ITEMS_PER_PAGE,
//             nextPage * ITEMS_PER_PAGE
//           );
//           setDisplayedNews(prev => [...prev, ...newItems]);
//           setHasMore(nextPage * ITEMS_PER_PAGE < filteredNews.length);
//           return nextPage;
//         });
//       }
//     });
//     if (node) observer.current.observe(node);
//   }, [loading, hasMore, filteredNews]);

//   const handleCategoryClick = (selectedCategory: string) => {
//     navigate(`/category/${selectedCategory.toLowerCase()}`);
//   };

//   const handleReadMore = (newsId: string) => {
//     navigate(`/news/${newsId}`);
//   };

//   if (loading && page === 1) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-8 space-y-4">
//         <div className="flex flex-wrap gap-2">
//           <div className="flex-1 relative">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search news... (Type letters to get suggestions)"
//                 className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               {searchTerm && (
//                 <button
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   onClick={() => setSearchTerm('')}
//                 >
//                   ✕
//                 </button>
//               )}
//             </div>
//             {suggestions.length > 0 && (
//               <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                 {suggestions.map((suggestion, index) => (
//                   <div
//                     key={index}
//                     className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0"
//                     onClick={() => {
//                       setSearchTerm(suggestion);
//                       setSuggestions([]);
//                     }}
//                   >
//                     <div className="font-medium text-gray-900">{suggestion}</div>
//                     <div className="text-sm text-gray-500">
//                       {allNews.find(item => item.title === suggestion)?.source}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           <select
//             className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//             value={selectedCategory || ''}
//             onChange={(e) => setSelectedCategory(e.target.value || null)}
//           >
//             <option value="">All Categories</option>
//             {categories.map(category => (
//               <option key={category} value={category}>
//                 {category.charAt(0).toUpperCase() + category.slice(1)}
//               </option>
//             ))}
//           </select>
//           <select
//             className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
//             value={selectedSource || ''}
//             onChange={(e) => setSelectedSource(e.target.value || null)}
//           >
//             <option value="">All Sources</option>
//             {sources.map(source => (
//               <option key={source} value={source}>{source}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="text-sm text-gray-500 mt-2">
//         Last updated: {formatDistanceToNow(lastUpdated, { addSuffix: true })}
//       </div>

//       {displayedNews.length === 0 ? (
//         <div className="text-center text-gray-500 py-8">
//           No news articles found matching your criteria.
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {displayedNews.map((item, index) => (
//             <div
//               key={item.id}
//               ref={index === displayedNews.length - 1 ? lastNewsElementRef : null}
//               className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
//             >
//               {item.imageUrl && (
//                 <div className="relative h-48 overflow-hidden">
//                   <img
//                     src={item.imageUrl}
//                     alt={item.title}
//                     className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
//                     loading="lazy"
//                   />
//                   <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-sm">
//                     {item.category}
//                   </div>
//                 </div>
//               )}
//               <div className="p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
//                   {item.title}
//                 </h2>
//                 <p className="text-gray-600 mb-4 line-clamp-3">
//                   {item.description}
//                 </p>
//                 <div className="flex items-center justify-between">
//                   <button
//                     onClick={() => handleReadMore(item.id)}
//                     className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
//                   >
//                     Read More →
//                   </button>
//                   <div className="text-sm text-gray-500">
//                     <span className="mr-2">{item.source}</span>
//                     <span>{formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true })}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//       {loading && page > 1 && (
//         <div className="flex justify-center items-center py-4">
//           <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NewsList; 