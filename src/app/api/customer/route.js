import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/RestaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  let queryParams = request.nextUrl.searchParams;
  console.log("queryParams", queryParams.get("restaurant"));
  let filter = {};
  if (queryParams.get("location")) {
    let city = queryParams.get("location");
    filter = { city: { $regex: new RegExp(city, "i") } }; //isse hmne iseliye kiya h q ki hme location me uppercase ,lowercase,etc sab ko search se match krvana h tha to rejex create kiya h 
  } else if (queryParams.get("restaurant")) {
    let name = queryParams.get("restaurant");
    filter = { name: { $regex: new RegExp(name, "i") } };
  }
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  let result = await restaurantSchema.find(filter);
  return NextResponse.json({ success: true, result });

}
