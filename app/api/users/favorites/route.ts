import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";

import { currentUser } from "@clerk/nextjs/server"; // Importamos `currentUser` en lugar de `auth`
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const user = await currentUser(); // Obtiene el objeto completo del usuario

    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = user.id; // Extrae el ID del usuario por currentUser devuelve el objeto completo
    console.log("Current User ID:", userId);

    await connectToDB();
    console.log("Connected to MongoDB");

    const existingUser = await User.findOne({ clerkId: userId });

    if (!existingUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    const { productId } = await req.json();

    if (!productId) {
      return new NextResponse("Product Id required", { status: 400 });
    }

    const isLiked = existingUser.favorites.includes(productId);

    if (isLiked) {
      // Dislike
      existingUser.favorites = existingUser.favorites.filter((id: string) => id !== productId);
    } else {
      // Like
      existingUser.favorites.push(productId);
    }

    await existingUser.save();

    return NextResponse.json(existingUser, { status: 200 });
  } catch (err) {
    console.log("[favorites_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};