"use client";

import React, { useState, useEffect } from "react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("greensteps-darkmode");
    if (stored) setDarkMode(stored === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("greensteps-darkmode", darkMode.toString());
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Profile</h2>
        <div className="bg-white p-3 rounded shadow">
          <div><b>Name:</b> Jane Doe</div>
          <div><b>Email:</b> jane@example.com</div>
        </div>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Preferences</h2>
        <div className="flex items-center gap-2 mb-2">
          <label>Dark Mode</label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={e => setDarkMode(e.target.checked)}
          />
        </div>
        <div className="flex items-center gap-2">
          <label>Notifications</label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={e => setNotifications(e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
}
