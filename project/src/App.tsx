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

  // Hash scrolling logic
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const id = decodeURIComponent(location.hash.substring(1));
    const element = document.getElementById(id);

    if (element) {
      const scrollRAF = requestAnimationFrame(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      return () => cancelAnimationFrame(scrollRAF);
    } else {
      console.warn(`Element with ID "${id}" not found for scrolling.`);
    }
  }, [location]);

  // Scroll-to-Top Button Visibility Logic
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
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
    <div className="min-h-screen bg-slate-900 text-gray-100 font-sans flex flex-col overflow-x-hidden m-0 p-0 relative">
      {/* 3D Background Elements */}
      <ThreeScene className="fixed inset-0 z-0">
        <ParticleSystem count={500} color="#00ffff" />
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
              <div className="flex justify-center items-center h-[calc(100vh-200px)] text-2xl text-gray-300 bg-slate-900">
                404 | Page Not Found
              </div>
            }
          />
        </Routes>
      </main>

      {/* Footer Component */}
      <Footer />

      {/* Enhanced Scroll-to-Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full shadow-2xl hover:from-cyan-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-75 transition-all duration-300 ease-in-out z-50 hover:scale-110 hover:shadow-cyan-500/25 group"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform duration-300" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
        </button>
      )}

      {/* Enhanced Global Styles */}
      <style jsx global>{`
        * {
          scroll-behavior: smooth;
        }
        
        body {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
          overflow-x: hidden;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #06b6d4, #3b82f6);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #0891b2, #2563eb);
        }
        
        /* Smooth transitions for all elements */
        * {
          transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease, opacity 0.3s ease;
        }
        
        /* Enhanced focus states */
        button:focus,
        a:focus,
        input:focus,
        textarea:focus,
        select:focus {
          outline: 2px solid #06b6d4;
          outline-offset: 2px;
        }
        
        /* Improved text selection */
        ::selection {
          background: rgba(6, 182, 212, 0.3);
          color: white;
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