import React from 'react';
import { Target, TrendingUp, Award, Users, Globe, Shield } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';

// Custom hook for scroll-triggered animation
const useInViewAnimation = (threshold = 0.1, delay = 0) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add a small delay for staggered effects, if specified
          setTimeout(() => {
            setIsInView(true);
          }, delay);
          // Stop observing once the element is in view to prevent re-triggering
          observer.unobserve(entry.target);
        }
      },
      {
        root: null, // Use the viewport as the container
        rootMargin: "0px",
        threshold: threshold, // Percentage of the target element which is visible to trigger the callback
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup the observer when the component unmounts
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, delay]); // Dependencies for useEffect

  return [ref, isInView];
};


const About = () => {
  const achievements = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Papillon AFIS Implementation",
      description: "Successfully implemented Papillon AFIS for Telangana and Andhra Pradesh Police departments, enhancing law enforcement capabilities.",
      stats: "2 State Implementations"
    },
    {
      icon: <Globe className="h-8 w-8 text-green-600" />,
      title: "Global Partnerships",
      description: "Strategic partnerships with PAPILLON AO and Matica Technologies, bringing world-class solutions to Indian markets.",
      stats: "International Reach"
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Enterprise Solutions",
      description: "Serving government agencies, law enforcement, and corporate clients with cutting-edge biometric and forensic technologies.",
      stats: "100+ Clients"
    }
  ];

  // Refs and states for individual section animations
  const [visionMissionRef, isVisionMissionInView] = useInViewAnimation(0.2, 0); // Animate as soon as 20% is visible
  const [businessGrowthRef, isBusinessGrowthInView] = useInViewAnimation(0.2, 0);
  const [achievementsHeaderRef, isAchievementsHeaderInView] = useInViewAnimation(0.2, 0);
  const [partnershipsRef, isPartnershipsInView] = useInViewAnimation(0.2, 0);


  return (
    <section 
      id="about" 
      className="relative py-20 overflow-hidden min-h-screen flex items-center bg-cover bg-center" 
      style={{ backgroundImage: `url('https://i.pinimg.com/736x/45/c0/86/45c08695ac7400476965367aababdd3b.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Overlay to darken the background image and improve text readability */}
      <div className="absolute inset-0 z-0 bg-black opacity-70"></div> 

      {/* Content wrapper with z-index to place it above the background and overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white"> 
        {/* Header - text color adjusted for contrast against dark background */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ease-out transform ${
            isVisionMissionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl font-bold mb-4">About Multywave Technologies</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Leading the way in biometric identification and forensic security solutions with cutting-edge technology and proven expertise.
          </p>
        </div>

        {/* Vision & Mission section */}
        <div
          ref={visionMissionRef}
          className={`bg-white/5 backdrop-blur-sm rounded-3xl p-10 shadow-xl mb-20 text-white transition-all duration-700 ease-out transform ${
            isVisionMissionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`} 
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:divide-x lg:divide-slate-200">
            <div className="flex-1 lg:pr-8">
              <div className="flex items-center mb-6">
                <Target className="h-10 w-10 text-blue-400 mr-4" /> 
                <h3 className="text-3xl font-bold">Our Vision</h3>
              </div>
              <p className="leading-relaxed text-lg text-blue-100"> 
                To be the leading provider of innovative biometric and forensic security solutions,
                empowering organizations with cutting-edge technology that ensures maximum security,
                reliability, and efficiency in identity management and law enforcement applications.
              </p>
            </div>

            <div className="flex-1 lg:pl-8 lg:pt-0 pt-8">
              <div className="flex items-center mb-6">
                <TrendingUp className="h-10 w-10 text-green-400 mr-4" /> 
                <h3 className="text-3xl font-bold">Our Mission</h3>
              </div>
              <p className="leading-relaxed text-lg text-blue-100"> 
                To deliver world-class biometric identification systems, forensic solutions, and security
                technologies that meet the highest standards of accuracy, security, and performance while
                providing exceptional customer service and support to our clients across India and beyond.
              </p>
            </div>
          </div>
        </div>

        {/* Business Growth Section */}
        <div
          ref={businessGrowthRef}
          className={`bg-white/5 backdrop-blur-sm rounded-2xl px-8 py-12 mb-20 text-white transition-all duration-700 ease-out transform ${
            isBusinessGrowthInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`} 
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">Business Growth & Excellence</h3>
              <p className="text-blue-100 leading-relaxed text-lg mb-6">
                Our strategic partnerships with industry leaders like PAPILLON AO and Matica Technologies
                have enabled us to deliver world-class solutions while maintaining our commitment to innovation
                and customer satisfaction.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-yellow-400 mr-3" />
                  <span>ISO 9001:2015 Certified</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-yellow-400 mr-3" />
                  <span>Government Approved Vendor</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-yellow-400 mr-3" />
                  <span>20+ Years of Excellence</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {/* Individual stat cards with staggered animation */}
              {[
                { value: "20+", label: "Years Experience" },
                { value: "100+", label: "Projects Completed" },
                { value: "24/7", label: "Technical Support" },
                { value: "99.9%", label: "System Uptime" }
              ].map((stat, index) => {
                // Use useInViewAnimation for each stat card with a staggered delay
                const [statRef, isStatInView] = useInViewAnimation(0.1, index * 100); 
                return (
                  <div 
                    key={index} 
                    ref={statRef}
                    className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center transition-all duration-700 ease-out transform ${
                      isStatInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                  >
                    <div className="text-3xl font-bold text-yellow-400 mb-2">{stat.value}</div>
                    <div className="text-blue-100">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Achievements section */}
        <div>
          <h3 
            ref={achievementsHeaderRef}
            className={`text-3xl font-bold text-white text-center mb-12 transition-all duration-700 ease-out transform ${
              isAchievementsHeaderInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >Key Achievements</h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => {
              // Use useInViewAnimation for each achievement card with a staggered delay
              const [achievementRef, isAchievementInView] = useInViewAnimation(0.1, index * 150);
              return (
                <div 
                  key={index} 
                  ref={achievementRef}
                  className={`bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-700 ease-out transform ${
                    isAchievementInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                > 
                  <div className="mb-6">{achievement.icon}</div>
                  <h4 className="text-xl font-bold mb-4">{achievement.title}</h4>
                  <p className="text-blue-100 leading-relaxed mb-4">{achievement.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Partnership Section */}
        <div
          ref={partnershipsRef}
          className={`mt-20 text-center border-4 border-yellow-500 rounded-3xl p-8 bg-white/5 backdrop-blur-sm transition-all duration-700 ease-out transform ${
            isPartnershipsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`} 
        >
          <h3 className="text-3xl font-bold text-white mb-8">Strategic Partnerships</h3> 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Partnership cards can also have staggered animation */}
            {[
              { title: "PAPILLON AO", description: "Partnership with leading AFIS technology provider, enabling advanced fingerprint identification systems for law enforcement agencies." },
              { title: "Matica Technologies", description: "Collaboration for card personalization and issuance systems, providing comprehensive identity document solutions for government and enterprise clients." }
            ].map((partnership, index) => {
              const [partnershipRef, isPartnershipInView] = useInViewAnimation(0.1, index * 100);
              return (
                <div 
                  key={index}
                  ref={partnershipRef}
                  className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-lg text-white transition-all duration-700 ease-out transform ${
                    isPartnershipInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                > 
                  <h4 className="text-xl font-semibold mb-3">{partnership.title}</h4>
                  <p className="text-blue-100">{partnership.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// Main App component to render the About section
const App = () => {
  return (
    <div className="font-sans antialiased">
      {/* Tailwind CSS CDN script for styling */}
      <script src="https://cdn.tailwindcss.com"></script>
      <About />
    </div>
  );
};

export default App;
