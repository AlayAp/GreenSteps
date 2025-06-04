// import Image from 'next/image';

// type Tip = string | { title: string; image?: string };

// export default function TipCard({ tip }: { tip: Tip }) {
//   const title = typeof tip === 'string' ? tip : tip.title;
//   const image = typeof tip === 'object' && tip.image ? tip.image : 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e';

//   return (
//     <div className="bg-white dark:bg-gray-800 p-4 my-2 rounded-lg shadow text-black dark:text-white flex flex-col gap-2">
//       <div className="relative w-full h-32">
//         <Image
//           src={image}
//           alt={title}
//           width={300}
//           height={150}
//           className="w-full h-full object-cover rounded"
//           onError={(e) => {
//             console.error('Failed to load tip image:', image);
//             e.currentTarget.src = '/images/fallback.jpg'; // Fallback to local image
//           }}
//         />
//       </div>
//       <p className="flex items-center">✅ {title}</p>
//     </div>
//   );
// }
export default function TipCard({ tip }: { tip: string | { title: string } }) {
  const title = typeof tip === 'string' ? tip : tip.title;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 my-2 rounded-lg shadow text-black dark:text-white">
      <p className="flex items-center">✅ {title}</p>
    </div>
  );
}