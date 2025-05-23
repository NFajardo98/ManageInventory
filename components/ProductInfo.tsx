"use client";

import { useState } from "react";
import HeartFavorite from "./HeartFavorite";
import { MinusCircle, PlusCircle } from "lucide-react";

import useCart from "@/lib/hooks/useCart";

const ProductInfo = ({ productInfo }: { productInfo: ProductType }) => {
  const [quantity, setQuantity] = useState<number>(1);

  const cart = useCart();

  return (
    <div className="max-w-[400px] flex flex-col gap-6 p-6 bg-white shadow-lg rounded-lg">
      {/* Título y Favorito */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">{productInfo.title}</h1>
        <HeartFavorite product={productInfo} />
      </div>

      {/* Precio */}
      <p className="text-xl font-semibold text-green-600">$ {productInfo.price.toFixed(2)}</p>

      {/* Descripción */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-700 border-b pb-1">
          Description:
        </h2>
        <p className="text-gray-600 leading-relaxed">{productInfo.description}</p>
      </div>

      {/* Alergias */}
      {productInfo.allergens.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-1">
            Allergens:
          </h2>
          <div className="flex flex-wrap gap-2">
            {productInfo.allergens.map((allergen, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-medium"
              >
                {allergen}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Cantidad */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-700 border-b pb-1">
          Quantity:
        </h2>
        <div className="flex items-center gap-4">
          <MinusCircle
            className="w-6 h-6 text-gray-600 hover:text-red-500 cursor-pointer"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          />
          <p className="text-lg font-semibold text-gray-800">{quantity}</p>
          <PlusCircle
            className="w-6 h-6 text-gray-600 hover:text-green-500 cursor-pointer"
            onClick={() => setQuantity(quantity + 1)}
          />
        </div>
      </div>

      {/* Botón Agregar al Carrito */}
      <button
        className="w-full bg-green-600 text-white text-lg font-semibold py-3 rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-300"
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