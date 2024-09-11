import mongoose from "mongoose";


const DeliveryPartner = new mongoose.Schema({
  name: String,
  password: String,
  city: String,
  address: String,
  contact: Number,
});

export const deliveryPartnerSchema =
  mongoose.models.deliveryPartner || mongoose.model("deliveryPartner", DeliveryPartner);
