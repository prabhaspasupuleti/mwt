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
          y: 50,
          scale: 0.9
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out"
        }
      );
    }
  }, []);

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="relative min-h-screen w-full flex items-center justify-center py-16 md:py-24 overflow-hidden font-inter bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-slate-800/90 z-10"></div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}></div>
        </div>

        {/* Floating Orbs */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-xl"
              style={{
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float-${i} ${8 + i * 2}s ease-in-out infinite`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* 3D Fingerprint Scanner */}
      <div className="absolute top-20 right-20 z-20">
        <FingerprintScanner position={[0, 0, 0]} scale={1.5} />
      </div>

      {/* Main content container */}
      <div 
        ref={contentRef}
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-20 w-full"
      >
        {/* Tagline / Badge */}
        <div className="inline-flex items-center bg-cyan-500/10 border border-cyan-400/30 rounded-full px-6 py-3 mb-8 text-cyan-300 backdrop-blur-sm">
          <Shield className="h-6 w-6 text-cyan-400 mr-3" />
          <span className="text-lg font-medium">Trusted Security Solutions</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8">
          <span className="block bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
            Security at your
          </span>
          <span 
            className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
            style={{ 
              textShadow: '0 0 30px rgba(0, 255, 255, 0.5), 0 0 60px rgba(0, 255, 255, 0.3)',
              filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.4))'
            }}
          >
            fingertips
          </span>
        </h1>

        {/* Description Paragraph */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
          Leading provider of biometric identification systems, forensic solutions, and security technologies
          for government and enterprise clients across India and beyond.
        </p>

        {/* Feature List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex items-center text-gray-200 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:bg-white/10"
            >
              <CheckCircle className="h-6 w-6 text-green-400 mr-4 flex-shrink-0" />
              <span className="text-lg">{feature}</span>
            </div>
          ))}
        </div>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <a
            href="/products"
            className="group inline-flex items-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-5 rounded-xl hover:from-cyan-400 hover:to-blue-500 font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-cyan-500/25"
          >
            Explore Solutions
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center border-2 border-cyan-400 text-cyan-300 px-10 py-5 rounded-xl hover:bg-cyan-400/10 hover:border-cyan-300 font-semibold text-lg transition-all duration-300 backdrop-blur-sm"
          >
            Get Consultation
          </a>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-3 gap-8 pt-12 border-t border-gray-700/50">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
              <NumberCounter targetValue={20} />+
            </div>
            <div className="text-lg text-gray-300">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
              <NumberCounter targetValue={50} />+
            </div>
            <div className="text-lg text-gray-300">Projects Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
              <NumberCounter targetValue={24} />/
              <NumberCounter targetValue={7} />
            </div>
            <div className="text-lg text-gray-300">Support Available</div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(90deg); }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-35px) rotate(-90deg); }
        }
        
        @keyframes float-4 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(270deg); }
        }
        
        @keyframes float-5 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-40px) rotate(-270deg); }
        }
      `}</style>
    </section>
  );
};

export default Hero;