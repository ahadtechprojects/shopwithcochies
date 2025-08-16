// src/pages/UserOrdersPage.jsx
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { PackageOpen } from "lucide-react"; // nice empty state icon
import { motion } from "framer-motion"; // for fade-in animation

const UserOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!auth.currentUser) return;

      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", auth.currentUser.uid),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        setOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading orders...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <motion.div
          className="flex flex-col items-center justify-center h-[70vh] text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <PackageOpen size={80} className="text-gray-400 mb-4" />
          </motion.div>
          <h2 className="text-xl font-semibold text-gray-700">No orders yet</h2>
          <p className="text-gray-500 mt-2">Looks like you haven’t made any purchase yet.</p>
          <Link
            to="/"
            className="mt-6 px-6 py-2 bg-black text-white rounded-lg shadow hover:bg-gray-800 transition"
          >
            Start Shopping
          </Link>
        </motion.div>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="border p-4 rounded mb-4 shadow-sm bg-white hover:shadow-md transition"
          >
            <p className="font-semibold">Order Number: {order.orderNumber}</p>
            <p className="text-gray-500 text-sm">
              {order.createdAt?.toDate?.()?.toLocaleString() || "Date unavailable"}
            </p>
            <div className="mt-2">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between text-sm border-b py-1"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <p className="mt-2 font-semibold">
              Total: ₦{order.subtotal?.toLocaleString()}
            </p>
            <Link
              to={`/orders/${order.id}`}
              className="text-blue-600 hover:underline text-sm"
            >
              View Details →
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default UserOrdersPage;
