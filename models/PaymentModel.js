import mongoose from "mongoose";

const paymentModelSchema = new mongoose.Schema({
  paymentId: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
  icons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'IconModel' }],
  amount: Number,
  currency: String,
  customerId: String,
  paymentStatus: {
    type: String,
    enum: ['succeeded', 'failed', 'pending'],
    default: 'pending'
  },
  clientSecret: String,
  iconsDownloaded: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.PaymentModel || mongoose.model("PaymentModel", paymentModelSchema, "payments");
