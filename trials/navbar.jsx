// src/components/Navbar.jsx
import React, { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../context/CartContext";
import { ShoppingCart, Search, User } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import AuthModal from "./AuthModal";
import NigeriaFlag from "../assets/ngn.svg";

const Navbar = () => {
  const { cartCount } = useContext(CartContext);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const menuRef = useRef();
  const searchRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  // Sync search input with URL on load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("category") || "";
    setSearchQuery(q);
  }, [location.search]);

  // Close search or user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setUserMenuOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setFullName(currentUser.displayName || "");
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUserMenuOpen(false);
  };

  const saveSettings = () => {
    alert("Settings saved! (Firestore update coming soon)");
    setActiveTab("profile");
  };

  // Update URL in real-time as user types
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Update URL without page reload
    const params = new URLSearchParams(location.search);
    if (value.trim() === "") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  return (
    <>
      <nav className="flex items-center bg-black text-white justify-between p-4 border-b border-gray-200 relative">
        <Link to="/" className="font-bold text-lg">
          🛍 SHOPWITHCOCHIES
        </Link>

        <div className="flex items-center space-x-4">
          {/* Nigeria currency display */}
          <div className="flex items-center space-x-2">
            <img src={NigeriaFlag} alt="Nigeria Flag" className="w-5 h-5 rounded-sm" />
            <span className="text-sm">NGN</span>
          </div>

          {/* Search Icon */}
          <div className="relative" ref={searchRef}>
            <Search
              className="w-5 h-5 cursor-pointer"
              onClick={() => {
                setSearchOpen((prev) => !prev);
                setUserMenuOpen(false);
              }}
            />
            {searchOpen && (
              <div
                className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg p-2 z-50 flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="flex-1 border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                  autoFocus
                />
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative" ref={menuRef}>
            <User
              className="w-5 h-5 cursor-pointer"
              onClick={() => {
                if (!user) setAuthModalOpen(true);
                else {
                  setUserMenuOpen((prev) => !prev);
                  setSearchOpen(false);
                }
              }}
            />
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg p-4 z-50">
                <div className="flex border-b mb-2">
                  <button
                    className={`flex-1 py-1 ${
                      activeTab === "profile" ? "border-b-2 border-black font-bold" : ""
                    }`}
                    onClick={() => setActiveTab("profile")}
                  >
                    Profile
                  </button>
                  <button
                    className={`flex-1 py-1 ${
                      activeTab === "settings" ? "border-b-2 border-black font-bold" : ""
                    }`}
                    onClick={() => setActiveTab("settings")}
                  >
                    Settings
                  </button>
                </div>

                {activeTab === "profile" && (
                  <div>
                    <p><strong>Name:</strong> {fullName || "No name set"}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Address:</strong> {address || "No address set"}</p>
                    <Link to="/wishlist" className="block mt-2 text-blue-500">
                      My Wishlist
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="mt-4 w-full bg-red-500 text-white py-1 rounded"
                    >
                      Logout
                    </button>
                  </div>
                )}

                {activeTab === "settings" && (
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full border px-2 py-1 mb-2 rounded"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={user.email}
                      disabled
                      className="w-full border px-2 py-1 mb-2 rounded bg-gray-100"
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full border px-2 py-1 mb-2 rounded"
                    />
                    <button
                      onClick={saveSettings}
                      className="w-full bg-green-500 text-white py-1 rounded"
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative cursor-pointer">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white rounded-full text-xs px-1">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};

export default Navbar;
