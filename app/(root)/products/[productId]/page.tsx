import Gallery from "@/components/Gallery";
import ProductCard from "@/components/ProductCard";
import ProductInfo from "@/components/ProductInfo";
import { getProductDetails, getRelatedProducts } from "@/lib/actions/actions";
import Link from "next/link"; // Importamos Link de Next.js

const ProductDetails = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const { productId } = await params; // Usa `await` para desestructurar `params`

  const productDetails = await getProductDetails(productId);
  const relatedProducts = await getRelatedProducts(productId);

  return (
    <>
      <div className="flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
        <Gallery productMedia={productDetails.media} />
        <ProductInfo productInfo={productDetails} />
      </div>

      {/* Productos relacionados */}
      {relatedProducts?.length > 0 && (
        <div className="max-w-6xl mx-auto mt-10">
          <h2 className="text-heading2-bold text-gray-800 mb-6">
            Also in {productDetails.collections[0]?.title}
          </h2>
          <div className="grid grid-cols-4 gap-6 max-md:grid-cols-2">
            {relatedProducts.map((product: any) => (
              <Link
                key={product._id}
                href={`/products/${product._id}`} // Enlace a la página del producto
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={product.media[0]}
                  alt={product.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export const dynamic = "force-dynamic";

export default ProductDetails;