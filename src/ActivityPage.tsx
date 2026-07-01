import { useEffect, useState } from 'react';
import { Calendar, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ActivityItem, Page, ACTIVITIES } from '../lib/types';

interface ActivityPageProps {
  slug: 'ioc' | 'alumni' | 'placement' | 'nss' | 'sports';
  onNavigate: (page: Page) => void;
}

export default function ActivityPage({ slug, onNavigate }: ActivityPageProps) {
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  const activity = ACTIVITIES[slug];

  useEffect(() => {
    setLoading(true);
    supabase
      .from('activities')
      .select('*')
      .eq('activity_type', slug)
      .order('event_date', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setItems(data);
        setLoading(false);
      });
  }, [slug]);

  const navigate = (page: Page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <div
        className="relative h-72 bg-cover bg-center"
        style={{ backgroundImage: `url(${activity.image}?auto=compress&cs=tinysrgb&w=1600)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 to-black/40" />
        <div className="relative h-full flex items-end max-w-7xl mx-auto px-4 pb-10">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-300 mb-3">
              <button
                onClick={() => navigate('home')}
                className="text-red-400 font-bold hover:text-red-300 transition-colors"
              >
                Home
              </button>
              <span>/</span>
              <span>Activity</span>
              <span>/</span>
              <span className="text-white">{activity.name}</span>
            </div>
            <div className="inline-block bg-red-700 text-white text-xs font-black px-3 py-1 rounded uppercase tracking-widest mb-3">
              {activity.label}
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white">{activity.name}</h1>
          </div>
        </div>
      </div>

      {/* Back */}
      <div className="bg-gray-50 border-b border-gray-200 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors font-medium"
          >
            <ArrowLeft size={16} /> Back to Home
          </button>
        </div>
      </div>

      {/* About Section */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-black text-gray-900 mb-4">About {activity.name}</h2>
            <div className="w-12 h-1 bg-red-700 mb-6" />
            <p className="text-gray-600 leading-relaxed text-base">{activity.description}</p>
          </div>
          <div>
            <img
              src={`${activity.image}?auto=compress&cs=tinysrgb&w=600`}
              alt={activity.name}
              className="rounded-2xl w-full h-48 object-cover shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Other Activities Quick Nav */}
      <div className="bg-gray-50 border-t border-gray-200 py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider self-center mr-2">
              Other Activities:
            </span>
            {Object.values(ACTIVITIES)
              .filter((a) => a.slug !== slug)
              .map((a) => (
                <button
                  key={a.slug}
                  onClick={() => navigate({ type: 'activity', slug: a.slug as 'ioc' | 'alumni' | 'placement' | 'nss' | 'sports' })}
                  className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors"
                >
                  {a.name}
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Events */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <p className="text-red-600 text-sm font-bold uppercase tracking-widest mb-2">Recent</p>
            <h2 className="text-3xl font-black text-gray-900">Events & Programs</h2>
            <div className="w-12 h-1 bg-red-700 mt-4" />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
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
          ) : items.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg">No events found for this activity.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
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
                    <div className="h-48 bg-gradient-to-br from-red-700 to-gray-900" />
                  )}
                  <div className="p-5">
                    {item.event_date && (
                      <div className="flex items-center gap-1.5 text-xs text-red-600 font-bold mb-2">
                        <Calendar size={12} />
                        {new Date(item.event_date).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    )}
                    <h3 className="font-black text-gray-900 text-base mb-2 group-hover:text-red-700 transition-colors">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
