import { connectionStr } from "@/app/lib/db";
import { UserSchema } from "@/app/lib/UserModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  const payload = await request.json();
  let success = false;
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  const User = new UserSchema(payload);
  const result =  await User.save();
  if (result) success = true;
  return NextResponse.json({ result ,success });
}
