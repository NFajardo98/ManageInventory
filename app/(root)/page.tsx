import Collections from "@/components/Collections";
import ProductList from "@/components/ProductList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Sección de colecciones */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl text-heading3-bold text-gray-800 text-center mb-8">Menu</h1>
          <Collections />
        </div>
      </section>

    </div>
  );
}

export const dynamic = "force-dynamic";