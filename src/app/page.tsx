"use client";

import React, { useState, useEffect } from "react";

const activities = [
  { name: "Biking", co2: 0.1 },
  { name: "Recycling", co2: 0.05 },
  { name: "Public Transport", co2: 0.2 },
];

export default function ActivityLoggerPage() {
  const [activity, setActivity] = useState(activities[0].name);
  const [amount, setAmount] = useState(1);
  const [co2, setCo2] = useState(activities[0].co2);

  useEffect(() => {
    const selected = activities.find((a) => a.name === activity);
    setCo2(selected ? selected.co2 * amount : 0);
  }, [activity, amount]);

  function handleSave() {
    const logs = JSON.parse(localStorage.getItem("greensteps-logs") || "[]");
    logs.push({ activity, amount, co2, date: new Date() });
    localStorage.setItem("greensteps-logs", JSON.stringify(logs));
    alert("Activity saved!");
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-2">Activity Logger</h1>
      <label className="block mb-2">
        Select Activity:
        <select
          className="block w-full border p-2 mt-1"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        >
          {activities.map((a) => (
            <option key={a.name} value={a.name}>{a.name}</option>
          ))}
        </select>
      </label>
      <label className="block mb-2">
        Amount: {amount}
        <input
          type="range"
          min={1}
          max={10}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full"
        />
      </label>
      <div className="my-2">
        <b>Estimated CO₂ Saved:</b> {co2.toFixed(2)} kg
      </div>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={handleSave}
      >
        Save Activity
      </button>
    </div>
  );
}
