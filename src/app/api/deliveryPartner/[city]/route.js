import { connectionStr } from "@/app/lib/db";
import { deliveryPartnerSchema } from "@/app/lib/deliveryPartnerModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
  try {
    const city = content.params.city;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    let filter = { city: { $regex: new RegExp(city, "i") } };
    const result = await deliveryPartnerSchema.find(filter);
    return NextResponse.json({ result ,success:true});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.massage, success: false });
  }
}
