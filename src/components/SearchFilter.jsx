// src/components/SearchFilter.jsx
import React, { useEffect, useMemo, useState } from "react";
import products from "../data/products";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function SearchFilter({ compact = false, onClose }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchCat = category === "All" || p.category === category;
      const matchQ = !q || p.name.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, category]);

  useEffect(() => {
    if (compact && onClose) {
      // close when clicking outside would be ideal — omitted for brevity
    }
  }, [compact, onClose]);

  const handleGo = (id) => {
    if (onClose) onClose();
    navigate(`/product/${id}`);
  };

  return (
    <div
      className={`bg-white border border-black p-3 ${compact ? "rounded" : "rounded"} `}
    >
      <div className="flex items-center gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="flex-1 border border-black px-3 py-2"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-black px-2 py-2"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            if (results.length > 0) navigate(`/product/${results[0].id}`);
            if (onClose) onClose();
          }}
          className="border border-black px-3 py-2"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* Quick results (small list) */}
      {query && results.length > 0 && (
        <div className="mt-2 border-t border-black pt-2 max-h-48 overflow-auto">
          {results.slice(0, 6).map((r) => (
            <div
              key={r.id}
              className="py-2 flex items-center justify-between cursor-pointer hover:bg-gray-100 px-2"
              onClick={() => handleGo(r.id)}
            >
              <div className="text-sm">{r.name}</div>
              <div className="text-xs text-gray-600">{r.category}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
