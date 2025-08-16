// src/components/PageLoader.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const PageLoader = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2000); // 3 seconds
    return () => clearTimeout(timer);
  }, [location]); // runs every time route changes

  if (loading) {
    return <LoadingSpinner />;
  }

  return children;
};

export default PageLoader;
