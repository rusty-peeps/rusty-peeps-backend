import { Schema, model } from "mongoose";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    agree: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default model("Contact", contactSchema);
