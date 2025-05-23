import React from "react";

const OrderCard = ({ order }: { order: OrderType }) => {
  return (
    <div className="border p-4 rounded shadow-md w-80 bg-white">
      <p className="text-gray-700 mb-2">Total Amount: <span className="font-bold">${order.totalAmount}</span></p>
      <p className="text-gray-700 mb-2">Products:</p>
      <ul className="list-disc pl-5">
        {order.products.map((item, index) => (
          <li key={item._id || index} className="mb-1">
            <span className="font-semibold">{item.title}</span> 
            <span className="text-gray-600"> (Allergens: {item.allergens.join(", ")})</span>
            <span className="block text-sm text-gray-500">Quantity: {item.quantity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderCard;