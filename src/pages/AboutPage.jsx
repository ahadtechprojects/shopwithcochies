// src/pages/AboutPage.jsx
import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">About ShopWithCochies</h1>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-gray-700 mb-4">
            Welcome to <span className="font-semibold">ShopWithCochies</span>, your one-stop shop for fashion, electronics, and more.
            We deliver quality products at competitive prices, right to your doorstep.
          </p>
          <p className="text-gray-700 mb-4">
            Our mission is to make online shopping seamless and enjoyable, offering top-notch products and exceptional customer service.
          </p>
          <p className="text-gray-700">
            Explore our collections, discover amazing deals, and experience shopping like never before!
          </p>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1600185366175-1a17a7c179d6?auto=format&fit=crop&w=800&q=80"
            alt="E-commerce"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
