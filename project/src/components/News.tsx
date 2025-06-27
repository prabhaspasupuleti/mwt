import React, { useState, useEffect } from 'react';

// Mock news data - Added pdfUrl and category to each article
const allNewsArticles = [
  {
    id: 1,
    title: "Scientific tools improve conviction rate, says DGP Mahender Reddy",
    description: "Hyderabad: Fingerprint is a great tool to nab offenders and prosecute them successfully, according to Director-General of Police M Mahender Reddy. Speaking at the valedictory function of the two-day 19th All India Conference",
    image: "https://multywave.co.in/img/News/hyd.PNG",
    pdfUrl: "https://multywave.co.in/img/News/PDF/June_23_2018.pdf",
    category: "Crime News",
  },
  {
    id: 2,
    title: "Technology at finger tips, Telangana cops crack 641 cases",
    description: "HYDERABAD: Fingerprints left behind by culprits have helped police nab criminals umpteen times. Incidentally, Telangana police could solve mystery behind the death of 68 unknown persons by using PAPILLON technology.",
    image: "https://multywave.co.in/img/News/70323685.jpg",
    pdfUrl: "https://multywave.co.in/img/News/PDF/Jul_22_2019.pdf",
    category: "Police & Law",
  },
  {
    id: 3,
    title: "Interstate burglar held, property worth 16.52 lakh recovered",
    description: "Police have arrested an interstate house burglar and recovered stolen property worth Rs 16.52 lakh from his possession on Friday. According to Commissioner of Police Tafseer Iqbal, one Sirisetty Ravichander",
    image: "https://multywave.co.in/img/News/Khammam.PNG",
    pdfUrl: "https://multywave.co.in/img/News/PDF/July_20_2019.pdf",
    category: "Crime News",
  },
  {
    id: 4,
    title: "Warangal police acquire fingerprint detection equipment",
    description: "The City police acquired modern fingerprint detection equipment on Thursday and it will replace the old system in vogue since 1999.",
    image: "https://multywave.co.in/img/News/WARANGALPOLICE.jpg",
    pdfUrl: "https://multywave.co.in/img/News/PDF/JUNE_29_%202017.pdf",
    category: "Technology",
  },
  {
    id: 5,
    title: "New fingerprint scanner helps city cops create crime database.",
    description: "The recently introduced Automatic Finger Print Identification System has helped city police to gather past offences of a house robbery case accused said by Cyberabad police",
    image: "https://multywave.co.in/img/News/cyberabad.PNG",
    pdfUrl: "https://multywave.co.in/img/News/PDF/img3.pdf",
    category: "Database",
  },
  {
    id: 6,
    title: "Cheddi gang found",
    description: "Cheddi gang members who terrorize people, Rachakonda police made them arrest on Wednesday. Their fingerprints were collected with the help of 'Papillon' technology and identified as Gujarat Kishan Badhia, Raoji Badhia and Bharat Singh. They turned out to have a criminal history",
    image: "https://multywave.co.in/img/News/chedi_gang1.PNG",
    pdfUrl: "https://multywave.co.in/img/News/PDF/chedi_gang.pdf",
    category: "Crime News",
  },
  {
    id: 7,
    title: "CCS police arrested the criminals within 48 hours of the incident",
    description: "CP Ravinder said that at the Warangal Police Commissionerate, we are cracking down on crime with the latest technology. A fingerprint device used to control crime was unveiled in front of reporters..",
    image: "https://multywave.co.in/img/News/warangal.PNG",
    pdfUrl: "https://multywave.co.in/img/News/PDF/june_13_2018.pdf",
    category: "Law Enforcement",
  },
  {
    id: 8,
    title: "Crime control with modern technology",
    description: "Warangal Police Commissioner G. Sudheer Babu said that crime can be controlled with modern technology and he launched automated fingerprint identification system.",
    image: "https://multywave.co.in/img/News/wngl.PNG",
    pdfUrl: "https://multywave.co.in/img/News/PDF/wngl.pdf",
    category: "Technology",
  },
];

// NewsCard Component
type NewsArticle = {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  pdfUrl: string;
};

type NewsCardProps = {
  article: NewsArticle;
  delay: number;
};

const NewsCard: React.FC<NewsCardProps> = ({ article, delay }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation after a short delay
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`
        bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between border border-gray-200
        transform transition-all duration-300 ease-in-out
        hover:scale-[1.02] hover:shadow-xl
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
      `}
      style={{
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Article Image */}
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-48 object-cover rounded-lg mb-4 shadow-sm"
        // Fallback image in case the original image fails to load
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = `https://placehold.co/600x400/ECEFF1/607D8B?text=Image+Unavailable`;
        }}
      />
      {/* Article Title */}
      <h3 className="text-2xl font-bold text-gray-800 mb-2 leading-snug">
        {article.title}
      </h3>
      {/* Article Description */}
      <p className="text-gray-700 text-base mb-4 flex-grow line-clamp-3">
        {article.description}
      </p>
      {/* Category Tag and Read More Button */}
      <div className="flex items-center justify-between mt-auto">
        {/* Category Tag */}
        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
          {article.category}
        </span>
        {/* Read More Button */}
        <a
          href={article.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md
                     hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75
                     transition-all duration-300 transform hover:scale-105 text-sm"
        >
          Read More
          <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
            <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [displayedArticles, setDisplayedArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true); // Start loading state
    // Simulate data fetching delay for animation effect
    const timer = setTimeout(() => {
      setDisplayedArticles(allNewsArticles); // Display all articles
      setIsLoading(false); // End loading state
    }, 500); // Increased delay for a smoother loading animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="min-h-screen bg-gray-50 p-4 md:p-8" // Softer background color
      style={{
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Tailwind CSS CDN */}
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="container mx-auto max-w-7xl"> {/* Slightly wider container */}
        {/* Header Section */}
        <header className="text-center mb-12 mt-6"> {/* More vertical spacing */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            <span className="text-black"> {/* Changed text color to black */}
              Latest Headlines
            </span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto"> {/* Larger, centered subtitle */}
            Your daily dose of the most impactful news and insightful analysis from around the globe.
          </p>
        </header>

        {/* News Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Skeleton Loader
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 animate-pulse border border-gray-200" // Skeleton matches card style
              >
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div> {/* Image placeholder */}
                <div className="h-7 bg-gray-200 rounded w-3/4 mb-3"></div> {/* Title placeholder */}
                <div className="h-5 bg-gray-200 rounded w-full mb-2"></div> {/* Description line 1 */}
                <div className="h-5 bg-gray-200 rounded w-5/6 mb-4"></div> {/* Description line 2 */}
                <div className="flex justify-between items-center mt-auto">
                  <div className="h-6 bg-gray-200 rounded-full w-1/4"></div> {/* Category placeholder */}
                  <div className="h-10 bg-gray-200 rounded-lg w-1/3"></div> {/* Button placeholder */}
                </div>
              </div>
            ))
          ) : (
            displayedArticles.length > 0 ? (
              displayedArticles.map((article, index) => (
                <NewsCard key={article.id} article={article} delay={index * 120} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-700 text-xl py-16">
                No articles found at the moment. Please check back later!
              </div>
            )
          )}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="mt-16 py-8 text-center text-gray-500 text-sm border-t border-gray-200">
        <p>&copy; {new Date().getFullYear()} Latest Headlines. All rights reserved.</p>
        <p className="mt-1">Powered by Your News Agency</p>
      </footer>
    </div>
  );
};

export default App;
