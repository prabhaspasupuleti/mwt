// src/components/Services.js
import React, { useState, useEffect, useRef } from 'react';
// Ensure these imports are working, or replace with inline SVGs as in prior solutions
import { Fingerprint, Monitor, Eye, CreditCard, ScanFace, Database, Scan } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Monitor className="h-12 w-12 text-blue-600" />,
      title: "AMBIS",
      subtitle: "Automated Multi-modal Biometric Identification System",
      description: "PapillonAutomated Multimodal Biometric Identification System (AMBIS) is Multibiometric data banks of unlimited size for such criminal justice and civil purposes as personal registration/identification:by fingerprints,palmprints,facial images,and iris images",
      features: ["Live Scan and Mobile Check", "Multimodal Biometrics ","identifying the unknown dead" ,"Data Storage and Security"]
    },
    {
      icon: <Fingerprint className="h-12 w-12 text-blue-600" />,
      title: "AFPIS",
      subtitle: "Automated Fingerprint & PalmPrint Identification System",
      description: "Papillon Automated Finger and Palmprint Identification System is the next generation biometric identification system that enables creating, storing and searching of finger /palm print electronic databases.",
      features: ["High-speed matching", "Latent print analysis", "Multi-modal biometrics", "Integration ready"]
    },
    {
      icon: <Database className="h-12 w-12 text-green-600" />,
      title: "ABIS",
      subtitle: "Automated Ballistic Identification System",
      description: "Automated and comprehensive solution for investigation of firearm-related crimes.The state of the art software enables the acquisition, comparison, and automated identification of bullets and cartridge cases.",
      features: ["Multi-modal support", "Scalable architecture", "Real-time processing", "Secure databases"]
    },
    {
      icon: <ScanFace className="h-12 w-12 text-purple-600" />,
      title: "FRS",
      subtitle: "Facial Recognition System",
      description: "Papillon-Polyface is designed for identifying or verifying persons from facial images.When used in conjunction with PAPILLON AFIS, text data and mugshots of each incoming tenprint are exported from the AFIS DB.",
      features: ["Real-time recognition", "Anti-spoofing", "Multiple face tracking", "High accuracy rates"]
    },
    {
      icon: <Eye className="h-12 w-12 text-red-600" />,
      title: "IRIS",
      subtitle: "Iris Recognition System",
      description: "Being unique to every individual, the pattern of a human iris begins its shaping six months after the moment of the child’s birth. This process gets completed by the age of one, whereupon the iris pattern remains unchanged for life. More absolute than other biometrics, an iris is unlikely to be imitated.",
      features: ["contactless identification", "high accuracy", "bility to operate in diverse lighting conditions",]
    },
    
    {
      icon: <Scan className="h-12 w-12 text-orange-600" />,
      title: "Live Scanners",
      subtitle: "Biometric Capture Devices",
      description: "The PAPILLON LIVE SCANNER system is designed for producing high-quality electronic tenprints in agency-specific formats that can be further either stored in the LIVE SCANNER internal database or transmitted to PAPILLON or any other AFIS. At the heart of the PAPILLON LIVE SCANNER system is its live-scan fingerprint/palmprint device: Papillon DS-45 (DS-45M) or Papillon DS-30N (DS-30NM).",
      features: ["FBI certified", "High resolution", "Multiple formats", "Rugged design"]
    },

    {
      icon: <CreditCard className="h-12 w-12 text-red-600" />,
      title: "Card Printers",
      subtitle: "ID Card Personalization Systems",
      description: "Complete card personalization and issuance solutions for government IDs, employee badges, and secure access cards with advanced security features.",
      features: ["Secure printing", "Hologram support", "RFID encoding", "Quality assurance"]
    },

  ];

  return (
    // Section for the services, with background image and adjusted padding
    <section
      id="services"
      className="py-20"
      style={{
        // Corrected the background image path to be relative to the public folder.
        // Ensure your image file 'Download Blue Electronic Circuit Abstract PNG.jpg'
        // is located in the 'public/bgimages/' directory of your project.
        backgroundImage: `url(data:image/jpeg;base64,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)`,
        backgroundSize: 'cover',        // Cover the entire section
        backgroundPosition: 'center',   // Center the background image
        backgroundAttachment: 'fixed'   // Makes the background fixed while scrolling
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header for the services section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Discover Services We Provide</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive biometric and forensic security solutions designed to meet the demanding
            requirements of government agencies, law enforcement, and enterprise organizations.
          </p>
        </div>

        {/* Services Grid - displays each service card */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            // Render each service using the ServiceCard component for animations
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Custom CSS for the fade-in-up animation
// In a real project, you might put this in an index.css or global.css file
// For this example, it's defined here for clarity within the immersive.
const animationStyles = `
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(2rem); /* Moves element 2rem (approx 32px) up from its final position */
    }
    to {
      opacity: 1;
      transform: translateY(0); /* Ends at its original position */
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards; /* 0.6s duration, ease-out timing, keeps final state */
  }
`;

// ServiceCard component to handle individual card animations and rendering
type Service = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  // State to control visibility and trigger animation
  const [isVisible, setIsVisible] = useState(false);
  // Ref to attach to the DOM element for IntersectionObserver
  const cardRef = useRef(null);

  useEffect(() => {
    // Create a new IntersectionObserver instance
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the observed element is intersecting (at least 10% visible)
        if (entry.isIntersecting) {
          setIsVisible(true); // Set state to true to trigger animation
          if (cardRef.current) {
            observer.unobserve(cardRef.current); // Stop observing once animated
          }
        }
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: '0px', // No margin around the root
        threshold: 0.1 // Trigger when 10% of the item is visible
      }
    );

    // If the ref is currently attached to an element, observe it
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    // Cleanup function: disconnect the observer when the component unmounts
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    // The main container for each service card
    // ref: attaches the useRef hook to this element
    // className: conditionally applies animation classes based on isVisible state
    // bg-white/70: sets a semi-transparent white background (70% opacity)
    // backdrop-blur-sm: applies a slight blur effect to content behind the card
    // transition-delay: applies a staggered delay for each card using its index
    <div
      ref={cardRef}
      className={`
        group rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-200
        bg-white/70 backdrop-blur-sm
        ${isVisible ? 'animate-fade-in-up' : 'opacity-0 transform translate-y-8'}
      `}
      // Stagger the animation start time for each card
      style={{ transitionDelay: `${isVisible ? index * 100 : 0}ms` }}
    >
      <div className="flex items-start space-x-6">
        {/* Icon container */}
        <div className="flex-shrink-0 p-4 bg-white rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300">
          {service.icon}
        </div>
        <div className="flex-1">
          {/* Service Title and Subtitle */}
          <h3 className="text-2xl font-bold text-slate-900 mb-2">{service.title}</h3>
          <h4 className="text-lg font-medium text-slate-600 mb-4">{service.subtitle}</h4>
          {/* Service Description */}
          <p className="text-slate-700 leading-relaxed mb-6">{service.description}</p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-3">
            {service.features.map((feature, featureIndex) => (
              <div key={featureIndex} className="flex items-center">
                <div className="h-2 w-2 bg-blue-600 rounded-full mr-3"></div>
                <span className="text-sm text-slate-600">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Include the animation styles directly for the immersive context */}
      <style>{animationStyles}</style>
    </div>
  );
};

export default Services;
