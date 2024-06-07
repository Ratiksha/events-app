import mongoose from "mongoose";

const UserModelSchema = mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'IconModel' }]
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.UserModel || mongoose.model("UserModel", UserModelSchema, "users");