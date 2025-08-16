// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Header";
import Footer from "./components/Footer";
import ShopPage from "./pages/ShopPage";
import ProductDetailsPage from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import CheckOutPage from "./pages/CheckOutPage";
import PaymentPage from "./pages/PaymentPage";
import ThankYouPage from "./pages/ThankYouPage";
import WishlistPage from "./pages/WishlistPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import UserOrdersPage from "./pages/UserOrderPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import AuthRoute from "./components/AuthRoute";
import LoadingSpinner from "./components/LoadingSpinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Footer Route
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import ReturnsPage from "./pages/ReturnsPage";
import ShippingPage from "./pages/ShippingPage";
import PolicyPage from "./pages/PolicyPage";

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 3 seconds
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (loading) {
    return <LoadingSpinner />; // Navbar won't show while loading
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/checkout"
          element={
            <AuthRoute>
              <CheckOutPage />
            </AuthRoute>
          }
        />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/orders" element={<UserOrdersPage />} />
        <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
        // Footer Routes
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/returns" element={<ReturnsPage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/privacy" element={<PolicyPage />} />
        <Route
          path="*"
          element={<div className="text-center p-6">Page not found</div>}
        />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <AppContent />
             <ToastContainer 
            position="top-right"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            theme="dark"
          />
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
