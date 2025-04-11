import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";
import { currentUser } from "@clerk/nextjs/server";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const userId = user.id; // Extraemos el ID del usuario
    console.log("Current User ID:", userId);

    await connectToDB();
    console.log("Connected to MongoDB");

    let existingUser = await User.findOne({ clerkId: userId });
    console.log("User found:", existingUser);

    if (!existingUser) {
      console.log("Creating new user with clerkId:", userId);
      existingUser = await User.create({ clerkId: userId });
      await existingUser.save();
    }

    return NextResponse.json(existingUser, { status: 200 });
  } catch (err) {
    console.log("[users_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};