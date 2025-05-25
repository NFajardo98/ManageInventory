"use client";

import { useUser } from "@clerk/nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons"; // Ícono relacionado con comida
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface HeartFavoriteProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const HeartFavorite = ({ product, updateSignedInUser }: HeartFavoriteProps) => {
  const router = useRouter();
  const { user } = useUser();

  //const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const getUser = async () => {
    try {
      //setLoading(true);
      const res = await fetch("/api/users");
      const data = await res.json();
      setIsLiked(data.favorites.includes(product._id));
      //setLoading(false);
    } catch (err) {
      console.log("[users_GET]", err);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      if (!user) {
        router.push("/sign-in");
        return;
      } else {
        const res = await fetch("/api/users/favorites", {
          method: "POST",
          body: JSON.stringify({ productId: product._id }),
        });
        const updatedUser = await res.json();
        setIsLiked(updatedUser.favorites.includes(product._id));
        updateSignedInUser && updateSignedInUser(updatedUser);
      }
    } catch (err) {
      console.log("[favorites_POST]", err);
    }
  };

  return (
    <button
      onClick={handleLike}
      style={{
        fontSize: "24px",
        color: isLiked ? "gold" : "gray",
        transition: "transform 0.2s, color 0.2s", // Transición suave
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")} // Escala al pasar el cursor
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} // Vuelve al tamaño original
    >
      <FontAwesomeIcon icon={faUtensils} />
    </button>
  );
};

export default HeartFavorite;