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
            y: 50
          },
          { 
            opacity: 1, 
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power2.out",
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
          scale: 0.95,
          y: 30
        },
        { 
          opacity: 1, 
          scale: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out",
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
      className="relative py-20 w-full overflow-hidden bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-800 z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            About Multywave Technologies
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Leading the way in biometric identification and forensic security solutions with cutting-edge technology and proven expertise.
          </p>
        </div>

        {/* Vision & Mission section */}
        <div
          ref={visionMissionRef}
          className="bg-white rounded-2xl p-10 shadow-lg mb-20 border border-slate-200"
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:divide-x lg:divide-slate-200">
            <div className="flex-1 lg:pr-8">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-100 rounded-xl mr-4">
                  <Target className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900">Our Vision</h3>
              </div>
              <p className="leading-relaxed text-lg text-slate-600">
                To be the leading provider of innovative biometric and forensic security solutions,
                empowering organizations with cutting-edge technology that ensures maximum security,
                reliability, and efficiency in identity management and law enforcement applications.
              </p>
            </div>

            <div className="flex-1 lg:pl-8 lg:pt-0 pt-8">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-green-100 rounded-xl mr-4">
                  <TrendingUp className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900">Our Mission</h3>
              </div>
              <p className="leading-relaxed text-lg text-slate-600">
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
          className="bg-white rounded-2xl px-8 py-12 mb-20 border border-slate-200 shadow-lg"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-4xl font-bold mb-6 text-slate-900">
                Business Growth & Excellence
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg mb-6">
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
                    <Award className="h-5 w-5 text-yellow-500 mr-3" />
                    <span className="text-slate-600">{item}</span>
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
                  className="bg-slate-50 rounded-xl p-6 text-center border border-slate-100 hover:border-blue-200 transition-all duration-300 hover:shadow-md"
                >
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-slate-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements section */}
        <div ref={achievementsRef}>
          <h3 className="text-4xl font-bold text-center mb-12 text-slate-900">
            Key Achievements
          </h3>
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className={`achievement-card-${index} bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-blue-300 group`}
              >
                <div className="p-4 bg-slate-50 rounded-xl mb-6 w-fit group-hover:bg-blue-50 transition-colors duration-300">
                  {achievement.icon}
                </div>
                <h4 className="text-2xl font-bold mb-4 text-slate-900">
                  {achievement.title}
                </h4>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {achievement.description}
                </p>
                <div className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit">
                  {achievement.stats}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership Section */}
        <div
          ref={partnershipsRef}
          className="text-center border-2 border-blue-200 rounded-2xl p-8 bg-blue-50"
        >
          <h3 className="text-4xl font-bold mb-8 text-slate-900">
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
                className="bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg"
              >
                <h4 className="text-2xl font-semibold mb-3 text-blue-600">{partnership.title}</h4>
                <p className="text-slate-600">{partnership.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;