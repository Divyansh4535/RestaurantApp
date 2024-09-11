const { default: mongoose } = require("mongoose");

const orderModel = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  restaurantId: mongoose.Schema.Types.ObjectId,
  deliveryBoyId: mongoose.Schema.Types.ObjectId,
  foodItemId: String,
  status: String,
  amount: String,
});

export const orderSchema =
  mongoose.models.order || mongoose.model("order", orderModel);
