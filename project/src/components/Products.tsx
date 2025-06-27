import React, { useState, useEffect } from 'react';

// Define the Product interface
interface Product {
  id: string;
  name: string;
  fullName: string;
  category: string;
  image: string; // This will now be the single main image for the product card and detail
  tagline: string;
  benefits: string[];
  description: string;
  specs: { key: string; value: string }[];
  documentation: string; // New: Placeholder for documentation URL/info
  // New property to hold sub-products for categories like "Line Scanners"
  subProducts?: SubProduct[];
}

// Define the SubProduct interface for items within special product categories (like individual scanners)
interface SubProduct {
  id: string;
  name: string;
  image: string;
  description: string;
  specs: { key: string; value: string }[];
  documentation: string; // New: Placeholder for sub-product documentation URL/info
}

// In a real application, this would typically come from a global state, context, or API call
const allProducts: Product[] = [
  {
    id: 'ambis',
    name: 'AMBIS',
    fullName: 'Papillon Automated Multimodal Biometric Identification System',
    category: 'identification',
    image: 'https://www.multywave.co.in/img/equipment-table-stantion.webp',
    tagline: 'A comprehensive, national-scale platform for multi-modal biometric data management.',
    benefits: [
      'A large number of implemented large-scale projects with multi-million databases.',
      'The facts of replacing other manufacturers’ AFISs with PAPILLON AFIS.',
      'Flexible, scalable architecture, support of an unlimited database size',
      'Multibiometric database format, identification/verification of a person by several biometric features',
      'LIVE SCANNER Multibiometric Enrollment System',
      'High-quality photography of latent prints in different illumination modes (PAPILLON-Fosko, PAPILLON-ExpertLab',
      'AFIS tools and filters to improve the quality of latent prints, separate overlapped latent prints, remove underlying texture, etc.',
      ' High-precision proprietary algorithms for recognition and comparison of biometric images (fingerprints, face and iris images)',
      ' Work with latent and known palmprints'

    ],
    description:
      'Automated Multimodal Biometric Identification System (AMBIS) is Multibiometric data banks of unlimited size for such criminal justice and civil purposes as personal registration/identification.Automatic processing and identification of incoming biometric information, including fingerprints and palmprints from crime scenes, for forensic experts, law enforcement and supervisory authorities, other government agencies. Real-time biometric instant identification of individuals.',
    specs: [
      { key: 'Modalities', value: 'Fingerprint, Iris, Face, Palmprint' },
      { key: 'Database Capacity', value: 'Up to 2 Million Records' },
      { key: 'Matching Speed', value: 'Over 1 Million matches/sec' },
      { key: 'Compliance', value: 'NIST, ANSI, ISO Standards' },
    ],
    documentation: 'Documentation for AMBIS is coming soon.',
  },
  {
    id: 'apfis',
    name: 'APFIS',
    fullName: 'Automated Fingerprint Palmprint Identification System',
    category: 'identification',
    image: 'https://multywave.co.in/img/project-1.png',
    tagline: 'Top recognition performance. Whenever we had a chance to compare recognition performance on real-life data, Papillon AFPIS always demonstrated superior recognition performance over all tested competitors.',
    benefits: [
      'Top recognition performance. Whenever we had a chance to compare recognition performance on real-life data, Papillon AFPIS always demonstrated superior recognition performance over all tested competitors.',
      'Seamless interoperability with third party hardware and legacy information systems. Easy transition from legacy AFIS solutions with fully automatic ten-print and latent coding.',
      'Multimodality covering fingerprints, palm-prints, face images, signatures, descriptive and other data.',
      'Native scalability. Our solution enables our customers to expand their systems smoothly and economically as their databases grow and the number of required searches increases.',
      'Advanced expert tools.'
    ],
    description:
      ' Automated Fingerprint and Palmprint Identification System (AFPIS) is the next generation biometric identification system that enables creating, storing and searching of fingerprint/palmprint electronic databases.Flexible and responsive modular architecture of the Papillon AFPIS makes it possible to create secure, reliable and cost efficient identification systems from single machine workstation to nation-wide geographically distributed networked solutions.AFPIS Version 9 is the latest generation of our AFIS. It is the result of almost twenty years of customer driven research and development. Deployed in some of the world’s largest AFIS projects it sets the new standards in accuracy, performance, and cost of ownership of nation-wide biometric identification systems.',
    specs: [
      { key: 'Modalities', value: 'Fingerprint (Tenprint & Latent), Palmprint' },
      { key: 'Primary Use Case', value: 'Law Enforcement, Criminal Justice' },
      { key: 'Image Processing', value: 'Advanced Latent Enhancement Toolkit' },
      { key: 'Interoperability', value: 'Connects with state and national databases' },
    ],
    documentation: 'https://multywave.co.in/downloads/adis_rus_04_2014_eng_small.pdf',
  },
  {
    id: 'arsenal',
    name: 'ABIS',
    fullName: 'Automated Ballistic Identification System',
    category: 'forensics',
    image: 'https://www.multywave.co.in/img/project-2.png',
    tagline: 'Papillon offers the highly automated and comprehensive solution for investigation of firearm-related crimes.',
    benefits: [
      'Innovative 3D scanning capability provides sharp 3D images of both bullets and cartridge cases.',
      'Top recognition performance. Proprietary software algorithms, together with optimized hardware.',
      'Advanced visualization and analytic tools reduce time for ballistic examination and comparison process.',
    ],
    description:
      'Papillon offers the highly automated and comprehensive solution for investigation of firearm-related crimes. Consisting of our versatile ballistic scanner bundled with our state-of-the art software, it enables the acquisition, comparison, and automated identification of bullets and cartridge cases. The ARSENAL 3D, the latest generation of our ARSENAL 3D ABIS (Automated Ballistic Identification System), is the result of almost twenty years of customer driven research and development. ARSENAL ABIS sets the new standards in accuracy, performance, and cost of ownership of nation-wide ballistic identification systems.',
    specs: [
      { key: 'Sensor Type', value: 'Optical (CMOS)' },
      { key: 'Resolution', value: '500 DPI' },
      { key: 'Certification', value: 'FBI PIV, STQC' },
      { key: 'Interface', value: 'USB 2.0' },
    ],
    documentation: 'Documentation for ABIS is coming soon.',
  },
  {
    id: 'frs',
    name: 'FRS',
    fullName: 'Facial Recognition System',
    category: 'Identification',
    image: 'https://multywave.co.in/img/project-3.png',
    tagline: 'System designed for automatically identifying or verifying persons from facial images and for organizing and maintaining facial databases.',
    benefits: [
      'Image acquisition from graphics files, digital cameras, flatbed scanners.',
      'Automatic searches by face data and generation of candidate lists.',
      'Compositing and search by verbal descriptions.',
    ],
    description:
      'PAPILLON-POLYFACE is a system designed for automatically identifying or verifying persons from facial images and for organizing and maintaining facial databases.Besides mugshots, the POLYFACE database contains individuals’ demographics data and verbal descriptions. Facial images can be acquired from various sources: files of standard graphics formats, digital cameras and flatbed scanners. Moreover, when used in conjunction with PAPILLON AFIS (Automated Fingerprint&Palmprint Identification System), text data and mugshots of each incoming tenprint are automatically exported from the AFIS to the POLYFACE database.',
    specs: [
      { key: 'Components', value: 'Rugged Tablet, Fingerprint Scanner, Camera' },
      { key: 'Operating System', value: 'Android' },
      { key: 'Connectivity', value: '4G LTE, Wi-Fi, Bluetooth' },
      { key: 'Battery Life', value: '8+ Hours Continuous Use' },
    ],
    documentation: 'https://multywave.co.in/downloads/POLYFACE.pdf',
  },
  {
    id: 'iris',
    name: 'IRIS',
    fullName: 'Iris Recognition System',
    category: 'identification',
    image: 'https://multywave.co.in/img/project-4.png', // Placeholder image
    tagline: 'PAPILLON ZIRKON system uses an iris image as a biometrical identification feature...',
    benefits: [
      'Extremely high accuracy and reliability for identification.',
      'Non-contact and user-friendly capture process.',
      'Ideal for high-security environments and access control.',
      'Fast matching speeds for real-time verification.',
    ],
    description:
      'PAPILLON ZIRKON system uses an iris image as a biometrical identification feature. At the heart of the system is its unique PAPILLON ZIRKON-3E Access Unit with the built-in PAPILLON iris scanner. The iris pattern digital code (768 bytes) is verified against the database. The result of such verification is a Hit / No Hit answer if the database contains the iris image of the person verified or not respectively. In the event that the code is identified as a Hit, a possibility to output the related information from the database (passport data and photos) is provided. The whole process takes 2-3 seconds only.',
    specs: [
      { key: 'Modalities', value: 'Iris' },
      { key: 'Capture Type', value: 'Dual-eye, non-contact' },
      { key: 'Matching Speed', value: 'Rapid, sub-second verification' },
      { key: 'Security Features', value: 'Liveness detection, anti-spoofing' },
    ],
    documentation: 'https://multywave.co.in/downloads/ZIRKON.pdf',
  },
  {
    id: 'retransfer-printer-consumables',
    name: 'Retransfer Printer Consumables',
    fullName: 'High-Quality Retransfer Printer Consumables',
    category: 'accessories',
    image: 'https://multywave.co.in/img/project-7.png',
    tagline: 'Color printability and adhesion to the Re-transfer film and card material is constantly tested for permanency.',
    benefits: [
      'Ensures vibrant and durable card prints.',
      'Optimized for various retransfer printer models.',
      'Guaranteed compatibility and consistent performance.',
    ],
    description:
      'Our retransfer printer consumables are engineered to deliver superior print quality and longevity. Each ribbon and film is rigorously tested to ensure perfect adhesion, vibrant color reproduction, and resistance to wear and tear, providing reliable performance for all your card printing needs.',
    specs: [
      { key: 'Product Type', value: 'Ribbons, Films, Cleaning Kits' },
      { key: 'Compatibility', value: 'Universal for retransfer printers' },
      { key: 'Durability', value: 'Long-lasting print permanence' },
      { key: 'Quality Control', value: 'ISO 9001 certified manufacturing' },
    ],
    documentation: 'https://multywave.co.in/downloads/Printer%20Consumables%20Brochure.pdf',
  },
  {
    id: 'line-scanners',
    name: 'Line Scanners',
    fullName: 'Advanced Line Scanners for Biometric Capture',
    category: 'biometric devices',
    image: 'https://multywave.co.in/img/project-5.png',
    tagline: 'A range of high-performance line scanners designed for various biometric applications.',
    benefits: [
      'High-resolution image capture for detailed analysis.',
      'Ergonomic design for comfortable and efficient use.',
      'Robust construction for long-term reliability.',
    ],
    description:
      'Our collection of line scanners offers cutting-edge technology for capturing precise biometric data. From compact desktop units to portable solutions, each scanner is built to meet the demanding requirements of identification and verification systems, ensuring accuracy and speed.',
    specs: [],
    documentation: 'Documentation for Line Scanners (main category) is coming soon.',
    subProducts: [
      {
        id: 'ls-001',
        name: 'DS-45',
        image: 'https://multywave.co.in/img/ds45icon.png',
        description: "manufactured as a separate optical unit driven by a backbone computer.designed for capturing rolled and plain fingerprints and palmprints (including the so-called writer's palm)",
        specs: [
          { key: 'Resolution of resulting images', value: '500 ppi (500 pixels per inch)' },
          { key: 'Dynamic Range', value: '8 bpp (8 bit per pixel)' },
          { key: 'Signal–To–Noise Ratio', value: 'Minimum: 40 db' },
          { key: 'Sensing Area', value: '1 large platen for rolling and taking plain impressions of fingers and palms' },
          { key: 'Scan Area', value: '132 x 130 mm' },
          { key: 'Time for scanning a fingerprint', value: '< 5 seconds (for touchprint – 3 seconds)' },
        ],
        documentation: 'https://multywave.co.in/downloads/DS_45_E.PDF',
      },
      {
        id: 'ls-002',
        name: 'DS-45M',
        image: 'https://multywave.co.in/img/ds45micon.png',
        description: 'manufactured as a separate optical unit driven by a backbone computer.The DS-45 uses the optical technology that enables producing high quality fingerprint and palmprint images even of moist fingers and palms.',
        specs: [
          { key: 'Resolution of resulting images', value: '500 ppi (500 pixels per inch)' },
          { key: 'Dynamic Range', value: '8 bpp (8 bit per pixel)' },
          { key: 'Signal–To–Noise Ratio', value: 'Minimum: 40 db' },
          { key: 'Sensing Area', value: '1 large platen for rolling and taking plain impressions of fingers and palms' },
          { key: 'Scan Area', value: '132 x 130 mm' },
          { key: 'Time for scanning a fingerprint', value: '< 5 seconds (for touchprint – 3 seconds)' },
        ],
        documentation: 'Documentation for DS-45M is coming soon.',
      },
      {
        id: 'ls-003',
        name: 'DS-30N',
        image: 'https://multywave.co.in/img/ds30nicon.png',
        description: 'The DS-30N uses the optical technology that enables producing high quality fingerprint and palmprint images even of moist fingers and palms.manufactured as a separate optical unit driven by a backbone computer.',
        specs: [
           { key: 'Resolution of resulting images', value: '500 ppi (500 pixels per inch)' },
          { key: 'Dynamic Range', value: '8 bpp (8 bit per pixel)' },
          { key: 'Signal–To–Noise Ratio', value: 'Minimum: 40 db' },
          { key: 'Sensing Area', value: '1 large platen for rolling and taking plain impressions of fingers and palms' },
          { key: 'Scan Area', value: '86 x 78 mm' },
          { key: 'Time for scanning a fingerprint', value: '< 4 seconds (for touchprint – 2.5 seconds))' },
        ],
        documentation: 'https://multywave.co.in/downloads/DS_30N.PDF',
      },
      {
        id: 'ls-004',
        name: 'DS-22N',
        image: 'https://multywave.co.in/img/ds22nicon.png',
        description: 'The DS-22N uses the optical technology that enables producing high quality fingerprint and palmprint images even of moist fingers and palms..',
        specs: [
           { key: 'Resolution of resulting images', value: '500 ppi (500 pixels per inch)' },
          { key: 'Dynamic Range', value: '8 bpp (8 bit per pixel)' },
          { key: 'Signal–To–Noise Ratio', value: 'Minimum: 40 db' },
          { key: 'Sensing Area', value: '1 large platen for rolling and taking plain impressions of fingers and palms' },
          { key: 'Scan Area', value: '42 x 40 mm' },
          { key: 'Time for scanning a fingerprint', value: '< 4 seconds (for touchprint – 2.5 seconds))' },
        ],
        documentation: 'https://multywave.co.in/downloads/scanners.pdf',
      },
      {
        id: 'ls-005',
        name: 'DS-21C',
        image: 'https://multywave.co.in/img/ds21cicon.png',
        description: 'The DS-21C is designed for the growing needs in the personal identity check application area (access control systems, background checks, biometric passports, etc.)',
        specs: [
           { key: 'Resolution of resulting images', value: '500 ppi (500 pixels per inch)' },
          { key: 'Dynamic Range', value: '8 bpp (8 bit per pixel)' },
          { key: 'Signal–To–Noise Ratio', value: 'Minimum: 40 db' },
          { key: 'Sensing Area', value: 'touch fingerprint platen' },
          { key: 'Scan Area', value: '20 x 20 mm' },
          { key: 'Time for scanning a fingerprint', value: '< Maximum 2.5 seconds))' },
        ],
        documentation: 'https://multywave.co.in/downloads/DS_21C.pdf',
      },
    ],
  },
  // New "Lamination" product entry
  {
    id: 'lamination',
    name: 'LAMINATORS',
    fullName: 'Lamination Modules...',
    category: 'card solutions',
    image: 'https://multywave.co.in/img/project-8.png', // Placeholder image
    tagline: 'Enhance the durability and security of your ID cards with our lamination solutions.',
    benefits: [
      'Increased card longevity and resistance to wear and tear.',
      'Added security features against counterfeiting and tampering.',
      'Improved image protection and vibrant color preservation.',
      'Wide compatibility with various card printer models.',
    ],
    description:
      'Hologram printing is a premium security measure to upgrade the level of forgery protection and generally increase the lifetime of your cards. Once slow, costly and complex, this procedure has become significantly faster and more cost-effective with modern industrial hologram printers. The Matica EDIsecure® Inline Lamination Modules work with regular as well as holographic laminate to offer you maximum flexibility.The ILM-LS model is capable of high-speed single-sided lamination, while the robust ILM-DS takes care of double-sided lamination. With as little as 16 seconds per card for one-sided and 30 seconds for double-sided lamination, these are also the fastest laminating modules available on the market. Both models rely on heat and pressure to bind a transparent film to the card’s surface. This film can be clear, matte or holographic, based on your needs.',
    specs: [
      { key: 'Laminate Type', value: 'Clear, Holographic, Custom' },
      { key: 'Thickness', value: '0.6 mil, 1.0 mil' },
      { key: 'Compatibility', value: 'Compatible with most card printers with lamination modules' },
      { key: 'Security Features', value: 'UV ink, custom holograms (optional)' },
    ],
    documentation: 'https://multywave.co.in/downloads/laminators.pdf',
  },
];


// ProductDetailPage Component (Modified for single image and documentation placeholder)
const ProductDetailPage: React.FC<{ product: Product, onBack: () => void }> = ({ product, onBack }) => {
  const handleDocumentationClick = () => {
    // Open the documentation link in a new tab
    if (product.documentation && product.documentation !== 'Documentation for AMBIS is coming soon.' && product.documentation !== 'Documentation for ABIS is coming soon.') {
      window.open(product.documentation, '_blank');
    } else {
      alert(product.documentation); // For placeholders, show an alert
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <button
        onClick={onBack}
        className="inline-flex items-center text-primary hover:underline mb-8 rounded-md px-3 py-1.5 transition-colors duration-200"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Back to Products
      </button>

      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {/* Displaying the single main image */}
            <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
              {product.fullName} <span className="text-primary">({product.name})</span>
            </h1>
            <p className="mt-4 text-xl font-semibold text-gray-700 italic">{product.tagline}</p>
            <p className="mt-6 text-gray-700 leading-relaxed">{product.description}</p>

            <div className="mt-8">
              <h3 className="font-bold text-2xl text-gray-800 mb-4">Key Benefits</h3>
              <ul className="space-y-3 text-lg text-gray-700">
                {product.benefits.map((b, index) => (
                  <li key={index} className="flex items-start">
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h3 className="font-bold text-2xl text-gray-800 mb-4">Technical Specifications</h3>
              <table className="min-w-full text-lg text-left text-gray-600 border-collapse">
                <tbody className="divide-y divide-gray-200">
                  {product.specs.length > 0 ? (
                    product.specs.map((spec, index) => (
                      <tr key={index} className="bg-white hover:bg-gray-50">
                        <th scope="row" className="py-3 px-4 font-semibold text-gray-900 w-1/3">
                          {spec.key}
                        </th>
                        <td className="py-3 px-4 w-2/3">{spec.value}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="py-3 px-4 text-gray-500 italic">No specific technical specifications listed for this product.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Documentation Placeholder */}
            <div className="mt-8">
              <h3 className="font-bold text-2xl text-gray-800 mb-4">Documentation</h3>
              <button
                onClick={handleDocumentationClick}
                className="btn-primary py-2 px-4 rounded-lg font-bold text-md transition-colors duration-200"
                // Disable button if documentation is a placeholder text
                disabled={product.documentation === 'Documentation for AMBIS is coming soon.' || product.documentation === 'Documentation for ABIS is coming soon.'}
              >
                View Documentation
              </button>
              {product.documentation === 'Documentation for AMBIS is coming soon.' || product.documentation === 'Documentation for ABIS is coming soon.' ? (
                <p className="mt-2 text-red-500 text-sm italic">Documentation coming soon. This button is disabled.</p>
              ) : (
                <p className="mt-2 text-gray-600 text-sm italic">Click the button to view the documentation PDF.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// New component for displaying Line Scanners details
const LineScannersDetailPage: React.FC<{ product: Product, onBack: () => void }> = ({ product, onBack }) => {
  if (!product.subProducts || product.subProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="inline-flex items-center text-primary hover:underline mb-8 rounded-md px-3 py-1.5 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Products
        </button>
        <div className="bg-white rounded-lg shadow-xl p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Line Scanners Found</h2>
          <p className="text-gray-600">There are no individual line scanners listed for this category.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <button
        onClick={onBack}
        className="inline-flex items-center text-primary hover:underline mb-8 rounded-md px-3 py-1.5 transition-colors duration-200"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Back to Products
      </button>

      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8">
        <h1 className="text-4xl font-extrabold text-gray-900 leading-tight text-center mb-8">
          {product.fullName}
        </h1>
        <p className="text-xl text-gray-700 italic text-center mb-12">{product.tagline}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {product.subProducts.map((scanner) => (
            <div key={scanner.id} className="bg-gray-50 rounded-xl shadow-md p-6 flex flex-col items-center text-center">
              <img src={scanner.image} alt={scanner.name} className="w-48 h-48 object-cover rounded-lg mb-4 shadow-sm" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{scanner.name}</h3>
              <p className="text-gray-700 mb-4 flex-grow">{scanner.description}</p>
              <div className="mt-auto w-full">
                <h4 className="font-semibold text-lg text-gray-800 mb-2">Specifications</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {scanner.specs.map((spec, idx) => (
                    <li key={idx}>
                      <span className="font-medium">{spec.key}:</span> {spec.value}
                    </li>
                  ))}
                </ul>
                {/* Documentation Placeholder for Sub-products */}
                <div className="mt-4">
                  <button
                    onClick={() => {
                      if (scanner.documentation && scanner.documentation !== 'Documentation for DS-45M is coming soon.') {
                        window.open(scanner.documentation, '_blank');
                      } else {
                        alert(scanner.documentation);
                      }
                    }}
                    className="btn-primary py-2 px-3 text-sm rounded-lg font-bold transition-colors duration-200"
                    // Disable button if documentation is a placeholder text
                    disabled={scanner.documentation === 'Documentation for DS-45M is coming soon.'}
                  >
                    View Docs
                  </button>
                  {scanner.documentation === 'Documentation for DS-45M is coming soon.' && (
                    <p className="mt-1 text-red-500 text-xs italic">Coming soon.</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


// Main App Component
const App: React.FC = () => {
  const products: Product[] = allProducts;
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      {/* Tailwind CSS and custom styles */}
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <style>
        {`
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f0f2f5; /* Lighter neutral background */
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }
        .text-primary { color: #0d6efd; }
        .bg-primary { background-color: #0d6efd; }
        .border-primary { border-color: #0d6efd; }
        .btn-primary {
            background-color: #0d6efd;
            color: white;
            transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .btn-primary:hover {
            background-color: #0b5ed7;
            transform: translateY(-2px);
            box-shadow: 0 6px 8px rgba(0,0,0,0.15);
        }
        .product-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border-radius: 0.75rem; /* More rounded corners */
            overflow: hidden;
        }
        .product-card:hover {
            transform: translateY(-8px); /* More pronounced lift */
            box-shadow: 0 15px 25px -5px rgb(0 0 0 / 0.15), 0 6px 10px -6px rgb(0 0 0 / 0.08);
        }
        `}
      </style>

      <main>
        {selectedProduct ? (
          // Conditional rendering based on the selected product's ID
          selectedProduct.id === 'line-scanners' ? (
            <LineScannersDetailPage product={selectedProduct} onBack={handleBackToProducts} />
          ) : (
            <ProductDetailPage product={selectedProduct} onBack={handleBackToProducts} />
          )
        ) : (
          <section id="products" className="py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">Our Product Suite</h2>
                <p className="mt-5 text-xl text-gray-600 max-w-3xl mx-auto">
                  Explore our comprehensive range of biometric solutions below. Click 'View Details' to learn more about each product's specifications and benefits.
                </p>
              </div>

              <div id="product-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {products.map((product) => (
                  <div key={product.id} className="product-card bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
                    <div className="h-56">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-7 flex-grow flex flex-col">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {product.name} {product.fullName && <span className="font-semibold text-gray-700">: {product.fullName}</span>}
                      </h3>
                      <p className="mt-3 text-gray-600 flex-grow text-base">{product.tagline}</p>
                      <div className="mt-8">
                        <button
                          onClick={() => handleViewDetails(product)}
                          className="btn-primary w-full py-3 rounded-lg font-bold text-lg text-center block"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default App;
