import React, { useState, useEffect, useRef } from 'react';
import { Fingerprint, Monitor, Eye, CreditCard, ScanFace, Database, Scan } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const services = [
    {
      icon: <Monitor className="h-12 w-12 text-blue-600" />,
      title: "AMBIS",
      subtitle: "Automated Multi-modal Biometric Identification System",
      description: "PapillonAutomated Multimodal Biometric Identification System (AMBIS) is Multibiometric data banks of unlimited size for such criminal justice and civil purposes as personal registration/identification:by fingerprints,palmprints,facial images,and iris images",
      features: ["Live Scan and Mobile Check", "Multimodal Biometrics", "identifying the unknown dead", "Data Storage and Security"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Fingerprint className="h-12 w-12 text-blue-600" />,
      title: "AFPIS",
      subtitle: "Automated Fingerprint & PalmPrint Identification System",
      description: "Papillon Automated Finger and Palmprint Identification System is the next generation biometric identification system that enables creating, storing and searching of finger /palm print electronic databases.",
      features: ["High-speed matching", "Latent print analysis", "Multi-modal biometrics", "Integration ready"],
      color: "from-purple-500 to-blue-500"
    },
    {
      icon: <Database className="h-12 w-12 text-green-600" />,
      title: "ABIS",
      subtitle: "Automated Ballistic Identification System",
      description: "Automated and comprehensive solution for investigation of firearm-related crimes.The state of the art software enables the acquisition, comparison, and automated identification of bullets and cartridge cases.",
      features: ["Multi-modal support", "Scalable architecture", "Real-time processing", "Secure databases"],
      color: "from-green-500 to-teal-500"
    },
    {
      icon: <ScanFace className="h-12 w-12 text-purple-600" />,
      title: "FRS",
      subtitle: "Facial Recognition System",
      description: "Papillon-Polyface is designed for identifying or verifying persons from facial images.When used in conjunction with PAPILLON AFIS, text data and mugshots of each incoming tenprint are exported from the AFIS DB.",
      features: ["Real-time recognition", "Anti-spoofing", "Multiple face tracking", "High accuracy rates"],
      color: "from-pink-500 to-purple-500"
    },
    {
      icon: <Eye className="h-12 w-12 text-red-600" />,
      title: "IRIS",
      subtitle: "Iris Recognition System",
      description: "Being unique to every individual, the pattern of a human iris begins its shaping six months after the moment of the child's birth. This process gets completed by the age of one, whereupon the iris pattern remains unchanged for life. More absolute than other biometrics, an iris is unlikely to be imitated.",
      features: ["contactless identification", "high accuracy", "ability to operate in diverse lighting conditions"],
      color: "from-red-500 to-pink-500"
    },
    {
      icon: <Scan className="h-12 w-12 text-orange-600" />,
      title: "Live Scanners",
      subtitle: "Biometric Capture Devices",
      description: "The PAPILLON LIVE SCANNER system is designed for producing high-quality electronic tenprints in agency-specific formats that can be further either stored in the LIVE SCANNER internal database or transmitted to PAPILLON or any other AFIS. At the heart of the PAPILLON LIVE SCANNER system is its live-scan fingerprint/palmprint device: Papillon DS-45 (DS-45M) or Papillon DS-30N (DS-30NM).",
      features: ["FBI certified", "High resolution", "Multiple formats", "Rugged design"],
      color: "from-orange-500 to-yellow-500"
    },
    {
      icon: <CreditCard className="h-12 w-12 text-red-600" />,
      title: "Card Printers",
      subtitle: "ID Card Personalization Systems",
      description: "Complete card personalization and issuance solutions for government IDs, employee badges, and secure access cards with advanced security features.",
      features: ["Secure printing", "Hologram support", "RFID encoding", "Quality assurance"],
      color: "from-indigo-500 to-blue-500"
    },
  ];

  useEffect(() => {
    if (sectionRef.current) {
      // Animate section background
      gsap.fromTo(sectionRef.current,
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate service cards
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            { 
              opacity: 0, 
              y: 100,
              rotationX: -15,
              scale: 0.8
            },
            { 
              opacity: 1, 
              y: 0,
              rotationX: 0,
              scale: 1,
              duration: 0.8,
              delay: index * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });
    }
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-20 w-full overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(255, 0, 128, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(128, 255, 0, 0.1) 0%, transparent 50%)
            `
          }}></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float-particle-${i % 3} ${5 + Math.random() * 10}s ease-in-out infinite`
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-6">
            Discover Services We Provide
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Comprehensive biometric and forensic security solutions designed to meet the demanding
            requirements of government agencies, law enforcement, and enterprise organizations.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="group relative bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-cyan-400/50 transition-all duration-500 hover:bg-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
              style={{ perspective: '1000px' }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5 rounded-3xl group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <div className="relative z-10 flex items-start space-x-6">
                {/* Icon container with 3D effect */}
                <div className="flex-shrink-0 p-4 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500 border border-white/20">
                  {service.icon}
                </div>
                
                <div className="flex-1">
                  {/* Service Title and Subtitle */}
                  <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <h4 className="text-lg font-medium text-cyan-300 mb-4">
                    {service.subtitle}
                  </h4>
                  
                  {/* Service Description */}
                  <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
                    {service.description}
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <div className="h-2 w-2 bg-cyan-400 rounded-full mr-3 group-hover:bg-cyan-300 transition-colors duration-300"></div>
                        <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 rounded-3xl transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS for particle animations */}
      <style jsx>{`
        @keyframes float-particle-0 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(10px) translateX(-5px); }
        }
        
        @keyframes float-particle-1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(-10px); }
        }
        
        @keyframes float-particle-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-15px) translateX(15px); }
          75% { transform: translateY(15px) translateX(-15px); }
        }
      `}</style>
    </section>
  );
};

export default Services;