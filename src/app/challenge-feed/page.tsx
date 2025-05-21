"use client";

import React, { useState, } from "react";

// Mock challenge data (replace with fetch from /data/challenges.json if needed)
const mockChallenges = [
  { id: 1, title: "No Plastic Week", category: "Plastic", joined: false, completed: false },
  { id: 2, title: "Bike to Work", category: "Transport", joined: false, completed: false },
  { id: 3, title: "Meatless Monday", category: "Food", joined: false, completed: false },
];

const categories = ["All", "Plastic", "Transport", "Food"];

export default function ChallengeFeedPage() {
  const [challenges, setChallenges] = useState(mockChallenges);
  const [filter, setFilter] = useState("All");

  function handleJoin(id: number) {
    setChallenges((chals) =>
      chals.map((c) =>
        c.id === id ? { ...c, joined: true } : c
      )
    );
  }

  function handleComplete(id: number) {
    setChallenges((chals) =>
      chals.map((c) =>
        c.id === id ? { ...c, completed: true } : c
      )
    );
  }

  const filtered = filter === "All"
    ? challenges
    : challenges.filter((c) => c.category === filter);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Challenge Feed</h1>
      <div className="mb-4">
        <label>
          Filter by Category:{" "}
          <select value={filter} onChange={e => setFilter(e.target.value)} className="border p-1">
            {categories.map(cat => <option key={cat}>{cat}</option>)}
          </select>
        </label>
      </div>
      <div className="grid gap-4">
        {filtered.map((c) => (
          <div key={c.id} className="p-4 border rounded shadow bg-white flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-bold">{c.title}</h2>
              <div className="text-sm text-gray-500">{c.category}</div>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              {!c.joined && (
                <button className="bg-blue-600 text-white px-2 py-1 rounded" onClick={() => handleJoin(c.id)}>
                  Join
                </button>
              )}
              {c.joined && !c.completed && (
                <button className="bg-green-600 text-white px-2 py-1 rounded" onClick={() => handleComplete(c.id)}>
                  Complete
                </button>
              )}
              {c.completed && <span className="text-green-700 font-bold">Completed!</span>}
              {c.joined && !c.completed && <span className="text-blue-700 font-bold">Joined</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
