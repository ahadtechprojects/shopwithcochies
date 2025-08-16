import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const docRef = doc(db, "orders", orderId);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setOrder({ id: snapshot.id, ...snapshot.data() });
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <p className="text-gray-500">Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <p className="font-semibold">Order Number: {order.orderNumber}</p>
      <p className="text-gray-500 text-sm mb-4">
        {order.createdAt?.toDate?.()?.toLocaleString() || "Date unavailable"}
      </p>

      <div className="border rounded p-4 mb-4 bg-white">
        {order.items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between text-sm border-b py-1"
          >
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>₦{(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
        <p className="mt-2 font-semibold">
          Total: ₦{order.subtotal?.toLocaleString()}
        </p>
      </div>

      <Link
        to="/orders"
        className="text-blue-600 hover:underline text-sm font-medium"
      >
        ← Back to Orders
      </Link>
    </div>
  );
};

export default OrderDetailsPage;
