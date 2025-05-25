"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserRound, Menu, ShoppingCart, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import  useCart from "@/lib/hooks/useCart"; // Importamos el hook del carrito

const Navbar = () => {
  const pathname = usePathname();
  //const router = useRouter();
  const { user } = useUser();
  const { cartItems, isCartAnimating } = useCart(); 

  const [dropdownMenu, setDropdownMenu] = useState(false);
  //const [query, setQuery] = useState("");

  return (
    <div className="sticky top-0 z-10 py-2 px-10 flex gap-2 justify-between items-center bg-white max-sm:px-2">
      {/* Logo */}
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={130} height={100} />
      </Link>

      {/* Links principales */}
      <div className="flex gap-12 text-lg font-bold max-lg:hidden">
        <Link
          href="/"
          className={`hover:text-red-1 ${pathname === "/" && "text-red-1"}`}
        >
          Home
        </Link>
        <Link
          href={user ? "/favorites" : "/sign-in"}
          className={`hover:text-red-1 ${pathname === "/favorites" && "text-red-1"}`}
        >
          Favorites
        </Link>
        <Link
          href={user ? "/orders" : "/sign-in"}
          className={`hover:text-red-1 ${pathname === "/orders" && "text-red-1"}`}
        >
          Orders
        </Link>
      </div>

      {/* Iconos y menú */}
      <div className="flex gap-3 items-center">
        {/* Ícono del carrito */}
        <Link
          href="/cart"
          className={`flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white max-lg:hidden ${
            isCartAnimating ? "animate-bounce" : "" // Aplicamos la animación
          }`}
        >
          <ShoppingCart />
          <span className="text-sm font-semibold">{cartItems.length}</span>
        </Link>

        {/* Icono del menú visible solo en móviles */}
        <div
          className="cursor-pointer lg:hidden transition-transform duration-300 ease-in-out"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          {dropdownMenu ? (
            <ChevronDown className="w-6 h-6 transition-transform duration-300 ease-in-out rotate-180" />
          ) : (
            <Menu className="w-6 h-6 transition-transform duration-300 ease-in-out" />
          )}
        </div>

        {/* Menú desplegable con animación */}
        <div
          className={`absolute top-full left-0 w-screen bg-white shadow-xl transition-all duration-300 ease-in-out flex flex-col items-center 
          overflow-hidden transform origin-top scale-y-0 opacity-0 lg:hidden ${
            dropdownMenu ? "scale-y-100 opacity-100 py-5" : "py-0"
          }`}
        >
          <Link
            href="/"
            className="w-full text-left px-4 py-2 hover:text-red-1 transition-all duration-300 ease-in-out"
            onClick={() => setDropdownMenu(false)}
          >
            Home
          </Link>
          <Link
            href={user ? "/favorites" : "/sign-in"}
            className="w-full text-left px-4 py-2 hover:text-red-1 transition-all duration-300 ease-in-out"
            onClick={() => setDropdownMenu(false)}
          >
            Favorites
          </Link>
          <Link
            href={user ? "/orders" : "/sign-in"}
            className="w-full text-left px-4 py-2 hover:text-red-1 transition-all duration-300 ease-in-out"
            onClick={() => setDropdownMenu(false)}
          >
            Orders
          </Link>
          <Link
            href="/cart"
            className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-black hover:text-white rounded-md transition-all duration-300 ease-in-out"
            onClick={() => setDropdownMenu(false)}
          >
            <ShoppingCart className="w-4 h-4" />
            Cart
          </Link>
        </div>

        {/* Botón de usuario */}
        {user ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <Link href="/sign-in">
            <CircleUserRound />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;