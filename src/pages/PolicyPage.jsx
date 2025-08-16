// src/pages/PolicyPage.jsx
import React from "react";

const PolicyPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      <h1 className="text-4xl font-bold text-center mb-6">Privacy Policy & Terms</h1>

      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-3">Privacy Policy</h2>
        <p className="text-gray-700 mb-2">
          We respect your privacy and protect your personal data. Information collected is used to improve your shopping experience.
        </p>
        <p className="text-gray-700">
          We do not share personal information with third parties except for shipping and payment purposes.
        </p>
      </section>

      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-3">Terms & Conditions</h2>
        <p className="text-gray-700 mb-2">
          By using ShopWithCochies, you agree to comply with our terms of service.  
          All sales are subject to product availability and pricing.
        </p>
        <p className="text-gray-700">
          We reserve the right to update our policies and terms at any time without prior notice.
        </p>
      </section>
    </div>
  );
};

export default PolicyPage;
