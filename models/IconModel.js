import { Decimal128 } from "mongodb";
import mongoose from "mongoose";

const IconModelSchema = mongoose.Schema(
  {
    name: String,
    thumbnail: String,
    svg: String,
    type: String,
    tags: Array,
    price: {
      type: mongoose.Schema.Types.Decimal128,
      get: (v) => parseFloat(v.toString()),
    },
  },
  {
    timestamps: false,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

export default mongoose.models.IconModel || mongoose.model("IconModel", IconModelSchema, "icons");
