"use client";

import React, { useState } from "react";

const tips = [
  { id: 1, region: "Ontario", title: "Use Public Transit", detail: "Ontario's GO Transit covers most major cities!" },
  { id: 2, region: "BC", title: "Compost Food Waste", detail: "BC has municipal composting in most cities." },
  { id: 3, region: "Quebec", title: "Hydro Power", detail: "Quebec's electricity is 99% renewable!" },
];

const regions = ["All", "Ontario", "BC", "Quebec"];

export default function InfoTipsPage() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [region, setRegion] = useState("All");

  const filteredTips = region === "All" ? tips : tips.filter(t => t.region === region);

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Eco Tips</h1>
      <label>
        Filter by Region:{" "}
        <select value={region} onChange={e => setRegion(e.target.value)} className="border p-1">
          {regions.map(r => <option key={r}>{r}</option>)}
        </select>
      </label>
      <div className="mt-4">
        {filteredTips.map(tip => (
          <div key={tip.id} className="mb-2 border rounded">
            <button
              className="w-full text-left p-2 bg-gray-100 hover:bg-gray-200 font-semibold"
              onClick={() => setOpenId(openId === tip.id ? null : tip.id)}
            >
              {tip.title} <span className="text-xs text-gray-500">({tip.region})</span>
            </button>
            {openId === tip.id && (
              <div className="p-2 bg-white">{tip.detail}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
