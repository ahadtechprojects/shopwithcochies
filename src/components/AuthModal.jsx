// src/components/AuthModal.jsx
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const AuthModal = ({ isOpen, onClose, redirectTo }) => {
  const [activeTab, setActiveTab] = useState("login"); // login | signup
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
      if (redirectTo) navigate(redirectTo, { replace: true });
      toast.success("Logged in successfully!");
    } catch (err) {
      toast.error("Login failed");
    }
    setLoading(false);
  };

  const handleSignup = async () => {
    if (!fullName.trim()) {
      toast.warning("Full name is required");
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: fullName });
      onClose();
      if (redirectTo) navigate(redirectTo, { replace: true });
      toast.success("Account created successfully!");
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white w-96 p-6 rounded-lg shadow-lg relative"
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={onClose}
            >
              ✕
            </button>

            {/* Tabs */}
            <div className="flex border-b mb-4">
              <button
                className={`flex-1 py-2 ${
                  activeTab === "login"
                    ? "border-b-2 border-black font-bold"
                    : ""
                }`}
                onClick={() => setActiveTab("login")}
              >
                Login
              </button>
              <button
                className={`flex-1 py-2 ${
                  activeTab === "signup"
                    ? "border-b-2 border-black font-bold"
                    : ""
                }`}
                onClick={() => setActiveTab("signup")}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            {activeTab === "signup" && (
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border px-3 py-2 mb-3 rounded"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 mb-3 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 mb-3 rounded"
            />

            <button
              onClick={activeTab === "login" ? handleLogin : handleSignup}
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            >
              {loading
                ? "Please wait..."
                : activeTab === "login"
                ? "Login"
                : "Sign Up"}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
