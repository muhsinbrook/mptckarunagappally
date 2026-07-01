import { useEffect, useState } from 'react';
import { Calendar, Tag } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { NewsItem } from '../lib/types';

const CATEGORIES = ['all', 'general', 'placement', 'sports', 'alumni', 'nss', 'ioc'];

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const query = supabase.from('news').select('*').order('published_at', { ascending: false });
    if (activeCategory !== 'all') {
      query.eq('category', activeCategory);
    }
    query.then(({ data, error }) => {
      if (!error && data) setNews(data);
      setLoading(false);
    });
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div
        className="relative h-52 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://img.magnific.com/free-photo/3d-rendering-illustration-letter-blocks-forming-word-news-white-background_181624-60840.jpg)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50" />
        <div className="relative h-full flex items-end max-w-7xl mx-auto px-4 pb-8">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <span className="text-red-400 font-bold">Home</span>
              <span>/</span>
              <span>News</span>
            </div>
            <h1 className="text-4xl font-black text-white">News & Updates</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-colors ${
                activeCategory === cat
                  ? 'bg-red-700 text-white'
                  : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-700 border border-gray-200'
              }`}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden animate-pulse">
                <div className="h-44 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-5 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg font-medium">No news found for this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
              >
                {item.image_url ? (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={`${item.image_url}?auto=compress&cs=tinysrgb&w=600`}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-red-700 to-gray-900 flex items-center justify-center">
                    <span className="text-white text-5xl font-black opacity-20">NEWS</span>
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      <Tag size={10} />
                      {item.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                      <Calendar size={10} />
                      {new Date(item.published_at).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <h3 className="font-black text-gray-900 text-base mb-2 group-hover:text-red-700 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  {item.content && (
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{item.content}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
