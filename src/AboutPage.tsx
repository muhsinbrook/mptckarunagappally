import { Target, Eye, Award, Users, BookOpen, Building2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div
        className="relative h-64 md:h-80 bg-cover bg-center"
        style={{ backgroundImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE2RyGLH6gGknUkc9uTiSrg1bfcodCaQTRvu1_93NVbQ&s=10' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        <div className="relative h-full flex items-end max-w-7xl mx-auto px-4 pb-10">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <span className="text-red-400 font-bold">Home</span>
              <span>/</span>
              <span>About</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white">About Us</h1>
          </div>
        </div>
      </div>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-red-600 text-sm font-bold uppercase tracking-widest mb-2">Our Story</p>
            <h2 className="text-3xl font-black text-gray-900 mb-5 leading-tight">
              Three Decades of Technical Excellence
            </h2>
            <div className="w-16 h-1 bg-red-700 mb-6" />
            <p className="text-gray-600 leading-relaxed mb-4">
              Model Polytechnic College Karunagappally was established in 1990 under the aegis of the Institute of Human Resources Development (IHRD), Government of Kerala. Over the past three decades, we have grown into one of the most respected polytechnic institutions in the region.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              The college is affiliated with the State Board of Technical Education, Kerala, and offers Diploma programs in six engineering disciplines. Our curriculum is continuously updated to align with industry requirements and technological advancements.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe in holistic education — combining technical skill-building with personality development, social responsibility, and ethical values. Our graduates have gone on to serve in prestigious organizations across India and abroad.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Computer lab"
              className="rounded-xl h-44 object-cover w-full shadow-md"
            />
            <img
              src="https://raviniaplumbing.com/wp-content/uploads/2023/08/Common-Electrical-Tools-to-Know-About-1-scaled.jpg"
              alt="Electronics lab"
              className="rounded-xl h-44 object-cover w-full shadow-md mt-6"
            />
            <img
              src="https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Workshop"
              className="rounded-xl h-44 object-cover w-full shadow-md"
            />
            <img
              src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Graduation"
              className="rounded-xl h-44 object-cover w-full shadow-md mt-6"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border-t-4 border-red-700">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <Target size={24} className="text-red-700" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To provide quality technical education that empowers students with theoretical knowledge, practical skills, and ethical values — equipping them to contribute meaningfully to society and excel in their professional careers.
              </p>
              <ul className="mt-5 space-y-2">
                {[
                  'Industry-aligned curriculum development',
                  'State-of-the-art infrastructure and labs',
                  'Experienced and dedicated faculty',
                  'Strong industry and alumni network',
                ].map((point) => (
                  <li key={point} className="flex gap-2 text-sm text-gray-600">
                    <span className="text-red-600 mt-0.5 shrink-0">&#9679;</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border-t-4 border-gray-800">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Eye size={24} className="text-gray-800" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To be a nationally recognized center of technical excellence, producing innovative, competent, and socially responsible engineers who drive progress and create a positive impact on the world.
              </p>
              <ul className="mt-5 space-y-2">
                {[
                  'Global standards of technical education',
                  'Innovation-driven learning environment',
                  'Inclusive and diverse campus community',
                  'Sustainable and green campus practices',
                ].map((point) => (
                  <li key={point} className="flex gap-2 text-sm text-gray-600">
                    <span className="text-gray-500 mt-0.5 shrink-0">&#9679;</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: Building2, value: '1990', label: 'Established' },
              { icon: BookOpen, value: '6', label: 'Departments' },
              { icon: Users, value: '3000+', label: 'Students' },
              { icon: Award, value: '150+', label: 'Faculty & Staff' },
              { icon: Award, value: '100%', label: 'Placement Rate' },
              { icon: Users, value: '10000+', label: 'Alumni' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <Icon size={24} className="text-red-500 mx-auto mb-2" />
                <div className="text-3xl font-black text-white">{value}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-red-600 text-sm font-bold uppercase tracking-widest mb-2">Leadership</p>
            <h2 className="text-3xl font-black text-gray-900">Principal's Message</h2>
            <div className="w-16 h-1 bg-red-700 mx-auto mt-4" />
          </div>
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start">
            <div className="shrink-0">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-red-700 to-gray-900 flex items-center justify-center shadow-xl">
                <Users size={40} className="text-white" />
              </div>
              <div className="text-center mt-3">
                <div className="font-black text-gray-900 text-sm">Mrs. Asha R</div>
                <div className="text-xs text-red-600 font-medium">Principal</div>
              </div>
            </div>
            <div>
              <div className="text-5xl text-red-200 font-black leading-none mb-2">"</div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to Model Polytechnic College Karunagappally. We are committed to providing an exceptional educational experience that goes beyond textbooks. Our institution believes in nurturing not just technical competence, but also character, creativity, and compassion.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our dedicated faculty, modern facilities, and vibrant campus life create the perfect environment for students to grow academically and personally. We maintain strong ties with the industry to ensure our students are always ahead of the curve.
              </p>
              <p className="text-gray-700 leading-relaxed">
                I invite you to explore our campus, meet our faculty, and discover why so many students choose us as the foundation for their engineering careers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-red-600 text-sm font-bold uppercase tracking-widest mb-2">Our Campus</p>
            <h2 className="text-3xl font-black text-gray-900">Infrastructure & Facilities</h2>
            <div className="w-16 h-1 bg-red-700 mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Computer Labs', value: '8', img: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400' },
              { label: 'Workshop Areas', value: '6', img: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400' },
              { label: 'Library Volumes', value: '15000+', img: 'https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=400' },
              { label: 'Sports Facilities', value: '10+', img: 'https://www.bls.gov/spotlight/2017/sports-and-exercise/images/cover_image.jpg' },
            ].map(({ label, value, img }) => (
              <div key={label} className="relative rounded-xl overflow-hidden h-40 group">
                <img src={img} alt={label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <div className="text-white font-black text-xl">{value}</div>
                  <div className="text-gray-300 text-xs">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
