import React, { useRef, useEffect } from 'react';
import { Target, TrendingUp, Award, Users, Globe, Shield } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const visionMissionRef = useRef<HTMLDivElement>(null);
  const businessGrowthRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const partnershipsRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    // Animate sections on scroll
    const sections = [visionMissionRef, businessGrowthRef, achievementsRef, partnershipsRef];
    
    sections.forEach((ref, index) => {
      if (ref.current) {
        gsap.fromTo(ref.current,
          { 
            opacity: 0, 
            y: 100,
            rotationX: -10
          },
          { 
            opacity: 1, 
            y: 0,
            rotationX: 0,
            duration: 1,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    // Animate achievement cards
    achievements.forEach((_, index) => {
      gsap.fromTo(`.achievement-card-${index}`,
        { 
          opacity: 0, 
          scale: 0.8,
          rotationY: -15
        },
        { 
          opacity: 1, 
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: `.achievement-card-${index}`,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative py-20 w-full overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Dynamic Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'grid-pulse 4s ease-in-out infinite'
          }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-purple-400/10 to-cyan-400/10 blur-xl"
              style={{
                width: `${80 + i * 30}px`,
                height: `${80 + i * 30}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float-about-${i % 4} ${6 + i}s ease-in-out infinite`
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-6">
            About Multywave Technologies
          </h2>
          <p className="text-xl md:text-2xl text-purple-100 max-w-4xl mx-auto leading-relaxed">
            Leading the way in biometric identification and forensic security solutions with cutting-edge technology and proven expertise.
          </p>
        </div>

        {/* Vision & Mission section */}
        <div
          ref={visionMissionRef}
          className="bg-white/5 backdrop-blur-lg rounded-3xl p-10 shadow-2xl mb-20 border border-white/10 hover:border-purple-400/50 transition-all duration-500"
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:divide-x lg:divide-purple-200/20">
            <div className="flex-1 lg:pr-8">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-purple-500/20 rounded-2xl mr-4">
                  <Target className="h-10 w-10 text-purple-400" />
                </div>
                <h3 className="text-3xl font-bold">Our Vision</h3>
              </div>
              <p className="leading-relaxed text-lg text-purple-100">
                To be the leading provider of innovative biometric and forensic security solutions,
                empowering organizations with cutting-edge technology that ensures maximum security,
                reliability, and efficiency in identity management and law enforcement applications.
              </p>
            </div>

            <div className="flex-1 lg:pl-8 lg:pt-0 pt-8">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-green-500/20 rounded-2xl mr-4">
                  <TrendingUp className="h-10 w-10 text-green-400" />
                </div>
                <h3 className="text-3xl font-bold">Our Mission</h3>
              </div>
              <p className="leading-relaxed text-lg text-purple-100">
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
          className="bg-white/5 backdrop-blur-lg rounded-3xl px-8 py-12 mb-20 border border-white/10 hover:border-cyan-400/50 transition-all duration-500"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                Business Growth & Excellence
              </h3>
              <p className="text-purple-100 leading-relaxed text-lg mb-6">
                Our strategic partnerships with industry leaders like PAPILLON AO and Matica Technologies
                have enabled us to deliver world-class solutions while maintaining our commitment to innovation
                and customer satisfaction.
              </p>
              <div className="space-y-3">
                {[
                  "ISO 9001:2015 Certified",
                  "Government Approved Vendor",
                  "20+ Years of Excellence"
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <Award className="h-5 w-5 text-yellow-400 mr-3" />
                    <span className="text-purple-100">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "20+", label: "Years Experience" },
                { value: "100+", label: "Projects Completed" },
                { value: "24/7", label: "Technical Support" },
                { value: "99.9%", label: "System Uptime" }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-purple-100 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements section */}
        <div ref={achievementsRef}>
          <h3 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Key Achievements
          </h3>
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className={`achievement-card-${index} bg-white/5 backdrop-blur-lg rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/10 hover:border-purple-400/50 hover:scale-105 group`}
              >
                <div className="p-4 bg-white/10 rounded-2xl mb-6 w-fit group-hover:scale-110 transition-transform duration-300">
                  {achievement.icon}
                </div>
                <h4 className="text-2xl font-bold mb-4 group-hover:text-purple-300 transition-colors duration-300">
                  {achievement.title}
                </h4>
                <p className="text-purple-100 leading-relaxed mb-4 group-hover:text-white transition-colors duration-300">
                  {achievement.description}
                </p>
                <div className="text-sm font-semibold text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full w-fit">
                  {achievement.stats}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership Section */}
        <div
          ref={partnershipsRef}
          className="text-center border-4 border-yellow-500/50 rounded-3xl p-8 bg-white/5 backdrop-blur-lg hover:border-yellow-400 transition-all duration-500"
        >
          <h3 className="text-4xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Strategic Partnerships
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { 
                title: "PAPILLON AO", 
                description: "Partnership with leading AFIS technology provider, enabling advanced fingerprint identification systems for law enforcement agencies." 
              },
              { 
                title: "Matica Technologies", 
                description: "Collaboration for card personalization and issuance systems, providing comprehensive identity document solutions for government and enterprise clients." 
              }
            ].map((partnership, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/10 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105"
              >
                <h4 className="text-2xl font-semibold mb-3 text-yellow-400">{partnership.title}</h4>
                <p className="text-purple-100">{partnership.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes grid-pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes float-about-0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
        }
        
        @keyframes float-about-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(-180deg); }
        }
        
        @keyframes float-about-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-40px) rotate(90deg); }
        }
        
        @keyframes float-about-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(-90deg); }
        }
      `}</style>
    </section>
  );
};

export default About;