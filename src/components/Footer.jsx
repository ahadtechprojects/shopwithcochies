// src/components/Footer.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, Send } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Footer = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Email + Phone validation
  const isValidInput = (value) => {
    const phoneRegex = /^[0-9]{11}$/; // exactly 11 digits
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.(com|org|net|edu|gov|co|io|ai|ng|uk|us|ca|de|fr|au|in|biz|info)$/i;

    return phoneRegex.test(value) || emailRegex.test(value);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error("Please enter your phone number or email.");
      return;
    }

    if (!isValidInput(input.trim())) {
      toast.error("Enter a valid 11-digit phone number or email address.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "subscribers"), {
        contact: input.trim(),
        createdAt: serverTimestamp(),
      });
      toast.success("Subscribed successfully 🎉");
      setInput("");
    } catch (error) {
      console.error("Error saving subscriber:", error);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-black text-gray-300 pt-10 pb-6 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* About */}
        <div>
          <h2 className="text-white font-bold text-lg mb-3">SHOPWITHCOCHIES</h2>
          <p className="text-sm leading-relaxed">
            Your one-stop shop for fashion, electronics, and more.  
            We deliver quality products at the best prices, straight to your doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-white font-bold text-lg mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop" className="hover:text-white">Shop</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
            <li><Link to="/orders" className="hover:text-white">My Orders</Link></li>
            <li><Link to="/wishlist" className="hover:text-white">Wishlist</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h2 className="text-white font-bold text-lg mb-3">Customer Service</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link to="/returns" className="hover:text-white">Returns & Refunds</Link></li>
            <li><Link to="/shipping" className="hover:text-white">Shipping Info</Link></li>
            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-white font-bold text-lg mb-3">Stay Updated</h2>
          <p className="text-sm mb-3">
            Enter your phone or email to get notified when new items are added.
          </p>
          <form
            onSubmit={handleSubscribe}
            className="relative w-full"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Phone or Email"
              className="w-full pr-12 pl-3 py-2 text-sm text-black rounded-lg outline-none"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 p-2 rounded-md disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-6"></div>

      {/* Bottom Row */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm space-y-4 md:space-y-0">
        <p>&copy; {new Date().getFullYear()} SHOPWITHCOCHIES. All rights reserved.</p>
        
        {/* Contact + Socials */}
        <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span>+234 907 253 0925</span>
          </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span>swcsupport@gmail.com</span>
          </div>
          <div className="flex space-x-3 ml-4">
            <a href="#" className="hover:text-white"><FaFacebookF className="w-5 h-5 text-blue-500 hover:text-blue-800" /></a>
            <a href="#" className="hover:text-white"><FaInstagram className="w-5 h-5 text-red-500 hover:text-red-800" /></a>
            <a href="#" className="hover:text-white"><FaTelegramPlane className="w-5 h-5 text-blue-500 hover:text-blue-800" /></a>
            <a href="#" className="hover:text-white"><FaWhatsapp className="w-5 h-5 text-green-500 hover:text-green-800" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
