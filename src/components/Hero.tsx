import React, { useState, useEffect, useRef } from 'react';
import { Shield, CheckCircle, ArrowRight } from 'lucide-react';
import FingerprintScanner from './3D/FingerprintScanner';
import { gsap } from 'gsap';

// Counter component for animating numbers when in view
type NumberCounterProps = {
  targetValue: number;
  duration?: number;
};

const NumberCounter = ({ targetValue, duration = 2000 }: NumberCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isCounting = useRef(false);

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
            setCount(0);
            isCounting.current = false;
          }
        });
      },
      { threshold: 0.5 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [targetValue, duration]);
  return <span ref={ref}>{count}</span>;
};

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const features = [
    'Government-Grade Security Solutions',
    'Proven AFIS & ABIS Implementation',
    'Biometric & Forensic Expertise',
    'Partnership with Global Leaders'
  ];

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current.children, 
        { 
          opacity: 0, 
          y: 30,
          scale: 0.95
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out"
        }
      );
    }
  }, []);

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="relative min-h-screen w-full flex items-center justify-center py-16 md:py-24 overflow-hidden font-inter bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
    >
      {/* Professional Background */}
      <div className="absolute inset-0 w-full h-full">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Subtle Geometric Shapes */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-blue-100/30 to-indigo-100/30"
              style={{
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`,
                animation: `float-gentle-${i} ${15 + i * 5}s ease-in-out infinite`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* 3D Fingerprint Scanner */}
      <div className="absolute top-20 right-20 z-20 opacity-80">
        <FingerprintScanner position={[0, 0, 0]} scale={1.2} />
      </div>

      {/* Main content container */}
      <div 
        ref={contentRef}
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-800 z-20 w-full"
      >
        {/* Tagline / Badge */}
        <div className="inline-flex items-center bg-blue-50 border border-blue-200 rounded-full px-6 py-3 mb-8 text-blue-700 shadow-sm">
          <Shield className="h-6 w-6 text-blue-600 mr-3" />
          <span className="text-lg font-medium">Trusted Security Solutions</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8">
          <span className="block text-slate-900">
            Security at your
          </span>
          <span 
            className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent"
          >
            fingertips
          </span>
        </h1>

        {/* Description Paragraph */}
        <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-4xl mx-auto">
          Leading provider of biometric identification systems, forensic solutions, and security technologies
          for government and enterprise clients across India and beyond.
        </p>

        {/* Feature List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex items-center text-slate-700 bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-slate-200 hover:border-blue-300 transition-all duration-300 hover:bg-white/90 shadow-sm hover:shadow-md"
            >
              <CheckCircle className="h-6 w-6 text-green-500 mr-4 flex-shrink-0" />
              <span className="text-lg">{feature}</span>
            </div>
          ))}
        </div>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <a
            href="/products"
            className="group inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-5 rounded-xl hover:from-blue-700 hover:to-indigo-700 font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Explore Solutions
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center border-2 border-blue-600 text-blue-600 px-10 py-5 rounded-xl hover:bg-blue-50 hover:border-blue-700 font-semibold text-lg transition-all duration-300"
          >
            Get Consultation
          </a>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-3 gap-8 pt-12 border-t border-slate-200">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
              <NumberCounter targetValue={20} />+
            </div>
            <div className="text-lg text-slate-600">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
              <NumberCounter targetValue={50} />+
            </div>
            <div className="text-lg text-slate-600">Projects Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
              <NumberCounter targetValue={24} />/
              <NumberCounter targetValue={7} />
            </div>
            <div className="text-lg text-slate-600">Support Available</div>
          </div>
        </div>
      </div>

      {/* Custom CSS for gentle animations */}
      <style jsx>{`
        @keyframes float-gentle-0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        @keyframes float-gentle-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        
        @keyframes float-gentle-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
      `}</style>
    </section>
  );
};

export default Hero;