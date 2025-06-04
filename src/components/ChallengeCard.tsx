'use client';
import { useState } from 'react';

type Challenge = {
  title: string;
  category: string;
  status: 'Completed' | 'Ongoing';
  daysLeft: number;
  description: string;
};

export default function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const [status, setStatus] = useState(challenge.status);

  const handleJoin = () => setStatus('Ongoing');
  const handleComplete = () => setStatus('Completed');

  return (
    <div className={`rounded-xl p-5 transition-shadow border-l-8 shadow-md hover:shadow-xl
      ${status === 'Completed' ? 'bg-green-100 border-green-500' : 'bg-white border-blue-400'}`}>
      
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">{challenge.title}</h2>
        <span className="text-sm text-gray-600">{challenge.daysLeft} days left</span>
      </div>

      <p className="text-sm text-gray-500 mb-4">{challenge.description}</p>

      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-blue-600">{challenge.category}</span>

        {status === 'Completed' ? (
          <span className="text-green-700 font-bold text-sm">✔ Completed</span>
        ) : status === 'Ongoing' ? (
          <button
            onClick={handleComplete}
            className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 text-sm"
          >
            Mark Complete
          </button>
        ) : (
          <button
            onClick={handleJoin}
            className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm"
          >
            Join
          </button>
        )}
      </div>
    </div>
  );
}
