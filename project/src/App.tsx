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
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col overflow-x-hidden m-0 p-0">
      {/* Header Component */}
      <Header className="sticky top-0 z-50" />

      {/* Main Content */}
      <main id="main-content" className="flex-grow">
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
              <div className="flex justify-center items-center h-[calc(100vh-200px)] text-2xl text-gray-600">
                404 | Page Not Found
              </div>
            }
          />
        </Routes>
      </main>

      {/* Footer Component */}
      <Footer />

      {/* Scroll-to-Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-300 ease-in-out z-50 animate-bounce hover:scale-110 hover:shadow-xl"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
}

export default App;
