import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/orderModel";
import { restaurantSchema } from "@/app/lib/RestaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request,content) {
  try {
    const Id = content.params.id
    console.log("Id:------------>", Id);
    if (!mongoose.Types.ObjectId.isValid(Id))
    throw new Error("Invalid userId formate ");
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    let result = await orderSchema.find({ deliveryBoyId: Id });
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
