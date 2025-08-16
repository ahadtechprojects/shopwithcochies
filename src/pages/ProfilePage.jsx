// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState({ name: "", address: "" });
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("userData", JSON.stringify(user));
    setEditable(false);
    alert("Profile updated!");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <input
        type="text"
        value={user.name}
        disabled={!editable}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        className="border px-3 py-2 rounded w-full mb-3"
        placeholder="Name"
      />
      <input
        type="text"
        value={user.address}
        disabled={!editable}
        onChange={(e) => setUser({ ...user, address: e.target.value })}
        className="border px-3 py-2 rounded w-full mb-3"
        placeholder="Address"
      />

      {!editable ? (
        <button
          onClick={() => setEditable(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Edit Profile
        </button>
      ) : (
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      )}
    </div>
  );
};

export default ProfilePage;
