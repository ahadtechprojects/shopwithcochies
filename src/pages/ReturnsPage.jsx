// src/pages/ReturnsPage.jsx
import React from "react";

const ReturnsPage = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-6">
      <h1 className="text-4xl font-bold mb-4 text-center">Returns & Refunds</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p>
          Return items within <span className="font-semibold">14 days</span> of delivery for a full refund.
          Items must be in their original packaging and condition.
        </p>
        <p className="mt-3">
          Contact our support team with your order details to initiate a return.
          Refunds are processed within 5-7 business days after we receive the items.
        </p>
      </div>
    </div>
  );
};

export default ReturnsPage;
