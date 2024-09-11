import { connectionStr } from "@/app/lib/db";
import { UserSchema } from "@/app/lib/UserModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  //   try {
  //     const payload = await request.json();
  //     await mongoose.connect(connectionStr);
  //     const result = await UserSchema.findOne({
  //       email: payload.email,
  //       password: payload.password,
  //     });
  //     if (result) {
  //       return NextResponse.json({
  //         success: true,
  //         user: { name: user.name, email: user.email },
  //       });
  //     } else {
  //       return NextResponse.json(
  //         {
  //           success: false,
  //           message: "Invalid Credentials",
  //         },
  //         { status: 401 }
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Login Errors", error);
  //     return NextResponse.json(
  //       { success: false, massage: "An Error Occurred " },
  //       { status: 500 }
  //     );
  //   } finally {
  //     await mongoose.disconnect();
  //   }

  const payload = await request.json();
  let success = false;
  await mongoose.connect(connectionStr, { useNewUrlParser: true });
  const result = await UserSchema.findOne({
    email: payload.email,
    password: payload.password,
  });
  if (result) {
    success = true;
  }
  return NextResponse.json({ success, result });
}
