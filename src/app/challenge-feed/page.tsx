'use client';
import { useState } from 'react';
import ChallengeCard from '@/components/ChallengeCard';
import challengesData from '@/data/challenges.json';

export default function ChallengeFeed() {
  const [filter, setFilter] = useState('All');

  const filteredChallenges = filter === 'All'
    ? challengesData
    : challengesData.filter(challenge => challenge.category === filter);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">🌱 Challenge Feed</h1>

      <div className="mb-6 text-center">
        <label htmlFor="filter" className="font-semibold mr-2">Filter:</label>
        <select
          id="filter"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="border p-2 rounded-md bg-white shadow"
        >
          <option>All</option>
          <option>Plastic</option>
          <option>Transport</option>
          <option>Food</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredChallenges.map((challenge, idx) => (
          <ChallengeCard key={idx} challenge={challenge} />
        ))}
      </div>
    </main>
  );
}
