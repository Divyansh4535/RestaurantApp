import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/RestaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  const data = await restaurantSchema.find();
  return NextResponse.json({ result: data });
}

export async function POST(request) {
  let payload = await request.json();
  let result = false;
  let success = false;
  await mongoose.connect(connectionStr);
  if (payload.login) {
    //use it for login ]
    result = await restaurantSchema.findOne({
      email: payload.email,
      password: payload.password,
    });
    if (result) {
      success = true;
    }
  } else {
    // use if fot sign up
    let restaurant = new restaurantSchema(payload);
    result = await restaurant.save();
    if (result) {
      success = true;
    }
  }
  
  return NextResponse.json({ result, success: true });
}
