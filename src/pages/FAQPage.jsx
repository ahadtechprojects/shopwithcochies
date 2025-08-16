// src/pages/FAQPage.jsx
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    question: "How do I track my order?",
    answer: "You can track your order from your account dashboard under 'My Orders'."
  },
  {
    question: "What is your return policy?",
    answer: "Items can be returned within 14 days in original condition."
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently, we only ship within Nigeria."
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-4 py-3 bg-gray-100 flex justify-between items-center hover:bg-gray-200 focus:outline-none"
            >
              <span className="font-medium">{item.question}</span>
              {openIndex === index ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openIndex === index && (
              <div className="px-4 py-3 text-gray-700 bg-white">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
