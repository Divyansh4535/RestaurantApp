import { connectionStr } from "@/app/lib/db";
import { deliveryPartnerSchema } from "@/app/lib/deliveryPartnerModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const payload = await request.json();
    console.log('payload Login :-------->', payload)
    await mongoose.connect(connectionStr, { useNewUrlParams: true });
    const result = await deliveryPartnerSchema.findOne({
      contact: payload.contact,
      password: payload.password,
    });
    console.log('result Login:---------->', result )
    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: message.error, success: false });
  }
}
