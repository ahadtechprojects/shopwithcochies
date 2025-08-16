// src/components/LoadingSpinner.jsx
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Spinning circle */}
        <div className="absolute w-full h-full border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        
        {/* Text inside */}
        <span className="text-center text-sm font-bold tracking-wider text-gray-800">
          SHOPWITHCOCHIES
        </span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
