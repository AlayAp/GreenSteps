// 'use client';

// import { useEffect, useState } from 'react';
// import { Switch } from '@/app/components/ui/switch';
// import Image from 'next/image';
// import { useTheme } from '../context/ThemeContext';
// import RegionSelector from '@/app/components/RegionSelector';
// import TipCard from '@/app/components/TipCard';

// type Tip = string | { title: string; image?: string };
// type RegionData = {
//   tips: Tip[];
//   facts: string[];
//   image?: string;
// };

// export default function InfoTipsPage() {
//   const [ecoData, setEcoData] = useState<Record<string, RegionData>>({});
//   const [region, setRegion] = useState<string>('');
//   const [highlightedTip, setHighlightedTip] = useState<string | null>(null);
//   const [highlightedFact, setHighlightedFact] = useState<string | null>(null);
//   const [currentTipIndex, setCurrentTipIndex] = useState(0);
//   const [userTips, setUserTips] = useState<Record<string, Tip[]>>({}); // User-submitted tips per region
//   const [newTipTitle, setNewTipTitle] = useState('');
//   const [newTipImage, setNewTipImage] = useState('');
//   const { isDark, toggleTheme } = useTheme();

//   // Define global image with working Unsplash URL
//   const globalImage = 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e';
//   const fallbackImage = '/images/fallback.jpg'; // Local fallback (optional)

//   useEffect(() => {
//     // Load data from public/data/ecoTips.json
//     const loadData = async () => {
//       try {
//         const res = await fetch('/data/ecoTips.json');
//         if (!res.ok) throw new Error(`Failed to fetch ecoTips.json: ${res.status}`);
//         const data = await res.json();
//         console.log('Loaded ecoTips.json:', JSON.stringify(data, null, 2)); // Debug log
//         setEcoData(data);
//         const firstRegion = Object.keys(data)[0];
//         setRegion(firstRegion);

//         // Set random tip and fact
//         const tips = data[firstRegion]?.tips || [];
//         const facts = data[firstRegion]?.facts || [];
//         console.log('Tips for', firstRegion, ':', JSON.stringify(tips, null, 2)); // Debug log
//         if (tips.length > 0) {
//           const randomTip = tips[Math.floor(Math.random() * tips.length)];
//           setHighlightedTip(typeof randomTip === 'string' ? randomTip : randomTip.title);
//         }
//         if (facts.length > 0) {
//           const randomFact = facts[Math.floor(Math.random() * facts.length)];
//           setHighlightedFact(randomFact);
//         }
//       } catch (error) {
//         console.error('Error loading ecoTips:', error);
//       }
//     };

//     loadData();
//   }, []);

//   useEffect(() => {
//     // Reset tip index and set new random tip and fact on region change
//     setCurrentTipIndex(0);
//     const tips = [...(ecoData[region]?.tips || []), ...(userTips[region] || [])];
//     const facts = ecoData[region]?.facts || [];
//     console.log('Tips for', region, ':', JSON.stringify(tips, null, 2)); // Debug log
//     if (tips.length > 0) {
//       const randomTip = tips[Math.floor(Math.random() * tips.length)];
//       setHighlightedTip(typeof randomTip === 'string' ? randomTip : randomTip.title);
//     }
//     if (facts.length > 0) {
//       const randomFact = facts[Math.floor(Math.random() * facts.length)];
//       setHighlightedFact(randomFact);
//     }
//   }, [region, ecoData, userTips]);

//   const handleNextTip = () => {
//     const allTips = [...(ecoData[region]?.tips || []), ...(userTips[region] || [])];
//     setCurrentTipIndex((prev) => (prev + 1) % (allTips.length || 1));
//   };

//   const handlePrevTip = () => {
//     const allTips = [...(ecoData[region]?.tips || []), ...(userTips[region] || [])];
//     setCurrentTipIndex((prev) => (prev === 0 ? (allTips.length || 1) - 1 : prev - 1));
//   };

//   const handleAddTip = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newTipTitle.trim()) {
//       alert('Tip title is required!');
//       return;
//     }

//     const newTip: Tip = {
//       title: newTipTitle.trim(),
//       image: newTipImage.trim() || undefined, // Use undefined if image is empty
//     };

//     setUserTips((prev) => ({
//       ...prev,
//       [region]: [...(prev[region] || []), newTip],
//     }));

//     console.log('Added new tip:', JSON.stringify(newTip, null, 2)); // Debug log
//     setNewTipTitle('');
//     setNewTipImage('');
//   };

//   if (!region) return <p className="p-6 text-black dark:text-white">Loading eco tips...</p>;

//   const allTips = [...(ecoData[region]?.tips || []), ...(userTips[region] || [])];
//   const currentTip = allTips[currentTipIndex];

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6 text-green-800 dark:text-green-300 text-center">
//         Eco Tips for a Sustainable {region}
//       </h1>

//       <div className="flex flex-wrap gap-4 mb-8 justify-center">
//         <RegionSelector onSelect={setRegion} />
//         <div className="flex items-center gap-2">
//           <span className="text-sm font-medium text-black dark:text-white">🌙 Dark Mode</span>
//           <Switch checked={isDark} onCheckedChange={toggleTheme} />
//         </div>
//       </div>

//       <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
//         <Image
//           src={globalImage}
//           alt="Eco-friendly environment"
//           width={1200}
//           height={400}
//           className="w-full h-64 object-cover"
//           onError={(e) => {
//             console.error('Failed to load globalImage:', globalImage);
//             e.currentTarget.src = fallbackImage; // Fallback to local image
//           }}
//         />
//       </div>

//       <div className="mb-8 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
//           Add Your Own Eco Tip
//         </h2>
//         <form onSubmit={handleAddTip} className="flex flex-col gap-4">
//           <div>
//             <label htmlFor="tipTitle" className="block text-sm font-medium text-black dark:text-white mb-1">
//               Tip Title
//             </label>
//             <input
//               id="tipTitle"
//               type="text"
//               value={newTipTitle}
//               onChange={(e) => setNewTipTitle(e.target.value)}
//               placeholder="Enter your eco tip"
//               className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="tipImage" className="block text-sm font-medium text-black dark:text-white mb-1">
//               Image URL (Optional)
//             </label>
//             <input
//               id="tipImage"
//               type="url"
//               value={newTipImage}
//               onChange={(e) => setNewTipImage(e.target.value)}
//               placeholder="Enter image URL (e.g., Unsplash)"
//               className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-green-600 dark:bg-green-700 text-white font-semibold rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition"
//           >
//             Add Tip
//           </button>
//         </form>
//       </div>

//       {highlightedTip && (
//         <div className="mb-8 p-6 bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
//             🌟 Eco Tip of the Day
//           </h2>
//           <p className="text-black dark:text-white">{highlightedTip}</p>
//         </div>
//       )}

//       {highlightedFact && (
//         <div className="mb-8 p-6 bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
//             🌍 Interesting Eco Fact
//           </h2>
//           <p className="text-black dark:text-white">{highlightedFact}</p>
//         </div>
//       )}

//       <div className="mb-12">
//         <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white text-center">
//           Explore Eco Tips
//         </h2>
//         <div className="relative">
//           <div className="flex items-center justify-between">
//             <button
//               onClick={handlePrevTip}
//               className="p-2 bg-green-600 dark:bg-green-700 text-white rounded-full hover:bg-green-700 dark:hover:bg-green-800 transition"
//               aria-label="Previous tip"
//             >
//               ←
//             </button>
//             <div className="flex-1 mx-4">
//               {currentTip && (
//                 <TipCard
//                   key={currentTipIndex}
//                   tip={currentTip}
//                 />
//               )}
//             </div>
//             <button
//               onClick={handleNextTip}
//               className="p-2 bg-green-600 dark:bg-green-700 text-white rounded-full hover:bg-green-700 dark:hover:bg-green-800 transition"
//               aria-label="Next tip"
//             >
//               →
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="mb-12">
//         <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white text-center">
//           All Eco Tips for {region}
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {allTips.map((tip, idx) => (
//             <TipCard key={idx} tip={tip} />
//           ))}
//         </div>
//       </div>

//       {ecoData[region]?.facts && (
//         <div className="mb-12">
//           <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white text-center">
//             More Eco Facts for {region}
//           </h2>
//           <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {ecoData[region].facts.map((fact, idx) => (
//               <li
//                 key={idx}
//                 className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow text-green-800 dark:text-green-300"
//               >
//                 🌿 {fact}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <div className="text-center">
//         <a
//           href="https://www.canada.ca/en/services/environment/conservation.html"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="inline-block px-6 py-3 bg-green-600 dark:bg-green-700 text-white font-semibold rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition"
//         >
//           Discover More Eco Actions
//         </a>
//       </div>
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import { Switch } from '@/app/components/ui/switch';
import Image from 'next/image';
import { useTheme } from '../context/ThemeContext';
import RegionSelector from '@/app/components/RegionSelector';
import TipCard from '@/app/components/TipCard';

type Tip = string | { title: string };
type RegionData = {
  tips: Tip[];
  facts: string[];
};

export default function InfoTipsPage() {
  const [ecoData, setEcoData] = useState<Record<string, RegionData>>({});
  const [region, setRegion] = useState<string>('');
  const [highlightedTip, setHighlightedTip] = useState<string | null>(null);
  const [highlightedFact, setHighlightedFact] = useState<string | null>(null);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [userTips, setUserTips] = useState<Record<string, Tip[]>>({}); // User-submitted tips per region
  const [newTipTitle, setNewTipTitle] = useState('');
  const { isDark, toggleTheme } = useTheme();

  // Define global image with working Unsplash URL
  const globalImage = 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e';
  const fallbackImage = '/images/fallback.jpg'; // Local fallback (optional)

  useEffect(() => {
    // Load data from public/data/ecoTips.json
    const loadData = async () => {
      try {
        const res = await fetch('/data/ecoTips.json');
        if (!res.ok) throw new Error(`Failed to fetch ecoTips.json: ${res.status}`);
        const data = await res.json();
        console.log('Loaded ecoTips.json:', JSON.stringify(data, null, 2)); // Debug log
        setEcoData(data);
        const firstRegion = Object.keys(data)[0];
        setRegion(firstRegion);

        // Set random tip and fact
        const tips = data[firstRegion]?.tips || [];
        const facts = data[firstRegion]?.facts || [];
        console.log('Tips for', firstRegion, ':', JSON.stringify(tips, null, 1)); // Debug log
        if (tips.length > 0) {
          const randomTip = tips[Math.floor(Math.random() * tips.length)];
          setHighlightedTip(typeof randomTip === 'string' ? randomTip : randomTip.title);
        }
        if (facts.length > 0) {
          const randomFact = facts[Math.floor(Math.random() * facts.length)];
          setHighlightedFact(randomFact);
        }
      } catch (error) {
        console.error('Error loading ecoTips:', error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    // Reset tip index and set new random tip and fact on region change
    setCurrentTipIndex(0);
    const tips = [...(ecoData[region]?.tips || []), ...(userTips[region] || [])];
    const facts = ecoData[region]?.facts || [];
    console.log('Tips for', region, ':', JSON.stringify(tips, null, 1)); // Debug log
    if (tips.length > 0) {
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      setHighlightedTip(typeof randomTip === 'string' ? randomTip : randomTip.title);
    }
    if (facts.length > 0) {
      const randomFact = facts[Math.floor(Math.random() * facts.length)];
      setHighlightedFact(randomFact);
    }
  }, [region, ecoData, userTips]);

  const handleNextTip = () => {
    const allTips = [...(ecoData[region]?.tips || []), ...(userTips[region] || [])];
    setCurrentTipIndex((prev) => (prev + 1) % (allTips.length || 1));
  };

  const handlePrevTip = () => {
    const allTips = [...(ecoData[region]?.tips || []), ...(userTips[region] || [])];
    setCurrentTipIndex((prev) => (prev === 0 ? (allTips.length || 1) - 1 : prev - 1));
  };

  const handleAddTip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTipTitle.trim()) {
      alert('Tip title is required!');
      return;
    }

    const newTip: Tip = { title: newTipTitle.trim() };

    setUserTips((prev) => ({
      ...prev,
      [region]: [...(prev[region] || []), newTip],
    }));

    console.log('Added new tip:', JSON.stringify(newTip, null, 1)); // Debug log
    setNewTipTitle('');
  };

  if (!region) return <p className="p-6 text-center text-black dark:text-white">Loading eco tips...</p>;

  const allTips = [...(ecoData[region]?.tips || []), ...(userTips[region] || [])];
  const currentTip = allTips[currentTipIndex];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-green-800 dark:text-green-300 text-center">
        Eco Tips for a Sustainable {region}
      </h1>

      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <RegionSelector onSelect={setRegion} />
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-black dark:text-white">🌙 Dark Mode</span>
          <Switch checked={isDark} onCheckedChange={toggleTheme} />
        </div>
      </div>

      <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
        <Image
          src={globalImage}
          alt="Eco-friendly environment"
          width={1200}
          height={400}
          className="w-full h-64 object-cover"
          onError={(e) => {
            console.error('Failed to load globalImage:', globalImage);
            e.currentTarget.src = fallbackImage; // Fallback to local image
          }}
        />
      </div>

      <div className="mb-8 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
          Add Your Own Eco Tip
        </h2>
        <form onSubmit={handleAddTip} className="flex flex-col gap-4">
          <div>
            <label htmlFor="tipTitle" className="block text-sm font-medium text-black dark:text-white mb-1">
              Tip Title
            </label>
            <input
              id="tipTitle"
              type="text"
              value={newTipTitle}
              onChange={(e) => setNewTipTitle(e.target.value)}
              placeholder="Enter your eco tip"
              className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 dark:bg-green-700 text-white font-semibold rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition"
          >
            Add Tip
          </button>
        </form>
      </div>

      {highlightedTip && (
        <div className="mb-8 p-6 bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
            🌟 Eco Tip of the Day
          </h2>
          <p className="text-black dark:text-white">{highlightedTip}</p>
        </div>
      )}

      {highlightedFact && (
        <div className="mb-8 p-6 bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
            🌍 Interesting Eco Fact
          </h2>
          <p className="text-black dark:text-white">{highlightedFact}</p>
        </div>
      )}

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white text-center">
          Explore Eco Tips
        </h2>
        <div className="relative">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevTip}
              className="p-2 bg-green-600 dark:bg-green-700 text-white rounded-full hover:bg-green-700 dark:hover:bg-green-800 transition"
              aria-label="Previous tip"
            >
              ←
            </button>
            <div className="flex-1 mx-4">
              {currentTip && (
                <TipCard
                  key={currentTipIndex}
                  tip={currentTip}
                />
              )}
            </div>
            <button
              onClick={handleNextTip}
              className="p-2 bg-green-600 dark:bg-green-700 text-white rounded-full hover:bg-green-700 dark:hover:bg-green-800 transition"
              aria-label="Next tip"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white text-center">
          All Eco Tips for {region}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allTips.map((tip, idx) => (
            <TipCard key={idx} tip={tip} />
          ))}
        </div>
      </div>

      {ecoData[region]?.facts && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white text-center">
            More Eco Facts for {region}
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ecoData[region].facts.map((fact, idx) => (
              <li
                key={idx}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow text-green-800 dark:text-green-300"
              >
                🌿 {fact}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="text-center">
        <a
          href="https://www.canada.ca/en/services/environment/conservation.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-green-600 dark:bg-green-700 text-white font-semibold rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition"
        >
          Discover More Eco Actions
        </a>
      </div>
    </div>
  );
}