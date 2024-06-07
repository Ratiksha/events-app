import mongoose from "mongoose";

const CartModelSchema = mongoose.Schema(
  {
    icon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'IconModel'
    },
  }
);

export default CartModelSchema;
