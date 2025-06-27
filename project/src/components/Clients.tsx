import React, { useState } from 'react';

// ClientCard Component for displaying client details
// This component now manages its own hover state for name visibility and glow
const ClientCard: React.FC<{ client: { name: string; logo: string; } }> = ({ client }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    // The main card container with fixed dimensions and 'group' for hover states.
    // Fixed width and height ensure all cards are the same size.
    // 'overflow-hidden' is crucial for the name's slide-up animation.
    // 'relative' positioning is necessary for absolute child positioning.
    <div
      className="bg-white p-6 rounded-2xl shadow-xl transition-all duration-300 flex flex-col items-center text-center border border-gray-100
                 w-[280px] h-[320px] overflow-hidden relative group
                 hover:shadow-2xl hover:scale-103 cursor-pointer" /* Added hover effects for the card itself */
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container - Removed rounded-full to make it square/rectangular */}
      <div className="overflow-hidden w-48 h-48 mb-4 border-4 border-blue-200 p-2 flex items-center justify-center
                       transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg
                       flex-shrink-0 rounded-lg"> {/* Added rounded-lg for subtle corner rounding */}
        <img
          src={client.logo}
          alt={`${client.name} logo`}
          className="w-full h-full object-contain" /* Changed to object-contain for better logo visibility */
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; // Prevents infinite loop if placeholder also fails
            target.src = `https://placehold.co/100x100/A0AEC0/FFFFFF?text=${client.name.replace(/ /g, '+')}`;
          }}
        />
      </div>

      {/* Name Container - Initially hidden, slides up from the bottom on hover */}
      {/* The 'translateY' property controls the vertical position for the slide effect. */}
      {/* 'bottom-0' positions it at the bottom of the card, 'left-0 right-0' spans the width. */}
      {/* 'bg-gradient' provides a professional overlay effect. */}
      <div
        className="absolute bottom-0 left-0 right-0 py-5 px-4 flex items-center justify-center
                   transition-transform duration-300 ease-in-out text-white
                   bg-gradient-to-t from-blue-700 to-blue-500/80" /* Semi-transparent gradient background */
        style={{ transform: isHovered ? 'translateY(0)' : 'translateY(100%)' }}
      >
        {/* Client Name - Applies glow effect on hover */}
        {/* 'text-white' sets the base color, 'text-shadow' applies the subtle glow. */}
        <h3 className="text-2xl text-white transition-all duration-300 font-normal" /* Removed font-semibold */
            style={{ textShadow: isHovered ? '0 0 15px rgba(255, 255, 255, 0.7)' : 'none' }}> {/* Subtle white glow */}
          {client.name}
        </h3>
      </div>
    </div>
  );
};

// Main Clients Component
const Clients = () => {
  // Data for Law Enforcement Clients
  const lawEnforcementClients = [
    { name: 'State Finger Print Bureau,CID. Telangana State', logo: 'https://multywave.co.in/img/cl-tsp.png'},
    { name: 'State Finger Print Bureau,CID.Andhra Pradesh', logo: 'https://upload.wikimedia.org/wikipedia/en/e/ea/Appolice%28emblem%29.png' },
    { name: 'Delhi Police', logo: 'https://multywave.co.in/img/cl-dp.png' },
  ];
  // Data for Government & Public Sector Clients
  const publicSectorClients = [
    { name: 'Nuclear Power Corporation of India Limited (NPCIL)', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/NPCIL_Logo.svg/1200px-NPCIL_Logo.svg.png' },
    { name: 'Electronics Corporation of India Limited (ECIL)', logo: 'https://media.licdn.com/dms/image/v2/C560BAQGq-I3gfKxgOA/company-logo_200_200/company-logo_200_200/0/1630652613712?e=2147483647&v=beta&t=nN4w33PHZ9P8L1483U6TiTK1Z7KEYZO12VE9GxWy9uI' },
    { name: 'American Express', logo: 'https://multywave.co.in/img/cl-ae.png' },
    { name: 'HP', logo: 'https://multywave.co.in/img/cl-hpcl.png' },
    { name: 'HPP', logo: 'https://multywave.co.in/img/cl-hpp.png' },
  ];

  // Combine all clients into a single list
  const allClients = [...lawEnforcementClients, ...publicSectorClients];

  return (
    <section id="clients" className="font-sans bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900 min-h-screen flex flex-col items-center py-10 overflow-hidden">
      {/* No global CSS needed for glow, handled inline now */}

      {/* Hero Section */}
      <div className="relative w-full py-5 px-8 sm:px-12 lg:px-24 text-gray-900 text-center">
        <div className="max-w-5xl mx-auto">
          <p className="text-4xl sm:text-5xl lg:text-6xl mb-2 text-blue-900 tracking-tight drop-shadow-md font-normal" /* Removed font-extrabold */>
            OUR CLIENTS
          </p>
        </div>
      </div>

      {/* Government & Public Sector Solutions Section - Now contains all clients */}
      <div className="w-full py-10 px-8 sm:px-12 lg:px-24 max-w-7xl mx-auto bg-white/70 rounded-lg shadow-inner mt-8"> {/* Added slight background and shadow */}
        <h2 className="text-4xl sm:text-5xl text-center mb-12 text-blue-800 drop-shadow-sm font-normal" /* Removed font-extrabold */>
          Government & Public Sector Solutions
        </h2>
        {/* Grid layout for client cards, centered to accommodate fixed-size cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 lg:gap-16 justify-items-center">
          {allClients.map((client, index) => (
            <ClientCard key={index} client={client} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
