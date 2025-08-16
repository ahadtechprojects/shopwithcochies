// src/pages/ShippingPage.jsx
import React from "react";

const ShippingPage = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-6">
      <h1 className="text-4xl font-bold mb-4 text-center">Shipping Information</h1>
      <div className="bg-white shadow rounded-lg p-6 space-y-3">
        <p>
          We offer fast and reliable shipping within Nigeria. Delivery usually takes 2-7 business days depending on your location.
        </p>
        <p>
          Shipping fees are calculated at checkout based on the delivery address and order size.
        </p>
        <p>
          Once shipped, you will receive a tracking number to monitor your order.
        </p>
      </div>
    </div>
  );
};

export default ShippingPage;
