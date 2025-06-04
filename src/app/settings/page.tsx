// 'use client';

// import { useState, useEffect } from 'react';
// import { Switch } from '@/app/components/ui/switch';


// export default function SettingsPage() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [notificationsEnabled, setNotificationsEnabled] = useState(true);
//   const [profile, setProfile] = useState({
//     name: 'John Doe',
//     email: 'johndoe@example.com',
//   });

//   // Toggle dark mode class
//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [darkMode]);

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Settings</h1>

//       {/* Profile Info */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Profile</h2>
//         <div className="space-y-4">
//           <div>
//             <label className="block font-medium">Name</label>
//             <input
//               type="text"
//               value={profile.name}
//               onChange={(e) => setProfile({ ...profile, name: e.target.value })}
//               className="w-full border p-2 rounded"
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Email</label>
//             <input
//               type="email"
//               value={profile.email}
//               onChange={(e) =>
//                 setProfile({ ...profile, email: e.target.value })
//               }
//               className="w-full border p-2 rounded"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Toggles */}
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Preferences</h2>

//         <div className="flex items-center justify-between mb-4">
//           <span>Enable Notifications</span>
//           <Switch
//             checked={notificationsEnabled}
//             onCheckedChange={setNotificationsEnabled}
//           />
//         </div>

//         <div className="flex items-center justify-between">
//           <span>Dark Mode</span>
//           <Switch checked={darkMode} onCheckedChange={setDarkMode} />
//         </div>
//       </div>

//       <button
//         onClick={() =>
//           alert(
//             `Saved: ${profile.name}, ${profile.email}, Notifications: ${notificationsEnabled}, Dark Mode: ${darkMode}`
//           )
//         }
//         className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
//       >
//         Save Settings
//       </button>
//     </div>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { Switch } from '@/app/components/ui/switch';
import { useTheme } from '../context/ThemeContext';
import Link from 'next/link';

type NotificationKeys = 'ecoTips' | 'challengeAlerts' | 'weeklySummary';
type AppSettingKeys = 'darkMode' | 'autoSyncData' | 'shareStatistics';

type Notifications = {
  [key in NotificationKeys]: boolean;
};

type AppSettings = {
  [key in AppSettingKeys]: boolean;
};

export default function SettingsPage() {
  const { isDark, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState<Notifications>({
    ecoTips: true,
    challengeAlerts: true,
    weeklySummary: false,
  });
  const [appSettings, setAppSettings] = useState<AppSettings>({
    darkMode: isDark,
    autoSyncData: false,
    shareStatistics: true,
  });

  useEffect(() => {
    setAppSettings((prev) => ({ ...prev, darkMode: isDark }));
  }, [isDark]);

  // Overload signatures for handleToggle
  function handleToggle(category: 'notifications', key: NotificationKeys): void;
  function handleToggle(category: 'appSettings', key: AppSettingKeys): void;

  // Implementation
  function handleToggle(category: 'notifications' | 'appSettings', key: NotificationKeys | AppSettingKeys) {
    if (category === 'notifications') {
      setNotifications((prev) => ({ ...prev, [key as NotificationKeys]: !prev[key as NotificationKeys] }));
    } else if (category === 'appSettings') {
      setAppSettings((prev) => ({ ...prev, [key as AppSettingKeys]: !prev[key as AppSettingKeys] }));
      if (key === 'darkMode') toggleTheme();
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white p-6">
      <main className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Settings</h1>
          <Switch
            checked={appSettings.darkMode}
            onCheckedChange={() => handleToggle('appSettings', 'darkMode')}
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Notification Preferences</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Eco Tips</span>
              <Switch
                checked={notifications.ecoTips}
                onCheckedChange={() => handleToggle('notifications', 'ecoTips')}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Challenge Alerts</span>
              <Switch
                checked={notifications.challengeAlerts}
                onCheckedChange={() => handleToggle('notifications', 'challengeAlerts')}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Weekly Summary</span>
              <Switch
                checked={notifications.weeklySummary}
                onCheckedChange={() => handleToggle('notifications', 'weeklySummary')}
              />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">App Settings</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Dark Mode</span>
              <Switch
                checked={appSettings.darkMode}
                onCheckedChange={() => handleToggle('appSettings', 'darkMode')}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Auto-sync Data</span>
              <Switch
                checked={appSettings.autoSyncData}
                onCheckedChange={() => handleToggle('appSettings', 'autoSyncData')}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Share Statistics</span>
              <Switch
                checked={appSettings.shareStatistics}
                onCheckedChange={() => handleToggle('appSettings', 'shareStatistics')}
              />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Privacy & Data</h2>
          <div className="space-y-2">
            <Link href="/privacy-policy" className="block p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="block p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              Terms of Service
            </Link>
            <button className="w-full text-left p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500">
              Reset All Data
            </button>
          </div>
        </div>
        <button className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
          Logout
        </button>
      </main>
    </div>
  );
}