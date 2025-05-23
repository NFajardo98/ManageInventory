import ProductCard from "@/components/ProductCard";
import { getCollectionDetails } from "@/lib/actions/actions";
import Image from "next/image";
import React from "react";

const CollectionDetails = async ({
  params,
}: {
  params: Promise<{ collectionId: string }>; // Cambia el tipo de `params` a una promesa
}) => {
  const { collectionId } = await params; // Usa `await` para desestructurar `params`

  const collectionDetails = await getCollectionDetails(collectionId);

  return (
    <div className="px-10 py-10 flex flex-col items-center gap-10 bg-gray-50 min-h-screen">
      {/* Imagen de la colección */}
      <Image
        src={collectionDetails.image}
        width={1500}
        height={1000}
        alt="collection"
        className="w-full h-[400px] object-cover rounded-xl shadow-lg"
      />

      {/* Título de la colección */}
      <h1 className="text-heading1-bold text-gray-800">{collectionDetails.title}</h1>

      {/* Descripción de la colección */}
      <p className="text-lg text-gray-600 text-center max-w-[900px] leading-relaxed">
        {collectionDetails.description}
      </p>

      {/* Productos de la colección */}
      <div className="flex flex-wrap gap-8 justify-center">
        {collectionDetails.products.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CollectionDetails;

export const dynamic = "force-dynamic";