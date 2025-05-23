import mongoose from "mongoose"; // Importación necesaria

import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Obtener las órdenes de un usuario
export const GET = async (req: NextRequest) => {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const existingUser = await User.findOne({ clerkId: user.id });

    if (!existingUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json(existingUser.orders, { status: 200 });
  } catch (err) {
    console.error("[users/orders_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// Crear una nueva orden para un usuario
export const POST = async (req: NextRequest) => {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const { products, totalAmount} = await req.json();
    console.log("Received data:", { products, totalAmount }); // Depuración

    if (!products || !totalAmount ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const newOrder: OrderType = {
      _id: new mongoose.Types.ObjectId().toString(),
      customerClerkId: user.id,
      products,
      //quantity,
      totalAmount,
    };

    const existingUser = await User.findOne({ clerkId: user.id });

    if (!existingUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    existingUser.orders.push(newOrder);
    await existingUser.save();

    return NextResponse.json(newOrder, { status: 201 });
  } catch (err) {
    console.error("[users/orders_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};