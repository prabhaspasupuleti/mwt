import React from 'react';
import { Mail, Phone, Globe, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Fixed logo URL to use public folder
  const logoUrl = "/mwtlogo.png"; 

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Clients', href: '#clients' },
    { name: 'Contact', href: '#contact' }
  ];

  const services = [
    { name: 'AFPIS Systems', href: '#services' },
    { name: 'ABIS Solutions', href: '#services' },
    { name: 'Facial Recognition', href: '#services' },
    { name: 'Scanners', href: '#services' },
    { name: 'Card Printers', href: '#services' }
  ];

  const recentPosts = [
    {
      title: "Advanced Biometric Solutions for Law Enforcement",
      date: "March 2024"
    },
    {
      title: "Successful AFIS Implementation in State Police",
      date: "February 2024"
    },
    {
      title: "New Partnership Announcement",
      date: "January 2024"
    }
  ];

  return (
    // Changed background color from bg-gray-900 to bg-gray-700
    <footer className="bg-gray-700 text-white font-inter">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              {/* Fixed logo path */}
              <img 
                src={logoUrl} 
                alt="Multywave Technologies Logo" 
                className="h-12 w-auto mr-3 rounded-lg" // Added rounded-lg for consistency
                onError={(e) => { 
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; 
                  target.src = "https://placehold.co/150x48/000000/FFFFFF?text=MW"; 
                }} // Fallback image
              />
              <div>
                <h3 className="text-2xl font-bold">Multywave Technologies</h3>
                <p className="text-gray-400 text-sm">Security at your fingertips</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Our mission is to deliver world-class biometric identification systems and forensic 
              solutions that meet the highest standards of accuracy, security, and performance while 
              providing exceptional customer service and support.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:info@multywave.co.in" className="text-gray-400 hover:text-gray-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="tel:+914023119900" className="text-gray-400 hover:text-gray-400 transition-colors">
                <Phone className="h-5 w-5" />
              </a>
              <a href="http://www.multywave.co.in" className="text-gray-400 hover:text-gray-400 transition-colors">
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-gray-400 transition-colors duration-200 flex items-center"
                  >
                    {link.name}
                    <ExternalLink className="h-3 w-3 ml-1 opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href={service.href} 
                    className="text-gray-300 hover:text-gray-400 transition-colors duration-200"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Posts & Contact */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Recent Posts</h4>
            <div className="space-y-4 mb-8">
              {recentPosts.map((post, index) => (
                <div key={index} className="border-l-2 border-gray-600 pl-4"> 
                  <h5 className="text-white font-medium mb-1">{post.title}</h5>
                  <p className="text-gray-400 text-sm">{post.date}</p>
                </div>
              ))}
            </div>

            <h4 className="text-xl font-semibold mb-6">Our Location</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" /> 
                <div>
                  <p className="text-white font-medium">Email</p>
                  <a href="mailto:info@multywave.co.in" className="text-gray-300 hover:text-gray-400 transition-colors"> 
                    info@multywave.co.in
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" /> 
                <div>
                  <p className="text-white font-medium">Phone</p>
                  <a href="tel:+914023119900" className="text-gray-300 hover:text-gray-400 transition-colors"> 
                    +91-40-23119900
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <Globe className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" /> 
                <div>
                  <p className="text-white font-medium">Website</p>
                  <a href="http://www.multywave.co.in" className="text-gray-300 hover:text-gray-400 transition-colors"> 
                    www.multywave.co.in
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" /> 
                <div>
                  <p className="text-white font-medium">Address</p>
                  <p className="text-gray-300">Hyderabad, Telangana, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      {/* Changed border color from border-gray-700 to border-gray-600 */}
      <div className="border-t border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              Copyright © {currentYear} Multywave Technologies. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-gray-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-gray-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-gray-400 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;