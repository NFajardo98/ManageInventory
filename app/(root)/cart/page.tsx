"use client";

import useCart from "@/lib/hooks/useCart";
import { useUser } from "@clerk/nextjs";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type OrderData = {
  products: {
    product: string;
    title: string;
    allergens: string[];
    quantity: number;
  }[];
  totalAmount: number;
  table: number | "";
};

const Cart = () => {
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();

  const [table, setTable] = useState<number | "">(""); // Estado para la mesa seleccionada

  const total = cart.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );
  const totalRounded = parseFloat(total.toFixed(2));

  const customer = {
    clerkId: user?.id,
    email: user?.emailAddresses[0].emailAddress,
    name: user?.fullName,
  };

  const updateUserOrders = async (orderData: OrderData) => {
    try {
      const res = await fetch("/api/users/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        throw new Error("Failed to update user orders");
      }

      console.log("User orders updated successfully");
    } catch (err) {
      console.error("[updateUserOrders_POST]", err);
      alert("There was an error updating your orders. Please try again.");
    }
  };

  const handleCheckout = async () => {
    try {
      if (!user) {
        router.push("sign-in");
        return;
      }

      if (!table) {
        alert("Please select a table for the delivery.");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems: cart.cartItems,
          customer,
          totalAmount: totalRounded,
          table, // Incluimos la mesa seleccionada
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create order");
      }

      const data = await res.json();
      console.log("Order created:", data);

      await updateUserOrders({
        products: cart.cartItems.map((cartItem) => ({
          product: cartItem.item._id,
          title: cartItem.item.title,
          allergens: cartItem.item.allergens || [],
          quantity: cartItem.quantity,
        })),
        totalAmount: totalRounded,
        table, // Incluimos la mesa seleccionada
      });

      cart.clearCart();
      router.push("/");
    } catch (err) {
      console.error("[checkout_POST]", err);
      alert("There was an error processing your order. Please try again.");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-heading2-bold mb-6">Your Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 bg-white border p-6 rounded-lg shadow-lg">
          <h2 className="text-heading3-bold mb-4">Order Summary</h2>
          <hr className="mb-6" />
          {cart.cartItems.length === 0 ? (
            <p className="text-body-bold">No items in your cart.</p>
          ) : (
            <div className="space-y-4">
              {cart.cartItems.map((cartItem) => (
                <div
                  key={cartItem.item._id}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={cartItem.item.media[0]}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                      alt="product"
                    />
                    <div>
                      <p className="text-body-bold">{cartItem.item.title}</p>
                      <p className="text-small-medium text-gray-600">
                        ${cartItem.item.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <MinusCircle
                      className="hover:text-red-500 cursor-pointer"
                      onClick={() => cart.decreaseQuantity(cartItem.item._id)}
                    />
                    <p className="text-body-bold">{cartItem.quantity}</p>
                    <PlusCircle
                      className="hover:text-green-500 cursor-pointer"
                      onClick={() => cart.increaseQuantity(cartItem.item._id)}
                    />
                    <Trash
                      className="hover:text-red-500 cursor-pointer"
                      onClick={() => cart.removeItem(cartItem.item._id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary Section */}
        <div className="bg-white border p-6 rounded-lg shadow-lg">
          <h2 className="text-heading3-bold mb-4">Summary</h2>
          <hr className="mb-6" />
          <div className="flex justify-between text-body-semibold mb-4">
            <span>Total Items</span>
            <span>{cart.cartItems.length}</span>
          </div>
          <div className="flex justify-between text-body-semibold mb-6">
            <span>Total Amount</span>
            <span>${totalRounded}</span>
          </div>
          <div className="mb-6">
            <label htmlFor="table" className="block text-body-semibold mb-2">
              Select Table:
            </label>
            <input
              type="number"
              id="table"
              value={table}
              onChange={(e) => setTable(Number(e.target.value))}
              className="border p-2 rounded w-full"
              placeholder="Enter table number"
              required
            />
          </div>
          <button
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
            onClick={handleCheckout}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;