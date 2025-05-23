"use client";

import Loader from "@/components/Loader";
import OrderCard from "@/components/OrderCard";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const Orders = () => {
  const { user } = useUser();

  const [loading, setLoading] = useState(true);
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const [orders, setOrders] = useState<OrderType[]>([]);

  const getUser = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setSignedInUser(data);
      setLoading(false);
    } catch (err) {
      console.log("[users_GET]", err);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const getUserOrders = async () => {
    setLoading(true);

    if (!signedInUser) return;

    try {
      const res = await fetch("/api/users/orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.log("[orders_GET]", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (signedInUser) {
      getUserOrders();
    }
  }, [signedInUser]);

  return loading ? (
    <Loader />
  ) : (
    <div className="p-10">
      <h1 className="text-heading2-bold mb-6">Your Orders</h1>
      <div className="bg-white border p-6 rounded-lg shadow-lg">
        {orders.length === 0 ? (
          <p className="text-body-bold">No orders found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Orders;