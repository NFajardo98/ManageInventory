"use client";

import { useState } from "react";
import HeartFavorite from "./HeartFavorite";
import { MinusCircle, PlusCircle } from "lucide-react";

import useCart from "@/lib/hooks/useCart";

const ProductInfo = ({ productInfo }: { productInfo: ProductType }) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    productInfo.allergens[0]
  );

  const [quantity, setQuantity] = useState<number>(1);

  const cart = useCart();

  return (
    <div className="max-w-[400px] flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-heading3-bold">{productInfo.title}</p>
        <HeartFavorite product={productInfo} />
      </div>

      <p className="text-heading3-bold">$ {productInfo.price}</p>

      <div className="flex flex-col gap-2">
        <p className="text-lg font-semibold text-gray-700 border-b-2 border-gray-300 pb-1">Description:</p>
        <p className="text-small-medium">{productInfo.description}</p>
      </div>

      {productInfo.allergens.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold text-gray-700 border-b-2 border-gray-300 pb-1">Allergens:</p>
            <div className="flex gap-2">
              {productInfo.allergens.map((allergen, index) => (
                <p
                  key={index}
                  className="border border-black px-2 py-1 rounded-lg bg-black text-white"
                >
                  {allergen}
                </p>
              ))}
            </div>
          </div>
      )}

      <div className="flex flex-col gap-2">
        <p className="text-lg font-semibold text-gray-700 border-b-2 border-gray-300 pb-1">Quantity:</p>
        <div className="flex gap-4 items-center">
          <MinusCircle
            className="hover:text-red-1 cursor-pointer"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          />
          <p className="text-body-bold">{quantity}</p>
          <PlusCircle
            className="hover:text-red-1 cursor-pointer"
            onClick={() => setQuantity(quantity + 1)}
          />
        </div>
      </div>

      <button
        className="w-full bg-green-600 text-white text-lg font-semibold py-4 rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-300"
        onClick={() => {
          cart.addItem({
            item: productInfo,
            quantity,
          });
        }}
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductInfo;
