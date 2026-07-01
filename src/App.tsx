import { useState, useEffect } from 'react';
import { Page } from './lib/types';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import DepartmentPage from './pages/DepartmentPage';
import NewsPage from './pages/NewsPage';
import ActivityPage from './pages/ActivityPage';
import GalleryPage from './pages/GalleryPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/admin' || path.startsWith('/admin/')) {
      setIsAdminRoute(true);
      const auth = sessionStorage.getItem('adminAuthenticated') === 'true';
      setIsAuthenticated(auth);
    } else {
      setIsAdminRoute(false);
    }
  }, []);

  if (isAdminRoute) {
    if (!isAuthenticated) {
      return <AdminLoginPage onLogin={() => setIsAuthenticated(true)} />;
    }
    return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />;
  }

  const renderPage = () => {
    if (typeof currentPage === 'string') {
      switch (currentPage) {
        case 'home':
          return <HomePage onNavigate={setCurrentPage} />;
        case 'about':
          return <AboutPage />;
        case 'news':
          return <NewsPage />;
        case 'gallery':
          return <GalleryPage />;
        default:
          return <HomePage onNavigate={setCurrentPage} />;
      }
    }

    if (currentPage.type === 'department') {
      return <DepartmentPage slug={currentPage.slug} onNavigate={setCurrentPage} />;
    }

    if (currentPage.type === 'activity') {
      return (
        <ActivityPage
          slug={currentPage.slug as 'ioc' | 'alumni' | 'placement' | 'nss' | 'sports'}
          onNavigate={setCurrentPage}
        />
      );
    }

    return <HomePage onNavigate={setCurrentPage} />;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1">{renderPage()}</main>
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}
