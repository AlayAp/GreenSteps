"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { FaBicycle, FaLeaf, FaTint, FaSolarPanel, FaBus, FaUtensils } from "react-icons/fa";

type User = {
  id: number;
  name: string;
  currentStreak: number;
  bestStreak: number;
  totalCO2: number;
  dailyAverage: number;
  dailyChange: number;
  achievements: { icon: string; label: string }[];
  totalChallengesCompleted: number;
};
type Challenge = {
  id: number;
  icon: string;
  title: string;
  desc: string;
  daysCompleted: number;
  totalDays: number;
  status: string;
};

const iconMap: Record<string, React.JSX.Element> = {
  bicycle: <FaBicycle className="text-green-500 text-2xl" />,
  leaf: <FaLeaf className="text-green-500 text-2xl" />,
  tint: <FaTint className="text-blue-400 text-2xl" />,
  solar: <FaSolarPanel className="text-yellow-400 text-2xl" />,
  bus: <FaBus className="text-blue-500 text-xl" />,
  utensils: <FaUtensils className="text-green-500 text-xl" />,
};

const challengeTabs = ["All", "Ongoing", "Completed"];

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selectedTab, setSelectedTab] = useState("All");

  // Set your current user id here (could be from auth/session in a real app)
  const currentUserId = 1;

  useEffect(() => {
    fetch("/data/user.json")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setUsers(data);
      });
    fetch("/data/challenges.json")
      .then((res) => res.json())
      .then(setChallenges);
  }, []);

  const user = users.find(u => u.id === currentUserId);

  if (!user || challenges.length === 0) {
    return <div className="p-8 text-center text-gray-400">Loading...</div>;
  }

  const filteredChallenges =
    selectedTab === "All"
      ? challenges
      : challenges.filter((c) => c.status === selectedTab);

  return (
    <div
      className="
        max-w-4xl mx-auto p-6 min-h-screen min-w-screen
        bg-[url('/abstract-blur-green-nature.jpg')]
        bg-cover
        bg-center
        bg-no-repeat
      "
    >
      <div className="max-w-4xl mx-auto p-6 min-h-screen">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-right">
            <div className="text-gray-500 text-sm mb-1">Current Streak</div>
            <div className="text-3xl font-bold text-green-600">{user.currentStreak} Days</div>
            <div className="text-xs text-gray-400">Best: {user.bestStreak} days</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-right">
            <div className="text-gray-500 text-sm mb-1">Total CO₂ Saved</div>
            <div className="text-3xl font-bold text-green-600">{user.totalCO2} kg</div>
            <div className="text-xs text-gray-400">This month</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-right">
            <div className="text-gray-500 text-sm mb-1">Daily Average</div>
            <div className="text-3xl font-bold text-green-600">{user.dailyAverage} kg</div>
            <div className="text-xs text-gray-400">
              {user.dailyChange > 0 ? "+" : ""}
              {user.dailyChange}% vs last week
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div>
          <div className="font-semibold text-lg text-black mb-2">Your Achievements</div>
          <div className="flex gap-4 mb-8">
            {user.achievements.map((a, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow flex flex-col items-center px-4 py-3 min-w-[100px]"
              >
                {iconMap[a.icon]}
                <div className="text-xs text-gray-700 mt-2">{a.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Challenges */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold text-black text-lg">Weekly Challenges</div>
            <div className="flex gap-2">
              {challengeTabs.map((tab) => (
                <button
                  key={tab}
                  className={clsx(
                    "px-3 py-1 rounded text-sm font-medium",
                    selectedTab === tab
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-black  hover:bg-gray-200"
                  )}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {filteredChallenges.map((c) => (
              <div key={c.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center gap-3 mb-1">
                  {iconMap[c.icon]}
                  <div className="font-semibold">{c.title}</div>
                  <span
                    className={clsx(
                      "ml-auto px-2 py-0.5 rounded text-xs font-semibold",
                      c.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    )}
                  >
                    {c.status}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mb-2">{c.desc}</div>
                <div className="w-full bg-gray-100 h-2 rounded mb-2">
                  <div
                    className={clsx(
                      "h-2 rounded",
                      c.status === "Completed" ? "bg-green-600" : "bg-blue-500"
                    )}
                    style={{
                      width: `${(c.daysCompleted / c.totalDays) * 100}%`,
                    }}
                  />
                </div>
                <div className="text-xs text-gray-600">
                  {c.daysCompleted}/{c.totalDays} days completed
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-4">
         <Link
          href="/community"
          className="flex-1 bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition text-center"
>
            Compare with Community
            </Link>
         

        {/* change code in future to remove the data or reset the data rn it just show popup */}

          <button
            className="flex-1 bg-gray-100 text-gray-700 py-2 rounded font-semibold hover:bg-gray-200 transition"
            onClick={() => alert("Your data has been reset!")}
          >
            Reset Data
          </button>
        
        
        
        
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-xs text-gray-500 border-t pt-3">
          <div>
            Total Challenges: {user.totalChallengesCompleted} completed this week
          </div>
          <Link href="/challenge-feed" className="text-green-700 hover:underline">
            View All Challenges
          </Link>
        </div>
      </div>
    </div>
  );
}
