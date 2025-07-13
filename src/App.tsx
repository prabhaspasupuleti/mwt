import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

// Import your components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Clients from './components/Clients';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Products from './components/Products';
import News from './components/News';

// Import 3D components
import ThreeScene from './components/3D/ThreeScene';
import ParticleSystem from './components/3D/ParticleSystem';
import FloatingElements from './components/3D/FloatingElements';

import './app.css';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Redirect to home page on refresh
  useEffect(() => {
    if (window.performance) {
      const navigationType = performance.getEntriesByType('navigation')[0]?.type;
      if (navigationType === 'reload' && location.pathname !== '/') {
        navigate('/');
      }
    }
  }, [navigate, location.pathname]);

  // Enhanced smooth scrolling
  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const id = decodeURIComponent(location.hash.substring(1));
    const element = document.getElementById(id);

    if (element) {
      // Add a small delay to ensure the page has rendered
      setTimeout(() => {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }, 100);
    } else {
      console.warn(`Element with ID "${id}" not found for scrolling.`);
    }
  }, [location]);

  // Scroll-to-Top Button Visibility Logic
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col overflow-x-hidden m-0 p-0 relative">
      {/* 3D Background Elements - More subtle */}
      <ThreeScene className="fixed inset-0 z-0 opacity-60">
        <ParticleSystem count={200} color="#3b82f6" />
        <FloatingElements />
      </ThreeScene>

      {/* Header Component */}
      <Header className="sticky top-0 z-50 relative" />

      {/* Main Content */}
      <main id="main-content" className="flex-grow relative z-10">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <Services />
                <Clients />
                <Testimonials />
                <Contact />
              </>
            }
          />
          <Route path="/products" element={<Products />} />
          <Route path="/news" element={<News />} />
          <Route
            path="*"
            element={
              <div className="flex justify-center items-center h-[calc(100vh-200px)] text-2xl text-slate-600 bg-slate-50">
                404 | Page Not Found
              </div>
            }
          />
        </Routes>
      </main>

      {/* Footer Component */}
      <Footer />

      {/* Professional Scroll-to-Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-300 ease-in-out z-50 hover:scale-110 group"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      )}

      {/* Enhanced Global Styles */}
      <style jsx global>{`
        * {
          scroll-behavior: smooth;
        }
        
        html {
          scroll-padding-top: 80px;
        }
        
        body {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%);
          overflow-x: hidden;
        }
        
        /* Professional scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(148, 163, 184, 0.1);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #2563eb, #1e40af);
        }
        
        /* Smooth transitions for all elements */
        * {
          transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease, opacity 0.2s ease;
        }
        
        /* Enhanced focus states */
        button:focus,
        a:focus,
        input:focus,
        textarea:focus,
        select:focus {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
        
        /* Professional text selection */
        ::selection {
          background: rgba(59, 130, 246, 0.2);
          color: #1e293b;
        }
        
        /* Loading animation for images */
        img {
          transition: opacity 0.3s ease;
        }
        
        img[loading] {
          opacity: 0;
        }
        
        img:not([loading]) {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

export default App;