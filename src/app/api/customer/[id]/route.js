import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/FoodModel";
import { restaurantSchema } from "@/app/lib/RestaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

 export async function GET(request,content) {
    const id = content.params.id
    console.log('content.params.id :------- ', content.params.id)
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    const details = await restaurantSchema.findOne({_id:id})
    const foodItem = await foodSchema.find({restaurantId:id})
    return NextResponse.json({success:true ,details,foodItem})

}