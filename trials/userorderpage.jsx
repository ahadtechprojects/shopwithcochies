// src/pages/UserOrdersPage.jsx
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";

const UserOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchOrders(currentUser.uid);
      } else {
        setOrders([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchOrders = async (userId) => {
    try {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const fetchedOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center">
        <p className="text-gray-500 animate-pulse">Loading your orders...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center">
        <p className="text-gray-500">
          Please log in to view your orders.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-500">
          You have not placed any orders yet.
        </p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="border p-4 rounded-lg mb-4 shadow-sm bg-white"
          >
            <p className="font-semibold text-lg text-green-700">
              Order Number: {order.orderNumber}
            </p>
            <p className="text-gray-500 text-sm">
              {order.createdAt?.toDate
                ? order.createdAt.toDate().toLocaleString()
                : "Date unavailable"}
            </p>

            <div className="mt-3">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between text-sm border-b py-1"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-3 font-semibold text-right">
              Total: ₦{order.subtotal?.toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default UserOrdersPage;
