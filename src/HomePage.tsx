import { useEffect, useState } from 'react';
import { ArrowRight, Users, BookOpen, Award, Building2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { NewsItem, SiteSettings, Page, DEPARTMENTS, ACTIVITIES } from '../lib/types';
import Hero from '../components/Hero';
import NewsTicker from '../components/NewsTicker';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const stats = [
  { icon: Users, value: '3000+', label: 'Students Enrolled' },
  { icon: BookOpen, value: '6', label: 'Departments' },
  { icon: Award, value: '100%', label: 'Placement Rate' },
  { icon: Building2, value: '30+', label: 'Years of Excellence' },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    supabase
      .from('news')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(10)
      .then(({ data }) => {
        if (data) setNews(data);
      });
    supabase
      .from('site_settings')
      .select('*')
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setSettings(data);
      });
  }, []);

  const navigate = (page: Page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <Hero onNavigate={onNavigate} settings={settings} />
      <NewsTicker items={news} />

      {/* Stats Bar */}
      <div className="bg-red-700 text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center text-center">
                <Icon size={28} className="mb-2 opacity-80" />
                <div className="text-3xl font-black">{value}</div>
                <div className="text-sm font-medium opacity-80 uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Snippet */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-red-600 text-sm font-bold uppercase tracking-widest mb-2">Welcome to</p>
            <h2 className="text-4xl font-black text-gray-900 leading-tight mb-5">
              {settings?.site_name || 'Model Polytechnic College Karunagappally'}
            </h2>
            <div className="w-16 h-1 bg-red-700 mb-6" />
            <p className="text-gray-600 leading-relaxed mb-4">
              {settings?.about_text || 'Established under the Institute of Human Resources Development (IHRD), Model Polytechnic College Karunagappally has been a beacon of technical education since 1990. We offer Diploma programs in six engineering disciplines, providing students with both theoretical knowledge and practical skills.'}
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Our state-of-the-art laboratories, experienced faculty, and industry connections ensure that our graduates are well-prepared for the demands of the modern workforce. We take pride in our strong placement record and the success of our alumni across the globe.
            </p>
            <button
              onClick={() => navigate('about')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-bold text-sm uppercase tracking-wider rounded transition-colors"
            >
              Read More <ArrowRight size={16} />
            </button>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="College campus"
              className="rounded-xl shadow-2xl w-full h-80 object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-red-700 text-white p-5 rounded-xl shadow-xl hidden md:block">
              <div className="text-3xl font-black">30+</div>
              <div className="text-xs uppercase tracking-wide opacity-90">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-red-600 text-sm font-bold uppercase tracking-widest mb-2">Explore Our</p>
            <h2 className="text-4xl font-black text-gray-900 mb-4">Departments</h2>
            <div className="w-16 h-1 bg-red-700 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept.slug}
                onClick={() => navigate({ type: 'department', slug: dept.slug })}
                className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden text-left"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={`${dept.image}?auto=compress&cs=tinysrgb&w=600`}
                    alt={dept.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <span className="bg-red-700 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                      {dept.short}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-black text-gray-900 text-base mb-2 group-hover:text-red-700 transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{dept.description}</p>
                  <div className="mt-3 flex items-center gap-1 text-red-600 text-xs font-bold">
                    View Details <ArrowRight size={12} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-red-600 text-sm font-bold uppercase tracking-widest mb-2">Stay Updated</p>
              <h2 className="text-4xl font-black text-gray-900">Latest News</h2>
              <div className="w-16 h-1 bg-red-700 mt-4" />
            </div>
            <button
              onClick={() => navigate('news')}
              className="hidden sm:flex items-center gap-2 text-red-700 font-bold text-sm hover:text-red-800 transition-colors"
            >
              View All <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="group bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                {item.image_url && (
                  <div className="h-44 overflow-hidden">
                    <img
                      src={`${item.image_url}?auto=compress&cs=tinysrgb&w=600`}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-5">
                  <span className="inline-block bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-2">
                    {item.category}
                  </span>
                  <h3 className="font-black text-gray-900 text-sm mb-2 group-hover:text-red-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{item.content}</p>
                  <p className="text-xs text-gray-400 mt-3">
                    {new Date(item.published_at).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <button
              onClick={() => navigate('news')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-700 text-white font-bold text-sm rounded hover:bg-red-800 transition-colors"
            >
              View All News <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-20 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-red-500 text-sm font-bold uppercase tracking-widest mb-2">Campus Life</p>
            <h2 className="text-4xl font-black text-white mb-4">Activities</h2>
            <div className="w-16 h-1 bg-red-700 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.values(ACTIVITIES).map((act) => (
              <button
                key={act.slug}
                onClick={() => navigate({ type: 'activity', slug: act.slug as 'ioc' | 'alumni' | 'placement' | 'nss' | 'sports' })}
                className="group relative rounded-xl overflow-hidden h-56 text-left"
              >
                <img
                  src={`${act.image}?auto=compress&cs=tinysrgb&w=400`}
                  alt={act.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-2xl mb-1">{act.icon}</div>
                  <div className="text-white font-black text-sm uppercase tracking-wide">{act.label}</div>
                  <div className="text-gray-300 text-xs mt-0.5">{act.name}</div>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-600 rounded-xl transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 bg-cover bg-center relative"
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600)' }}
      >
        <div className="absolute inset-0 bg-red-900/85" />
        <div className="relative max-w-3xl mx-auto text-center px-4">
          <h2 className="text-4xl font-black text-white mb-4">Begin Your Engineering Journey</h2>
          <p className="text-red-100 mb-8 text-lg">
            Join thousands of students who have built successful careers through quality technical education at our institution.
          </p>
          <button
            onClick={() => navigate('about')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-700 font-black text-sm uppercase tracking-wider rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Discover More <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
