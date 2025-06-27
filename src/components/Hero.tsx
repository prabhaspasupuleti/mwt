import React, { useState, useEffect, useRef } from 'react';
import { Shield, CheckCircle, ArrowRight } from 'lucide-react';

// Counter component for animating numbers when in view
type NumberCounterProps = {
  targetValue: number;
  duration?: number;
};

const NumberCounter = ({ targetValue, duration = 2000 }: NumberCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isCounting = useRef(false); // To prevent re-triggering animation on scroll up

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isCounting.current) {
            isCounting.current = true;
            let startTimestamp: number | undefined;
            const animateCount = (timestamp: number) => {
              if (startTimestamp === undefined) startTimestamp = timestamp;
              const progress = Math.min((timestamp - startTimestamp) / duration, 1);
              setCount(Math.floor(progress * targetValue));
              if (progress < 1) {
                requestAnimationFrame(animateCount);
              }
            };
            requestAnimationFrame(animateCount);
          } else if (!entry.isIntersecting) {
            // Reset count if it goes out of view and prevent re-trigger on scroll up
            setCount(0);
            isCounting.current = false;
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the component is visible
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [targetValue, duration]); // Re-run if targetValue or duration changes
  return <span ref={ref}>{count}</span>;
};


const Hero = () => {
  // Features list displayed on the left side of the hero section
  const features = [
    'Government-Grade Security Solutions',
    'Proven AFIS & ABIS Implementation',
    'Biometric & Forensic Expertise',
    'Partnership with Global Leaders'
  ];

  return (
    // Main section with solid background and responsive styling.
    // Changed background to transparent as video will cover it, text color changed to white for contrast.
    <section id="home" className="relative min-h-screen flex items-center justify-center py-16 md:py-24 overflow-hidden font-inter">
      {/* Background Video - set to autoplay, loop, and muted */}
      {/* Fixed video path to use public folder */}
      <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover z-0">
        <source src="/bgvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Video Overlay for Readability */}
      {/* This dark overlay ensures the text is readable over the video background. */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Main content container, now centered and text set to white for contrast */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
        {/* Tagline / Badge */}
        <div className="inline-flex items-center bg-blue-600/10 border border-blue-400/30 rounded-full px-4 py-2 mb-6 text-blue-300">
          <Shield className="h-5 w-5 text-blue-400 mr-2" />
          <span className="text-sm font-medium">Trusted Security Solutions</span>
        </div>
        {/* Main Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          <span className="block">Security at your</span>
          <span className="block text-red-400" style={{ textShadow: '0 0 8px rgba(255,0,0,0.7), 0 0 15px rgba(255,0,0,0.5)' }}>fingertips</span>
        </h1>
        {/* Description Paragraph */}
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          Leading provider of biometric identification systems, forensic solutions, and security technologies
          for government and enterprise clients across India and beyond.
        </p>
        {/* Feature List - centered with `justify-items-center` */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 justify-items-center">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center text-gray-200">
              <CheckCircle className="h-5 w-5 text-green-300 mr-3 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        {/* Call-to-Action Buttons - centered with `justify-center` */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="products"
            className="inline-flex items-center bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Explore Solutions
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center border-2 border-gray-400 text-gray-200 px-8 py-4 rounded-lg hover:bg-white/10 hover:border-gray-300 font-semibold transition-all duration-200"
          >
            Get Consultation
          </a>
        </div>
        {/* Statistics Section with Number Counter animations */}
        <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-700">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">
              <NumberCounter targetValue={20} />+
            </div>
            <div className="text-sm text-gray-300">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">
              <NumberCounter targetValue={50} />+
            </div>
            <div className="text-sm text-gray-300">Projects Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">
              <NumberCounter targetValue={24} />/
              <NumberCounter targetValue={7} />
            </div>
            <div className="text-sm text-gray-300">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;