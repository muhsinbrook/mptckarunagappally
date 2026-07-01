import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { GalleryItem } from '../lib/types';

const CATEGORIES = ['all', 'campus', 'labs', 'events', 'sports', 'nss', 'alumni', 'placement'];

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const query = supabase.from('gallery').select('*').order('created_at', { ascending: false });
    if (activeCategory !== 'all') query.eq('category', activeCategory);
    query.then(({ data, error }) => {
      if (!error && data) setItems(data);
      setLoading(false);
    });
  }, [activeCategory]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div
        className="relative h-52 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=1600)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50" />
        <div className="relative h-full flex items-end max-w-7xl mx-auto px-4 pb-8">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <span className="text-red-400 font-bold">Home</span>
              <span>/</span>
              <span>Gallery</span>
            </div>
            <h1 className="text-4xl font-black text-white">Photo Gallery</h1>
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
              {cat === 'all' ? 'All Photos' : cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p>No photos found for this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => setLightbox(item)}
                className="group relative rounded-xl overflow-hidden h-48 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <img
                  src={`${item.image_url}?auto=compress&cs=tinysrgb&w=600`}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-end">
                  <div className="p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-xs font-bold">{item.title}</p>
                    {item.description && (
                      <p className="text-gray-300 text-xs mt-0.5 line-clamp-1">{item.description}</p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <div
            className="max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`${lightbox.image_url}?auto=compress&cs=tinysrgb&w=1200`}
              alt={lightbox.title}
              className="w-full max-h-[75vh] object-contain rounded-xl"
            />
            <div className="text-center mt-4">
              <p className="text-white font-bold text-lg">{lightbox.title}</p>
              {lightbox.description && (
                <p className="text-gray-400 text-sm mt-1">{lightbox.description}</p>
              )}
              <span className="inline-block mt-2 bg-red-700 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {lightbox.category}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
