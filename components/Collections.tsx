import { getCollections } from "@/lib/actions/actions";
import Image from "next/image";
import Link from "next/link";

const Collections = async () => {
  const collections = await getCollections();

  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      {!collections || collections.length === 0 ? (
        <p className="text-lg font-semibold text-gray-600">No dishes available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {collections.map((collection: CollectionType) => (
            <Link
              href={`/collections/${collection._id}`}
              key={collection._id}
              className="relative group w-full h-[250px] transform transition-transform duration-300 hover:scale-105"
            >
              {/* Imagen */}
              <Image
                src={collection.image}
                alt={collection.title}
                width={400}
                height={250}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
              {/* Capa blanca translúcida */}
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-2xl font-bold text-white">{collection.title}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collections;