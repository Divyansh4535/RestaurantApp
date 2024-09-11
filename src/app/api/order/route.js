import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/orderModel";
import { restaurantSchema } from "@/app/lib/RestaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const payload = await request.json();
    // Connect to the database
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    // Create new order object
    const orderObject = new orderSchema(payload);
    console.log("payload :------->", payload);
    // Save order to the database
    const result = await orderObject.save();
    return NextResponse.json({ result, success: true });
  } catch (error) {
    // Catch and return any errors
    return NextResponse.json({ error: error.message, success: false });
  }
}

export async function GET(request) {
  try {
    const userId = request.nextUrl.searchParams.get("id");
    console.log("userId:------------>", userId);
    if (!mongoose.Types.ObjectId.isValid(userId))
    throw new Error("Invalid userId formate ");
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    let result = await orderSchema.find({ userId: userId });
    if (result) {
      let restaurantData = await Promise.all(     
        result.map(async (item) => {
          let restaurantInfo = {};
          restaurantInfo.data = await restaurantSchema.findOne({
            _id: item.restaurantId,
          });
          restaurantInfo.amount = item.amount;
          restaurantInfo.status = item.status;
          return restaurantInfo;          
        })
      );
      result = restaurantData;
      console.log("restaurantData inside :----------", restaurantData);
    }
    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message, success: false });
  }
}
