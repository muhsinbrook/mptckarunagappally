import { Users, Calendar, Award, ArrowLeft } from 'lucide-react';
import { DEPARTMENTS, Page } from '../lib/types';

interface DepartmentPageProps {
  slug: string;
  onNavigate: (page: Page) => void;
}

export default function DepartmentPage({ slug, onNavigate }: DepartmentPageProps) {
  const dept = DEPARTMENTS.find((d) => d.slug === slug);

  if (!dept) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-black text-gray-800 mb-4">Department not found</h2>
          <button
            onClick={() => onNavigate('home')}
            className="text-red-600 hover:text-red-800 font-bold"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <div
        className="relative h-64 md:h-80 bg-cover bg-center"
        style={{ backgroundImage: `url(${dept.image}?auto=compress&cs=tinysrgb&w=1600)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 to-black/40" />
        <div className="relative h-full flex items-end max-w-7xl mx-auto px-4 pb-10">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-300 mb-3">
              <button
                onClick={() => onNavigate('home')}
                className="text-red-400 font-bold hover:text-red-300 transition-colors"
              >
                Home
              </button>
              <span>/</span>
              <span>Departments</span>
              <span>/</span>
              <span className="text-white">{dept.name}</span>
            </div>
            <div className="inline-block bg-red-700 text-white text-xs font-black px-3 py-1 rounded uppercase tracking-widest mb-2">
              {dept.short}
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white">{dept.name}</h1>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="bg-gray-50 border-b border-gray-200 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors font-medium"
          >
            <ArrowLeft size={16} /> Back to Home
          </button>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-black text-gray-900 mb-4">About the Department</h2>
            <div className="w-12 h-1 bg-red-700 mb-6" />
            <p className="text-gray-600 leading-relaxed text-base mb-8">{dept.description}</p>

            <h3 className="text-xl font-black text-gray-900 mb-4">Department Highlights</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {dept.highlights.map((h) => (
                <div key={h} className="flex gap-3 bg-gray-50 rounded-xl p-4">
                  <div className="w-2 h-2 rounded-full bg-red-600 shrink-0 mt-2" />
                  <p className="text-sm text-gray-700 leading-relaxed">{h}</p>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-black text-gray-900 mb-4">Laboratory & Infrastructure</h3>
            <div className="bg-gray-50 rounded-2xl overflow-hidden">
              <img
                src={`${dept.image}?auto=compress&cs=tinysrgb&w=800`}
                alt={`${dept.name} lab`}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <p className="text-sm text-gray-600 leading-relaxed">
                  The {dept.name} department is equipped with modern laboratory facilities designed to provide hands-on training. Students have access to industry-standard equipment and tools, ensuring they graduate with practical skills that employers demand.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-[#0f172a] rounded-2xl p-6 text-white">
              <h4 className="text-sm font-black uppercase tracking-widest text-red-400 mb-4">Quick Info</h4>
              <div className="space-y-4">
                <div className="flex gap-3 items-center">
                  <Calendar size={16} className="text-red-500 shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400">Established</div>
                    <div className="text-sm font-bold">{dept.established}</div>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <Users size={16} className="text-red-500 shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400">Annual Intake</div>
                    <div className="text-sm font-bold">{dept.intake} Students</div>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <Award size={16} className="text-red-500 shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400">Head of Department</div>
                    <div className="text-sm font-bold">{dept.hod}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Departments */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-4">Other Departments</h4>
              <div className="space-y-2">
                {DEPARTMENTS.filter((d) => d.slug !== dept.slug).map((d) => (
                  <button
                    key={d.slug}
                    onClick={() => {
                      onNavigate({ type: 'department', slug: d.slug });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full text-left text-sm text-gray-700 hover:text-red-600 font-medium flex items-center gap-2 py-1.5 hover:pl-1 transition-all"
                  >
                    <span className="text-red-600 text-xs">&#9679;</span>
                    {d.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
