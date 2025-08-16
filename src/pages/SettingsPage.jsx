// src/pages/SettingsPage.jsx
import React, { useState, useEffect } from "react";

const SettingsPage = () => {
  const [settings, setSettings] = useState({ name: "", address: "" });

  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) {
      setSettings(JSON.parse(stored));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("userData", JSON.stringify(settings));
    alert("Settings updated!");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <input
        type="text"
        value={settings.name}
        onChange={(e) => setSettings({ ...settings, name: e.target.value })}
        className="border px-3 py-2 rounded w-full mb-3"
        placeholder="Name"
      />
      <input
        type="text"
        value={settings.address}
        onChange={(e) => setSettings({ ...settings, address: e.target.value })}
        className="border px-3 py-2 rounded w-full mb-3"
        placeholder="Address"
      />
      <button
        onClick={handleSave}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Save Settings
      </button>
    </div>
  );
};

export default SettingsPage;
