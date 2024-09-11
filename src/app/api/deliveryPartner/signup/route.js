import { connectionStr } from "@/app/lib/db";
import { deliveryPartnerSchema } from "@/app/lib/deliveryPartnerModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    let payload = await request.json();
    console.log('payload:--------->', payload)
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    const deliveryPartner = new deliveryPartnerSchema(payload);
    console.log("deliveryPartner", deliveryPartner);
    const result = await deliveryPartner.save();
    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message, success: false });
  }
}
