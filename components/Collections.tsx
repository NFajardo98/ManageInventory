import { getCollections } from "@/lib/actions/actions";
import Image from "next/image";
import Link from "next/link";

const Collections = async () => {
  const collections = await getCollections();

  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="text-heading1-bold">Collections</p>
      {!collections || collections.length === 0 ? (
        <p className="text-body-bold">No collections found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-20">
          {collections.map((collection: CollectionType) => (
            <Link
              href={`/collections/${collection._id}`}
              key={collection._id}
              className="relative group w-[350px] h-[200px] transform transition-transform duration-300 hover:scale-105"
            >
              {/* Imagen */}
              <Image
                src={collection.image}
                alt={collection.title}
                width={350}
                height={200}
                className="w-full h-full object-cover rounded-lg"
              />
              {/* Capa blanca translúcida */}
              <div className="absolute inset-0 bg-white bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-heading2-bold text-black">{collection.title}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collections;