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
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Fingerprint className="h-12 w-12 text-indigo-600" />,
      title: "AFPIS",
      subtitle: "Automated Fingerprint & PalmPrint Identification System",
      description: "Papillon Automated Finger and Palmprint Identification System is the next generation biometric identification system that enables creating, storing and searching of finger /palm print electronic databases.",
      features: ["High-speed matching", "Latent print analysis", "Multi-modal biometrics", "Integration ready"],
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: <Database className="h-12 w-12 text-green-600" />,
      title: "ABIS",
      subtitle: "Automated Ballistic Identification System",
      description: "Automated and comprehensive solution for investigation of firearm-related crimes.The state of the art software enables the acquisition, comparison, and automated identification of bullets and cartridge cases.",
      features: ["Multi-modal support", "Scalable architecture", "Real-time processing", "Secure databases"],
      color: "from-green-500 to-green-600"
    },
    {
      icon: <ScanFace className="h-12 w-12 text-purple-600" />,
      title: "FRS",
      subtitle: "Facial Recognition System",
      description: "Papillon-Polyface is designed for identifying or verifying persons from facial images.When used in conjunction with PAPILLON AFIS, text data and mugshots of each incoming tenprint are exported from the AFIS DB.",
      features: ["Real-time recognition", "Anti-spoofing", "Multiple face tracking", "High accuracy rates"],
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Eye className="h-12 w-12 text-red-600" />,
      title: "IRIS",
      subtitle: "Iris Recognition System",
      description: "Being unique to every individual, the pattern of a human iris begins its shaping six months after the moment of the child's birth. This process gets completed by the age of one, whereupon the iris pattern remains unchanged for life. More absolute than other biometrics, an iris is unlikely to be imitated.",
      features: ["contactless identification", "high accuracy", "ability to operate in diverse lighting conditions"],
      color: "from-red-500 to-red-600"
    },
    {
      icon: <Scan className="h-12 w-12 text-orange-600" />,
      title: "Live Scanners",
      subtitle: "Biometric Capture Devices",
      description: "The PAPILLON LIVE SCANNER system is designed for producing high-quality electronic tenprints in agency-specific formats that can be further either stored in the LIVE SCANNER internal database or transmitted to PAPILLON or any other AFIS. At the heart of the PAPILLON LIVE SCANNER system is its live-scan fingerprint/palmprint device: Papillon DS-45 (DS-45M) or Papillon DS-30N (DS-30NM).",
      features: ["FBI certified", "High resolution", "Multiple formats", "Rugged design"],
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: <CreditCard className="h-12 w-12 text-teal-600" />,
      title: "Card Printers",
      subtitle: "ID Card Personalization Systems",
      description: "Complete card personalization and issuance solutions for government IDs, employee badges, and secure access cards with advanced security features.",
      features: ["Secure printing", "Hologram support", "RFID encoding", "Quality assurance"],
      color: "from-teal-500 to-teal-600"
    },
  ];

  useEffect(() => {
    if (sectionRef.current) {
      // Animate service cards
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            { 
              opacity: 0, 
              y: 50,
              scale: 0.95
            },
            { 
              opacity: 1, 
              y: 0,
              scale: 1,
              duration: 0.6,
              delay: index * 0.1,
              ease: "power2.out",
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
      className="relative py-20 w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Discover Services We Provide
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
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
              className="group relative bg-white rounded-2xl p-8 border border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl shadow-lg"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 rounded-2xl group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              <div className="relative z-10 flex items-start space-x-6">
                {/* Icon container */}
                <div className="flex-shrink-0 p-4 bg-slate-50 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300 border border-slate-100">
                  {service.icon}
                </div>
                
                <div className="flex-1">
                  {/* Service Title and Subtitle */}
                  <h3 className="text-3xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <h4 className="text-lg font-medium text-blue-600 mb-4">
                    {service.subtitle}
                  </h4>
                  
                  {/* Service Description */}
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <div className="h-2 w-2 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-sm text-slate-600">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;