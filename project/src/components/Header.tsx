// src/components/Header.js

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import mwtlogo from 'project\public\bgvideo.mp4' // Adjust the path as necessary
// Using inline SVGs as a fallback for lucide-react if not installed or configured
// If you have lucide-react installed and configured, you can revert to:
// import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
    <line x1="4" x2="20" y1="12" y2="12"></line>
    <line x1="4" x2="20" y1="6" y2="6"></line>
    <line x1="4" x2="20" y1="18" y2="18"></line>
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone mr-2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-3.95-3.95A19.79 19.79 0 0 1 2 4.18 2 2 0 0 1 4.18 2h3a2 2 0 0 1 2 1.72c.1.72.35 1.43.71 2.11L8.27 9.87a2 2 0 0 0 .73 2.19 2.07 2.07 0 0 0 2.19.73l1.82-1.82c.68.36 1.39.61 2.11.71a2 2 0 0 1 1.72 2v3Z"></path>
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail mr-2">
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin mr-2">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Initial state for background class, will be updated by useEffect
  const [headerBgClass, setHeaderBgClass] = useState('bg-white/95 backdrop-blur-sm'); 
  const location = useLocation();

  // Updated navigation array: 'News' now points to a direct route '/news'
  // Corrected 'bg-white-100/95' to 'bg-white/95' for valid Tailwind classes.
  const navigation = [
    { name: 'Home', to: '/', sectionId: 'home', bgClass: 'bg-white/95 backdrop-blur-sm' },
    { name: 'About', to: '/#about', sectionId: 'about', bgClass: 'bg-purple-100/95 backdrop-blur-sm' },
    { name: 'Services', to: '/#services', sectionId: 'services', bgClass: 'bg-white/95 backdrop-blur-sm' },
    { name: 'Products', to: '/products', sectionId: 'products', bgClass: 'bg-white/95 backdrop-blur-sm' },
    { name: 'Clients', to: '/#clients', sectionId: 'clients', bgClass: 'bg-white/95 backdrop-blur-sm' },
    { name: 'Testimonials', to: '/#testimonials', sectionId: 'testimonials', bgClass: 'bg-white/95 backdrop-blur-sm' },
    { name: 'News', to: '/news', sectionId: 'news', bgClass: 'bg-blue-100/95 backdrop-blur-sm' }, // Changed to '/news' and unique bgClass
    { name: 'Contact', to: '/#contact', sectionId: 'contact', bgClass: 'bg-gray-100/95 backdrop-blur-sm' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Check midpoint of viewport for more accurate section detection
      const scrollPosition = window.scrollY + window.innerHeight / 2; 

      let currentBgClass = 'bg-white/95 backdrop-blur-sm'; // Default background for unassigned or initial state

      // First, check if the current path matches any direct routes (like /products or /news)
      const currentPath = location.pathname;
      const matchingNavItem = navigation.find(item => item.to === currentPath);

      if (matchingNavItem) {
        currentBgClass = matchingNavItem.bgClass;
      } else {
        // Fallback to finding the active section based on scroll position for hash routes
        // Iterate in reverse to find the last section that the scroll position has entered
        for (let i = navigation.length - 1; i >= 0; i--) {
          const item = navigation[i];
          const hash = item.to.split('#')[1];

          if (hash) {
            const el = document.getElementById(hash);
            if (el) {
              const elTop = el.offsetTop;
              const elBottom = elTop + el.offsetHeight;

              // If scroll position is within the bounds of the section
              if (scrollPosition >= elTop && scrollPosition < elBottom) {
                currentBgClass = item.bgClass;
                break; // Found the active section, stop iterating
              }
            }
          } else if (item.to === '/' && scrollPosition < (document.getElementById(navigation[1]?.sectionId)?.offsetTop || Infinity)) {
            // Special handling for the home section (when scroll is at the top or before the first hash section)
            currentBgClass = item.bgClass;
            break;
          }
        }
      }
      setHeaderBgClass(currentBgClass);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount and on route change to set initial background correctly
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, navigation]); // Re-run effect if path changes or navigation structure changes

  // Handles navigation clicks, closes mobile menu, and scrolls to section
  const handleNavLinkClick = (to: string) => {
    setIsMenuOpen(false); // Close mobile menu on link click

    const [path, hash] = to.split('#');
    const currentPath = location.pathname;

    // If navigating to a different base path (e.g., from / to /products or /news),
    // let react-router-dom handle the navigation. The useEffect will then pick
    // up the new path and set the background.
    if (path && path !== currentPath && path !== '/') {
      return; 
    }

    // For hash links or home page, handle scrolling manually
    if (hash) {
      // Use setTimeout to ensure the DOM has updated if the route change is slight,
      // and then scroll to the element.
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          console.warn(`Element with ID "${hash}" not found for scrolling.`);
        }
      }, 100); // Small delay to allow DOM render if needed
    } else if (path === '/') {
      // Scroll to the top for the home page link
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Accessibility Skip Link: Allows keyboard users to bypass navigation */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-blue-600 focus:text-white focus:p-3">
        Skip to main content
      </a>

      {/* Top Contact Bar with gradient background */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white text-xs sm:text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center sm:justify-between items-center gap-y-2">
          <div className="flex items-center space-x-4">
            {/* Phone contact link */}
            <a href="tel:+919876543210" className="flex items-center hover:text-blue-200 transition-colors">
              <PhoneIcon /> +91 98765 43210
            </a>
            {/* Email contact link */}
            <a href="mailto:info@multywave.co.in" className="flex items-center hover:text-blue-200 transition-colors">
              <MailIcon /> info@multywave.co.in
            </a>
          </div>
          {/* Location display */}
          <div className="flex items-center">
            <MapPinIcon /> Hyderabad, Telangana, India
          </div>
        </div>
      </div>

      {/* Main Header section with dynamic background and sticky position */}
      {/* The headerBgClass will dynamically change based on the active section/route */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${headerBgClass} shadow-lg rounded-b-md`}> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo, Company Name, and Tagline */}
            <Link to="/" className="flex items-center space-x-2 shrink-0" onClick={() => handleNavLinkClick('/')}>
              {/* Ensure this image path is correct relative to your public folder or build process */}
              {/* Fallback placeholder image in case the specified image path is not found */}
              <img 
                src="project\public\bgvideo.mp4" 
                alt="Multywave Logo" 
                className="h-10 w-10 rounded-full" 
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/40x40/aabbcc/ffffff?text=Logo"; }}
              />
              <div className="flex flex-col items-start">
                <span className="text-2xl text-black font-semibold">MULTYWAVE TECHNOLOGIES</span>
                <span className="text-red-600 text-sm italic">Security at your fingertips.</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="text-slate-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                  onClick={() => handleNavLinkClick(item.to)}
                >
                  {item.name}
                  {/* Underline effect on hover */}
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2"
                aria-label="Toggle navigation"
              >
                {/* Render X icon when menu is open, otherwise Menu icon */}
                {isMenuOpen ? <XIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - conditionally rendered */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 shadow-inner">
            <div className="px-4 py-4 space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="block text-slate-700 hover:text-blue-600 font-medium py-2 transition-colors rounded-md px-3 hover:bg-slate-50"
                  onClick={() => handleNavLinkClick(item.to)}
                >
                  {item.name}
                </Link>
              ))}
              {/* "Get in Touch" button for mobile, styled */}
              <a
                href="#contact"
                onClick={() => handleNavLinkClick('#contact')}
                className="mt-4 block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold shadow-md"
              >
                Get in Touch
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
